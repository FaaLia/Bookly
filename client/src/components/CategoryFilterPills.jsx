import React, { useState, useEffect } from 'react'
import { CATEGORIES } from '../data/mockData'
import { categoriesApi } from '../services/api'

export default function CategoryFilterPills({ selectedCategory, onSelectCategory }) {
  const [categoriesList, setCategoriesList] = useState(CATEGORIES)

  // Ambil daftar 7 kategori dari API backend
  useEffect(() => {
    let isMounted = true
    categoriesApi.getCategories().then((cats) => {
      if (isMounted && cats && cats.length > 0) {
        setCategoriesList(cats)
      }
    }).catch(() => {})
    return () => { isMounted = false }
  }, [])

  const displayCategories = categoriesList.length > 0 ? categoriesList : CATEGORIES

  return (
    <section id="categories" className="w-full bg-[#FAF7F2] border-b border-[#ECE4D8] py-4">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {displayCategories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-sans text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#483E37] text-white font-medium'
                    : 'bg-white border border-[#DFD5C7] text-[#424844] hover:border-[#483E37] hover:text-[#483E37]'
                }`}
              >
                {cat.label || cat.category_name}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
