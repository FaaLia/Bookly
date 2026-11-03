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
import { getBookDetailApi } from './services/bookApi'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('')

  // Cache untuk buku yang diambil dari API / dinamis
  const [dynamicBooksCache, setDynamicBooksCache] = useState({})
  const [isLoadingBookDetail, setIsLoadingBookDetail] = useState(false)

  // Auth State tersimpan di LocalStorage agar tidak hilang saat reload
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem('bookly_auth_user')
    } catch {
      return false
    }
  })

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('bookly_auth_user')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return {
      name: 'Dewi Anggraini',
      email: 'dewi.anggraini@literasi.id',
      handle: '@dewianggr',
      avatar: null,
      role: 'Pembaca Aktif'
    }
  })

  // Read route from URL hash
  const parseHash = () => {
    const rawHash = window.location.hash || ''
    const hash = rawHash.toLowerCase()

    if (hash === '#register' || hash === '#/register') {
      return { view: 'register', bookId: null, authorId: null, tab: 'reading', search: '' }
    }
    if (hash === '#login' || hash === '#/login') {
      return { view: 'login', bookId: null, authorId: null, tab: 'reading', search: '' }
    }

    // Catalog page route
    if (
      hash.startsWith('#catalog') ||
      hash.startsWith('#/catalog') ||
      hash.startsWith('#katalog') ||
      hash.startsWith('#/katalog') ||
      hash.startsWith('#collections') ||
      hash.startsWith('#/collections')
    ) {
      let search = ''
      const qIndex = rawHash.indexOf('q=')
      if (qIndex !== -1) {
        search = decodeURIComponent(rawHash.slice(qIndex + 2).split('&')[0])
      }
      return { view: 'catalog', bookId: null, authorId: null, tab: 'reading', search }
    }

    // Author detail route
    if (hash.startsWith('#/author/') || hash.startsWith('#author/')) {
      const parts = rawHash.split('/')
      const authorId = parts[2] || 'julian-cross'
      return { view: 'author-detail', bookId: null, authorId, tab: 'reading', search: '' }
    }

    // Authors directory
    if (hash === '#author' || hash === '#/author' || hash === '#penulis' || hash === '#/penulis') {
      return { view: 'authors', bookId: null, authorId: null, tab: 'reading', search: '' }
    }

    // Profile route
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
      return { view: 'profile', bookId: null, authorId: null, tab, search: '' }
    }

    // Book Detail route
    if (hash.startsWith('#book') || hash.startsWith('#/book') || hash === '#detail') {
      const parts = rawHash.split('/')
      const id = parts[2] || 'memory-of-water'
      return { view: 'book-detail', bookId: id, authorId: null, tab: 'reading', search: '' }
    }

    return { view: 'home', bookId: null, authorId: null, tab: 'reading', search: '' }
  }

  const initialRoute = parseHash()
  const [currentView, setCurrentView] = useState(initialRoute.view)
  const [selectedBookId, setSelectedBookId] = useState(initialRoute.bookId || 'memory-of-water')
  const [selectedAuthorId, setSelectedAuthorId] = useState(initialRoute.authorId || 'julian-cross')
  const [profileTab, setProfileTab] = useState(initialRoute.tab || 'reading')

  useEffect(() => {
    if (initialRoute.search) {
      setCatalogSearchQuery(initialRoute.search)
    }
  }, [])

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [currentView])

  // Listen to browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash()
      setCurrentView(route.view)
      if (route.bookId) setSelectedBookId(route.bookId)
      if (route.authorId) setSelectedAuthorId(route.authorId)
      if (route.tab) setProfileTab(route.tab)
      if (route.search) setCatalogSearchQuery(route.search)

      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Fetch book detail from API if not found in mock data
  useEffect(() => {
    if (currentView === 'book-detail' && selectedBookId) {
      const isMock =
        selectedBookId === 'memory-of-water' ||
        CATALOG_BOOKS.some((b) => b.id === selectedBookId) ||
        TRENDING_BOOKS.some((b) => b.id === selectedBookId)

      if (!isMock && !dynamicBooksCache[selectedBookId]) {
        setIsLoadingBookDetail(true)
        getBookDetailApi(selectedBookId)
          .then((book) => {
            if (book) {
              setDynamicBooksCache((prev) => ({ ...prev, [selectedBookId]: book }))
            }
            setIsLoadingBookDetail(false)
          })
          .catch(() => setIsLoadingBookDetail(false))
      }
    }
  }, [currentView, selectedBookId, dynamicBooksCache])

  const navigateTo = (view, paramId = null, tab = 'reading', bookObj = null) => {
    setCurrentView(view)

    if (bookObj && paramId) {
      setDynamicBooksCache((prev) => ({ ...prev, [paramId]: bookObj }))
    }

    if (view === 'register') {
      window.location.hash = '#register'
    } else if (view === 'login') {
      window.location.hash = '#login'
    } else if (view === 'catalog' || view === 'katalog') {
      if (paramId && typeof paramId === 'string') {
        setCatalogSearchQuery(paramId)
        window.location.hash = `#/catalog?q=${encodeURIComponent(paramId)}`
      } else {
        window.location.hash = '#/catalog'
      }
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

  // Handle Auth login/register success
  const handleAuthSuccess = (userData = {}) => {
    const updated = {
      name: userData?.name || 'Dewi Anggraini',
      email: userData?.email || 'dewi.anggraini@literasi.id',
      handle: userData?.name ? `@${userData.name.toLowerCase().replace(/\s+/g, '')}` : '@dewianggr',
      avatar: null,
      role: 'Pembaca Aktif'
    }
    setIsLoggedIn(true)
    setUserProfile(updated)
    try {
      localStorage.setItem('bookly_auth_user', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
    navigateTo('profile')
  }

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    try {
      localStorage.removeItem('bookly_auth_user')
    } catch (e) {
      console.error(e)
    }
    navigateTo('home')
  }

  // Handle Search from Navbar
  const handleGlobalSearch = (query) => {
    const q = (query || '').trim()
    setCatalogSearchQuery(q)
    navigateTo('catalog', q)
  }

  // Render unified navbar across views
  const renderNavbar = (activeNav = 'home') => (
    <Navbar
      activeNav={activeNav}
      isLoggedIn={isLoggedIn}
      userName={userProfile.name}
      userAvatar={userProfile.avatar}
      initialSearch={catalogSearchQuery}
      onSearchSubmit={handleGlobalSearch}
      onNavigateBookDetail={(id, bookObj) => navigateTo('book-detail', id, 'reading', bookObj)}
      onLogout={handleLogout}
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
    // 1. Cek dynamic / API cache
    if (selectedBookId && dynamicBooksCache[selectedBookId]) {
      const dyn = dynamicBooksCache[selectedBookId]
      return {
        ...BOOK_DETAILS,
        id: dyn.id,
        title: dyn.title,
        author: dyn.author,
        coverImage: dyn.coverImage,
        rating: dyn.rating,
        reviewsCount: dyn.reviewsCount,
        description: dyn.description || BOOK_DETAILS.description,
        publisher: dyn.publisher || BOOK_DETAILS.publisher,
        publishedDate: dyn.publishedDate || dyn.year || BOOK_DETAILS.publishedDate,
        pages: dyn.pages || BOOK_DETAILS.pages,
        isbn: dyn.isbn || BOOK_DETAILS.isbn,
        category: dyn.category || BOOK_DETAILS.category,
        reviews: dyn.reviews || BOOK_DETAILS.reviews,
      }
    }

    // 2. Default mock book
    if (!selectedBookId || selectedBookId === 'memory-of-water') {
      return BOOK_DETAILS
    }

    // 3. Cek Katalog Kurasi
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
        pages: foundCatalog.pages || BOOK_DETAILS.pages,
        format: foundCatalog.format || BOOK_DETAILS.format,
      }
    }

    // 4. Cek Trending Section
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
        onRegisterSuccess={handleAuthSuccess}
      />
    )
  }

  // 2. Login Page View
  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigateToRegister={() => navigateTo('register')}
        onNavigateToHome={() => navigateTo('home')}
        onLoginSuccess={handleAuthSuccess}
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
          onNavigateBookDetail={(id, bookObj) => navigateTo('book-detail', id, 'reading', bookObj)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
          initialCategory={selectedCategory}
          initialSearchQuery={catalogSearchQuery}
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
          {isLoadingBookDetail ? (
            <div className="max-w-[1280px] mx-auto px-6 py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-3 border-[#1B2820] border-t-transparent animate-spin" />
              <p className="font-serif text-lg text-[#1E2621]">
                Memuat data buku...
              </p>
            </div>
          ) : (
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
          )}
        </main>

        {/* Footer */}
        <Footer onNavigateCatalog={() => navigateTo('catalog')} />
      </div>
    )
  }

  // 5. Authors Directory Page View
  if (currentView === 'authors') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {renderNavbar('author')}
        <main className="flex-1">
          <AuthorsDirectoryPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthorDetail={(authorId) => navigateTo('author-detail', authorId)}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>
        <Footer onNavigateCatalog={() => navigateTo('catalog')} />
      </div>
    )
  }

  // 6. Author Detail Page View
  if (currentView === 'author-detail' || currentView === 'author') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {renderNavbar('author')}
        <main className="flex-1">
          <AuthorPage
            authorId={selectedAuthorId}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthorsDirectory={() => navigateTo('authors')}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>
        <Footer onNavigateCatalog={() => navigateTo('catalog')} />
      </div>
    )
  }

  // 7. User Profile Page View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
        {renderNavbar('profile')}
        <main className="flex-1">
          <ProfilePage
            initialTab={profileTab}
            userProfile={userProfile}
            onUpdateProfile={(updated) => {
              const merged = { ...userProfile, ...updated }
              setUserProfile(merged)
              try {
                localStorage.setItem('bookly_auth_user', JSON.stringify(merged))
              } catch (e) {}
            }}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
            onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          />
        </main>
        <Footer onNavigateCatalog={() => navigateTo('catalog')} />
      </div>
    )
  }

  // 8. Home / Landing Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1C1C18]">
      {renderNavbar('home')}
      <main className="flex-1">
        <HeroSection
          onNavigateRegister={() => navigateTo('register')}
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
        />
        <CategoryFilterPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            handleSelectCategory(cat)
            navigateTo('catalog')
          }}
        />
        <TrendingSection
          activeCategory={selectedCategory}
          onNavigateBookDetail={(id) => navigateTo('book-detail', id)}
          onNavigateAuthor={(authorId) => navigateTo('author-detail', authorId || 'julian-cross')}
          onNavigateCatalog={() => navigateTo('catalog')}
        />
        <CuratedCollectionsSection onNavigateCatalog={() => navigateTo('catalog')} />
        <ReviewsSection />
      </main>
      <Footer onNavigateCatalog={() => navigateTo('catalog')} />
    </div>
  )
}
