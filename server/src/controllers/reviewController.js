const pool = require("../config/db");
const resolveBookId = require("../utils/resolveBookId");

function validRating(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

// GET /api/reviews/book/:apiBookId  (publik)
exports.listByBook = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.review_id, r.rating, r.review_text, r.created_at, r.updated_at,
              u.user_id, u.name AS user_name
       FROM reviews r
       JOIN books b ON b.book_id = r.book_id
       JOIN users u ON u.user_id = r.user_id
       WHERE b.api_book_id = $1
       ORDER BY r.created_at DESC`,
      [req.params.apiBookId],
    );
    res.json({ total: rows.length, reviews: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil review" });
  }
};

// GET /api/reviews/me  (review milik user yang login)
exports.listMine = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.review_id, r.rating, r.review_text, r.created_at, r.updated_at,
              b.book_id, b.api_book_id, b.title, b.cover_image
       FROM reviews r
       JOIN books b ON b.book_id = r.book_id
       WHERE r.user_id = $1
       ORDER BY r.updated_at DESC`,
      [req.user.user_id],
    );
    res.json({ total: rows.length, reviews: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil review kamu" });
  }
};

// POST /api/reviews  { book_id | api_book_id, rating, review_text? }
exports.create = async (req, res) => {
  try {
    const rating = validRating(req.body.rating);
    if (!rating) {
      return res
        .status(400)
        .json({ message: "rating wajib berupa angka bulat 1-5" });
    }

    const bookId = await resolveBookId(req.body);
    if (!bookId) {
      return res
        .status(404)
        .json({
          message: "Buku tidak ditemukan (kirim book_id atau api_book_id)",
        });
    }

    const reviewText = (req.body.review_text || "").trim() || null;

    const { rows } = await pool.query(
      `INSERT INTO reviews (user_id, book_id, rating, review_text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.user_id, bookId, rating, reviewText],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Kamu sudah mereview buku ini, gunakan edit" });
    }
    console.error(err);
    res.status(500).json({ message: "Gagal menambah review" });
  }
};

// PUT /api/reviews/:id  { rating?, review_text? }  (hanya pemilik)
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id))
      return res.status(400).json({ message: "ID review tidak valid" });

    const { rows: found } = await pool.query(
      "SELECT * FROM reviews WHERE review_id = $1",
      [id],
    );
    const review = found[0];
    if (!review)
      return res.status(404).json({ message: "Review tidak ditemukan" });
    if (review.user_id !== req.user.user_id) {
      return res
        .status(403)
        .json({ message: "Kamu hanya bisa mengedit review milikmu" });
    }

    let rating = review.rating;
    if (req.body.rating !== undefined) {
      rating = validRating(req.body.rating);
      if (!rating)
        return res
          .status(400)
          .json({ message: "rating wajib berupa angka bulat 1-5" });
    }

    const reviewText =
      req.body.review_text !== undefined
        ? (req.body.review_text || "").trim() || null
        : review.review_text;

    const { rows } = await pool.query(
      `UPDATE reviews
       SET rating = $1, review_text = $2, updated_at = NOW()
       WHERE review_id = $3
       RETURNING *`,
      [rating, reviewText, id],
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengubah review" });
  }
};

// DELETE /api/reviews/:id  (pemilik atau admin)
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id))
      return res.status(400).json({ message: "ID review tidak valid" });

    const { rows } = await pool.query(
      "SELECT user_id FROM reviews WHERE review_id = $1",
      [id],
    );
    if (!rows[0])
      return res.status(404).json({ message: "Review tidak ditemukan" });

    if (rows[0].user_id !== req.user.user_id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Kamu hanya bisa menghapus review milikmu" });
    }

    await pool.query("DELETE FROM reviews WHERE review_id = $1", [id]);
    res.json({ message: "Review dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus review" });
  }
};
