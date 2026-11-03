import React from 'react'
import { Star } from 'lucide-react'
import { COMMUNITY_REVIEWS } from '../data/mockData'

export default function ReviewsSection() {
  return (
    <section id="reviews" className="w-full bg-[#FCF9F3] py-14 md:py-18">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#835418] font-semibold">
              Ulasan Pembaca
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#192F23] mt-1">
              Catatan & Refleksi Terbaru
            </h2>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {COMMUNITY_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex items-start p-5 gap-4 bg-[#FAF7F2] border border-[#ECE4D8] rounded-xl"
            >
              {/* Book Thumbnail */}
              <div className="w-16 h-24 flex-shrink-0 bg-[#E8DFD3] rounded overflow-hidden shadow-xs">
                <img
                  src={review.coverImage}
                  alt={review.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-[#192F23] truncate">
                      {review.reviewerName}
                    </span>
                    <span className="text-xs text-[#737973]">•</span>
                    <span className="text-xs text-[#737973] truncate">
                      {review.bookTitle}
                    </span>
                  </div>
                  <div className="flex items-center text-[#835418] text-xs">
                    ★ <span className="ml-0.5 font-medium">{review.rating}</span>
                  </div>
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-[#424844] leading-relaxed line-clamp-3 my-2">
                  "{review.content}"
                </p>

                <div className="text-[11px] text-[#737973] pt-1">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
