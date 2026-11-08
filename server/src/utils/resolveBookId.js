const pool = require("../config/db");
const { getOrImportBook } = require("../services/bookService");

// Terima { book_id } atau { api_book_id } dari body, kembalikan book_id di database.
// Kalau pakai api_book_id dan bukunya belum ada, otomatis diimpor dari Google Books.
module.exports = async function resolveBookId(body = {}) {
  if (body.book_id) {
    const id = parseInt(body.book_id, 10);
    if (!Number.isInteger(id)) return null;
    const { rows } = await pool.query(
      "SELECT book_id FROM books WHERE book_id = $1",
      [id],
    );
    return rows[0] ? rows[0].book_id : null;
  }

  if (body.api_book_id) {
    const book = await getOrImportBook(String(body.api_book_id));
    return book ? book.book_id : null;
  }

  return null;
};
