import React, { useState } from 'react'
import { BookMarked, Search, Menu, X } from 'lucide-react'

export default function Navbar({ onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    if (onSearchChange) onSearchChange(e.target.value)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FCF9F3]/90 backdrop-blur-md border-b border-[#C2C8C2]/30">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded bg-[#192F23] flex items-center justify-center text-[#FCF9F3] shadow-sm transition-transform group-hover:scale-105">
            <BookMarked className="w-5 h-5" />
          </div>
          <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#192F23]">
            Bookly<span className="text-[#695C56]">.</span>
          </span>
        </a>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-sm relative">
          <Search className="w-4 h-4 text-[#737973] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Cari judul, penulis, atau topik..."
            className="w-full pl-9 pr-4 py-2 bg-[#F6F3ED] border border-[#C2C8C2]/40 rounded-full text-sm text-[#1C1C18] placeholder-[#737973] focus:outline-none focus:ring-1 focus:ring-[#192F23] focus:border-[#192F23] transition-all"
          />
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-[#424844] font-sans text-sm font-medium">
          <a href="#trending" className="hover:text-[#192F23] transition-colors">Populer</a>
          <a href="#collections" className="hover:text-[#192F23] transition-colors">Koleksi</a>
          <a href="#reviews" className="hover:text-[#192F23] transition-colors">Ulasan</a>
          <a href="#categories" className="hover:text-[#192F23] transition-colors">Kategori</a>
        </nav>

        {/* User CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-sans font-medium text-[#192F23] hover:text-black transition-colors"
          >
            Masuk
          </button>
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-sans font-medium text-[#FCF9F3] bg-[#192F23] hover:bg-[#13241b] rounded transition-all shadow-sm"
          >
            Mulai Membaca
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
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
        <div className="md:hidden border-t border-[#C2C8C2]/30 bg-[#FCF9F3] px-6 py-4 flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737973] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Cari judul buku atau penulis..."
              className="w-full pl-9 pr-4 py-2 bg-[#F6F3ED] border border-[#C2C8C2]/40 rounded-full text-sm text-[#1C1C18]"
            />
          </div>
          <nav className="flex flex-col gap-3 font-sans text-base font-medium text-[#424844] pt-2">
            <a 
              href="#trending" 
              onClick={() => setMobileMenuOpen(false)} 
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Populer
            </a>
            <a 
              href="#collections" 
              onClick={() => setMobileMenuOpen(false)} 
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Koleksi
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)} 
              className="hover:text-[#192F23] py-1 border-b border-[#C2C8C2]/10"
            >
              Ulasan
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)} 
              className="hover:text-[#192F23] py-1"
            >
              Kategori
            </a>
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#C2C8C2]/30">
            <button className="w-full py-2.5 text-center text-sm font-medium text-[#192F23] border border-[#C2C8C2] rounded">
              Masuk
            </button>
            <button className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#192F23] rounded shadow-sm">
              Mulai Membaca
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
