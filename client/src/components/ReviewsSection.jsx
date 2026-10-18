import React from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { COMMUNITY_REVIEWS } from '../data/mockData'

export default function ReviewsSection() {
  return (
    <section id="reviews" className="w-full bg-[#FCF9F3] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-sm md:text-base font-normal tracking-[1.6px] uppercase text-[#424844]">
              ULASAN PEMBACA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#192F23] tracking-tight">
              Ulasan Komunitas Terbaru
            </h2>
          </div>

          <a 
            href="#reviews" 
            className="group inline-flex items-center gap-1.5 text-base font-sans font-normal text-[#192F23] hover:underline"
          >
            <span>Lihat Semua 1.400+ Ulasan</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 2 Wide Review Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {COMMUNITY_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col sm:flex-row items-start p-6 gap-6 bg-[#FCF9F3] border border-[#C2C8C2]/30 rounded-[4px] hover:shadow-md transition-shadow duration-300"
            >
              {/* Book Thumbnail */}
              <div className="w-16 h-24 flex-shrink-0 bg-[#F0EEE8] rounded-[2px] overflow-hidden shadow-sm">
                <img
                  src={review.coverImage}
                  alt={review.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: review.avatarBg }}
                    >
                      {review.avatarInitial}
                    </div>
                    <span className="font-sans text-sm sm:text-base font-normal text-[#1C1C18] truncate">
                      {review.reviewerName}
                    </span>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 text-[#192F23] flex-shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#192F23] text-[#192F23]" />
                    ))}
                  </div>
                </div>

                {/* Book Title */}
                <h4 className="font-serif text-base font-medium text-[#1C1C18] line-clamp-1">
                  {review.bookTitle}
                </h4>

                {/* Review Quote */}
                <p className="font-sans italic text-sm sm:text-base text-[#424844] line-clamp-2 leading-relaxed">
                  "{review.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
