import React, { useState } from 'react'
import { BookMarked, Send, Heart } from 'lucide-react'

export default function Footer({ onNavigateCatalog, onNavigateCommunity }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleCommunityClick = (e, section) => {
    e.preventDefault()
    if (onNavigateCommunity) {
      onNavigateCommunity(section)
    }
  }

  return (
    <footer className="w-full bg-[#F6F3ED] border-t border-[#C2C8C2]/30 pt-16 pb-12 text-[#424844]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C2C8C2]/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl font-medium text-[#483E37]">
                Bookly
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-[#424844] max-w-sm">
              Ruang teduh bagi para pecinta sastra, pemikir, dan pembaca setia untuk menemukan bacaan bermakna, menjelajahi klub buku, dan membagikan ulasan mendalam.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#483E37]">Eksplorasi</h5>
            <ul className="flex flex-col gap-2 font-sans text-sm">
              <li><a href="#trending" className="hover:text-[#483E37] transition-colors">Buku Terpopuler</a></li>
              <li>
                <a
                  href="#/catalog"
                  onClick={(e) => {
                    if (onNavigateCatalog) {
                      e.preventDefault()
                      onNavigateCatalog()
                    }
                  }}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Katalog Buku
                </a>
              </li>
              <li><a href="#categories" className="hover:text-[#483E37] transition-colors">Pilihan Kategori</a></li>
              <li>
                <a
                  href="#/community"
                  onClick={(e) => handleCommunityClick(e, 'all')}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Ruang Komunitas
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 - Komunitas Bookly */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#483E37]">Komunitas</h5>
            <ul className="flex flex-col gap-2 font-sans text-sm">
              <li>
                <a
                  href="#/community?tab=clubs"
                  onClick={(e) => handleCommunityClick(e, 'clubs')}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Klub Buku
                </a>
              </li>
              <li>
                <a
                  href="#/community?tab=interviews"
                  onClick={(e) => handleCommunityClick(e, 'interviews')}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Wawancara Penulis
                </a>
              </li>
              <li>
                <a
                  href="#/community?tab=guidelines"
                  onClick={(e) => handleCommunityClick(e, 'guidelines')}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Pedoman Komunitas
                </a>
              </li>
              <li>
                <a
                  href="#/community?tab=help"
                  onClick={(e) => handleCommunityClick(e, 'help')}
                  className="hover:text-[#483E37] transition-colors cursor-pointer"
                >
                  Bantuan
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#483E37]">Surat Sastra</h5>
            <p className="font-sans text-xs text-[#736E65] leading-normal">
              Daftar buletin mingguan kami untuk esai buku pilihan dan rekomendasi langsung.
            </p>
            {subscribed ? (
              <p className="font-sans text-xs text-[#483E37] bg-[#EAE2DC] p-2.5 rounded font-medium">
                Terima kasih telah bergabung!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="surel@domain.com"
                  required
                  className="w-full px-3 py-2 text-xs bg-[#FCF9F3] border border-[#C2C8C2]/40 rounded text-[#1C1C18] focus:outline-none focus:border-[#483E37]"
                />
                <button
                  type="submit"
                  aria-label="Kirim surel"
                  className="p-2 bg-[#483E37] hover:bg-[#3D342E] text-white rounded transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#736E65]">
          <p>© {new Date().getFullYear()} Bookly. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1">
            Dirancang dengan <Heart className="w-3 h-3 text-[#695C56] fill-[#695C56]" /> untuk pencinta buku.
          </p>
        </div>
      </div>
    </footer>
  )
}
