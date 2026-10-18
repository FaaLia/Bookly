import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategoryFilterPills from './components/CategoryFilterPills'
import TrendingSection from './components/TrendingSection'
import CuratedCollectionsSection from './components/CuratedCollectionsSection'
import ReviewsSection from './components/ReviewsSection'
import Footer from './components/Footer'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section: Editor's Choice */}
        <HeroSection />

        {/* Category Filter Pills Bar */}
        <CategoryFilterPills
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Trending / Highly Rated Books */}
        <TrendingSection activeCategory={selectedCategory} />

        {/* Curated Editorial Collections */}
        <CuratedCollectionsSection />

        {/* Recent Community Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
