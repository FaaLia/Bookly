import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CURATED_COLLECTIONS } from '../data/mockData'

export default function CuratedCollectionsSection() {
  return (
    <section id="collections" className="w-full bg-[#F0EEE8] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-sans text-sm md:text-base font-normal tracking-[1.6px] uppercase text-[#424844]">
            EDITORIAL KURASI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#192F23] tracking-tight">
            Koleksi Khusus
          </h2>
        </div>

        {/* Collections 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURATED_COLLECTIONS.map((item) => (
            <div
              key={item.id}
              className="relative h-[384px] rounded-[8px] overflow-hidden group flex flex-col justify-end p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Background Cover Image */}
              <img
                src={item.bgImage}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark Gradient Overlay per Figma specs */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(0deg, rgba(28, 28, 24, 0.88) 0%, rgba(28, 28, 24, 0.45) 50%, rgba(28, 28, 24, 0.15) 100%)'
                }}
              />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-sans text-xs sm:text-sm font-medium tracking-[0.8px] uppercase text-[#DCE5DF]">
                  {item.badge}
                </span>

                <h3 className="font-serif text-2xl sm:text-[28px] sm:leading-[36px] font-medium text-[#FCF9F3]">
                  {item.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#E5E2DC]/90 line-clamp-2 mb-2 font-normal">
                  {item.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-sm sm:text-base font-sans font-normal text-[#FCF9F3] group-hover:underline">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
