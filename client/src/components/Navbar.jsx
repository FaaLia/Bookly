import React, { useState } from 'react'
import { Search, Menu, X, User, LogOut, Users } from 'lucide-react'

export default function Navbar({
  onSearchChange,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateAuthor,
  onNavigateCommunity,
  onNavigateProfile,
  onLogout,
  isLoggedIn = false,
  activeNav = 'home',
  userName = 'Dewi Anggraini',
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

  const handleGoHome = (e) => {
    if (e) e.preventDefault()
    handleNavClick(onNavigateHome)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <header className="sticky top-0 z-50 bg-[#483E37]/95 backdrop-blur-md border-b border-[#5C4F46] h-[81px] transition-colors shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo: Warna warm ivory/cream disesuaikan dengan header taupe agar kontras & tidak nabrak */}
        <a
          href="#/"
          onClick={handleGoHome}
          className="flex items-center cursor-pointer flex-shrink-0 group"
          title="Kembali ke Beranda"
        >
          <span className="font-serif text-[30px] leading-9 font-medium tracking-tight text-[#FAF7F2] group-hover:text-[#E8DFD3] transition-colors">
            Bookly
          </span>
        </a>

        {/* Navigasi Tengah bergaya Pill / Tab - Desktop */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-sans font-medium">
          {/* Link 1: Populer / Beranda */}
          <a
            href="#/"
            onClick={handleGoHome}
            className={`transition-all cursor-pointer ${
              activeNav === 'home'
                ? 'px-5 py-2 bg-[#FAF7F2] text-[#483E37] font-semibold shadow-sm rounded-full'
                : 'px-4 py-2 text-[#E2DDD5] hover:text-white hover:bg-white/10 rounded-full'
            }`}
          >
            Populer
          </a>

          {/* Link 2: Katalog */}
          <a
            href="#/catalog"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateCatalog)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'catalog'
                ? 'px-5 py-2 bg-[#FAF7F2] text-[#483E37] font-semibold shadow-sm rounded-full'
                : 'px-4 py-2 text-[#E2DDD5] hover:text-white hover:bg-white/10 rounded-full'
            }`}
          >
            Katalog
          </a>

          {/* Link 3: Penulis */}
          <a
            href="#/author"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateAuthor)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'author'
                ? 'px-5 py-2 bg-[#FAF7F2] text-[#483E37] font-semibold shadow-sm rounded-full'
                : 'px-4 py-2 text-[#E2DDD5] hover:text-white hover:bg-white/10 rounded-full'
            }`}
          >
            Penulis
          </a>

          {/* Link 4: Komunitas (Menggantikan Ulasan) */}
          <a
            href="#/community"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(onNavigateCommunity)
            }}
            className={`transition-all cursor-pointer ${
              activeNav === 'community'
                ? 'px-5 py-2 bg-[#FAF7F2] text-[#483E37] font-semibold shadow-sm rounded-full'
                : 'px-4 py-2 text-[#E2DDD5] hover:text-white hover:bg-white/10 rounded-full'
            }`}
          >
            Komunitas
          </a>
        </nav>

        {/* Search Pill & Profil Avatar - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Pill - Disesuaikan dengan nuansa taupe */}
          <div className="w-[288px] h-9 bg-[#5A4F46] border border-[#6B5E53] rounded-full px-3.5 flex items-center gap-2 focus-within:border-[#FAF7F2]/60 focus-within:bg-[#62554B] transition-colors">
            <Search className="w-[13.5px] h-[13.5px] text-[#C4B9AD] flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari buku, klub, komunitas..."
              className="w-full bg-transparent font-sans text-xs text-[#FAF7F2] placeholder-[#C4B9AD] focus:outline-none"
            />
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
              className="w-9 h-9 rounded-full bg-[#5A4F46] hover:bg-[#685B51] border border-[#6B5E53] flex items-center justify-center text-[#FAF7F2] transition-colors cursor-pointer shadow-sm overflow-hidden"
            >
              {isLoggedIn && userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName || 'Profil'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-[14px] h-[14px] text-[#FAF7F2]" />
              )}
            </button>

            {/* Profile Dropdown for Logged-In User */}
            {isLoggedIn && profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#FAF7F2] border border-[#DFD5C7] rounded-xl shadow-xl py-1.5 z-50">
                <div className="px-4 py-2 border-b border-[#ECE7DF]">
                  <p className="text-xs font-semibold text-[#2E2722]">{userName}</p>
                  <p className="text-[11px] text-[#736E65]">Pembaca Aktif</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false)
                    if (onNavigateProfile) onNavigateProfile()
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#2E2722] hover:bg-[#EEE9E0] flex items-center gap-2 cursor-pointer transition-colors"
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
            className="p-2 text-[#FAF7F2] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#5C4F46] bg-[#483E37] px-6 py-4 flex flex-col gap-4 shadow-xl">
          <div className="w-full h-9 bg-[#5A4F46] border border-[#6B5E53] rounded-full px-3.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#C4B9AD] flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari buku, klub, komunitas..."
              className="w-full bg-transparent font-sans text-xs text-[#FAF7F2] placeholder-[#C4B9AD] focus:outline-none"
            />
          </div>

          <nav className="flex flex-col gap-1.5 font-sans text-sm font-medium pt-1">
            <a
              href="#/"
              onClick={handleGoHome}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-[#FAF7F2] text-[#483E37] font-semibold'
                  : 'text-[#E2DDD5] hover:bg-white/10'
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
                  ? 'bg-[#FAF7F2] text-[#483E37] font-semibold'
                  : 'text-[#E2DDD5] hover:bg-white/10'
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
                  ? 'bg-[#FAF7F2] text-[#483E37] font-semibold'
                  : 'text-[#E2DDD5] hover:bg-white/10'
              }`}
            >
              Penulis
            </a>

            <a
              href="#/community"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(onNavigateCommunity)
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'community'
                  ? 'bg-[#FAF7F2] text-[#483E37] font-semibold'
                  : 'text-[#E2DDD5] hover:bg-white/10'
              }`}
            >
              Komunitas
            </a>

            {isLoggedIn ? (
              <a
                href="#/profile"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(onNavigateProfile)
                }}
                className={`px-3 py-2 rounded-lg border-t border-[#5C4F46] mt-1 transition-colors cursor-pointer ${
                  activeNav === 'profile'
                    ? 'bg-[#FAF7F2] text-[#483E37] font-semibold'
                    : 'text-[#FAF7F2] hover:bg-white/10'
                }`}
              >
                Profil Saya
              </a>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-[#5C4F46] mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateLogin) onNavigateLogin()
                  }}
                  className="flex-1 py-2 text-center text-xs font-medium text-[#FAF7F2] bg-white/15 hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateRegister) onNavigateRegister()
                  }}
                  className="flex-1 py-2 text-center text-xs font-semibold text-[#483E37] bg-[#FAF7F2] hover:bg-white rounded-lg cursor-pointer transition-colors"
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
