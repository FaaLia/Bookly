const pool = require('../config/db');
const { CATEGORIES } = require('../config/categoryMap');

// GET /api/categories -> selalu 7 kategori tetap, lengkap dengan jumlah bukunya
exports.list = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.category_id, c.category_name, COUNT(bc.book_id)::int AS books_count
       FROM categories c
       LEFT JOIN book_categories bc ON bc.category_id = c.category_id
       GROUP BY c.category_id`
    );
    const byName = new Map(rows.map((r) => [r.category_name, r]));

    res.json(
      CATEGORIES.map((c) => ({
        slug: c.slug,
        category_id: byName.get(c.label)?.category_id ?? null,
        category_name: c.label,
        books_count: byName.get(c.label)?.books_count ?? 0,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil kategori' });
  }
};
