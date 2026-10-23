import React, { useState } from 'react'
import {
  ChevronRight,
  Star,
  Bookmark,
  Share2,
  BookOpen,
  ThumbsUp,
  AlertCircle,
  MessageSquarePlus,
  Check,
  X,
  Heart,
  Calendar,
  Layers,
  Building,
  Hash,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'
import { BOOK_DETAILS } from '../data/mockData'

export default function BookDetailPage({ 
  book = BOOK_DETAILS, 
  onNavigateHome, 
  onNavigateCategory,
  onNavigateRegister 
}) {
  // Reading status state
  const [readingStatus, setReadingStatus] = useState('want_to_read') // 'want_to_read', 'reading', 'finished'
  const [isSaved, setIsSaved] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Reviews state
  const [reviewsList, setReviewsList] = useState(book.reviews || [])
  const [sortBy, setSortBy] = useState('newest')
  const [showSpoilers, setShowSpoilers] = useState(false)
  const [revealedSpoilers, setRevealedSpoilers] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  // Write Review Modal state
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    content: '',
    hasSpoiler: false,
  })

  // Show temporary toast notification
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3200)
  }

  // Handle Save / Bookmark button
  const handleToggleSave = () => {
    const nextSaved = !isSaved
    setIsSaved(nextSaved)
    showToast(nextSaved ? 'Buku berhasil disimpan ke rak pribadimu.' : 'Buku dihapus dari rak.')
  }

  // Handle Share button
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
    }
    showToast('Tautan buku berhasil disalin ke papan klip.')
  }

  // Handle change reading status
  const handleChangeReadingStatus = (status) => {
    setReadingStatus(status)
    const labels = {
      want_to_read: 'Disimpan ke "Ingin Dibaca"',
      reading: 'Ditandai "Sedang Dibaca"',
      finished: 'Ditandai "Selesai Dibaca"',
    }
    showToast(labels[status] || 'Status diperbarui.')
  }

  // Handle Helpful / Likes on review
  const handleLikeReview = (reviewId) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1, userLiked: true } : r))
    )
    showToast('Terima kasih atas tanggapan Anda!')
  }

  // Toggle reveal spoiler for specific review
  const toggleRevealSpoiler = (reviewId) => {
    setRevealedSpoilers((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }

  // Handle Review submission
  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.content.trim()) return

    const created = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim(),
      role: 'PEMBACA TERVERIFIKASI',
      avatar: newReview.name.trim().charAt(0).toUpperCase() || 'P',
      rating: newReview.rating,
      date: 'Baru saja',
      content: newReview.content.trim(),
      likes: 0,
      hasSpoiler: newReview.hasSpoiler,
      spoilerLabel: 'MENGANDUNG SPOILER',
    }

    setReviewsList([created, ...reviewsList])
    setShowReviewModal(false)
    setNewReview({ name: '', rating: 5, content: '', hasSpoiler: false })
    showToast('Ulasan Anda telah berhasil diterbitkan!')
  }

  // Filter and sort reviews
  const sortedReviews = [...reviewsList].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating
    if (sortBy === 'lowest') return a.rating - b.rating
    if (sortBy === 'helpful') return b.likes - a.likes
    return 0 // default order (newest)
  })

  return (
    <div className="w-full bg-[#FCF9F3] text-[#1C1C18] antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#192F23] text-white px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 font-sans text-sm animate-fade-in border border-[#FABA75]/30">
          <Check className="w-4 h-4 text-[#FABA75] flex-shrink-0" />
          <span>{toastMessage}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage('')}
            className="ml-2 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container: 1280px max width */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB NAVIGATION                                                  */}
        {/* ========================================================================= */}
        <nav aria-label="Breadcrumb" className="py-4 mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs sm:text-[13px] text-[#424844]">
            <li>
              <button 
                type="button" 
                onClick={onNavigateHome}
                className="hover:text-[#192F23] transition-colors cursor-pointer"
              >
                Beranda
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#424844]/60" />
            </li>
            <li>
              <a href="#collections" className="hover:text-[#192F23] transition-colors">
                Koleksi
              </a>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#424844]/60" />
            </li>
            <li>
              <span className="hover:text-[#192F23] transition-colors">
                {book.category || 'Fiksi Sastra'}
              </span>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#424844]/60" />
            </li>
            <li className="font-medium text-[#1C1C18] truncate max-w-[200px] sm:max-w-none">
              {book.title}
            </li>
          </ol>
        </nav>


        {/* ========================================================================= */}
        {/* 2. UPPER SECTION: BOOK OVERVIEW                                           */}
        {/* ========================================================================= */}
        <section aria-label="Book Overview" className="mb-20">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            
            {/* ----------------- LEFT: Book Cover & Quick Actions ----------------- */}
            <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col items-center">
              
              {/* Cover Card Box with #F6F3ED Background & Shadow */}
              <div className="relative w-full bg-[#F6F3ED] rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30 p-8 sm:p-10 flex flex-col items-center">
                
                {/* Availability Badge on Top Right */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#DCE5DF] rounded-full">
                  <span className="font-sans font-medium text-[11px] tracking-[0.55px] uppercase text-[#151D1A]">
                    {book.availability || 'TERSEDIA'}
                  </span>
                </div>

                {/* 3D-styled Elevated Book Cover */}
                <div className="relative w-[220px] sm:w-[256px] h-[330px] sm:h-[384px] bg-[#E5E2DC] rounded shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden group">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Spine Shadow Vignette */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Two Quick Action Buttons Below Cover */}
                <div className="grid grid-cols-2 gap-3 w-full mt-8">
                  {/* Button 1: Simpan ke Rak / Tambah ke Daftar */}
                  <button
                    type="button"
                    onClick={handleToggleSave}
                    className={`h-[68px] px-3 py-2 bg-[#FCF9F3] hover:bg-white border rounded transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group ${
                      isSaved ? 'border-[#192F23] bg-white shadow-sm' : 'border-[#C2C8C2]'
                    }`}
                  >
                    <Bookmark 
                      className={`w-4 h-4 transition-colors ${
                        isSaved ? 'fill-[#192F23] text-[#192F23]' : 'text-[#1C1C18] group-hover:text-[#192F23]'
                      }`} 
                    />
                    <span className="font-sans font-medium text-xs sm:text-[13px] tracking-[0.65px] text-[#1C1C18] leading-tight">
                      {isSaved ? 'Tersimpan di Rak' : 'Tambah ke Daftar'}
                    </span>
                  </button>

                  {/* Button 2: Bagikan Buku */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="h-[68px] px-3 py-2 bg-[#FCF9F3] hover:bg-white border border-[#C2C8C2] rounded transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group hover:border-[#192F23]/60"
                  >
                    <Share2 className="w-4 h-4 text-[#1C1C18] group-hover:text-[#192F23] transition-colors" />
                    <span className="font-sans font-medium text-xs sm:text-[13px] tracking-[0.65px] text-[#1C1C18] leading-tight">
                      Bagikan Buku
                    </span>
                  </button>
                </div>

              </div>

              {/* Reading Status Selector Dropdown */}
              <div className="w-full mt-4 bg-[#F6F3ED] border border-[#C2C8C2]/30 rounded-lg p-3 flex items-center justify-between text-xs font-sans">
                <span className="text-[#424844] font-medium">Status Membaca:</span>
                <select
                  value={readingStatus}
                  onChange={(e) => handleChangeReadingStatus(e.target.value)}
                  className="bg-[#FCF9F3] border border-[#C2C8C2]/60 rounded px-2.5 py-1.5 text-[#192F23] font-medium focus:outline-none focus:border-[#192F23] cursor-pointer"
                >
                  <option value="want_to_read">Ingin Dibaca</option>
                  <option value="reading">Sedang Dibaca</option>
                  <option value="finished">Selesai Dibaca</option>
                </select>
              </div>

            </div>


            {/* ----------------- RIGHT: Details & Synopsis ----------------- */}
            <div className="flex-1 w-full flex flex-col">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#DCE5DF] rounded-full font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#151D1A]">
                  {book.badges ? book.badges[0] : 'FIKSI SASTRA'}
                </span>
                <span className="px-3 py-1 bg-[#EEDCD5] rounded-full font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#6D605A]">
                  {book.badges && book.badges[1] ? book.badges[1] : 'BESTSELLER'}
                </span>
                <span className="px-3 py-1 bg-[#F0EEE8] rounded-full font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844]">
                  {book.format || 'HARDCOVER'}
                </span>
              </div>

              {/* Book Title */}
              <h1 className="font-serif font-medium text-3xl sm:text-4xl lg:text-[42px] lg:leading-[48px] text-[#192F23] tracking-tight mb-2">
                {book.title}
              </h1>

              {/* Author */}
              <p className="font-sans font-normal text-base sm:text-lg text-[#424844] mb-6">
                Oleh <span className="text-[#1C1C18] font-medium">{book.author}</span>
              </p>

              {/* Metadata Grid (Halaman, Penerbit, Terbit, ISBN) */}
              <div className="py-4 my-2 border-y border-[#C2C8C2]/30 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {/* Halaman */}
                <div className="flex flex-col">
                  <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844] mb-1">
                    HALAMAN
                  </span>
                  <span className="font-sans font-medium text-base text-[#1C1C18]">
                    {book.pages || '384 Hlm'}
                  </span>
                </div>

                {/* Penerbit */}
                <div className="flex flex-col">
                  <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844] mb-1">
                    PENERBIT
                  </span>
                  <span className="font-sans font-medium text-base text-[#1C1C18]">
                    {book.publisher || 'Archipelago Press'}
                  </span>
                </div>

                {/* Terbit */}
                <div className="flex flex-col">
                  <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844] mb-1">
                    TERBIT
                  </span>
                  <span className="font-sans font-medium text-base text-[#1C1C18]">
                    {book.publishYear || '2026'}
                  </span>
                </div>

                {/* ISBN */}
                <div className="flex flex-col">
                  <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844] mb-1">
                    ISBN
                  </span>
                  <span className="font-sans font-medium text-base text-[#1C1C18] truncate">
                    {book.isbn || '978-602-03-8821-4'}
                  </span>
                </div>
              </div>

              {/* Rating Overview Box */}
              <div className="my-6 p-5 sm:p-6 bg-[#F6F3ED] rounded-lg border border-[#C2C8C2]/20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                {/* Left Rating Big Number */}
                <div className="flex flex-col items-start sm:items-center sm:pr-6 sm:border-r sm:border-[#C2C8C2]/30 flex-shrink-0">
                  <span className="font-serif text-4xl sm:text-[44px] leading-tight text-[#192F23]">
                    {book.rating || 4.9}
                  </span>
                  <div className="flex items-center gap-1 my-1 text-[#D97706]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <span className="font-sans font-medium text-[11px] tracking-[0.88px] text-[#424844]">
                    {book.reviewsCount || '1.2k'} ulasan
                  </span>
                </div>

                {/* Right Community Recommendation Blurb */}
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-sans font-medium text-[#1C1C18]">
                    {book.communityEndorsement || 'Karya yang sangat diapresiasi oleh komunitas pembaca Bookly.'}
                  </p>
                  <p className="font-sans font-normal text-[#424844] leading-relaxed">
                    {book.recommendationRate || '94% pembaca merekomendasikan buku ini untuk penikmat sastra kontemporer.'}
                  </p>
                </div>
              </div>

              {/* Synopsis & Pull Quote */}
              <div className="flex flex-col gap-5 text-[#1C1C18] font-sans text-base sm:text-lg leading-relaxed">
                <p>
                  {book.synopsisPara1 || 
                    'Di sebuah kota pesisir utara yang senantiasa diselimuti kabut tipis, seorang mantan kartografer bernama Julian kembali untuk merawat rumah masa kecilnya. Di sana, ia menemukan tumpukan jurnal tua milik ibunya yang mencatat aliran sungai-sungai bawah tanah yang hilang dari peta resmi.'}
                </p>

                {/* Callout Pull Quote */}
                <blockquote className="my-2 p-5 sm:p-6 bg-[#F0EEE8] border-l-4 border-[#192F23] rounded-r-lg">
                  <p className="font-serif italic font-medium text-lg sm:text-[22px] leading-snug sm:leading-relaxed text-[#192F23]">
                    {book.pullQuote || 
                      '“Sebuah penjelajahan mendalam tentang kesunyian, memori, dan sungai sunyi yang membentuk batin kita...”'}
                  </p>
                </blockquote>

                <p>
                  {book.synopsisPara2 || 
                    'Novel ini menenun narasi puitis antara realitas geografis dan lanskap emosional manusia. Melalui prosa yang tenang namun menghunjam, Valerie Vance mengajak kita menyelami rahasia yang tergenang di dalam diri setiap individu.'}
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
                {/* Mulai Baca */}
                <button
                  type="button"
                  onClick={() => showToast('Membuka pratinjau bab pertama...')}
                  className="h-12 px-6 bg-[#192F23] hover:bg-[#13241b] text-white font-sans font-medium text-base rounded shadow-sm flex items-center gap-2.5 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mulai Baca</span>
                </button>

                {/* Tandai Sedang Dibaca */}
                <button
                  type="button"
                  onClick={() => handleChangeReadingStatus('reading')}
                  className="h-12 px-6 bg-[#FCF9F3] hover:bg-white border border-[#C2C8C2] hover:border-[#192F23] text-[#192F23] font-sans font-medium text-base rounded transition-all flex items-center gap-2.5 cursor-pointer active:scale-[0.99]"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Tandai Sedang Dibaca</span>
                </button>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. MIDDLE SECTION: COMMUNITY RATING DISTRIBUTION & TAGS                   */}
        {/* ========================================================================= */}
        <section 
          aria-label="Community Rating Distribution and Characteristics"
          className="my-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-12 py-16 sm:py-20 bg-[#F6F3ED] rounded-xl border border-[#C2C8C2]/20"
        >
          <div className="max-w-[1216px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Box: Distribusi Rating Komunitas */}
            <div className="bg-[#FCF9F3] rounded-lg p-6 sm:p-10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30">
              <h2 className="font-serif font-medium text-2xl sm:text-[28px] text-[#192F23] tracking-tight mb-6">
                Distribusi Rating Komunitas
              </h2>

              <div className="flex flex-col gap-3.5">
                {(book.ratingDistribution || []).map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm font-sans text-[#424844]">
                    {/* Stars Label */}
                    <span className="w-14 font-normal text-xs sm:text-sm text-[#424844] flex-shrink-0">
                      {row.stars} Bintang
                    </span>

                    {/* Progress Bar Track */}
                    <div className="flex-1 h-3 bg-[#F0EEE8] rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-[#192F23] rounded-full transition-all duration-700"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>

                    {/* Percentage Text */}
                    <span className="w-10 text-right font-normal text-xs sm:text-sm text-[#424844] flex-shrink-0">
                      {row.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Karakteristik Buku (Tags / Chips) */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif font-medium text-2xl sm:text-[28px] text-[#192F23] tracking-tight mb-3">
                Karakteristik Buku
              </h2>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#424844] mb-6">
                Label yang paling sering disematkan oleh para pembaca untuk menggambarkan atmosfer dan gaya penulisan novel ini:
              </p>

              {/* Chips Cloud */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {(book.characteristics || ['Melankolis', 'Puitis & Liris', 'Eksplorasi Memori', 'Pesisir Sunyi', 'Filsafat Hidup']).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[#DCE5DF] hover:bg-[#cfded3] transition-colors rounded-xl font-sans font-medium text-sm sm:text-base text-[#151D1A] cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. BOTTOM SECTION: REVIEWS FEED                                           */}
        {/* ========================================================================= */}
        <section aria-label="Community Reviews Feed" className="py-8">
          
          {/* Header & Filter Controls Bar */}
          <div className="pb-6 mb-10 border-b border-[#C2C8C2]/30 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif font-medium text-3xl sm:text-[36px] text-[#192F23] tracking-tight mb-2">
                Ulasan Pembaca
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#424844]">
                Suara dan perenungan dari komunitas penjelajah aksara.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 bg-[#F0EEE8] hover:bg-[#EBE8E2] border border-transparent rounded text-xs sm:text-sm font-sans text-[#1C1C18] focus:outline-none focus:border-[#192F23] cursor-pointer"
              >
                <option value="newest">Ulasan Terbaru</option>
                <option value="highest">Rating Tertinggi</option>
                <option value="lowest">Rating Terendah</option>
                <option value="helpful">Paling Membantu</option>
              </select>

              {/* Spoiler Toggle Checkbox */}
              <label className="h-9 px-3 bg-[#F0EEE8] rounded flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-sans text-[#1C1C18] select-none">
                <input
                  type="checkbox"
                  checked={showSpoilers}
                  onChange={(e) => setShowSpoilers(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#192F23] accent-[#192F23] cursor-pointer"
                />
                <span>Tampilkan Spoiler</span>
              </label>

              {/* Write Review CTA Button */}
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="h-9 px-4 bg-[#192F23] hover:bg-[#13241b] text-white rounded text-xs sm:text-sm font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Tulis Ulasan</span>
              </button>
            </div>
          </div>

          {/* Reviews Feed List */}
          <div className="flex flex-col gap-8">
            {sortedReviews.map((rev) => {
              const isSpoilerHidden = rev.hasSpoiler && !showSpoilers && !revealedSpoilers[rev.id]

              return (
                <article
                  key={rev.id}
                  className="bg-[#FCFAF7] border border-[#E8E2D8] rounded-lg p-6 sm:p-10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-all hover:border-[#192F23]/20"
                >
                  {/* Top Reviewer Row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar initial badge */}
                      <div className="w-11 h-11 rounded-xl bg-[#E5E2DC] flex items-center justify-center font-serif font-medium text-xl text-[#192F23] flex-shrink-0">
                        {rev.avatar || rev.name.charAt(0)}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-sans font-medium text-base text-[#1C1C18]">
                            {rev.name}
                          </h3>
                        </div>
                        <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase text-[#424844]">
                          {rev.role || 'PEMBACA TERVERIFIKASI'}
                        </span>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5 text-[#D97706] flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#D97706] text-[#D97706]' : 'text-[#C2C8C2]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Spoiler Tag Badge */}
                  {rev.hasSpoiler && (
                    <div className="flex items-center gap-1.5 mb-3 text-[#BA1A1A]">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-sans font-medium text-[11px] tracking-[0.88px] uppercase">
                        {rev.spoilerLabel || 'MENGANDUNG SPOILER'}
                      </span>
                    </div>
                  )}

                  {/* Review Text Content */}
                  <div className="my-3 font-sans text-base sm:text-lg leading-relaxed text-[#1C1C18]">
                    {isSpoilerHidden ? (
                      <div className="p-4 bg-[#F0EEE8] rounded-md border border-[#E8E2D8] flex items-center justify-between gap-4">
                        <span className="font-sans text-sm text-[#737973] italic">
                          Ulasan ini disembunyikan karena memuat spoiler cerita.
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleRevealSpoiler(rev.id)}
                          className="text-xs font-sans font-medium text-[#192F23] underline flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Buka Spoiler
                        </button>
                      </div>
                    ) : (
                      <p>{rev.content}</p>
                    )}
                  </div>

                  {/* Review Card Footer with Helpful Button & Date */}
                  <div className="pt-4 mt-4 border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs sm:text-sm font-sans text-[#424844]">
                    <button
                      type="button"
                      onClick={() => handleLikeReview(rev.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                        rev.userLiked 
                          ? 'bg-[#192F23] text-white' 
                          : 'hover:bg-[#F0EEE8] text-[#424844]'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Membantu ({rev.likes})</span>
                    </button>

                    <span className="text-[11px] font-medium tracking-[0.88px] text-[#424844]/80">
                      {rev.date}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Pagination Bar */}
          <div className="mt-12 pt-6 flex items-center justify-center gap-2 font-sans text-sm">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border border-[#C2C8C2] rounded bg-[#FCF9F3] hover:bg-white text-[#1C1C18] font-medium disabled:opacity-50 cursor-pointer"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-9 h-9 rounded font-medium cursor-pointer ${
                currentPage === 1 ? 'bg-[#192F23] text-white' : 'border border-[#C2C8C2] bg-[#FCF9F3]'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-9 h-9 rounded font-medium cursor-pointer ${
                currentPage === 2 ? 'bg-[#192F23] text-white' : 'border border-[#C2C8C2] bg-[#FCF9F3]'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-9 h-9 rounded font-medium cursor-pointer ${
                currentPage === 3 ? 'bg-[#192F23] text-white' : 'border border-[#C2C8C2] bg-[#FCF9F3]'
              }`}
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border border-[#C2C8C2] rounded bg-[#FCF9F3] hover:bg-white text-[#1C1C18] font-medium cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>

        </section>

      </div>

      {/* ========================================================================= */}
      {/* 5. WRITE REVIEW MODAL                                                     */}
      {/* ========================================================================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCF9F3] border border-[#C2C8C2]/40 rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-[#737973] hover:text-[#192F23] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-medium text-2xl text-[#192F23] mb-1">
              Tulis Ulasan Buku
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#424844] mb-6">
              Bagikan impresi dan perenungan membacamu untuk <span className="font-medium">{book.title}</span>.
            </p>

            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
              {/* Reviewer Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-medium text-xs text-[#261910]">
                  Nama Anda / Nama Pena
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Raden Ayu"
                  className="h-10 px-3 bg-white border border-[#C2C8C2] rounded text-sm text-[#1C1C18] focus:outline-none focus:border-[#192F23]"
                />
              </div>

              {/* Star Rating Select */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-medium text-xs text-[#261910]">
                  Beri Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating
                            ? 'fill-[#D97706] text-[#D97706]'
                            : 'text-[#C2C8C2]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-sans text-xs text-[#424844]">
                    ({newReview.rating} dari 5 bintang)
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-medium text-xs text-[#261910]">
                  Ulasan Lengkap
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Tuliskan pengalamanmu membaca buku ini..."
                  className="p-3 bg-white border border-[#C2C8C2] rounded text-sm text-[#1C1C18] focus:outline-none focus:border-[#192F23] resize-none"
                />
              </div>

              {/* Has Spoiler Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modalSpoiler"
                  checked={newReview.hasSpoiler}
                  onChange={(e) => setNewReview({ ...newReview, hasSpoiler: e.target.checked })}
                  className="w-4 h-4 rounded text-[#192F23] accent-[#192F23] cursor-pointer"
                />
                <label htmlFor="modalSpoiler" className="font-sans text-xs text-[#424844] cursor-pointer select-none">
                  Ulasan ini mengandung spoiler jalan cerita (akan disembunyikan secara default).
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-[#C2C8C2] rounded text-sm font-sans font-medium text-[#424844] hover:bg-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#192F23] hover:bg-[#13241b] text-white rounded text-sm font-sans font-medium shadow-sm cursor-pointer"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
