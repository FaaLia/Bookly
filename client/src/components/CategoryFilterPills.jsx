import React from 'react'
import { CATEGORIES } from '../data/mockData'

export default function CategoryFilterPills({ selectedCategory, onSelectCategory }) {
  return (
    <section id="categories" className="w-full bg-[#F6F3ED] border-y border-[#C2C8C2]/20 py-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 h-[42px] px-4 py-2 rounded-[12px] font-sans text-base transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#DCE5DF] border border-[#192F23]/20 text-[#151D1A] font-medium shadow-sm'
                    : 'bg-[#FCF9F3] border border-[#C2C8C2]/30 text-[#424844] hover:bg-[#F0EEE8] hover:border-[#C2C8C2]/60'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
