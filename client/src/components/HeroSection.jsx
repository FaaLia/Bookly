import React from 'react'
import { Star, Bookmark, BookOpen, User } from 'lucide-react'
import { HERO_BOOK } from '../data/mockData'

export default function HeroSection({ onNavigateRegister, onNavigateBookDetail, onNavigateAuthor }) {
  return (
    <section className="relative w-full bg-[#FAF7F2] py-14 md:py-20 border-b border-[#ECE4D8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column - Content */}
          <div className="flex-1 max-w-[640px]">
            {/* Editor's Choice Badge */}
            <div className="inline-flex items-center px-2.5 py-1 mb-4 rounded-md bg-[#EFE8DD] text-xs font-medium tracking-wider uppercase text-[#835418]">
              {HERO_BOOK.badge}
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-normal tracking-tight text-[#192F23] mb-4">
              {HERO_BOOK.title}
            </h1>

            {/* Description */}
            <p className="font-serif text-base sm:text-lg lg:text-xl leading-relaxed text-[#424844] mb-6">
              {HERO_BOOK.description}
            </p>

            {/* Author & Rating Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-[#424844]">
              <span className="font-medium text-[#192F23]">
                {HERO_BOOK.author}
              </span>
              <span className="text-[#C2C8C2]">•</span>
              
              {/* 5 Stars */}
              <div className="flex items-center gap-0.5 text-[#835418]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#835418] text-[#835418]" />
                ))}
              </div>

              {/* Rating text */}
              <span className="text-xs text-[#737973]">
                {HERO_BOOK.rating} ({HERO_BOOK.reviewsCount} ulasan)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button 
                type="button"
                onClick={() => onNavigateBookDetail && onNavigateBookDetail(HERO_BOOK.id)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#192F23] hover:bg-[#13241b] text-white font-sans text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Baca Sinopsis</span>
              </button>

              <button 
                type="button"
                onClick={() => onNavigateAuthor && onNavigateAuthor('julian-cross')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#DFD5C7] hover:border-[#192F23] bg-white text-[#192F23] font-sans text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-[#835418]" />
                <span>Lihat Profil Penulis</span>
              </button>

              <button 
                type="button"
                onClick={onNavigateRegister}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#DFD5C7] hover:border-[#192F23] bg-white text-[#737973] hover:text-[#192F23] font-sans text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Simpan ke Rak</span>
              </button>
            </div>
          </div>

          {/* Right Column - Hero Book Cover */}
          <div className="flex justify-center items-center flex-shrink-0">
            <div 
              onClick={() => onNavigateBookDetail && onNavigateBookDetail(HERO_BOOK.id)}
              className="relative w-[240px] sm:w-[270px] h-[360px] sm:h-[400px] bg-[#E8DFD3] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
            >
              <img 
                src={HERO_BOOK.coverImage} 
                alt={HERO_BOOK.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
              {/* Subtle natural spine shadow */}
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
