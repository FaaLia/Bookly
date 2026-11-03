import React from 'react'
import { Star, ArrowRight, User } from 'lucide-react'
import { TRENDING_BOOKS } from '../data/mockData'

const AUTHOR_SLUG_MAP = {
  'Julian Cross': 'julian-cross',
  'Elena Rostova': 'elena-rostova',
  'Marcus Chen': 'marcus-chen',
  'Clara Sorenson': 'julian-cross',
  'Eka Kurniawan': 'eka-kurniawan',
  'Albert Camus': 'albert-camus',
  'Pramoedya Ananta Toer': 'pramoedya'
}

export default function TrendingSection({ activeCategory, onNavigateBookDetail, onNavigateAuthor }) {
  // Filter books if a specific category is selected
  const booksToDisplay = activeCategory && activeCategory !== 'all'
    ? TRENDING_BOOKS.filter(book => book.category === activeCategory)
    : TRENDING_BOOKS

  return (
    <section id="trending" className="w-full bg-[#FCF9F3] py-14 md:py-18">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#835418] font-semibold">
              Tren Minggu Ini
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#192F23] mt-1">
              Buku Paling Populer
            </h2>
          </div>

          <a 
            href="#collections" 
            className="text-xs font-medium text-[#192F23] hover:underline flex items-center gap-1"
          >
            <span>Koleksi Kurasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(booksToDisplay.length > 0 ? booksToDisplay : TRENDING_BOOKS).map((book) => {
            const authorSlug = AUTHOR_SLUG_MAP[book.author] || 'julian-cross'
            return (
              <article
                key={book.id}
                onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id)}
                className="group p-3.5 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2] hover:bg-white hover:border-[#DFD5C7] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Book Image */}
                  <div className="w-full h-56 bg-[#E8DFD3] rounded-lg overflow-hidden mb-3">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex flex-col gap-0.5 pb-1">
                    <h3 className="font-serif font-medium text-base text-[#192F23] line-clamp-1 group-hover:underline">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#737973] line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Card Rating & Reviews */}
                  <div className="pt-2 mt-1 border-t border-[#ECE4D8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#835418]">
                      <Star className="w-3.5 h-3.5 fill-[#835418]" />
                      <span className="font-medium">
                        {book.rating}
                      </span>
                    </div>
                    <span className="text-[#737973]">
                      {book.reviewsCount} ulasan
                    </span>
                  </div>

                  {/* Button: Lihat Profil Penulis */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onNavigateAuthor) onNavigateAuthor(authorSlug)
                    }}
                    className="w-full mt-3 py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#F6F2EA] border border-[#DFD5C7] text-xs font-medium text-[#192F23] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title={`Lihat profil penulis ${book.author}`}
                  >
                    <User className="w-3.5 h-3.5 text-[#835418]" />
                    <span>Lihat Profil Penulis</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
