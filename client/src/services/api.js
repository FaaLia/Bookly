/**
 * Bookly API Client Service
 * Menghubungkan frontend dengan Backend REST API Bookly (Express + PostgreSQL)
 * sesuai spesifikasi pada server/API.md.
 * 
 * Base URL: http://localhost:5000 (atau via proxy /api di Vite)
 * Menggunakan Authorization Bearer Token dari localStorage.
 * Dilengkapi graceful fallback ke mockData.js bila server API offline.
 */

import {
  CATEGORIES as MOCK_CATEGORIES,
  HERO_BOOK as MOCK_HERO_BOOK,
  TRENDING_BOOKS as MOCK_TRENDING_BOOKS,
  CATALOG_BOOKS as MOCK_CATALOG_BOOKS,
  BOOK_DETAILS as MOCK_BOOK_DETAILS,
  POPULAR_AUTHORS as MOCK_POPULAR_AUTHORS,
  AUTHORS_DETAIL_MAP as MOCK_AUTHORS_DETAIL_MAP
} from '../data/mockData';

const TOKEN_KEY = 'bookly_token';
const USER_KEY = 'bookly_user';

// Base URL: gunakan relative '/api' yang diarahkan oleh proxy Vite ke http://localhost:5000
// atau direct port jika dijalankan di mode preview tanpa proxy
const API_BASE = '/api';

/**
 * Token & Auth Storage Helpers
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch (err) {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (err) {
    console.warn('Gagal menyimpan token di localStorage:', err);
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch (err) {
    console.warn('Gagal menyimpan user di localStorage:', err);
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.warn('Gagal menghapus sesi auth:', err);
  }
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

/**
 * HTTP Request Wrapper dengan penanganan Bearer token dan standard error response
 */
async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch (parseErr) {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = (data && data.message) || response.statusText || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Data Normalizer:
 * Memetakan snake_case DB ke properti camelCase & snake_case yang dibutuhkan komponen React
 */
export function normalizeBook(book) {
  if (!book) return null;

  const authorsArr = Array.isArray(book.authors)
    ? book.authors
    : (book.author ? [book.author] : ['Penulis Tidak Diketahui']);
  
  const authorName = authorsArr.join(', ');
  const authorSlug = authorsArr[0]
    ? authorsArr[0].toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    : 'julian-cross';

  const categoriesArr = Array.isArray(book.categories)
    ? book.categories
    : (book.category ? [book.category] : ['Fiksi Sastra']);

  const primaryCategory = categoriesArr[0] || 'Fiksi Sastra';

  // Hitung rating siap pakai sesuai spesifikasi API.md:
  // "rating dan ratings_count sudah siap pakai: rating review Bookly kalau sudah ada, kalau belum rating Google."
  const ratingVal = book.rating != null
    ? Number(book.rating)
    : (book.average_rating != null
        ? Number(book.average_rating)
        : (book.google_average_rating != null
            ? Number(book.google_average_rating)
            : 4.8));

  const reviewsCountVal = book.reviews_count != null
    ? String(book.reviews_count)
    : (book.ratings_count != null
        ? String(book.ratings_count)
        : (book.google_ratings_count != null ? String(book.google_ratings_count) : '1.2k'));

  const idVal = book.api_book_id || (book.book_id ? String(book.book_id) : book.id) || 'memory-of-water';

  const defaultCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop';
  const coverImage = book.cover_image || book.coverImage || book.cover || defaultCover;

  return {
    ...book,
    id: idVal,
    book_id: book.book_id || null,
    api_book_id: book.api_book_id || idVal,
    title: book.title || 'Tanpa Judul',
    author: authorName,
    authors: authorsArr,
    authorId: book.authorId || authorSlug,
    coverImage: coverImage,
    cover: coverImage,
    rating: Number(ratingVal.toFixed(1)),
    ratings_count: book.ratings_count || 0,
    reviewsCount: reviewsCountVal,
    category: book.category || primaryCategory,
    categoryLabel: primaryCategory,
    categories: categoriesArr,
    published_date: book.published_date || '',
    publishedDate: book.published_date || '',
    year: book.published_date ? String(book.published_date).slice(0, 4) : (book.year || '2024'),
    description: book.description || 'Sebuah karya pilihan dengan narasi mendalam yang mengajak pembaca merenungkan kembali hakikat kemanusiaan dan memori.',
    publisher: book.publisher || 'Pustaka Bookly',
    format: book.format || 'Hardcover',
    thickness: book.thickness || 'Sedang',
    pages: book.pages || book.page_count || 320,
    era: book.era || 'kontemporer',
    genreKey: book.genreKey || 'fiction'
  };
}

/**
 * Normalizer untuk Author
 */
export function normalizeAuthor(author) {
  if (!author) return null;
  const authorId = author.author_id ? String(author.author_id) : (author.id || 'julian-cross');
  const slug = author.author_name
    ? author.author_name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    : (author.id || 'julian-cross');

  return {
    id: slug,
    author_id: author.author_id,
    author_name: author.author_name || author.name,
    name: author.author_name || author.name,
    tagline: author.tagline || (author.biography ? `${author.author_name} — Penulis Pilihan` : 'Penulis Sastra & Esais'),
    biography: author.biography || author.bio?.para1 || 'Penulis dan kurator sastra kontemporer.',
    books_count: author.books_count != null ? author.books_count : (author.books ? author.books.length : 4),
    books: Array.isArray(author.books) ? author.books.map(normalizeBook) : [],
    portraitImage: author.portraitImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
  };
}

/**
 * ============================================================================
 * 1. Autentikasi API
 * ============================================================================
 */
export const authApi = {
  /**
   * POST /api/auth/register
   * Body: { name, email, password }
   */
  async register({ name, email, password }) {
    try {
      const res = await request('/auth/register', {
        method: 'POST',
        body: { name, email, password }
      });
      if (res.token) {
        setToken(res.token);
        setStoredUser(res.user);
      }
      return res;
    } catch (err) {
      // Jika server offline, fallback simulasi lokal
      if (!err.status) {
        console.warn('API Server offline, simulasi register lokal dilakukan:', err.message);
        const mockUser = {
          user_id: Date.now(),
          name,
          email,
          role: 'user',
          created_at: new Date().toISOString()
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        setToken(mockToken);
        setStoredUser(mockUser);
        return {
          message: 'Registrasi berhasil (mode offline)',
          token: mockToken,
          user: mockUser
        };
      }
      throw err;
    }
  },

  /**
   * POST /api/auth/login
   * Body: { email, password }
   */
  async login({ email, password }) {
    try {
      const res = await request('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      if (res.token) {
        setToken(res.token);
        setStoredUser(res.user);
      }
      return res;
    } catch (err) {
      // Jika server offline, simulasi login fallback
      if (!err.status) {
        console.warn('API Server offline, simulasi login lokal dilakukan:', err.message);
        const nameGuess = email.split('@')[0] || 'Dewi Anggraini';
        const formattedName = nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);
        const mockUser = {
          user_id: 1,
          name: formattedName,
          email,
          role: 'user',
          created_at: new Date().toISOString()
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        setToken(mockToken);
        setStoredUser(mockUser);
        return {
          message: 'Login berhasil (mode offline)',
          token: mockToken,
          user: mockUser
        };
      }
      throw err;
    }
  },

  /**
   * GET /api/auth/me (login required)
   */
  async getMe() {
    const token = getToken();
    if (!token) return null;

    try {
      const user = await request('/auth/me');
      setStoredUser(user);
      return user;
    } catch (err) {
      if (!err.status) {
        return getStoredUser();
      }
      if (err.status === 401) {
        clearAuth();
      }
      return null;
    }
  },

  /**
   * Logout helper
   */
  logout() {
    clearAuth();
  }
};

/**
 * ============================================================================
 * 2. Buku API
 * ============================================================================
 */
export const booksApi = {
  /**
   * GET /api/books
   * Query params: page, limit, category (slug), sort ('newest'|'rating'|'title')
   */
  async getBooks({ page = 1, limit = 20, category = null, sort = 'newest' } = {}) {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (category && category !== 'all') params.set('category', category);
    if (sort) params.set('sort', sort);

    try {
      const data = await request(`/books?${params.toString()}`);
      return {
        page: data.page || page,
        limit: data.limit || limit,
        books: (data.books || []).map(normalizeBook)
      };
    } catch (err) {
      console.warn('Gagal memuat buku dari API backend, menggunakan fallback data lokal:', err.message);
      // Fallback ke mock data
      let filtered = [...MOCK_CATALOG_BOOKS];
      if (category && category !== 'all') {
        filtered = filtered.filter(b => b.category === category || b.genreKey === category);
      }
      if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }
      return {
        page: 1,
        limit: filtered.length,
        books: filtered.map(normalizeBook)
      };
    }
  },

  /**
   * GET /api/books/search?q=...
   */
  async searchBooks({ q, page = 1, limit = 20 }) {
    if (!q || !q.trim()) {
      return { page: 1, limit, total: 0, books: [] };
    }

    try {
      const params = new URLSearchParams({ q: q.trim(), page, limit });
      const data = await request(`/books/search?${params.toString()}`);
      return {
        page: data.page || 1,
        limit: data.limit || limit,
        total: data.total || (data.books ? data.books.length : 0),
        books: (data.books || []).map(normalizeBook)
      };
    } catch (err) {
      console.warn('Gagal mencari buku di Google Books API via server, fallback lokal:', err.message);
      const qLower = q.toLowerCase();
      const matched = MOCK_CATALOG_BOOKS.filter(b =>
        b.title.toLowerCase().includes(qLower) ||
        b.author.toLowerCase().includes(qLower) ||
        (b.description && b.description.toLowerCase().includes(qLower))
      );
      return {
        page: 1,
        limit,
        total: matched.length,
        books: matched.map(normalizeBook)
      };
    }
  },

  /**
   * GET /api/books/:apiBookId
   */
  async getBookDetail(apiBookId) {
    if (!apiBookId) return normalizeBook(MOCK_BOOK_DETAILS);

    try {
      const data = await request(`/books/${encodeURIComponent(apiBookId)}`);
      return normalizeBook(data);
    } catch (err) {
      console.warn(`Gagal memuat detail buku ${apiBookId} dari API, fallback ke mock:`, err.message);
      // Cari di catalog
      const foundCatalog = MOCK_CATALOG_BOOKS.find(b => b.id === apiBookId || b.api_book_id === apiBookId);
      if (foundCatalog) {
        return normalizeBook({ ...MOCK_BOOK_DETAILS, ...foundCatalog });
      }
      const foundTrending = MOCK_TRENDING_BOOKS.find(b => b.id === apiBookId);
      if (foundTrending) {
        return normalizeBook({ ...MOCK_BOOK_DETAILS, ...foundTrending });
      }
      return normalizeBook(MOCK_BOOK_DETAILS);
    }
  }
};

/**
 * ============================================================================
 * 3. Kategori API
 * ============================================================================
 */
export const categoriesApi = {
  /**
   * GET /api/categories
   * Tepat 7 kategori tetap
   */
  async getCategories() {
    try {
      const categories = await request('/categories');
      if (Array.isArray(categories) && categories.length > 0) {
        return [
          { id: 'all', slug: 'all', category_name: 'Semua', label: 'Semua' },
          ...categories.map(c => ({
            id: c.slug,
            slug: c.slug,
            category_id: c.category_id,
            category_name: c.category_name,
            label: c.category_name,
            books_count: c.books_count || 0
          }))
        ];
      }
      return MOCK_CATEGORIES;
    } catch (err) {
      console.warn('Gagal memuat kategori dari API, memakai fallback:', err.message);
      return MOCK_CATEGORIES;
    }
  }
};

/**
 * ============================================================================
 * 4. Penulis API
 * ============================================================================
 */
export const authorsApi = {
  /**
   * GET /api/authors?q=...
   */
  async getAuthors(query = '') {
    try {
      const qParam = query ? `?q=${encodeURIComponent(query)}` : '';
      const authors = await request(`/authors${qParam}`);
      if (Array.isArray(authors) && authors.length > 0) {
        return authors.map(normalizeAuthor);
      }
      return MOCK_POPULAR_AUTHORS.map(normalizeAuthor);
    } catch (err) {
      console.warn('Gagal memuat penulis dari API, fallback ke mock:', err.message);
      let list = [...MOCK_POPULAR_AUTHORS];
      if (query) {
        const qLower = query.toLowerCase();
        list = list.filter(a => a.name.toLowerCase().includes(qLower));
      }
      return list.map(normalizeAuthor);
    }
  },

  /**
   * GET /api/authors/:id
   */
  async getAuthorDetail(authorId) {
    if (!authorId) return null;

    try {
      const author = await request(`/authors/${encodeURIComponent(authorId)}`);
      return normalizeAuthor(author);
    } catch (err) {
      console.warn(`Gagal memuat detail penulis ${authorId} dari API, fallback:`, err.message);
      const mockDetail = MOCK_AUTHORS_DETAIL_MAP[authorId] || MOCK_AUTHORS_DETAIL_MAP['julian-cross'];
      return normalizeAuthor(mockDetail);
    }
  }
};

/**
 * ============================================================================
 * 5. Review API
 * ============================================================================
 */
export const reviewsApi = {
  /**
   * GET /api/reviews/book/:apiBookId
   */
  async getBookReviews(apiBookId) {
    if (!apiBookId) return { total: 0, reviews: [] };

    try {
      const data = await request(`/reviews/book/${encodeURIComponent(apiBookId)}`);
      return {
        total: data.total || (data.reviews ? data.reviews.length : 0),
        reviews: (data.reviews || []).map(r => ({
          id: r.review_id || r.id,
          review_id: r.review_id,
          name: r.user_name || 'Pembaca Terverifikasi',
          user_id: r.user_id,
          rating: r.rating,
          content: r.review_text || r.content || '',
          review_text: r.review_text || '',
          date: r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru saja',
          created_at: r.created_at,
          updated_at: r.updated_at,
          likes: r.likes || 0,
          userLiked: false,
          hasSpoiler: Boolean(r.has_spoiler || r.hasSpoiler)
        }))
      };
    } catch (err) {
      console.warn(`Gagal memuat ulasan buku ${apiBookId} dari API:`, err.message);
      return {
        total: (MOCK_BOOK_DETAILS.reviews || []).length,
        reviews: MOCK_BOOK_DETAILS.reviews || []
      };
    }
  },

  /**
   * GET /api/reviews/me (login)
   */
  async getMyReviews() {
    try {
      const reviews = await request('/reviews/me');
      return Array.isArray(reviews) ? reviews : [];
    } catch (err) {
      console.warn('Gagal memuat ulasan pengguna dari API:', err.message);
      return [];
    }
  },

  /**
   * POST /api/reviews (login)
   * Body: { book_id or api_book_id, rating, review_text }
   */
  async createReview({ bookId, apiBookId, rating, reviewText }) {
    const payload = {
      rating: Number(rating),
      review_text: reviewText
    };
    if (bookId) payload.book_id = bookId;
    else if (apiBookId) payload.api_book_id = apiBookId;

    try {
      return await request('/reviews', {
        method: 'POST',
        body: payload
      });
    } catch (err) {
      console.warn('Gagal mengirim review ke server API:', err.message);
      if (!err.status) {
        return {
          review_id: Date.now(),
          rating,
          review_text: reviewText,
          created_at: new Date().toISOString()
        };
      }
      throw err;
    }
  },

  /**
   * PUT /api/reviews/:id (login, pemilik)
   */
  async updateReview(reviewId, { rating, reviewText }) {
    return await request(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: { rating, review_text: reviewText }
    });
  },

  /**
   * DELETE /api/reviews/:id (login, pemilik atau admin)
   */
  async deleteReview(reviewId) {
    return await request(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  }
};

/**
 * ============================================================================
 * 6. Favorit API
 * ============================================================================
 */
export const favoritesApi = {
  /**
   * GET /api/favorites (login)
   */
  async getFavorites() {
    try {
      const data = await request('/favorites');
      return {
        total: data.total || (data.favorites ? data.favorites.length : 0),
        favorites: (data.favorites || []).map(normalizeBook)
      };
    } catch (err) {
      console.warn('Gagal memuat favorit dari API:', err.message);
      return { total: 0, favorites: [] };
    }
  },

  /**
   * POST /api/favorites (login)
   */
  async addFavorite({ bookId, apiBookId }) {
    const payload = {};
    if (bookId) payload.book_id = bookId;
    if (apiBookId) payload.api_book_id = apiBookId;

    return await request('/favorites', {
      method: 'POST',
      body: payload
    });
  },

  /**
   * DELETE /api/favorites/:bookId (login)
   */
  async removeFavorite(bookId) {
    return await request(`/favorites/${bookId}`, {
      method: 'DELETE'
    });
  }
};

/**
 * ============================================================================
 * 7. Reading List API
 * ============================================================================
 */
export const readingListApi = {
  /**
   * GET /api/reading-list?status=... (login)
   * status: 'want_to_read' | 'reading' | 'finished'
   */
  async getReadingList(status = null) {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    try {
      const data = await request(`/reading-list${query}`);
      return {
        total: data.total || (data.reading_list ? data.reading_list.length : 0),
        reading_list: (data.reading_list || []).map(item => ({
          ...normalizeBook(item),
          reading_status: item.reading_status,
          added_at: item.added_at,
          updated_at: item.updated_at
        }))
      };
    } catch (err) {
      console.warn('Gagal memuat reading list dari API:', err.message);
      return { total: 0, reading_list: [] };
    }
  },

  /**
   * POST /api/reading-list (login)
   * Body: { book_id or api_book_id, reading_status }
   */
  async addToList({ bookId, apiBookId, readingStatus = 'want_to_read' }) {
    const payload = { reading_status: readingStatus };
    if (bookId) payload.book_id = bookId;
    if (apiBookId) payload.api_book_id = apiBookId;

    return await request('/reading-list', {
      method: 'POST',
      body: payload
    });
  },

  /**
   * PUT /api/reading-list/:bookId (login)
   */
  async updateStatus(bookId, readingStatus) {
    return await request(`/reading-list/${bookId}`, {
      method: 'PUT',
      body: { reading_status: readingStatus }
    });
  },

  /**
   * DELETE /api/reading-list/:bookId (login)
   */
  async removeFromList(bookId) {
    return await request(`/reading-list/${bookId}`, {
      method: 'DELETE'
    });
  }
};
