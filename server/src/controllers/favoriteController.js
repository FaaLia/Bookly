const pool = require("../config/db");
const resolveBookId = require("../utils/resolveBookId");

// GET /api/favorites
exports.list = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT b.book_id, b.api_book_id, b.title, b.cover_image, f.created_at
       FROM favorites f
       JOIN books b ON b.book_id = f.book_id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.user_id],
    );
    res.json({ total: rows.length, favorites: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil favorit" });
  }
};

// POST /api/favorites  { book_id | api_book_id }
exports.add = async (req, res) => {
  try {
    const bookId = await resolveBookId(req.body);
    if (!bookId) {
      return res
        .status(404)
        .json({
          message: "Buku tidak ditemukan (kirim book_id atau api_book_id)",
        });
    }

    const { rows } = await pool.query(
      `INSERT INTO favorites (user_id, book_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, book_id) DO NOTHING
       RETURNING *`,
      [req.user.user_id, bookId],
    );

    if (rows.length === 0) {
      return res.status(409).json({ message: "Buku sudah ada di favorit" });
    }
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambah favorit" });
  }
};

// DELETE /api/favorites/:bookId
exports.remove = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (!Number.isInteger(bookId))
      return res.status(400).json({ message: "book_id tidak valid" });

    const result = await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND book_id = $2",
      [req.user.user_id, bookId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Buku tidak ada di favorit" });
    }
    res.json({ message: "Dihapus dari favorit" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus favorit" });
  }
};
