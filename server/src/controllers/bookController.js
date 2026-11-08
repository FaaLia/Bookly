const pool = require('../config/db');
const { searchBooks } = require('../services/googleBooks');
const { getOrImportBook, withRating } = require('../services/bookService');
const { labelForSlug } = require('../config/categoryMap');

function parsePaging(query, maxLimit) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), maxLimit);
  return { page, limit, offset: (page - 1) * limit };
}

// GET /api/books/search?q=laskar+pelangi&page=1&limit=20
exports.search = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ message: 'Parameter q wajib diisi' });

    const { page, limit, offset } = parsePaging(req.query, 40);
    const result = await searchBooks(q, limit, offset);
    // isbns dan google_categories hanya untuk keperluan internal
    const books = result.books.map(({ isbns, google_categories, ...rest }) => rest);
    res.json({ page, limit, total: result.total, books });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: 'Gagal mengambil data dari Google Books' });
  }
};

// GET /api/books/:apiBookId
exports.getDetail = async (req, res) => {
  try {
    const book = await getOrImportBook(req.params.apiBookId);
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil detail buku' });
  }
};

// GET /api/books?page=1&limit=20&category=literary-fiction&sort=rating
exports.list = async (req, res) => {
  try {
    const { page, limit, offset } = parsePaging(req.query, 50);
    const params = [limit, offset];
    let filter = '';

    if (req.query.category) {
      params.push(labelForSlug(req.query.category) || req.query.category);
      filter = `WHERE EXISTS (
        SELECT 1 FROM book_categories bc
        JOIN categories c ON c.category_id = bc.category_id
        WHERE bc.book_id = b.book_id AND c.category_name = $3)`;
    }

    const orders = {
      newest: 'created_at DESC',
      rating: 'COALESCE(average_rating, google_average_rating) DESC NULLS LAST, title ASC',
      title: 'title ASC',
    };
    const orderBy = orders[req.query.sort] || orders.newest;

    const { rows } = await pool.query(
      `SELECT * FROM (
         SELECT b.book_id, b.api_book_id, b.title, b.cover_image, b.published_date, b.created_at,
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
         ${filter}
       ) t
       ORDER BY ${orderBy}
       LIMIT $1 OFFSET $2`,
      params
    );

    const books = rows.map(({ created_at, ...book }) => withRating(book));
    res.json({ page, limit, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil daftar buku' });
  }
};