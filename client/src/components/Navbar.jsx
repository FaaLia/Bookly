import React, { useState } from 'react'
import { Search, Menu, X, User, LogOut } from 'lucide-react'

export default function Navbar({
  onSearchChange,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateAuthor,
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
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE7DF] h-[81px]">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo: Font Serif Elegan tanpa titik oranye - Langsung balik ke Beranda paling atas */}
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
          {/* Link 1: Populer / Beranda - Langsung buka halaman beranda paling atas */}
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

          {/* Link 2: Katalog (Active on Catalog Page) */}
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

          {/* Link 3: Penulis */}
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

          {/* Link 4: Ulasan */}
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

        {/* Search Pill & Profil Avatar - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Pill */}
          <div className="w-[288px] h-8 bg-[#EEE9E0] rounded-full px-3.5 flex items-center gap-2">
            <Search className="w-[13.5px] h-[13.5px] text-[#7A7670] flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari ulasan, buku..."
              className="w-full bg-transparent font-sans text-xs text-[#1E2621] placeholder-[#88837A] focus:outline-none"
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

            {/* Profile Dropdown for Logged-In User */}
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
          <div className="w-full h-9 bg-[#EEE9E0] rounded-full px-3.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#7A7670] flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari ulasan, buku..."
              className="w-full bg-transparent font-sans text-xs text-[#1E2621] placeholder-[#88837A] focus:outline-none"
            />
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
