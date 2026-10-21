const pool = require('../config/db');
const { getBookById } = require('./googleBooks');

// Ambil satu buku lengkap (penulis, kategori, rating dari review kita) dari database
async function findBookByApiId(apiBookId) {
  const { rows } = await pool.query(
    `SELECT b.book_id, b.api_book_id, b.title, b.description, b.publisher,
            b.published_date, b.cover_image,
            b.google_average_rating::float AS google_average_rating,
            b.google_ratings_count,
            COALESCE((SELECT json_agg(a.author_name ORDER BY a.author_name)
                      FROM book_authors ba
                      JOIN authors a ON a.author_id = ba.author_id
                      WHERE ba.book_id = b.book_id), '[]'::json) AS authors,
            COALESCE((SELECT json_agg(c.category_name ORDER BY c.category_name)
                      FROM book_categories bc
                      JOIN categories c ON c.category_id = bc.category_id
                      WHERE bc.book_id = b.book_id), '[]'::json) AS categories,
            (SELECT ROUND(AVG(r.rating), 2)::float
             FROM reviews r WHERE r.book_id = b.book_id) AS average_rating,
            (SELECT COUNT(*)::int
             FROM reviews r WHERE r.book_id = b.book_id) AS reviews_count
     FROM books b
     WHERE b.api_book_id = $1`,
    [apiBookId]
  );
  return rows[0] || null;
}

// Simpan buku hasil Google Books + penulis + kategorinya dalam satu transaksi
async function saveBook(book) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO books (api_book_id, title, description, publisher, published_date,
                          cover_image, google_average_rating, google_ratings_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (api_book_id) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         publisher = EXCLUDED.publisher,
         published_date = EXCLUDED.published_date,
         cover_image = EXCLUDED.cover_image,
         google_average_rating = EXCLUDED.google_average_rating,
         google_ratings_count = EXCLUDED.google_ratings_count
       RETURNING book_id`,
      [
        book.api_book_id,
        book.title.slice(0, 255),
        book.description,
        book.publisher ? book.publisher.slice(0, 255) : null,
        book.published_date,
        book.cover_image,
        book.google_average_rating,
        book.google_ratings_count,
      ]
    );
    const bookId = inserted.rows[0].book_id;

    for (const name of book.authors) {
      const found = await client.query(
        'SELECT author_id FROM authors WHERE author_name = $1',
        [name]
      );
      let authorId = found.rows[0]?.author_id;
      if (!authorId) {
        const created = await client.query(
          'INSERT INTO authors (author_name) VALUES ($1) RETURNING author_id',
          [name.slice(0, 255)]
        );
        authorId = created.rows[0].author_id;
      }
      await client.query(
        'INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [bookId, authorId]
      );
    }

    for (const name of book.categories) {
      const category = await client.query(
        `INSERT INTO categories (category_name) VALUES ($1)
         ON CONFLICT (category_name) DO UPDATE SET category_name = EXCLUDED.category_name
         RETURNING category_id`,
        [name.slice(0, 100)]
      );
      await client.query(
        'INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [bookId, category.rows[0].category_id]
      );
    }

    await client.query('COMMIT');
    return bookId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// Ambil dari database; kalau belum ada, impor dari Google Books lalu simpan
async function getOrImportBook(apiBookId) {
  const existing = await findBookByApiId(apiBookId);
  if (existing) return existing;

  const fromGoogle = await getBookById(apiBookId);
  if (!fromGoogle) return null;

  await saveBook(fromGoogle);
  return findBookByApiId(apiBookId);
}

module.exports = { findBookByApiId, saveBook, getOrImportBook };