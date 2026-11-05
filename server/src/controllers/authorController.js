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
