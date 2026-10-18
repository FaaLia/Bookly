import React from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { TRENDING_BOOKS } from '../data/mockData'

export default function TrendingSection({ activeCategory }) {
  // Filter books if a specific category is selected
  const booksToDisplay = activeCategory && activeCategory !== 'all'
    ? TRENDING_BOOKS.filter(book => book.category === activeCategory)
    : TRENDING_BOOKS

  return (
    <section id="trending" className="w-full bg-[#FCF9F3] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-sm md:text-base font-normal tracking-[1.6px] uppercase text-[#424844]">
              TREN MINGGU INI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#192F23] tracking-tight">
              Buku Paling Populer
            </h2>
          </div>

          <a 
            href="#collections" 
            className="group inline-flex items-center gap-1.5 text-base font-sans font-normal text-[#192F23] hover:underline"
          >
            <span>Lihat Semua Koleksi</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(booksToDisplay.length > 0 ? booksToDisplay : TRENDING_BOOKS).map((book) => (
            <article
              key={book.id}
              className="group flex flex-col justify-between p-4 bg-[#FCF9F3] border border-[#C2C8C2]/30 rounded-[4px] hover:shadow-md transition-all duration-300 hover:border-[#192F23]/40"
            >
              <div>
                {/* Book Image */}
                <div className="w-full h-64 bg-[#F0EEE8] rounded-[2px] overflow-hidden mb-4 relative">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle inner spine highlight */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Book Info */}
                <div className="flex flex-col gap-1 pb-3">
                  <h3 className="font-serif font-medium text-base text-[#1C1C18] line-clamp-1 group-hover:text-[#192F23] transition-colors">
                    {book.title}
                  </h3>
                  <p className="font-sans text-sm text-[#424844] line-clamp-1">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* Card Footer with border */}
              <div className="pt-3 border-t border-[#C2C8C2]/20 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#192F23]">
                  <Star className="w-3.5 h-3.5 fill-[#192F23] text-[#192F23]" />
                  <span className="font-sans font-medium text-sm text-[#192F23]">
                    {book.rating}
                  </span>
                </div>
                <span className="font-sans text-xs text-[#424844]">
                  ({book.reviewsCount} ulasan)
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
