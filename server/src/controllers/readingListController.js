const pool = require("../config/db");
const resolveBookId = require("../utils/resolveBookId");

const STATUSES = ["want_to_read", "reading", "finished"];

// GET /api/reading-list?status=reading
exports.list = async (req, res) => {
  try {
    const { status } = req.query;
    if (status && !STATUSES.includes(status)) {
      return res
        .status(400)
        .json({
          message: `status harus salah satu dari: ${STATUSES.join(", ")}`,
        });
    }

    const params = [req.user.user_id];
    let filter = "";
    if (status) {
      params.push(status);
      filter = "AND rl.reading_status = $2";
    }

    const { rows } = await pool.query(
      `SELECT b.book_id, b.api_book_id, b.title, b.cover_image,
              rl.reading_status, rl.added_at, rl.updated_at
       FROM reading_list rl
       JOIN books b ON b.book_id = rl.book_id
       WHERE rl.user_id = $1 ${filter}
       ORDER BY rl.updated_at DESC`,
      params,
    );
    res.json({ total: rows.length, reading_list: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil reading list" });
  }
};

// POST /api/reading-list  { book_id | api_book_id, reading_status? }
exports.add = async (req, res) => {
  try {
    const status = req.body.reading_status || "want_to_read";
    if (!STATUSES.includes(status)) {
      return res
        .status(400)
        .json({
          message: `reading_status harus salah satu dari: ${STATUSES.join(", ")}`,
        });
    }

    const bookId = await resolveBookId(req.body);
    if (!bookId) {
      return res
        .status(404)
        .json({
          message: "Buku tidak ditemukan (kirim book_id atau api_book_id)",
        });
    }

    const { rows } = await pool.query(
      `INSERT INTO reading_list (user_id, book_id, reading_status)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, book_id) DO NOTHING
       RETURNING *`,
      [req.user.user_id, bookId, status],
    );

    if (rows.length === 0) {
      return res
        .status(409)
        .json({
          message: "Buku sudah ada di reading list, gunakan update status",
        });
    }
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambah ke reading list" });
  }
};

// PUT /api/reading-list/:bookId  { reading_status }
exports.updateStatus = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (!Number.isInteger(bookId))
      return res.status(400).json({ message: "book_id tidak valid" });

    const status = req.body.reading_status;
    if (!STATUSES.includes(status)) {
      return res
        .status(400)
        .json({
          message: `reading_status harus salah satu dari: ${STATUSES.join(", ")}`,
        });
    }

    const { rows } = await pool.query(
      `UPDATE reading_list
       SET reading_status = $1, updated_at = NOW()
       WHERE user_id = $2 AND book_id = $3
       RETURNING *`,
      [status, req.user.user_id, bookId],
    );
    if (!rows[0])
      return res
        .status(404)
        .json({ message: "Buku tidak ada di reading list" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengubah status" });
  }
};

// DELETE /api/reading-list/:bookId
exports.remove = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (!Number.isInteger(bookId))
      return res.status(400).json({ message: "book_id tidak valid" });

    const result = await pool.query(
      "DELETE FROM reading_list WHERE user_id = $1 AND book_id = $2",
      [req.user.user_id, bookId],
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Buku tidak ada di reading list" });
    }
    res.json({ message: "Dihapus dari reading list" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus dari reading list" });
  }
};
