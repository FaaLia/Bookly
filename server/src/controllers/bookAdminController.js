const pool = require('../config/db');

function clean(value, max) {
  const s = (value ?? '').toString().trim();
  return s ? s.slice(0, max) : null;
}

async function loadBook(db, bookId) {
  const book = await db.query(
    `SELECT book_id, api_book_id, title, description, publisher, published_date, cover_image
     FROM books WHERE book_id = $1`,
    [bookId]
  );
  if (!book.rows[0]) return null;
  const authors = await db.query(
    `SELECT a.author_id, a.author_name FROM authors a
     JOIN book_authors ba ON ba.author_id = a.author_id
     WHERE ba.book_id = $1 ORDER BY a.author_name`,
    [bookId]
  );
  const categories = await db.query(
    `SELECT c.category_id, c.category_name FROM categories c
     JOIN book_categories bc ON bc.category_id = c.category_id
     WHERE bc.book_id = $1 ORDER BY c.category_name`,
    [bookId]
  );
  return { ...book.rows[0], authors: authors.rows, categories: categories.rows };
}

async function resolveCategories(db, names) {
  const { rows } = await db.query(
    'SELECT category_id, category_name FROM categories WHERE category_name = ANY($1)',
    [names]
  );
  const missing = names.filter((n) => !rows.some((r) => r.category_name === n));
  return { ids: rows.map((r) => r.category_id), missing };
}

async function resolveAuthorIds(client, names) {
  const ids = [];
  for (const raw of names) {
    const name = clean(raw, 255);
    if (!name) continue;
    const found = await client.query(
      'SELECT author_id FROM authors WHERE lower(author_name) = lower($1) LIMIT 1',
      [name]
    );
    if (found.rows[0]) {
      ids.push(found.rows[0].author_id);
    } else {
      const ins = await client.query(
        'INSERT INTO authors (author_name) VALUES ($1) RETURNING author_id',
        [name]
      );
      ids.push(ins.rows[0].author_id);
    }
  }
  return [...new Set(ids)];
}

async function replaceAuthors(client, bookId, authorIds) {
  await client.query('DELETE FROM book_authors WHERE book_id = $1', [bookId]);
  if (authorIds.length) {
    await client.query(
      'INSERT INTO book_authors (book_id, author_id) SELECT $1, unnest($2::int[])',
      [bookId, authorIds]
    );
  }
}

async function replaceCategories(client, bookId, categoryIds) {
  await client.query('DELETE FROM book_categories WHERE book_id = $1', [bookId]);
  if (categoryIds.length) {
    await client.query(
      'INSERT INTO book_categories (book_id, category_id) SELECT $1, unnest($2::int[])',
      [bookId, categoryIds]
    );
  }
}

function validCover(url) {
  return url === null || /^https?:\/\//i.test(url);
}

// POST /api/books  { title, description?, publisher?, published_date?, cover_image?,
//                    api_book_id?, authors?: ["Nama"], categories?: ["Fiksi Sastra"] }  (admin)
exports.create = async (req, res) => {
  const title = clean(req.body.title, 255);
  if (!title) return res.status(400).json({ message: 'title wajib diisi' });

  const authorNames = req.body.authors ?? [];
  const categoryNames = req.body.categories ?? [];
  if (!Array.isArray(authorNames) || !Array.isArray(categoryNames)) {
    return res.status(400).json({ message: 'authors dan categories harus berupa array' });
  }

  const cover = clean(req.body.cover_image, 2000);
  if (!validCover(cover)) {
    return res.status(400).json({ message: 'cover_image harus berupa URL http/https' });
  }

  const apiBookId =
    clean(req.body.api_book_id, 100) ||
    `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const client = await pool.connect();
  try {
    const cats = await resolveCategories(client, categoryNames);
    if (cats.missing.length) {
      return res.status(400).json({ message: `Kategori tidak dikenal: ${cats.missing.join(', ')}` });
    }

    await client.query('BEGIN');
    const ins = await client.query(
      `INSERT INTO books (api_book_id, title, description, publisher, published_date, cover_image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING book_id`,
      [
        apiBookId,
        title,
        clean(req.body.description, 20000),
        clean(req.body.publisher, 255),
        clean(req.body.published_date, 20),
        cover,
      ]
    );
    const bookId = ins.rows[0].book_id;
    await replaceAuthors(client, bookId, await resolveAuthorIds(client, authorNames));
    await replaceCategories(client, bookId, cats.ids);
    await client.query('COMMIT');

    res.status(201).json(await loadBook(pool, bookId));
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    if (err.code === '23505') {
      return res.status(409).json({ message: 'api_book_id sudah dipakai buku lain' });
    }
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah buku' });
  } finally {
    client.release();
  }
};

// PUT /api/books/:id  (semua field opsional; authors/categories mengganti seluruh daftar)  (admin)
exports.update = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'ID buku tidak valid' });

  const client = await pool.connect();
  try {
    const found = await client.query('SELECT * FROM books WHERE book_id = $1', [id]);
    const book = found.rows[0];
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    const body = req.body;

    let title = book.title;
    if (body.title !== undefined) {
      title = clean(body.title, 255);
      if (!title) return res.status(400).json({ message: 'title tidak boleh kosong' });
    }

    let cover = book.cover_image;
    if (body.cover_image !== undefined) {
      cover = clean(body.cover_image, 2000);
      if (!validCover(cover)) {
        return res.status(400).json({ message: 'cover_image harus berupa URL http/https' });
      }
    }

    const description = body.description !== undefined ? clean(body.description, 20000) : book.description;
    const publisher = body.publisher !== undefined ? clean(body.publisher, 255) : book.publisher;
    const published = body.published_date !== undefined ? clean(body.published_date, 20) : book.published_date;

    let categoryIds = null;
    if (body.categories !== undefined) {
      if (!Array.isArray(body.categories)) {
        return res.status(400).json({ message: 'categories harus berupa array' });
      }
      const cats = await resolveCategories(client, body.categories);
      if (cats.missing.length) {
        return res.status(400).json({ message: `Kategori tidak dikenal: ${cats.missing.join(', ')}` });
      }
      categoryIds = cats.ids;
    }
    if (body.authors !== undefined && !Array.isArray(body.authors)) {
      return res.status(400).json({ message: 'authors harus berupa array' });
    }

    await client.query('BEGIN');
    await client.query(
      `UPDATE books
       SET title = $1, description = $2, publisher = $3, published_date = $4, cover_image = $5
       WHERE book_id = $6`,
      [title, description, publisher, published, cover, id]
    );
    if (body.authors !== undefined) {
      await replaceAuthors(client, id, await resolveAuthorIds(client, body.authors));
    }
    if (categoryIds !== null) {
      await replaceCategories(client, id, categoryIds);
    }
    await client.query('COMMIT');

    res.json(await loadBook(pool, id));
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error(err);
    res.status(500).json({ message: 'Gagal mengubah buku' });
  } finally {
    client.release();
  }
};

// DELETE /api/books/:id  (admin) -- review, favorit, dan reading list buku ini ikut terhapus
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'ID buku tidak valid' });

    const result = await pool.query('DELETE FROM books WHERE book_id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ message: 'Buku dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus buku' });
  }
};
