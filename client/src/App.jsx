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
import BookDetailPage from './components/BookDetailPage'
import { BOOK_DETAILS, TRENDING_BOOKS, HERO_BOOK } from './data/mockData'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Read initial route from URL hash (e.g. #register, #login, #book, #home)
  const parseHash = () => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#register' || hash === '#/register') {
      return { view: 'register', bookId: null }
    }
    if (hash === '#login' || hash === '#/login') {
      return { view: 'login', bookId: null }
    }
    if (hash.startsWith('#book') || hash.startsWith('#/book') || hash === '#detail') {
      const parts = hash.split('/')
      const id = parts[2] || 'memory-of-water'
      return { view: 'book-detail', bookId: id }
    }
    return { view: 'home', bookId: null }
  }

  const initialRoute = parseHash()
  const [currentView, setCurrentView] = useState(initialRoute.view)
  const [selectedBookId, setSelectedBookId] = useState(initialRoute.bookId || 'memory-of-water')

  // Listen to browser hash changes (support back/forward buttons and direct linking)
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash()
      setCurrentView(route.view)
      if (route.bookId) setSelectedBookId(route.bookId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (view, bookId = null) => {
    setCurrentView(view)
    if (view === 'register') {
      window.location.hash = '#register'
    } else if (view === 'login') {
      window.location.hash = '#login'
    } else if (view === 'book-detail') {
      const targetId = bookId || 'memory-of-water'
      setSelectedBookId(targetId)
      window.location.hash = `#/book/${targetId}`
    } else {
      window.location.hash = ''
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  // Helper to fetch book data for detail view
  const getActiveBookData = () => {
    if (selectedBookId === 'memory-of-water' || !selectedBookId) {
      return BOOK_DETAILS
    }
    const foundTrending = TRENDING_BOOKS.find((b) => b.id === selectedBookId)
    if (foundTrending) {
      return {
        ...BOOK_DETAILS,
        id: foundTrending.id,
        title: foundTrending.title,
        author: foundTrending.author,
        coverImage: foundTrending.coverImage,
        rating: foundTrending.rating,
        reviewsCount: foundTrending.reviewsCount,
      }
    }
    return BOOK_DETAILS
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

  // 3. Book Detail Page View
  if (currentView === 'book-detail') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {/* Navigation Bar */}
        <Navbar
          onNavigateLogin={() => navigateTo('login')}
          onNavigateRegister={() => navigateTo('register')}
          onNavigateHome={() => navigateTo('home')}
        />

        {/* Book Detail Content */}
        <main className="flex-1">
          <BookDetailPage
            book={getActiveBookData()}
            onNavigateHome={() => navigateTo('home')}
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat)
              navigateTo('home')
            }}
            onNavigateRegister={() => navigateTo('register')}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  // 4. Home / Landing Page View
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
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
        />

        {/* Category Filter Pills Bar */}
        <CategoryFilterPills
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Trending / Highly Rated Books */}
        <TrendingSection 
          activeCategory={selectedCategory} 
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
        />

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
