import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CURATED_COLLECTIONS } from '../data/mockData'

export default function CuratedCollectionsSection({ onNavigateCatalog }) {
  return (
    <section id="collections" className="w-full bg-[#FAF7F2] py-14 md:py-18 border-y border-[#ECE4D8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#835418] font-semibold">
              Editorial Kurasi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#483E37] mt-1">
              Koleksi Pilihan Pembaca
            </h2>
          </div>
          {onNavigateCatalog && (
            <button
              type="button"
              onClick={onNavigateCatalog}
              className="text-xs font-medium text-[#483E37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Katalog Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Collections Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_COLLECTIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateCatalog && onNavigateCatalog()}
              className="relative h-80 rounded-xl overflow-hidden group flex flex-col justify-end p-6 border border-[#DFD5C7] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Background Cover Image */}
              <img
                src={item.bgImage}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />

              {/* Natural warm taupe gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#483E37]/90 via-[#483E37]/40 to-transparent"
              />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col gap-1.5 text-white">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#EAE2DC]">
                  {item.badge}
                </span>

                <h3 className="font-serif text-xl font-medium text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="inline-flex items-center gap-1 text-xs text-white pt-1 group-hover:underline font-medium">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
