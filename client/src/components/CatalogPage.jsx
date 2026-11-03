import React, { useState, useMemo, useEffect } from 'react'
import {
  SlidersHorizontal,
  Star,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Search,
  Sparkles,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react'
import { CATALOG_BOOKS } from '../data/mockData'
import { searchBooksApi } from '../services/bookApi'

const QUICK_CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'literary-fiction', label: 'Fiksi Sastra' },
  { id: 'non-fiction', label: 'Non-Fiksi' },
  { id: 'philosophy', label: 'Filsafat' },
  { id: 'nature-science', label: 'Sains & Alam' },
  { id: 'art-design', label: 'Seni & Desain' },
  { id: 'poetry', label: 'Puisi' },
  { id: 'history', label: 'Sejarah' }
]

const GENRE_CHECKBOXES = [
  { id: 'fiction', label: 'Fiksi Sastra', count: 42 },
  { id: 'philosophy', label: 'Filsafat & Esai', count: 28 },
  { id: 'classics', label: 'Sastra Klasik', count: 19 },
  { id: 'poetry', label: 'Puisi & Syair', count: 15 },
  { id: 'science', label: 'Sains & Humaniora', count: 24 }
]

const RATING_OPTIONS = [
  { id: '4.5', label: '4.5 ke atas', count: 34, minRating: 4.5 },
  { id: '4.0', label: '4.0 ke atas', count: 58, minRating: 4.0 }
]

const ERA_OPTIONS = [
  { id: 'all', label: 'Semua Era', count: null },
  { id: 'klasik', label: 'Klasik (Pra-1950)', count: 18 },
  { id: 'modernis', label: 'Modernis (1950-1999)', count: 31 },
  { id: 'kontemporer', label: 'Kontemporer (2000+)', count: 47 }
]

const FORMAT_OPTIONS = [
  { id: 'all', label: 'Semua' },
  { id: 'Hardcover', label: 'Hardcover' },
  { id: 'Paperback', label: 'Paperback' }
]

const THICKNESS_OPTIONS = [
  { id: 'Tipis', label: 'Tipis' },
  { id: 'Sedang', label: 'Sedang' },
  { id: 'Tebal', label: 'Tebal' }
]

const SORT_OPTIONS = [
  { id: 'curated', label: 'Kurasi Terbaik' },
  { id: 'rating-desc', label: 'Rating Tertinggi' },
  { id: 'reviews-desc', label: 'Paling Populer' },
  { id: 'title-asc', label: 'Judul (A-Z)' }
]

export default function CatalogPage({
  onNavigateHome,
  onNavigateBookDetail,
  onNavigateAuthor,
  initialCategory = 'all',
  initialSearchQuery = ''
}) {
  // Source Mode: 'curated' | 'all-books'
  const [activeSource, setActiveSource] = useState(initialSearchQuery ? 'all-books' : 'curated')
  
  // Search State
  const [searchKeyword, setSearchKeyword] = useState(initialSearchQuery)
  const [appliedSearch, setAppliedSearch] = useState(initialSearchQuery)
  
  // Books State for All Books
  const [apiBooks, setApiBooks] = useState([])
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiTotal, setApiTotal] = useState(0)

  // State for filters (Koleksi Kurasi)
  const [selectedQuickCategory, setSelectedQuickCategory] = useState(initialCategory)
  const [selectedGenres, setSelectedGenres] = useState(['fiction', 'philosophy', 'classics'])
  const [selectedRating, setSelectedRating] = useState('4.5')
  const [selectedEra, setSelectedEra] = useState('all')
  const [selectedFormat, setSelectedFormat] = useState('all')
  const [selectedThickness, setSelectedThickness] = useState('Sedang')
  const [sortBy, setSortBy] = useState('curated')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1)

  // Update when external search query changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchKeyword(initialSearchQuery)
      setAppliedSearch(initialSearchQuery)
      setActiveSource('all-books')
    }
  }, [initialSearchQuery])

  // Fetch books when in all-books mode
  useEffect(() => {
    if (activeSource === 'all-books' && appliedSearch.trim()) {
      let isMounted = true
      setApiLoading(true)
      setApiError(null)

      searchBooksApi(appliedSearch, { page: currentPage, limit: 16 })
        .then((res) => {
          if (!isMounted) return
          setApiBooks(res.books || [])
          setApiTotal(res.total || 0)
          setApiLoading(false)
        })
        .catch((err) => {
          if (!isMounted) return
          console.error(err)
          setApiError('Gagal memuat buku. Silakan periksa koneksi internet Anda.')
          setApiLoading(false)
        })

      return () => {
        isMounted = false
      }
    }
  }, [activeSource, appliedSearch, currentPage])

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    const trimmed = searchKeyword.trim()
    setAppliedSearch(trimmed)
    setCurrentPage(1)
    if (trimmed) {
      setActiveSource('all-books')
    }
  }

  const handleClearSearch = () => {
    setSearchKeyword('')
    setAppliedSearch('')
    setActiveSource('curated')
  }

  // Reset filters to default state
  const handleResetFilters = () => {
    setSelectedQuickCategory('all')
    setSelectedGenres(['fiction', 'philosophy', 'classics'])
    setSelectedRating('4.5')
    setSelectedEra('all')
    setSelectedFormat('all')
    setSelectedThickness('Sedang')
    setSortBy('curated')
    setCurrentPage(1)
  }

  // Toggle genre checkbox
  const handleToggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    )
  }

  // Filtered & Sorted books for Curated Collection
  const filteredBooks = useMemo(() => {
    let result = [...CATALOG_BOOKS]

    // Apply search if active in curated mode
    if (appliedSearch) {
      const q = appliedSearch.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.description && b.description.toLowerCase().includes(q))
      )
    }

    // Quick category filter
    if (selectedQuickCategory !== 'all') {
      result = result.filter(
        (b) =>
          b.category === selectedQuickCategory ||
          (selectedQuickCategory === 'literary-fiction' && b.category === 'literary-fiction') ||
          (selectedQuickCategory === 'philosophy' && (b.category === 'philosophy' || b.category === 'non-fiction'))
      )
    }

    // Genre filter
    if (selectedGenres.length > 0 && selectedGenres.length < GENRE_CHECKBOXES.length) {
      result = result.filter((b) => selectedGenres.includes(b.genreKey))
    }

    // Rating filter
    if (selectedRating) {
      const min = parseFloat(selectedRating)
      result = result.filter((b) => b.rating >= min)
    }

    // Era filter
    if (selectedEra !== 'all') {
      result = result.filter((b) => b.era === selectedEra)
    }

    // Format filter
    if (selectedFormat !== 'all') {
      result = result.filter((b) => b.format === selectedFormat)
    }

    // Thickness filter
    if (selectedThickness) {
      result = result.filter((b) => b.thickness === selectedThickness)
    }

    // Sorting
    if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'reviews-desc') {
      result.sort((a, b) => {
        const countA = parseInt(a.reviewsCount.replace(/\D/g, ''), 10) || 0
        const countB = parseInt(b.reviewsCount.replace(/\D/g, ''), 10) || 0
        return countB - countA
      })
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [
    appliedSearch,
    selectedQuickCategory,
    selectedGenres,
    selectedRating,
    selectedEra,
    selectedFormat,
    selectedThickness,
    sortBy
  ])

  return (
    <div className="w-full bg-[#FAF7F2] text-[#1E2621] min-h-screen">
      <main className="max-w-[1280px] mx-auto flex flex-col items-center pb-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HEADER KATALOG & SEARCH BAR                                    */}
        {/* ========================================================================= */}
        <section className="w-full px-6 py-10 pb-6 flex flex-col items-start gap-6 max-w-[1280px]">
          {/* Header Title & Subtitle */}
          <div className="max-w-[768px] flex flex-col items-start gap-2 pt-1">
            <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
              Arsip &amp; Penjelajahan
            </span>

            <h1 className="font-serif text-[42px] sm:text-[48px] leading-[48px] tracking-[-1.2px] text-[#1E2621] font-normal">
              The Catalog
            </h1>

            <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[26px] text-[#666259]">
              Telusuri pilihan kurasi terbaik atau temukan berbagai karya literatur dari seluruh dunia.
            </p>
          </div>

          {/* Search Box Bar Utama */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-[720px] bg-[#FBF9F5] border border-[#E8E2D8] rounded-2xl p-2 sm:p-2.5 shadow-sm flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#1B2820]/20 transition-all"
          >
            <div className="pl-3 text-[#736E65]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari judul buku, nama penulis, topik..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1E2621] placeholder-[#8C867C] focus:outline-none"
            />
            {searchKeyword && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-1.5 text-[#8C867C] hover:text-[#1E2621] rounded-full hover:bg-[#EEE9E0] transition-colors"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1B2820] text-white text-xs sm:text-sm font-medium hover:bg-[#25392D] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Cari Buku</span>
            </button>
          </form>

          {/* Tab Pilihan: Koleksi Kurasi vs Jelajahi Semua Buku */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-[#ECE7DF] pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSource('curated')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeSource === 'curated'
                    ? 'bg-[#1B2820] text-white shadow-sm'
                    : 'bg-[#EEE9E0] text-[#4A4742] hover:bg-[#E5DFD4]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Koleksi Kurasi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveSource('all-books')
                  if (!appliedSearch) {
                    setAppliedSearch('Sastra Indonesia')
                    setSearchKeyword('Sastra Indonesia')
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeSource === 'all-books'
                    ? 'bg-[#1B2820] text-white shadow-sm'
                    : 'bg-[#EEE9E0] text-[#4A4742] hover:bg-[#E5DFD4]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Jelajahi Semua Buku</span>
              </button>
            </div>

            {appliedSearch && (
              <div className="flex items-center gap-2 text-xs font-sans text-[#736E65]">
                <span>Menampilkan untuk:</span>
                <span className="font-semibold text-[#1E2621] bg-[#EEE9E0] px-2.5 py-1 rounded-full">
                  "{appliedSearch}"
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-xs text-red-600 hover:underline cursor-pointer ml-1"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Pill Filter Cepat untuk Koleksi Kurasi */}
          {activeSource === 'curated' && (
            <div className="w-full flex flex-row flex-wrap items-center gap-2.5 pt-1">
              {QUICK_CATEGORIES.map((cat) => {
                const isActive = selectedQuickCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedQuickCategory(cat.id)}
                    className={`h-7 px-4 py-1.5 rounded-full font-sans text-[12px] leading-4 font-medium transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#1B2820] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                        : 'bg-[#EEE9E0] text-[#3D3A35] hover:bg-[#E5DFD4]'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: KONTEN BUKU                                                    */}
        {/* ========================================================================= */}
        {activeSource === 'all-books' ? (
          /* ================= TAMPILAN SEMUA BUKU ================= */
          <section className="w-full px-6 flex flex-col gap-6 max-w-[1280px]">
            {/* Status Info Bar */}
            <div className="w-full bg-[#FBF9F5] border border-[#E8E2D8] shadow-xs rounded-[12px] px-5 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-medium text-[17px] text-[#1E2621]">
                  Koleksi Buku
                </h3>
                <span className="font-sans text-xs text-[#8C867C]">
                  {apiLoading ? 'Memuat data...' : `Ditemukan ~${apiTotal} buku`}
                </span>
              </div>

              {/* View Toggle */}
              <div className="bg-[#EEE9E0] rounded-lg p-0.5 flex items-center">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#1E2621] shadow-xs' : 'text-[#736E65]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-[#1E2621] shadow-xs' : 'text-[#736E65]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Error Notification */}
            {apiError && (
              <div className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-900 text-sm">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Loading Skeleton */}
            {apiLoading && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] p-4 flex flex-col gap-3 animate-pulse h-[396px]"
                  >
                    <div className="w-full h-[230px] bg-[#E8E2D8] rounded-md" />
                    <div className="w-3/4 h-4 bg-[#E8E2D8] rounded mt-2" />
                    <div className="w-1/2 h-3 bg-[#E8E2D8] rounded" />
                    <div className="w-full h-px bg-[#E8E2D8] mt-auto" />
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-3 bg-[#E8E2D8] rounded" />
                      <div className="w-16 h-3 bg-[#E8E2D8] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!apiLoading && apiBooks.length === 0 && !apiError && (
              <div className="w-full py-16 px-6 bg-[#FBF9F5] border border-[#E8E2D8] rounded-2xl flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#EEE9E0] flex items-center justify-center text-[#736E65]">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1E2621]">Tidak Ada Buku Ditemukan</h3>
                <p className="text-sm text-[#736E65] max-w-md">
                  Tidak dapat menemukan buku dengan kata kunci "{appliedSearch}". Coba masukkan judul lain atau nama penulis terkenal seperti "Pramoedya Ananta Toer", "Sapardi Djoko Damono", atau "Murakami".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchKeyword('Pramoedya Ananta Toer')
                    setAppliedSearch('Pramoedya Ananta Toer')
                  }}
                  className="px-4 py-2 bg-[#1B2820] text-white text-xs font-medium rounded-lg hover:bg-[#25392D] transition-colors cursor-pointer"
                >
                  Coba Cari "Pramoedya Ananta Toer"
                </button>
              </div>
            )}

            {/* Grid / List Buku */}
            {!apiLoading && apiBooks.length > 0 && (
              viewMode === 'grid' ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                  {apiBooks.map((book) => (
                    <article
                      key={book.id}
                      onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id, book)}
                      className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-[410px]"
                    >
                      {/* Book Cover Container - Clean tanpa badge teknis */}
                      <div className="w-full bg-[#ECE7DF] p-4 h-[250px] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-[160px] h-[220px] object-cover rounded shadow-md transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Book Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="font-serif font-semibold text-[15px] leading-[20px] text-[#1E2621] line-clamp-2 group-hover:text-[#13241b]">
                            {book.title}
                          </h3>
                          <p className="font-sans text-[12px] text-[#736E65] line-clamp-1">
                            {book.author}
                          </p>
                          <span className="text-[10px] text-[#8C867C] mt-0.5">
                            {book.year} • {book.category}
                          </span>
                        </div>

                        {/* Rating info */}
                        <div className="border-t border-[#F0ECE4] pt-2 mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Star className="w-[12px] h-[12px] text-[#C98E28] fill-[#C98E28]" />
                            <span className="font-sans font-medium text-[12px] text-[#1E2621]">
                              {book.rating}
                            </span>
                          </div>
                          <span className="font-sans text-[11px] text-[#8C867C]">
                            {book.reviewsCount} ulasan
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="w-full flex flex-col gap-4">
                  {apiBooks.map((book) => (
                    <article
                      key={book.id}
                      onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id, book)}
                      className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-row group cursor-pointer transition-all duration-300 hover:shadow-md p-4 gap-6 items-center"
                    >
                      <div className="w-24 h-32 bg-[#ECE7DF] rounded-md p-2 flex items-center justify-center flex-shrink-0">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover rounded shadow-xs"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#8C867C]">{book.year}</span>
                          <span className="text-[11px] text-[#8C867C]">• {book.category}</span>
                        </div>
                        <h3 className="font-serif font-semibold text-lg text-[#1E2621] group-hover:text-[#13241b]">
                          {book.title}
                        </h3>
                        <p className="font-sans text-xs text-[#736E65]">Oleh {book.author}</p>
                        <p className="font-sans text-xs text-[#666259] line-clamp-2 mt-1">
                          {book.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 pr-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#C98E28] fill-[#C98E28]" />
                          <span className="font-sans font-medium text-sm text-[#1E2621]">
                            {book.rating}
                          </span>
                        </div>
                        <span className="font-sans text-xs text-[#8C867C]">
                          {book.reviewsCount} ulasan
                        </span>
                        <button
                          type="button"
                          className="mt-2 text-xs font-medium text-white bg-[#1B2820] px-3.5 py-1.5 rounded-lg hover:bg-[#25392D] transition-colors"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )
            )}

            {/* Paginasi */}
            {!apiLoading && apiBooks.length > 0 && (
              <div className="w-full mt-6 bg-[#FBF9F5] border border-[#E8E2D8] shadow-xs rounded-[12px] px-6 py-4 flex justify-between items-center">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg bg-[#EEE9E0] text-xs font-medium text-[#1E2621] hover:bg-[#E5DFD4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Halaman Sebelumnya</span>
                </button>
                <span className="text-xs text-[#736E65] font-sans">
                  Halaman <span className="font-semibold text-[#1E2621]">{currentPage}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg bg-[#1B2820] text-xs font-medium text-white hover:bg-[#25392D] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Halaman Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        ) : (
          /* ================= TAMPILAN KURASI LOKAL BOOKLY ================= */
          <section className="w-full px-6 flex flex-col lg:flex-row items-start gap-8 max-w-[1280px]">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-[288px] flex-shrink-0 bg-[#FBF9F5] border border-[#E8E2D8] shadow-xs rounded-[12px] p-6 flex flex-col gap-6">
              <div className="w-full border-b border-[#ECE7DF] pb-3 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <SlidersHorizontal className="w-[15px] h-[15px] text-[#1B2820]" />
                  <h2 className="font-serif font-medium text-[18px] leading-7 text-[#1E2621]">
                    Filter Kurasi
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-sans font-normal text-[12px] leading-4 text-[#736E65] underline hover:text-[#1E2621] transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Genre Filter */}
              <div className="w-full flex flex-col gap-3">
                <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
                  Genre &amp; Tradisi
                </span>
                <div className="flex flex-col gap-2">
                  {GENRE_CHECKBOXES.map((item) => {
                    const isChecked = selectedGenres.includes(item.id)
                    return (
                      <label
                        key={item.id}
                        onClick={() => handleToggleGenre(item.id)}
                        className="flex flex-row justify-between items-center cursor-pointer select-none py-0.5 group"
                      >
                        <div className="flex flex-row items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#1B2820] border-[#1B2820] text-white'
                                : 'border-[#C4BEB3] bg-white group-hover:border-[#1B2820]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                          </div>
                          <span className="font-sans text-[13px] text-[#38342E] group-hover:text-[#1E2621]">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-sans text-[12px] text-[#8C867C]">{item.count}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
                <span className="font-sans font-semibold text-[12px] uppercase text-[#736E65]">
                  Rating Pembaca
                </span>
                <div className="flex flex-col gap-1.5">
                  {RATING_OPTIONS.map((item) => {
                    const isSelected = selectedRating === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedRating(item.id)}
                        className={`w-full h-7 px-3 rounded-lg flex justify-between items-center transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#1B2820] text-white' : 'text-[#38342E] hover:bg-[#EEE9E0]/50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Star className={`w-3.5 h-3.5 ${isSelected ? 'fill-white text-white' : 'fill-[#C98E28] text-[#C98E28]'}`} />
                          <span className="font-sans text-[12px]">{item.label}</span>
                        </div>
                        <span className={`text-[12px] ${isSelected ? 'text-white' : 'text-[#8C867C]'}`}>{item.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Format Penjilidan */}
              <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
                <span className="font-sans font-semibold text-[12px] uppercase text-[#736E65]">
                  Format Penjilidan
                </span>
                <div className="flex flex-row flex-wrap gap-2">
                  {FORMAT_OPTIONS.map((item) => {
                    const isSelected = selectedFormat === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedFormat(item.id)}
                        className={`h-7 px-3 rounded-lg font-sans text-[12px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1B2820] text-white font-medium'
                            : 'bg-[#EEE9E0] text-[#38342E] hover:bg-[#E5DFD4]'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Kolom Kanan: Grid Buku Kurasi */}
            <div className="w-full lg:w-[912px] flex-1 flex flex-col">
              {/* Header Bar Kurasi */}
              <div className="w-full bg-[#FBF9F5] border border-[#E8E2D8] shadow-xs rounded-[12px] px-5 py-3 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-medium text-[18px] text-[#1E2621]">
                    Menampilkan Buku
                  </h3>
                  <span className="font-sans text-[12px] text-[#8C867C]">
                    {filteredBooks.length} buku tersedia
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[12px] text-[#736E65]">Urutkan:</span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                        className="h-7 px-3 bg-[#EEE9E0] rounded-lg font-sans text-[12px] text-[#26221F] flex items-center gap-2 cursor-pointer hover:bg-[#E5DFD4] transition-colors"
                      >
                        <span>{SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Kurasi Terbaik'}</span>
                        <ChevronDown className="w-3 h-3 text-[#736E65]" />
                      </button>
                      {sortDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E8E2D8] rounded-lg shadow-md py-1 z-30">
                          {SORT_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSortBy(opt.id)
                                setSortDropdownOpen(false)
                              }}
                              className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between ${
                                sortBy === opt.id ? 'bg-[#FAF7F2] text-[#1E2621] font-medium' : 'text-[#524E47] hover:bg-[#FAF7F2]'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {sortBy === opt.id && <Check className="w-3 h-3 text-[#1B2820]" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#EEE9E0] rounded-lg p-0.5 flex items-center">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-1 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#1E2621] shadow-xs' : 'text-[#736E65]'}`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-1 rounded cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#1E2621] shadow-xs' : 'text-[#736E65]'}`}
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid Buku Kurasi */}
              {viewMode === 'grid' ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                  {filteredBooks.map((book) => (
                    <article
                      key={book.id}
                      onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id, book)}
                      className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-[396.75px]"
                    >
                      <div className="w-full bg-[#ECE7DF] p-4 h-[263.75px] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-[179px] h-[231.75px] object-cover rounded shadow-xs transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="font-serif font-semibold text-[16px] leading-[22px] text-[#1E2621] line-clamp-2 group-hover:text-[#13241b] transition-colors">
                            {book.title}
                          </h3>
                          <p
                            onClick={(e) => {
                              if (book.authorId && onNavigateAuthor) {
                                e.stopPropagation()
                                onNavigateAuthor(book.authorId)
                              }
                            }}
                            className="font-sans font-normal text-[12px] text-[#736E65] hover:underline"
                          >
                            {book.author}
                          </p>
                        </div>
                        <div className="border-t border-[#F0ECE4] pt-2 mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Star className="w-[12px] h-[12px] text-[#C98E28] fill-[#C98E28]" />
                            <span className="font-sans font-medium text-[12px] text-[#1E2621]">
                              {book.rating}
                            </span>
                          </div>
                          <span className="font-sans text-[12px] text-[#8C867C]">
                            {book.reviewsCount}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="w-full flex flex-col gap-4">
                  {filteredBooks.map((book) => (
                    <article
                      key={book.id}
                      onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id, book)}
                      className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-row group cursor-pointer transition-all duration-300 hover:shadow-md p-4 gap-6 items-center"
                    >
                      <div className="w-24 h-32 bg-[#ECE7DF] rounded-md p-2 flex items-center justify-center flex-shrink-0">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover rounded shadow-xs" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C867C]">
                            {book.categoryLabel || 'Fiksi Sastra'}
                          </span>
                          <span className="text-[11px] text-[#8C867C]">• {book.format}</span>
                          <span className="text-[11px] text-[#8C867C]">• {book.pages} hlm</span>
                        </div>
                        <h3 className="font-serif font-semibold text-lg text-[#1E2621] group-hover:text-[#13241b]">
                          {book.title}
                        </h3>
                        <p className="font-sans text-xs text-[#736E65]">Oleh {book.author}</p>
                        <p className="font-sans text-xs text-[#666259] line-clamp-2 mt-1">
                          {book.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 pr-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#C98E28] fill-[#C98E28]" />
                          <span className="font-sans font-medium text-sm text-[#1E2621]">{book.rating}</span>
                        </div>
                        <span className="font-sans text-xs text-[#8C867C]">{book.reviewsCount} ulasan</span>
                        <button
                          type="button"
                          className="mt-2 text-xs font-medium text-[#1E2621] bg-[#EEE9E0] px-3 py-1.5 rounded-lg group-hover:bg-[#1B2820] group-hover:text-white transition-colors"
                        >
                          Detail Buku
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#ECE7DF] py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans font-normal text-[12px] leading-4 text-[#736E65]">
            © 2026 Bookly Media Nusantara. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-row items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[12px] text-[#736E65] hover:text-[#1E2621] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[12px] text-[#736E65] hover:text-[#1E2621] transition-colors">
              Syarat &amp; Ketentuan
            </a>
            <a href="#contact" onClick={(e) => e.preventDefault()} className="text-[12px] text-[#736E65] hover:text-[#1E2621] transition-colors">
              Bantuan &amp; Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
