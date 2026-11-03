import React, { useState } from 'react'
import { BookMarked, Search, Menu, X, User, LogOut } from 'lucide-react'

export default function Navbar({
  onSearchChange,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateHome,
  onNavigateAuthor,
  onNavigateProfile,
  onLogout,
  isLoggedIn = false,
  activeNav = 'home',
  userName = 'Dewi',
  userAvatar = null
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    if (onSearchChange) onSearchChange(e.target.value)
  }

  const handleNavClick = (action) => {
    setMobileMenuOpen(false)
    if (action) action()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FCF9F3]/95 backdrop-blur-md border-b border-[#ECE4D8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault()
            handleNavClick(onNavigateHome)
          }} 
          className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0"
        >
          <div className="w-8 h-8 rounded bg-[#192F23] flex items-center justify-center text-[#FCF9F3] shadow-sm transition-transform group-hover:scale-105">
            <BookMarked className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#192F23]">
            Bookly<span className="text-[#695C56]">.</span>
          </span>
        </a>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-sm relative">
          <Search className="w-4 h-4 text-[#737973] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Cari judul, penulis, atau topik..."
            className="w-full pl-9 pr-4 py-2 bg-[#F6F3ED] border border-[#C2C8C2]/40 rounded-full text-sm text-[#1C1C18] placeholder-[#737973] focus:outline-none focus:ring-1 focus:ring-[#192F23] focus:border-[#192F23] transition-all"
          />
        </div>

        {/* Clean Natural Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-[#424844] font-sans text-sm font-medium">
          <a
            href="#trending"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateHome)
              setTimeout(() => {
                const el = document.getElementById('trending')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className={`transition-colors py-1 ${activeNav === 'home' ? 'text-[#192F23] font-semibold border-b-2 border-[#192F23]' : 'hover:text-[#192F23]'}`}
          >
            Populer
          </a>
          
          <a 
            href="#/author" 
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateAuthor)
            }}
            className={`transition-colors py-1 ${activeNav === 'author' ? 'text-[#192F23] font-semibold border-b-2 border-[#192F23]' : 'hover:text-[#192F23]'}`}
          >
            Penulis
          </a>

          <a 
            href="#collections"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateHome)
              setTimeout(() => {
                const el = document.getElementById('collections')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className="hover:text-[#192F23] transition-colors py-1"
          >
            Koleksi
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
            className="hover:text-[#192F23] transition-colors py-1"
          >
            Ulasan
          </a>
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            /* Logged-in state: clean profile avatar with dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1 pl-2 pr-3 rounded-full bg-[#FAF6F0] hover:bg-[#EFE9DF] border border-[#DFD5C7] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex items-center justify-center text-[#192F23]">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName || 'Profil'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#555C56]" />
                  )}
                </div>
                <span className="text-xs font-medium text-[#192F23]">
                  {userName ? userName.split(' ')[0] : 'Profil'}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8DFD3] rounded-xl shadow-lg py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      if (onNavigateProfile) onNavigateProfile()
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#192F23] hover:bg-[#FAF7F2] flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Lihat Profil</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      if (onLogout) onLogout()
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-[#F0EEE8]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest state: clean, standard Masuk & Mulai Membaca */
            <>
              <button 
                type="button" 
                onClick={onNavigateLogin}
                className="px-3 py-2 text-sm font-sans font-medium text-[#192F23] hover:text-black transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button 
                type="button" 
                onClick={onNavigateRegister}
                className="px-4 py-2 text-sm font-sans font-medium text-[#FCF9F3] bg-[#192F23] hover:bg-[#13241b] rounded transition-all shadow-sm cursor-pointer"
              >
                Mulai Membaca
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#192F23] hover:bg-[#F0EEE8] rounded"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C2C8C2]/30 bg-[#FCF9F3] px-6 py-4 flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737973] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari judul, penulis, atau topik..."
              className="w-full pl-9 pr-4 py-2 bg-[#F6F3ED] border border-[#C2C8C2]/40 rounded-full text-xs text-[#1C1C18]"
            />
          </div>

          <nav className="flex flex-col gap-3 font-sans text-sm font-medium text-[#424844] pt-1">
            <a 
              href="#trending" 
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateHome)
              }}
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Populer
            </a>
            <a 
              href="#/author" 
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateAuthor)
              }}
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Penulis
            </a>
            <a 
              href="#collections" 
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateHome)
              }}
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Koleksi
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateHome)
              }}
              className="hover:text-[#192F23] py-1"
            >
              Ulasan
            </a>
            {isLoggedIn && (
              <a 
                href="#/profile" 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(onNavigateProfile)
                }}
                className="hover:text-[#192F23] py-1 font-semibold text-[#192F23] border-t border-[#C2C8C2]/10 pt-2"
              >
                Profil Saya
              </a>
            )}
          </nav>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#C2C8C2]/30">
            {isLoggedIn ? (
              <button 
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onLogout) onLogout()
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-red-600 border border-red-200 rounded"
              >
                Keluar
              </button>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateLogin) onNavigateLogin()
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-[#192F23] border border-[#C2C8C2] rounded"
                >
                  Masuk
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateRegister) onNavigateRegister()
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-white bg-[#192F23] rounded shadow-sm"
                >
                  Mulai Membaca
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
