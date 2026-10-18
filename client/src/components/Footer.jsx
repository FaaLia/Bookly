import React, { useState } from 'react'
import { BookMarked, Send, Heart } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="w-full bg-[#F6F3ED] border-t border-[#C2C8C2]/30 pt-16 pb-12 text-[#424844]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C2C8C2]/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#192F23] flex items-center justify-center text-[#FCF9F3]">
                <BookMarked className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-medium text-[#192F23]">
                Bookly<span className="text-[#695C56]">.</span>
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-[#424844] max-w-sm">
              Ruang teduh bagi para pecinta sastra, pemikir, dan pembaca setia untuk menemukan bacaan bermakna dan membagikan ulasan mendalam.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#192F23]">Eksplorasi</h5>
            <ul className="flex flex-col gap-2 font-sans text-sm">
              <li><a href="#trending" className="hover:text-[#192F23] transition-colors">Buku Terpopuler</a></li>
              <li><a href="#collections" className="hover:text-[#192F23] transition-colors">Koleksi Kurasi</a></li>
              <li><a href="#categories" className="hover:text-[#192F23] transition-colors">Pilihan Kategori</a></li>
              <li><a href="#reviews" className="hover:text-[#192F23] transition-colors">Ulasan Pembaca</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#192F23]">Komunitas</h5>
            <ul className="flex flex-col gap-2 font-sans text-sm">
              <li><a href="#" className="hover:text-[#192F23] transition-colors">Klub Buku</a></li>
              <li><a href="#" className="hover:text-[#192F23] transition-colors">Wawancara Penulis</a></li>
              <li><a href="#" className="hover:text-[#192F23] transition-colors">Pedoman Komunitas</a></li>
              <li><a href="#" className="hover:text-[#192F23] transition-colors">Bantuan</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-3">
            <h5 className="font-serif text-base font-semibold text-[#192F23]">Surat Sastra</h5>
            <p className="font-sans text-xs text-[#737973] leading-normal">
              Daftar buletin mingguan kami untuk esai buku pilihan dan rekomendasi langsung.
            </p>
            {subscribed ? (
              <p className="font-sans text-xs text-[#192F23] bg-[#DCE5DF] p-2.5 rounded font-medium">
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
                  className="w-full px-3 py-2 text-xs bg-[#FCF9F3] border border-[#C2C8C2]/40 rounded text-[#1C1C18] focus:outline-none focus:border-[#192F23]"
                />
                <button
                  type="submit"
                  aria-label="Kirim surel"
                  className="p-2 bg-[#192F23] hover:bg-[#13241b] text-white rounded transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#737973]">
          <p>© {new Date().getFullYear()} Bookly. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1">
            Dirancang dengan <Heart className="w-3 h-3 text-[#695C56] fill-[#695C56]" /> untuk pencinta buku.
          </p>
        </div>
      </div>
    </footer>
  )
}
