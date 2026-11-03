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
import AuthorPage from './components/AuthorPage'
import AuthorsDirectoryPage from './components/AuthorsDirectoryPage'
import ProfilePage from './components/ProfilePage'
import CatalogPage from './components/CatalogPage'
import { BOOK_DETAILS, TRENDING_BOOKS, CATALOG_BOOKS } from './data/mockData'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  // Guest by default (no auto-login)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: 'Dewi Anggraini',
    avatar: null
  })

  // Read initial route from URL hash (e.g. #register, #login, #book, #author, #profile, #catalog, #home)
  const parseHash = () => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#register' || hash === '#/register') {
      return { view: 'register', bookId: null, authorId: null, tab: 'reading' }
    }
    if (hash === '#login' || hash === '#/login') {
      return { view: 'login', bookId: null, authorId: null, tab: 'reading' }
    }
    // Catalog page route: e.g. #/catalog, #catalog, #/katalog, #katalog, #/collections, #collections
    if (
      hash === '#catalog' ||
      hash === '#/catalog' ||
      hash === '#katalog' ||
      hash === '#/katalog' ||
      hash === '#collections' ||
      hash === '#/collections' ||
      hash === '#koleksi' ||
      hash === '#/koleksi'
    ) {
      return { view: 'catalog', bookId: null, authorId: null, tab: 'reading' }
    }
    // Specific author detail route: e.g. #/author/julian-cross, #/author/eka-kurniawan
    if (hash.startsWith('#/author/') || hash.startsWith('#author/')) {
      const parts = hash.split('/')
      const authorId = parts[2] || 'julian-cross'
      return { view: 'author-detail', bookId: null, authorId, tab: 'reading' }
    }
    // Authors directory / recommendations route: e.g. #/author, #author, #penulis, #/penulis
    if (hash === '#author' || hash === '#/author' || hash === '#penulis' || hash === '#/penulis') {
      return { view: 'authors', bookId: null, authorId: null, tab: 'reading' }
    }
    if (
      hash === '#profile' ||
      hash.startsWith('#/profile') ||
      hash === '#profil' ||
      hash.startsWith('#/profil')
    ) {
      let tab = 'reading'
      if (hash.includes('shelves') || hash.includes('rak') || hash.includes('koleksi')) tab = 'shelves'
      else if (hash.includes('wishlist') || hash.includes('ingin')) tab = 'wishlist'
      else if (hash.includes('finished') || hash.includes('selesai')) tab = 'finished'
      else if (hash.includes('reviews') || hash.includes('ulasan')) tab = 'reviews'
      return { view: 'profile', bookId: null, authorId: null, tab }
    }
    if (hash.startsWith('#book') || hash.startsWith('#/book') || hash === '#detail') {
      const parts = hash.split('/')
      const id = parts[2] || 'memory-of-water'
      return { view: 'book-detail', bookId: id, authorId: null, tab: 'reading' }
    }
    return { view: 'home', bookId: null, authorId: null, tab: 'reading' }
  }

  const initialRoute = parseHash()
  const [currentView, setCurrentView] = useState(initialRoute.view)
  const [selectedBookId, setSelectedBookId] = useState(initialRoute.bookId || 'memory-of-water')
  const [selectedAuthorId, setSelectedAuthorId] = useState(initialRoute.authorId || 'julian-cross')
  const [profileTab, setProfileTab] = useState(initialRoute.tab || 'reading')

  // Always scroll to the very top when view changes
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [currentView])

  // Listen to browser hash changes (support back/forward buttons and direct linking)
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash()
      setCurrentView(route.view)
      if (route.bookId) setSelectedBookId(route.bookId)
      if (route.authorId) setSelectedAuthorId(route.authorId)
      if (route.tab) setProfileTab(route.tab)
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (view, paramId = null, tab = 'reading') => {
    setCurrentView(view)
    if (view === 'register') {
      window.location.hash = '#register'
    } else if (view === 'login') {
      window.location.hash = '#login'
    } else if (view === 'catalog' || view === 'katalog') {
      window.location.hash = '#/catalog'
    } else if (view === 'book-detail') {
      const targetId = paramId || 'memory-of-water'
      setSelectedBookId(targetId)
      window.location.hash = `#/book/${targetId}`
    } else if (view === 'author-detail' || (view === 'author' && paramId)) {
      const targetAuthorId = paramId || selectedAuthorId || 'julian-cross'
      setSelectedAuthorId(targetAuthorId)
      window.location.hash = `#/author/${targetAuthorId}`
    } else if (view === 'authors' || view === 'author' || view === 'authors-directory') {
      window.location.hash = '#/author'
    } else if (view === 'profile') {
      setProfileTab(tab)
      window.location.hash = tab !== 'reading' ? `#/profile?tab=${tab}` : '#/profile'
    } else {
      if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
        window.location.hash = '#/'
      }
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  // Render unified navbar across views
  const renderNavbar = (activeNav = 'home') => (
    <Navbar
      activeNav={activeNav}
      isLoggedIn={isLoggedIn}
      userName={userProfile.name}
      userAvatar={userProfile.avatar}
      onLogout={() => {
        setIsLoggedIn(false)
        navigateTo('home')
      }}
      onNavigateLogin={() => navigateTo('login')}
      onNavigateRegister={() => navigateTo('register')}
      onNavigateHome={() => navigateTo('home')}
      onNavigateCatalog={() => navigateTo('catalog')}
      onNavigateAuthor={(authorId) => navigateTo(authorId ? 'author-detail' : 'authors', authorId)}
      onNavigateProfile={() => navigateTo('profile')}
    />
  )

  // Helper to fetch book data for detail view
  const getActiveBookData = () => {
    if (!selectedBookId || selectedBookId === 'memory-of-water') {
      return BOOK_DETAILS
    }
    const foundCatalog = CATALOG_BOOKS?.find((b) => b.id === selectedBookId)
    if (foundCatalog) {
      return {
        ...BOOK_DETAILS,
        id: foundCatalog.id,
        title: foundCatalog.title,
        author: foundCatalog.author,
        coverImage: foundCatalog.coverImage,
        rating: foundCatalog.rating,
        reviewsCount: foundCatalog.reviewsCount,
        category: foundCatalog.categoryLabel || foundCatalog.category,
      }
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
        onNavigateLogin={() => navigateTo('login')}
        onNavigateToHome={() => navigateTo('home')}
        onNavigateHome={() => navigateTo('home')}
        onRegisterSuccess={() => {
          setIsLoggedIn(true)
          navigateTo('profile')
        }}
      />
    )
  }

  // 2. Login Page View
  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigateToRegister={() => navigateTo('register')}
        onNavigateToHome={() => navigateTo('home')}
        onLoginSuccess={() => {
          setIsLoggedIn(true)
          navigateTo('profile')
        }}
      />
    )
  }

  // 3. Catalog Page View (The Catalog)
  if (currentView === 'catalog' || currentView === 'katalog') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E2621]">
        {/* Navigation Bar */}
        {renderNavbar('catalog')}

        {/* Catalog Main Content */}
        <CatalogPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
          initialCategory={selectedCategory}
        />
      </div>
    )
  }

  // 4. Book Detail Page View
  if (currentView === 'book-detail') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {/* Navigation Bar */}
        {renderNavbar('home')}

        {/* Book Detail Content */}
        <main className="flex-1">
          <BookDetailPage
            book={getActiveBookData()}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat)
              navigateTo('catalog')
            }}
            onNavigateRegister={() => navigateTo('register')}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  // 5. Authors Directory Page View (Rekomendasi Penulis Terbaik & Populer)
  if (currentView === 'authors') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {/* Navigation Bar */}
        {renderNavbar('author')}

        {/* Authors Recommendations Directory */}
        <main className="flex-1">
          <AuthorsDirectoryPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthorDetail={(authorId) => navigateTo('author-detail', authorId)}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  // 6. Author Detail Page View (Detail Profil Penulis Spesifik)
  if (currentView === 'author-detail' || currentView === 'author') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {/* Navigation Bar */}
        {renderNavbar('author')}

        {/* Author Page Content */}
        <main className="flex-1">
          <AuthorPage
            authorId={selectedAuthorId}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthorsDirectory={() => navigateTo('authors')}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  // 7. User Profile Page View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {/* Navigation Bar */}
        {renderNavbar('profile')}

        {/* Profile Page Content */}
        <main className="flex-1">
          <ProfilePage
            initialTab={profileTab}
            userProfile={userProfile}
            onUpdateProfile={(updated) =>
              setUserProfile((prev) => ({
                ...prev,
                name: updated.name,
                avatar: updated.avatar
              }))
            }
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  // 8. Home / Landing Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
      {/* Top Navigation */}
      {renderNavbar('home')}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section: Editor's Choice */}
        <HeroSection
          onNavigateRegister={() => navigateTo('register')}
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
        />

        {/* Category Filter Pills Bar */}
        <CategoryFilterPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            handleSelectCategory(cat)
            navigateTo('catalog')
          }}
        />

        {/* Trending / Highly Rated Books */}
        <TrendingSection 
          activeCategory={selectedCategory} 
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
          onNavigateCatalog={() => navigateTo('catalog')}
        />

        {/* Curated Editorial Collections */}
        <CuratedCollectionsSection
          onNavigateCatalog={() => navigateTo('catalog')}
        />

        {/* Recent Community Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onNavigateCatalog={() => navigateTo('catalog')} />
    </div>
  )
}
