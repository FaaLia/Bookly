// Service API untuk pencarian dan detail buku
// Mendukung integrasi Backend Bookly dengan Fallback halus langsung ke Google Books API publik

const BACKEND_BASE_URL = 'http://localhost:5000/api';
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Helper merapikan data buku dari Google Books
export function formatGoogleBook(item) {
  if (!item) return null;
  const info = item.volumeInfo || {};
  const cover =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail ||
    info.imageLinks?.large ||
    info.imageLinks?.extraLarge ||
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop';

  const cleanCover = cover.replace('http://', 'https://');
  const authorsList = info.authors || ['Penulis Tidak Diketahui'];
  const categoriesList = info.categories || ['Umum'];

  return {
    id: item.id,
    api_book_id: item.id,
    title: info.title || 'Tanpa Judul',
    subtitle: info.subtitle || '',
    author: authorsList.join(', '),
    authors: authorsList,
    publisher: info.publisher || 'Penerbit Mandiri',
    publishedDate: info.publishedDate || 'Tidak Diketahui',
    year: info.publishedDate ? info.publishedDate.split('-')[0] : '2023',
    pages: info.pageCount || 280,
    isbn: (info.industryIdentifiers || []).map((i) => i.identifier).join(', ') || 'N/A',
    description: info.description
      ? info.description.replace(/<[^>]*>?/gm, '') // bersihkan tag HTML
      : 'Belum ada sinopsis untuk buku ini.',
    coverImage: cleanCover,
    rating: info.averageRating ? Number(info.averageRating).toFixed(1) : (4.0 + (item.id.charCodeAt(0) % 10) * 0.1).toFixed(1),
    reviewsCount: info.ratingsCount || Math.floor((item.id.charCodeAt(1) || 5) * 12 + 15),
    categories: categoriesList,
    category: categoriesList[0] || 'Fiksi Sastra',
    categoryLabel: categoriesList[0] || 'Fiksi Sastra',
    language: info.language ? info.language.toUpperCase() : 'ID',
    isGoogleBook: true,
  };
}

/**
 * Mencari buku lewat backend terlebih dahulu, jika gagal otomatis panggil Google Books publik
 */
export async function searchBooksApi(query, { page = 1, limit = 20 } = {}) {
  const trimmed = (query || '').trim();
  if (!trimmed) return { total: 0, books: [] };

  const startIndex = (page - 1) * limit;

  // 1. Coba hubungi Backend Bookly
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 detik timeout agar cepat

    const response = await fetch(
      `${BACKEND_BASE_URL}/books/search?q=${encodeURIComponent(trimmed)}&page=${page}&limit=${limit}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        total: data.total || data.books?.length || 0,
        books: (data.books || []).map((b) => ({
          ...b,
          id: b.api_book_id || b.id,
          author: Array.isArray(b.authors) ? b.authors.join(', ') : (b.author || 'Penulis'),
          coverImage: b.cover_image || b.coverImage,
          rating: b.google_average_rating || b.rating || 4.5,
          reviewsCount: b.google_ratings_count || b.reviewsCount || 24,
        })),
        source: 'backend',
      };
    }
  } catch (err) {
    // Backend offline / not reachable, lanjut ke fallback
    console.debug('Backend offline, beralih langsung ke Google Books API publik');
  }

  // 2. Fallback langsung ke Google Books API publik
  try {
    const url = `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(
      trimmed
    )}&maxResults=${limit}&startIndex=${startIndex}&printType=books`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google Books API status: ${res.status}`);

    const data = await res.json();
    const items = data.items || [];

    return {
      total: data.totalItems || 0,
      books: items.map(formatGoogleBook),
      source: 'google-books-direct',
    };
  } catch (err) {
    console.error('Error saat mengambil data Google Books:', err);
    throw err;
  }
}

/**
 * Mengambil detail buku berdasarkan API ID / Volume ID
 */
export async function getBookDetailApi(bookId) {
  if (!bookId) return null;

  // 1. Coba ambil dari Backend Bookly
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${BACKEND_BASE_URL}/books/${encodeURIComponent(bookId)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const b = await response.json();
      return {
        ...b,
        id: b.api_book_id || b.book_id || bookId,
        author: Array.isArray(b.authors) ? b.authors.join(', ') : (b.author || 'Penulis'),
        coverImage: b.cover_image || b.coverImage,
        rating: b.average_rating || b.google_average_rating || 4.8,
        reviewsCount: b.reviews_count || b.google_ratings_count || 12,
      };
    }
  } catch (err) {
    console.debug('Backend offline untuk detail buku, cek Google Books langsung');
  }

  // 2. Fallback langsung ke Google Books API publik
  try {
    const res = await fetch(`${GOOGLE_BOOKS_BASE_URL}/${encodeURIComponent(bookId)}`);
    if (res.ok) {
      const item = await res.json();
      return formatGoogleBook(item);
    }
  } catch (err) {
    console.error('Gagal mengambil detail dari Google Books API:', err);
  }

  return null;
}
