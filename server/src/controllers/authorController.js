const pool = require('../config/db');

// GET /api/authors?q=hirata
exports.list = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const { rows } = await pool.query(
      `SELECT a.author_id, a.author_name, a.biography, COUNT(ba.book_id)::int AS books_count
       FROM authors a
       LEFT JOIN book_authors ba ON ba.author_id = a.author_id
       WHERE a.author_name ILIKE $1
       GROUP BY a.author_id
       ORDER BY a.author_name
       LIMIT 100`,
      [`%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil penulis' });
  }
};

// GET /api/authors/:id  (detail penulis + buku yang ada di koleksi)
exports.getDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ message: 'ID tidak valid' });

    const author = await pool.query(
      'SELECT author_id, author_name, biography FROM authors WHERE author_id = $1',
      [id]
    );
    if (!author.rows[0]) return res.status(404).json({ message: 'Penulis tidak ditemukan' });

    const books = await pool.query(
      `SELECT b.book_id, b.api_book_id, b.title, b.cover_image, b.published_date
       FROM books b
       JOIN book_authors ba ON ba.book_id = b.book_id
       WHERE ba.author_id = $1
       ORDER BY b.title`,
      [id]
    );

    res.json({ ...author.rows[0], books: books.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil detail penulis' });
  }
};

// POST /api/authors  { author_name, biography? }  (admin)
exports.create = async (req, res) => {
  try {
    const name = (req.body.author_name || '').trim();
    if (!name) return res.status(400).json({ message: 'author_name wajib diisi' });

    const dup = await pool.query(
      'SELECT 1 FROM authors WHERE lower(author_name) = lower($1)',
      [name]
    );
    if (dup.rows.length > 0) {
      return res.status(409).json({ message: 'Penulis dengan nama itu sudah ada' });
    }

    const biography = (req.body.biography || '').trim() || null;
    const { rows } = await pool.query(
      `INSERT INTO authors (author_name, biography)
       VALUES ($1, $2)
       RETURNING author_id, author_name, biography`,
      [name.slice(0, 255), biography]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Penulis dengan nama itu sudah ada' });
    }
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah penulis' });
  }
};

// PUT /api/authors/:id  { author_name?, biography? }  (admin)
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ message: 'ID tidak valid' });

    const found = await pool.query('SELECT * FROM authors WHERE author_id = $1', [id]);
    const author = found.rows[0];
    if (!author) return res.status(404).json({ message: 'Penulis tidak ditemukan' });

    let name = author.author_name;
    if (req.body.author_name !== undefined) {
      name = (req.body.author_name || '').trim();
      if (!name) return res.status(400).json({ message: 'author_name tidak boleh kosong' });
    }
    const biography =
      req.body.biography !== undefined
        ? (req.body.biography || '').trim() || null
        : author.biography;

    const dup = await pool.query(
      'SELECT 1 FROM authors WHERE lower(author_name) = lower($1) AND author_id <> $2',
      [name, id]
    );
    if (dup.rows.length > 0) {
      return res.status(409).json({ message: 'Penulis dengan nama itu sudah ada' });
    }

    const { rows } = await pool.query(
      `UPDATE authors SET author_name = $1, biography = $2
       WHERE author_id = $3
       RETURNING author_id, author_name, biography`,
      [name.slice(0, 255), biography, id]
    );
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Penulis dengan nama itu sudah ada' });
    }
    console.error(err);
    res.status(500).json({ message: 'Gagal mengubah penulis' });
  }
};

// DELETE /api/authors/:id  (admin)
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ message: 'ID tidak valid' });

    const linked = await pool.query(
      'SELECT COUNT(*)::int AS n FROM book_authors WHERE author_id = $1',
      [id]
    );
    if (linked.rows[0].n > 0) {
      return res.status(409).json({
        message: `Penulis masih terhubung ke ${linked.rows[0].n} buku`,
      });
    }

    const result = await pool.query('DELETE FROM authors WHERE author_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Penulis tidak ditemukan' });
    }
    res.json({ message: 'Penulis dihapus' });
  } catch (err) {
    if (err.code === '23503') {
      return res.status(409).json({ message: 'Penulis masih terhubung ke buku, lepaskan dulu' });
    }
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus penulis' });
  }
};
