import React, { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, User, LogOut, Star, ArrowRight, BookOpen, Loader2 } from 'lucide-react'
import { searchBooksApi } from '../services/bookApi'

export default function Navbar({
  onSearchChange,
  onSearchSubmit,
  initialSearch = '',
  onNavigateLogin,
  onNavigateRegister,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateAuthor,
  onNavigateProfile,
  onNavigateBookDetail,
  onLogout,
  isLoggedIn = false,
  activeNav = 'home',
  userName = 'Dewi Anggraini',
  userAvatar = null
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Live Quick Search States
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchContainerRef = useRef(null)
  const mobileSearchContainerRef = useRef(null)

  useEffect(() => {
    setSearchValue(initialSearch)
  }, [initialSearch])

  // Debounced Live Search for Quick Floating Results
  useEffect(() => {
    const trimmed = (searchValue || '').trim()
    if (trimmed.length < 2) {
      setSearchResults([])
      setIsSearching(false)
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    setShowDropdown(true)

    const timer = setTimeout(() => {
      searchBooksApi(trimmed, { limit: 5 })
        .then((res) => {
          setSearchResults(res.books?.slice(0, 5) || [])
          setIsSearching(false)
        })
        .catch(() => {
          setSearchResults([])
          setIsSearching(false)
        })
    }, 280)

    return () => clearTimeout(timer)
  }, [searchValue])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target) &&
        mobileSearchContainerRef.current &&
        !mobileSearchContainerRef.current.contains(e.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchValue(val)
    if (onSearchChange) onSearchChange(val)
  }

  const handleSubmitSearch = (e) => {
    if (e) e.preventDefault()
    // Jika ada hasil pencarian pertama dan user tekan Enter, langsung buka buku pertama
    if (searchResults.length > 0 && onNavigateBookDetail) {
      handleSelectBook(searchResults[0])
      return
    }
    // Atau buka di katalog jika user memang menginginkannya
    if (onSearchSubmit) {
      onSearchSubmit(searchValue)
    } else if (onNavigateCatalog) {
      onNavigateCatalog(searchValue)
    }
    setShowDropdown(false)
    setMobileMenuOpen(false)
  }

  const handleSelectBook = (book) => {
    setShowDropdown(false)
    setMobileMenuOpen(false)
    if (onNavigateBookDetail) {
      onNavigateBookDetail(book.id, book)
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setSearchResults([])
    setShowDropdown(false)
    if (onSearchChange) onSearchChange('')
    if (onSearchSubmit) onSearchSubmit('')
  }

  const handleNavClick = (action) => {
    setMobileMenuOpen(false)
    setShowDropdown(false)
    if (action) action()
  }

  const handleGoHome = (e) => {
    if (e) e.preventDefault()
    handleNavClick(onNavigateHome)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE7DF] h-[81px]">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo: Font Serif Elegan */}
        <a
          href="#/"
          onClick={handleGoHome}
          className="flex items-center cursor-pointer flex-shrink-0 group"
          title="Kembali ke Beranda"
        >
          <span className="font-serif text-[30px] leading-9 font-medium tracking-tight text-[#1E2621]">
            Bookly
          </span>
        </a>

        {/* Navigasi Tengah bergaya Pill / Tab - Desktop */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-sans font-medium">
          <a
            href="#/"
            onClick={handleGoHome}
            className={`transition-all cursor-pointer ${
              activeNav === 'home'
                ? 'px-5 py-2 bg-[#1B2820] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full'
                : 'px-4 py-2 text-[#4A4742] hover:bg-[#EEE9E0] rounded-full'
            }`}
          >
            Populer
          </a>

          <a
            href="#/catalog"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateCatalog)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'catalog'
                ? 'px-5 py-2 bg-[#1B2820] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full'
                : 'px-4 py-2 text-[#4A4742] hover:bg-[#EEE9E0] rounded-full'
            }`}
          >
            Katalog
          </a>

          <a
            href="#/author"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateAuthor)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'author'
                ? 'px-5 py-2 bg-[#1B2820] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full'
                : 'px-4 py-2 text-[#4A4742] hover:bg-[#EEE9E0] rounded-full'
            }`}
          >
            Penulis
          </a>

          <a
            href="#reviews"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateHome)
              setTimeout(() => {
                const el = document.getElementById('reviews')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'reviews'
                ? 'px-5 py-2 bg-[#1B2820] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full'
                : 'px-4 py-2 text-[#4A4742] hover:bg-[#EEE9E0] rounded-full'
            }`}
          >
            Ulasan
          </a>
        </nav>

        {/* Search Pill Desktop dengan Instant Live Dropdown */}
        <div className="hidden sm:flex items-center gap-3">
          <div ref={searchContainerRef} className="relative">
            <form
              onSubmit={handleSubmitSearch}
              className="w-[288px] h-8 bg-[#EEE9E0] rounded-full px-3.5 flex items-center gap-2 focus-within:ring-1 focus-within:ring-[#1B2820]/30 transition-shadow"
            >
              <button
                type="submit"
                aria-label="Cari Buku"
                className="text-[#7A7670] hover:text-[#1E2621] cursor-pointer flex-shrink-0 transition-colors"
              >
                {isSearching ? (
                  <Loader2 className="w-[13.5px] h-[13.5px] animate-spin text-[#1B2820]" />
                ) : (
                  <Search className="w-[13.5px] h-[13.5px]" />
                )}
              </button>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                onFocus={() => {
                  if (searchValue.trim().length >= 2) setShowDropdown(true)
                }}
                placeholder="Cari judul buku, penulis..."
                className="w-full bg-transparent font-sans text-xs text-[#1E2621] placeholder-[#88837A] focus:outline-none"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Hapus pencarian"
                  className="text-[#7A7670] hover:text-[#1E2621] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Floating Instant Live Search Results Dropdown */}
            {showDropdown && searchValue.trim().length >= 2 && (
              <div className="absolute right-0 top-full mt-2 w-[340px] bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 border-b border-[#ECE7DF] flex items-center justify-between text-[11px] text-[#736E65] px-3 font-medium">
                  <span>Hasil Instan</span>
                  {isSearching && <span>Mencari...</span>}
                </div>

                <div className="max-h-[340px] overflow-y-auto divide-y divide-[#ECE7DF]/60">
                  {isSearching && searchResults.length === 0 ? (
                    <div className="py-8 flex flex-col items-center justify-center gap-2 text-xs text-[#736E65]">
                      <Loader2 className="w-5 h-5 animate-spin text-[#1B2820]" />
                      <span>Menemukan buku...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => handleSelectBook(book)}
                        className="p-2.5 hover:bg-[#EEE9E0] transition-colors cursor-pointer flex items-center gap-3 group"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded shadow-xs flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-medium text-xs text-[#1E2621] group-hover:text-[#13241b] line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-[#736E65] line-clamp-1 mt-0.5">
                            {book.author}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5 text-[#C98E28]">
                              <Star className="w-2.5 h-2.5 fill-[#C98E28]" />
                              <span className="text-[10px] font-medium text-[#1E2621]">
                                {book.rating}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#8C867C]">• {book.year}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 px-4 text-center text-xs text-[#736E65]">
                      Tidak ada buku yang cocok dengan "{searchValue}".
                    </div>
                  )}
                </div>

                {/* Footer link jika user ingin membuka di katalog */}
                <div className="p-2.5 bg-[#F4EFE6] border-t border-[#ECE7DF] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSearchSubmit) onSearchSubmit(searchValue)
                      else if (onNavigateCatalog) onNavigateCatalog(searchValue)
                      setShowDropdown(false)
                    }}
                    className="w-full text-center font-medium text-[#1B2820] hover:underline flex items-center justify-center gap-1.5 cursor-pointer py-1"
                  >
                    <span>Buka semua buku di Katalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button - Profil Pengguna */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  setProfileDropdownOpen(!profileDropdownOpen)
                } else {
                  if (onNavigateLogin) onNavigateLogin()
                }
              }}
              aria-label="Profil Pengguna"
              className="w-9 h-9 rounded-full bg-[#1B2820] hover:bg-[#25392D] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm overflow-hidden"
            >
              {isLoggedIn && userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName || 'Profil'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-[14px] h-[14px] text-white" />
              )}
            </button>

            {/* Profile Dropdown */}
            {isLoggedIn && profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl shadow-lg py-1.5 z-50">
                <div className="px-4 py-2 border-b border-[#ECE7DF]">
                  <p className="text-xs font-semibold text-[#1E2621]">{userName}</p>
                  <p className="text-[11px] text-[#736E65]">Pembaca Aktif</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false)
                    if (onNavigateProfile) onNavigateProfile()
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#1E2621] hover:bg-[#EEE9E0] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#736E65]" />
                  <span>Lihat Profil</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false)
                    if (onLogout) onLogout()
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-[#ECE7DF] cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E2621] hover:bg-[#EEE9E0] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ECE7DF] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-4 shadow-lg">
          <div ref={mobileSearchContainerRef} className="relative w-full">
            <form
              onSubmit={handleSubmitSearch}
              className="w-full h-9 bg-[#EEE9E0] rounded-full px-3.5 flex items-center gap-2"
            >
              <button type="submit" aria-label="Cari Buku" className="text-[#7A7670]">
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#1B2820]" />
                ) : (
                  <Search className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                onFocus={() => {
                  if (searchValue.trim().length >= 2) setShowDropdown(true)
                }}
                placeholder="Cari judul buku, penulis..."
                className="w-full bg-transparent font-sans text-xs text-[#1E2621] placeholder-[#88837A] focus:outline-none"
              />
              {searchValue && (
                <button type="button" onClick={handleClearSearch} className="text-[#7A7670]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Mobile Dropdown Results */}
            {showDropdown && searchValue.trim().length >= 2 && (
              <div className="mt-2 w-full bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl shadow-lg overflow-hidden">
                <div className="max-h-[260px] overflow-y-auto divide-y divide-[#ECE7DF]/60">
                  {searchResults.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleSelectBook(book)}
                      className="p-2.5 hover:bg-[#EEE9E0] transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-9 h-12 object-cover rounded shadow-xs"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-medium text-xs text-[#1E2621] line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-[#736E65] line-clamp-1">{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-1.5 font-sans text-sm font-medium pt-1">
            <a
              href="#/"
              onClick={handleGoHome}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-[#1B2820] text-white font-medium'
                  : 'text-[#4A4742] hover:bg-[#EEE9E0]'
              }`}
            >
              Populer
            </a>

            <a
              href="#/catalog"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateCatalog)
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'catalog'
                  ? 'bg-[#1B2820] text-white font-medium'
                  : 'text-[#4A4742] hover:bg-[#EEE9E0]'
              }`}
            >
              Katalog
            </a>

            <a
              href="#/author"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateAuthor)
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'author'
                  ? 'bg-[#1B2820] text-white font-medium'
                  : 'text-[#4A4742] hover:bg-[#EEE9E0]'
              }`}
            >
              Penulis
            </a>

            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateHome)
                setTimeout(() => {
                  const el = document.getElementById('reviews')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'reviews'
                  ? 'bg-[#1B2820] text-white font-medium'
                  : 'text-[#4A4742] hover:bg-[#EEE9E0]'
              }`}
            >
              Ulasan
            </a>

            {isLoggedIn ? (
              <a
                href="#/profile"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(onNavigateProfile)
                }}
                className={`px-3 py-2 rounded-lg border-t border-[#ECE7DF] mt-1 transition-colors cursor-pointer ${
                  activeNav === 'profile'
                    ? 'bg-[#1B2820] text-white font-medium'
                    : 'text-[#1E2621] hover:bg-[#EEE9E0]'
                }`}
              >
                Profil Saya
              </a>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-[#ECE7DF] mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateLogin) onNavigateLogin()
                  }}
                  className="flex-1 py-2 text-center text-xs font-medium text-[#1E2621] bg-[#EEE9E0] rounded-lg cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateRegister) onNavigateRegister()
                  }}
                  className="flex-1 py-2 text-center text-xs font-medium text-white bg-[#1B2820] rounded-lg cursor-pointer"
                >
                  Daftar
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
