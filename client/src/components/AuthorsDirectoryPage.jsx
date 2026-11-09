import React, { useState, useEffect } from 'react'
import { authorsApi } from '../services/api'
import {
  ChevronRight,
  Search,
  BookOpen,
  ArrowRight,
  Award,
  Users
} from 'lucide-react'
import { POPULAR_AUTHORS } from '../data/mockData'

export default function AuthorsDirectoryPage({ onNavigateHome, onNavigateAuthorDetail, onNavigateBookDetail }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filterCategories = [
    { id: 'all', label: 'Semua Penulis' },
    { id: 'literary-fiction', label: 'Fiksi Sastra' },
    { id: 'magical-realism', label: 'Realisme Magis' },
    { id: 'philosophy', label: 'Filsafat & Esai' },
    { id: 'classics', label: 'Klasik & Sejarah' },
  ]

  const filteredAuthors = (authorsList.length > 0 ? authorsList : POPULAR_AUTHORS).filter((author) => {
    const matchesCategory =
      selectedCategory === 'all' || author.category === selectedCategory
    const matchesSearch =
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.popularBooks.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredAuthor = authorsList.find((a) => a.isFeatured) || POPULAR_AUTHORS[0]

  return (
    <div className="w-full bg-[#FCF9F3] min-h-screen text-[#1C1C18] font-sans antialiased">
      
      {/* Breadcrumb Navigation */}
      <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
          <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors">
            Beranda
          </button>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <span className="text-[#483E37] font-medium">Penulis</span>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <span className="text-[#424844]">Rekomendasi Penulis Terbaik</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="w-full py-12 md:py-16 px-6 md:px-8 border-b border-[#ECE4D8] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFE8DD] text-[#835418] mb-3">
              KURASI EDITORIAL BOOKLY
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#483E37] mb-3">
              Rekomendasi Penulis Populer &amp; Terbaik
            </h1>

            <p className="font-serif text-base sm:text-lg text-[#5A554E] leading-relaxed">
              Jelajahi profil para penutur cerita puitis, novelis maestro, dan pemikir yang karya-karyanya menggetarkan rak literasi dunia.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-[#737973] absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama penulis, karya, atau genre..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DFD5C7] text-sm text-[#483E37] placeholder-[#737973] focus:outline-none focus:border-[#483E37] transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {filterCategories.map((cat) => {
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#483E37] text-white shadow-xs'
                        : 'bg-white border border-[#DFD5C7] text-[#424844] hover:border-[#483E37] hover:text-[#483E37]'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-[1280px] mx-auto px-6 md:px-8 py-12">

        {/* Featured Author Spotlight Banner (if no active search) */}
        {!searchQuery && selectedCategory === 'all' && featuredAuthor && (
          <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#F6F2EA] border border-[#E4DDD0] flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-32 h-44 sm:w-40 sm:h-52 rounded-xl overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex-shrink-0 shadow-sm">
              <img
                src={featuredAuthor.portraitImage}
                alt={featuredAuthor.name}
                className="w-full h-full object-cover grayscale contrast-105"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#835418]">
                PENULIS SOROTAN BULAN INI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#483E37] mt-1 mb-2">
                {featuredAuthor.name}
              </h2>
              <p className="text-xs text-[#737973] mb-3">
                {featuredAuthor.tagline} • {featuredAuthor.location}
              </p>
              <p className="text-sm text-[#424844] max-w-xl leading-relaxed mb-5">
                {featuredAuthor.bioExcerpt}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => onNavigateAuthorDetail(featuredAuthor.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <span>Lihat Profil Penulis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-xs text-[#737973] flex items-center gap-2">
                  <span>{featuredAuthor.criticScore} Skor Kritik</span>
                  <span>•</span>
                  <span>{featuredAuthor.activeReaders} Pembaca Aktif</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Authors Grid Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#483E37] font-medium">
            Daftar Penulis Terkurasi ({filteredAuthors.length})
          </h2>
          <span className="text-xs text-[#737973]">
            Klik untuk melihat biografi, karya terbit, &amp; ulasan lengkap
          </span>
        </div>

        {filteredAuthors.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#ECE4D8] my-8">
            <p className="font-serif text-lg text-[#483E37] mb-1">
              Tidak ada penulis yang sesuai dengan pencarian Anda.
            </p>
            <p className="text-xs text-[#737973] mb-4">
              Coba kata kunci lain atau pilih kategori "Semua Penulis".
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#483E37] text-white rounded-lg"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map((author) => (
              <div
                key={author.id}
                className="group p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] hover:bg-white hover:border-[#DFD5C7] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Author Header Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex-shrink-0 shadow-xs">
                      <img
                        src={author.portraitImage}
                        alt={author.name}
                        className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#835418] block truncate">
                        {author.tagline}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-[#483E37] truncate group-hover:text-[#483E37]">
                        {author.name}
                      </h3>
                      <p className="text-xs text-[#737973] truncate mt-0.5">
                        {author.location}
                      </p>
                    </div>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="text-xs text-[#424844] line-clamp-2 leading-relaxed mb-4">
                    {author.bioExcerpt}
                  </p>

                  {/* Popular Books Tags */}
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#737973] block mb-1.5">
                      Karya Populer:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {author.popularBooks.slice(0, 2).map((book, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-serif bg-white border border-[#E8DFD3] text-[#483E37] truncate max-w-[200px]"
                        >
                          "{book}"
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Strip with Action Button */}
                <div className="pt-3.5 border-t border-[#ECE4D8] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#737973]">
                    <span className="font-medium text-[#483E37]">{author.criticScore}</span>
                    <span>•</span>
                    <span>{author.activeReaders}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateAuthorDetail(author.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Lihat Profil Penulis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  )
}
