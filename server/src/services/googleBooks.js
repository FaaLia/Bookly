const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Mengubah format Google Books menjadi format yang cocok dengan tabel kita
function mapVolume(item) {
  const info = item.volumeInfo || {};
  const cover = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null;

  return {
    api_book_id: item.id,
    title: info.title || 'Tanpa judul',
    description: info.description || null,
    publisher: info.publisher || null,
    published_date: info.publishedDate || null,
    cover_image: cover ? cover.replace('http://', 'https://') : null,
    google_average_rating: info.averageRating ?? null,
    google_ratings_count: info.ratingsCount ?? null,
    authors: info.authors || [],
    categories: info.categories || [],
  };
}

function buildUrl(path, params = {}) {
  const query = new URLSearchParams(params);
  if (process.env.GOOGLE_BOOKS_API_KEY) {
    query.set('key', process.env.GOOGLE_BOOKS_API_KEY);
  }
  return `${BASE_URL}${path}?${query}`;
}

async function searchBooks(keyword, maxResults = 20, startIndex = 0) {
  const url = buildUrl('', {
    q: keyword,
    maxResults: String(maxResults),
    startIndex: String(startIndex),
    printType: 'books',
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Books API error: ${res.status}`);

  const data = await res.json();
  return {
    total: data.totalItems || 0,
    books: (data.items || []).map(mapVolume),
  };
}

async function getBookById(apiBookId) {
  const res = await fetch(buildUrl(`/${encodeURIComponent(apiBookId)}`));
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Google Books API error: ${res.status}`);

  return mapVolume(await res.json());
}

module.exports = { searchBooks, getBookById };