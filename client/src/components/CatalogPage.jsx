import React, { useState, useMemo, useEffect } from 'react'
import { booksApi, categoriesApi } from '../services/api'
import {
  SlidersHorizontal,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import { CATALOG_BOOKS } from '../data/mockData'

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
  initialCategory = 'all'
}) {
  // State for filters
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
  const [categoriesList, setCategoriesList] = useState(QUICK_CATEGORIES)
  const [apiBooks, setApiBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Ambil 7 kategori tetap dari GET /api/categories sesuai server/API.md
  useEffect(() => {
    let isMounted = true
    categoriesApi.getCategories().then((cats) => {
      if (isMounted && Array.isArray(cats) && cats.length > 0) {
        setCategoriesList(cats)
      }
    }).catch((err) => {
      console.warn('Gagal memuat kategori dari API, fallback ke QUICK_CATEGORIES:', err)
    })
    return () => { isMounted = false }
  }, [])

  // Ambil daftar buku dari GET /api/books (page, limit, category, sort)
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    const apiSort = sortBy === 'rating-desc' ? 'rating' : (sortBy === 'title-asc' ? 'title' : 'newest')
    booksApi.getBooks({
      category: selectedQuickCategory !== 'all' ? selectedQuickCategory : null,
      sort: apiSort,
      limit: 50
    }).then((res) => {
      if (isMounted) {
        if (res && res.books && res.books.length > 0) {
          setApiBooks(res.books)
        } else {
          setApiBooks(CATALOG_BOOKS)
        }
        setIsLoading(false)
      }
    }).catch((err) => {
      console.warn('Gagal memuat buku dari API, fallback ke CATALOG_BOOKS:', err)
      if (isMounted) {
        setApiBooks(CATALOG_BOOKS)
        setIsLoading(false)
      }
    })
    return () => { isMounted = false }
  }, [selectedQuickCategory, sortBy])

  // Reset filters to default state matching Figma spec
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

  // Filtered & Sorted books
  const filteredBooks = useMemo(() => {
    const sourceBooks = apiBooks.length > 0 ? apiBooks : CATALOG_BOOKS
    let result = [...sourceBooks]

    // Quick category filter
    if (selectedQuickCategory !== 'all') {
      result = result.filter(
        (b) =>
          b.category === selectedQuickCategory ||
          b.genreKey === selectedQuickCategory ||
          b.categoryLabel?.toLowerCase() === selectedQuickCategory.toLowerCase() ||
          (selectedQuickCategory === 'literary-fiction' && (b.category === 'literary-fiction' || b.categoryLabel === 'Fiksi Sastra')) ||
          (selectedQuickCategory === 'philosophy' && (b.category === 'philosophy' || b.category === 'non-fiction' || b.categoryLabel?.includes('Filsafat')))
      )
    }

    // Genre filter (only apply if some are selected)
    if (selectedGenres.length > 0 && selectedGenres.length < GENRE_CHECKBOXES.length) {
      result = result.filter((b) => {
        if (b.genreKey) return selectedGenres.includes(b.genreKey)
        return true
      })
    }

    // Rating filter
    if (selectedRating) {
      const min = parseFloat(selectedRating)
      result = result.filter((b) => b.rating >= min)
    }

    // Era filter
    if (selectedEra !== 'all') {
      result = result.filter((b) => !b.era || b.era === selectedEra)
    }

    // Format filter
    if (selectedFormat !== 'all') {
      result = result.filter((b) => !b.format || b.format === selectedFormat)
    }

    // Thickness filter
    if (selectedThickness) {
      result = result.filter((b) => !b.thickness || b.thickness === selectedThickness)
    }

    // Sorting
    if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    const fallbackList = apiBooks.length > 0 ? apiBooks : CATALOG_BOOKS
    return result.length > 0 ? result : fallbackList
  }, [
    apiBooks,
    selectedQuickCategory,
    selectedGenres,
    selectedRating,
    selectedEra,
    selectedFormat,
    selectedThickness,
    sortBy
  ])

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2E2722] min-h-screen">
      <main className="max-w-[1280px] mx-auto flex flex-col items-center pb-20">
        
        {/* ========================================================================= */}
        {/* SECTION 2: HEADER KATALOG & FILTER KATEGORI PILL                          */}
        {/* ========================================================================= */}
        <section className="w-full px-6 py-10 pb-8 flex flex-col items-start gap-7 max-w-[1280px]">
          {/* Header Title & Subtitle */}
          <div className="max-w-[768px] flex flex-col items-start gap-2 pt-1">
            <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
              Arsip &amp; Kurasi
            </span>

            <h1 className="font-serif text-[42px] sm:text-[48px] leading-[48px] tracking-[-1.2px] text-[#2E2722] font-normal">
              The Catalog
            </h1>

            <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[26px] text-[#666259]">
              Telusuri kurasi karya sastra terpilih, kumpulan esai kontemplatif, dan mahakarya pemikiran yang abadi.
            </p>
          </div>

          {/* Pill Filter Cepat Sesuai Gambar Referensi */}
          <div className="w-full flex flex-row flex-wrap items-center gap-2.5 pt-1">
            {(categoriesList.length > 0 ? categoriesList : QUICK_CATEGORIES).map((cat) => {
              const catKey = cat.slug || cat.id
              const catLabel = cat.label || cat.category_name
              const isActive = selectedQuickCategory === catKey
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedQuickCategory(catKey)}
                  className={`h-7 px-4 py-1.5 rounded-full font-sans text-[12px] leading-4 font-medium transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-[#483E37] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                      : 'bg-[#EEE9E0] text-[#3D3A35] hover:bg-[#E5DFD4]'
                  }`}
                >
                  {catLabel}
                </button>
              )
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: STRUKTUR KATALOG (2-KOLOM: SIDEBAR FILTER & BOOK GRID)          */}
        {/* ========================================================================= */}
        <section className="w-full px-6 flex flex-col lg:flex-row items-start gap-8 max-w-[1280px]">
          
          {/* ----------------------------------------------------------------------- */}
          {/* ASIDE - Kolom Kiri: Sidebar Filter Rapi & Minimalis                      */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="w-full lg:w-[288px] flex-shrink-0 bg-[#FBF9F5] border border-[#E8E2D8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] p-6 flex flex-col gap-6">
            
            {/* Sidebar Header: Filter Title & Reset */}
            <div className="w-full border-b border-[#ECE7DF] pb-3 flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <SlidersHorizontal className="w-[15px] h-[15px] text-[#483E37]" />
                <h2 className="font-serif font-medium text-[18px] leading-7 text-[#2E2722]">
                  Filter
                </h2>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-sans font-normal text-[12px] leading-4 text-[#736E65] underline hover:text-[#2E2722] transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Filter 1: Genre & Tradisi */}
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
                          className={`w-[18px] h-[18px] rounded flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#483E37] text-white'
                              : 'bg-white border border-[#CEC6B8] group-hover:border-[#483E37]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                        </div>
                        <span className="font-sans text-[14px] leading-5 text-[#38342E]">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-sans text-[12px] leading-4 text-[#8C867C]">
                        {item.count}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Filter 2: Taraf Kurasi (Rating) */}
            <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
              <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
                Taraf Kurasi
              </span>

              <div className="flex flex-col gap-1.5">
                {RATING_OPTIONS.map((item) => {
                  const isSelected = selectedRating === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRating(item.id)}
                      className={`w-full h-8 px-2 rounded-lg flex flex-row justify-between items-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#EEE9E0]/80'
                          : 'hover:bg-[#EEE9E0]/40'
                      }`}
                    >
                      <div className="flex flex-row items-center gap-1.5">
                        <span
                          className={`font-sans text-[12px] leading-4 ${
                            isSelected
                              ? 'font-medium text-[#2E2722]'
                              : 'font-normal text-[#524E47]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`font-sans text-[12px] leading-4 ${
                          isSelected ? 'text-[#736E65]' : 'text-[#8C867C]'
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter 3: Era Penerbitan */}
            <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
              <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
                Era Penerbitan
              </span>

              <div className="flex flex-col gap-1.5">
                {ERA_OPTIONS.map((item) => {
                  const isSelected = selectedEra === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedEra(item.id)}
                      className={`w-full h-7 px-3 rounded-lg flex flex-row justify-between items-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#483E37] text-white'
                          : 'text-[#38342E] hover:bg-[#EEE9E0]/50'
                      }`}
                    >
                      <span
                        className={`font-sans text-[12px] leading-4 ${
                          isSelected ? 'font-medium text-white' : 'font-normal text-[#38342E]'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isSelected ? (
                        <Check className="w-3 h-3 text-white stroke-[2.5]" />
                      ) : (
                        <span className="font-sans text-[12px] leading-4 text-[#8C867C]">
                          {item.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter 4: Format Penjilidan */}
            <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
              <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
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
                      className={`h-7 px-3 rounded-lg font-sans text-[12px] leading-4 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#483E37] text-white font-medium'
                          : 'bg-[#EEE9E0] text-[#38342E] font-normal hover:bg-[#E5DFD4]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter 5: Ketebalan Buku */}
            <div className="w-full border-t border-[#ECE7DF] pt-3 flex flex-col gap-3">
              <span className="font-sans font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#736E65]">
                Ketebalan Buku
              </span>

              <div className="w-full flex flex-row gap-1.5">
                {THICKNESS_OPTIONS.map((item) => {
                  const isSelected = selectedThickness === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedThickness(item.id)}
                      className={`flex-1 h-7 rounded-lg font-sans text-[12px] leading-4 transition-colors cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#483E37] text-white font-medium'
                          : 'bg-[#EEE9E0] text-[#38342E] font-normal hover:bg-[#E5DFD4]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* KOLOM KANAN: Header Grid, Buku-Buku, & Paginasi                          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="w-full lg:w-[912px] flex-1 flex flex-col">
            
            {/* Bar Informasi & Pengurutan */}
            <div className="w-full bg-[#FBF9F5] border border-[#E8E2D8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] px-5 py-3 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              {/* Left text */}
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-serif font-medium text-[18px] leading-7 text-[#2E2722]">
                  Menampilkan Buku
                </h3>
                <span className="font-sans text-[12px] leading-4 text-[#8C867C]">
                  1 - {filteredBooks.length} dari 96 buku
                </span>
              </div>

              {/* Right controls */}
              <div className="flex flex-row items-center gap-4">
                {/* Sort dropdown */}
                <div className="flex flex-row items-center gap-2">
                  <span className="font-sans text-[12px] leading-4 text-[#736E65]">
                    Urutkan:
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      className="h-7 px-3 bg-[#EEE9E0] rounded-lg font-sans text-[12px] text-[#26221F] flex items-center gap-2 cursor-pointer hover:bg-[#E5DFD4] transition-colors"
                    >
                      <span>
                        {SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Kurasi Terbaik'}
                      </span>
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
                              sortBy === opt.id
                                ? 'bg-[#FAF7F2] text-[#2E2722] font-medium'
                                : 'text-[#524E47] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {sortBy === opt.id && <Check className="w-3 h-3 text-[#483E37]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* View toggle (Grid / List) */}
                <div className="bg-[#EEE9E0] rounded-lg p-0.5 flex items-center">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Tampilan Grid"
                    className={`p-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#2E2722] shadow-xs'
                        : 'text-[#736E65] hover:text-[#2E2722]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="Tampilan Daftar"
                    className={`p-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white text-[#2E2722] shadow-xs'
                        : 'text-[#736E65] hover:text-[#2E2722]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Kartu Buku */}
            {viewMode === 'grid' ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                {filteredBooks.map((book) => (
                  <article
                    key={book.id}
                    onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id)}
                    className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-[396.75px]"
                  >
                    {/* Background Book Cover Preview */}
                    <div className="w-full bg-[#ECE7DF] p-4 h-[263.75px] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-[179px] h-[231.75px] object-cover rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>

                    {/* Book Information */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      {/* Title & Author */}
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-serif font-semibold text-[16px] leading-[22px] text-[#2E2722] line-clamp-2 group-hover:text-[#3D342E] transition-colors">
                          {book.title}
                        </h3>
                        <p 
                          onClick={(e) => {
                            if (book.authorId && onNavigateAuthor) {
                              e.stopPropagation()
                              onNavigateAuthor(book.authorId)
                            }
                          }}
                          className="font-sans font-normal text-[12px] leading-4 text-[#736E65] hover:underline"
                        >
                          {book.author}
                        </p>
                      </div>

                      {/* Divider & Rating info */}
                      <div className="border-t border-[#F0ECE4] pt-2 mt-auto flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-1">
                          <span className="font-sans font-medium text-[12px] leading-4 text-[#2E2722]">
                            Rating {book.rating}
                          </span>
                        </div>
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#8C867C]">
                          {book.reviewsCount}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* List View fallback */
              <div className="w-full flex flex-col gap-4">
                {filteredBooks.map((book) => (
                  <article
                    key={book.id}
                    onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id)}
                    className="box-border bg-[#FBF9F5] border border-[#E8E2D8] rounded-[12px] overflow-hidden flex flex-row group cursor-pointer transition-all duration-300 hover:shadow-md p-4 gap-6 items-center"
                  >
                    <div className="w-24 h-32 bg-[#ECE7DF] rounded-md p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover rounded shadow-xs"
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C867C]">
                          {book.categoryLabel || 'Fiksi Sastra'}
                        </span>
                        <span className="text-[11px] text-[#8C867C]">• {book.format}</span>
                        <span className="text-[11px] text-[#8C867C]">• {book.pages} hlm</span>
                      </div>

                      <h3 className="font-serif font-semibold text-lg text-[#2E2722] group-hover:text-[#3D342E]">
                        {book.title}
                      </h3>
                      <p className="font-sans text-xs text-[#736E65]">Oleh {book.author}</p>
                      <p className="font-sans text-xs text-[#666259] line-clamp-2 mt-1">
                        {book.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 pr-2">
                      <div className="flex items-center gap-1">
                        <span className="font-sans font-medium text-sm text-[#2E2722]">
                          Rating {book.rating}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-[#8C867C]">
                        {book.reviewsCount} ulasan
                      </span>
                      <button
                        type="button"
                        className="mt-2 text-xs font-medium text-[#2E2722] bg-[#EEE9E0] px-3 py-1.5 rounded-lg group-hover:bg-[#483E37] group-hover:text-white transition-colors"
                      >
                        Detail Buku
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Paginasi Minimalis Bersih */}
            <div className="w-full mt-10 bg-[#FBF9F5] border border-[#E8E2D8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Page buttons */}
              <div className="flex flex-row items-center gap-1">
                <button
                  type="button"
                  aria-label="Halaman sebelumnya"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg bg-[#EEE9E0] flex items-center justify-center text-[#736E65] hover:bg-[#E5DFD4] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[14px] leading-5 transition-colors cursor-pointer ${
                    currentPage === 1
                      ? 'bg-[#483E37] text-white font-medium'
                      : 'text-[#524E47] hover:bg-[#EEE9E0]'
                  }`}
                >
                  1
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[14px] leading-5 transition-colors cursor-pointer ${
                    currentPage === 2
                      ? 'bg-[#483E37] text-white font-medium'
                      : 'text-[#524E47] hover:bg-[#EEE9E0]'
                  }`}
                >
                  2
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[14px] leading-5 transition-colors cursor-pointer ${
                    currentPage === 3
                      ? 'bg-[#483E37] text-white font-medium'
                      : 'text-[#524E47] hover:bg-[#EEE9E0]'
                  }`}
                >
                  3
                </button>

                <span className="px-2 font-sans text-[14px] text-[#8C867C]">...</span>

                <button
                  type="button"
                  onClick={() => setCurrentPage(12)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[14px] leading-5 transition-colors cursor-pointer ${
                    currentPage === 12
                      ? 'bg-[#483E37] text-white font-medium'
                      : 'text-[#524E47] hover:bg-[#EEE9E0]'
                  }`}
                >
                  12
                </button>

                <button
                  type="button"
                  aria-label="Halaman berikutnya"
                  onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                  className="w-8 h-8 rounded-lg bg-[#EEE9E0] flex items-center justify-center text-[#38342E] hover:bg-[#E5DFD4] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Next Page / Load More button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => (p < 12 ? p + 1 : 1))}
                className="h-8 px-5 rounded-lg bg-[#EEE9E0] hover:bg-[#E5DFD4] transition-colors flex flex-row items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#2E2722]" />
                <span className="font-sans font-medium text-[12px] leading-4 text-[#2E2722]">
                  Halaman Selanjutnya
                </span>
              </button>
            </div>

          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#ECE7DF] py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans font-normal text-[12px] leading-4 text-[#736E65]">
            © 2026 Bookly Media Nusantara. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-row items-center gap-6">
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              className="font-sans font-normal text-[12px] leading-4 text-[#736E65] hover:text-[#2E2722] transition-colors"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              className="font-sans font-normal text-[12px] leading-4 text-[#736E65] hover:text-[#2E2722] transition-colors"
            >
              Syarat &amp; Ketentuan
            </a>
            <a
              href="#contact"
              onClick={(e) => e.preventDefault()}
              className="font-sans font-normal text-[12px] leading-4 text-[#736E65] hover:text-[#2E2722] transition-colors"
            >
              Bantuan &amp; Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
