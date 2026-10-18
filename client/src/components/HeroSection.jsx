import React from 'react'
import { Star, Bookmark, BookOpen } from 'lucide-react'
import { HERO_BOOK } from '../data/mockData'

export default function HeroSection({ onNavigateRegister, onNavigateBookDetail }) {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#FCF9F3] via-[#F6F3ED] to-[#FCF9F3] py-16 md:py-24 border-b border-[#C2C8C2]/20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column - Content */}
          <div className="flex-1 max-w-[672px]">
            {/* Editor's Choice Badge */}
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-[#DCE5DF]/40">
              <span className="font-sans text-xs sm:text-sm font-medium tracking-[1.6px] uppercase text-[#424844]">
                {HERO_BOOK.badge}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] lg:leading-[64px] font-normal tracking-[-1.12px] text-[#192F23] mb-6">
              {HERO_BOOK.title}
            </h1>

            {/* Description */}
            <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed lg:leading-[39px] text-[#424844] mb-6">
              {HERO_BOOK.description}
            </p>

            {/* Author & Rating Row */}
            <div className="flex flex-wrap items-center gap-3 mb-8 text-[#424844]">
              <span className="font-sans font-medium text-base text-[#1C1C18]">
                {HERO_BOOK.author}
              </span>
              <span className="text-[#737973]">•</span>
              
              {/* 5 Stars */}
              <div className="flex items-center gap-0.5 text-[#192F23]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#192F23] text-[#192F23]" />
                ))}
              </div>

              {/* Rating text */}
              <span className="font-sans text-sm text-[#424844]">
                {HERO_BOOK.rating} ({HERO_BOOK.reviewsCount} ulasan)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={() => onNavigateBookDetail && onNavigateBookDetail(HERO_BOOK.id)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#192F23] hover:bg-[#13241b] text-white font-sans text-base font-medium rounded transition-colors shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Baca Sinopsis
              </button>

              <button 
                type="button"
                onClick={onNavigateRegister}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C2C8C2] hover:border-[#192F23] bg-transparent text-[#192F23] font-sans text-base font-medium rounded transition-colors active:scale-[0.99] cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                Tambah ke Daftar
              </button>
            </div>
          </div>

          {/* Right Column - Hero Book Cover */}
          <div className="relative flex justify-center items-center flex-shrink-0 w-full sm:w-auto">
            {/* Glow blur background */}
            <div className="absolute -inset-4 bg-[#DCE5DF]/40 rounded-2xl blur-xl" />

            {/* 3D-styled tilt Book Card */}
            <div 
              onClick={() => onNavigateBookDetail && onNavigateBookDetail(HERO_BOOK.id)}
              className="relative w-[260px] sm:w-[288px] h-[380px] sm:h-[420px] bg-[#EBE8E2] border border-[#C2C8C2]/40 rounded shadow-book transform rotate-1 hover:rotate-0 transition-transform duration-300 overflow-hidden group cursor-pointer"
            >
              <img 
                src={HERO_BOOK.coverImage} 
                alt={HERO_BOOK.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Subtle Book Spine and Shadow overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-black/10" />
              
              {/* Floating Label on Hover */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded shadow-sm opacity-90">
                <p className="font-serif text-sm font-medium text-[#192F23]">{HERO_BOOK.title}</p>
                <p className="font-sans text-xs text-[#424844]">{HERO_BOOK.author}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
