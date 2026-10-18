import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategoryFilterPills from './components/CategoryFilterPills'
import TrendingSection from './components/TrendingSection'
import CuratedCollectionsSection from './components/CuratedCollectionsSection'
import ReviewsSection from './components/ReviewsSection'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Read initial route from URL hash (e.g. #register, #login, #home)
  const getInitialView = () => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#register' || hash === '#/register') return 'register'
    if (hash === '#login' || hash === '#/login') return 'login'
    return 'home'
  }

  const [currentView, setCurrentView] = useState(getInitialView)

  // Listen to browser hash changes (support back/forward buttons and hash navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#register' || hash === '#/register') {
        setCurrentView('register')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#login' || hash === '#/login') {
        setCurrentView('login')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#home' || hash === '#/' || hash === '') {
        setCurrentView('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (view) => {
    setCurrentView(view)
    if (view === 'register') {
      window.location.hash = '#register'
    } else if (view === 'login') {
      window.location.hash = '#login'
    } else {
      window.location.hash = ''
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  // 1. Register Page View
  if (currentView === 'register') {
    return (
      <RegisterPage
        onNavigateToLogin={() => navigateTo('login')}
        onNavigateToHome={() => navigateTo('home')}
      />
    )
  }

  // 2. Login Page View
  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigateToRegister={() => navigateTo('register')}
        onNavigateToHome={() => navigateTo('home')}
      />
    )
  }

  // 3. Home / Landing Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
      {/* Top Navigation */}
      <Navbar
        onNavigateLogin={() => navigateTo('login')}
        onNavigateRegister={() => navigateTo('register')}
        onNavigateHome={() => navigateTo('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section: Editor's Choice */}
        <HeroSection
          onNavigateRegister={() => navigateTo('register')}
        />

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
