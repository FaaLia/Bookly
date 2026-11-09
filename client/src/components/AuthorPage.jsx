import React, { useState, useEffect } from 'react'
import { authorsApi } from '../services/api'
import {
  ChevronRight,
  Share2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Quote,
  FileText,
  X
} from 'lucide-react'
import { AUTHORS_DETAIL_MAP } from '../data/mockData'

export const JULIAN_CROSS_DATA = {
  name: 'Julian Cross',
  tagline: 'Novelis Sastra Kontemporer',
  location: 'Oxford, Inggris',
  experience: 'Karier 30+ Tahun',
  portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  metrics: {
    publishedWorks: '8',
    criticScore: '9.4',
    activeReaders: '14.2k'
  },
  featuredQuote:
    '“Arsitektur bukan sekadar batu dan semen, melainkan cara kita memeluk kesunyian di antara reruntuhan waktu.”',
  bio: {
    para1:
      'Julian Cross lahir di pesisir utara Northumberland dan menghabiskan masa mudanya di antara mercusuar tua dan arsip peta maritim. Karya-karyanya memadukan ketelitian struktural arsitektur dengan lirisitas mendalam tentang kehilangan, memori, dan ruang batin manusia.',
    para2:
      'Sejak publikasi novel perdananya pada tahun 1994, Cross menolak kecepatan konsumsi sastra instan. Buku-bukunya telah diterjemahkan ke dalam lebih dari dua puluh bahasa, mengajarkan para pembaca untuk mendengarkan apa yang tersisa ketika riuh dunia mereda.'
  },
  awards: [
    { year: '2024', title: 'Medali Sastra Kontemplatif', desc: 'Dedikasi terhadap eksplorasi batiniah manusia' },
    { year: '2019', title: 'Man Booker International (Nominasi)', desc: 'Untuk novel The River\'s Bend' },
    { year: '2012', title: 'British Literary Guild Prize', desc: 'Inovasi estetika prosa modern' }
  ],
  books: [
    {
      id: 'the-memory-of-water',
      title: 'The Memory of Water',
      year: '2022',
      category: 'Novel Sastra',
      rating: 4.8,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
      desc: 'Kisah melankolis tentang arsitek yang kembali ke pesisir masa kecilnya untuk memugar mercusuar peninggalan keluarga.'
    },
    {
      id: 'the-rivers-bend',
      title: 'The River\'s Bend',
      year: '2018',
      category: 'Novel Sastra',
      rating: 4.9,
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
      desc: 'Perenungan tentang takdir, arus sungai Thames, dan percakapan-percakapan tak terucap di antara dua sahabat lama.'
    },
    {
      id: 'architecture-of-dust',
      title: 'The Architecture of Dust',
      year: '2024',
      category: 'Esai Filsafat',
      rating: 4.7,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      desc: 'Kumpulan esai tentang reruntuhan kota modern, materialitas ingatan, dan seni hidup lambat di era serba cepat.'
    }
  ]
}

export default function AuthorPage({
  authorId = 'julian-cross',
  onNavigateHome,
  onNavigateAuthorsDirectory,
  onNavigateBookDetail
}) {
  const author = (authorId && AUTHORS_DETAIL_MAP && AUTHORS_DETAIL_MAP[authorId]) || JULIAN_CROSS_DATA

  const [isFollowing, setIsFollowing] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedStudyBook, setSelectedStudyBook] = useState(null)

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2800)
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      triggerToast('Tautan profil penulis berhasil disalin!')
    }
  }

  return (
    <div className="w-full bg-[#FCF9F3] text-[#1C1C18] font-sans antialiased min-h-screen">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#483E37] text-white px-4 py-2.5 rounded-lg text-xs shadow-md flex items-center gap-2">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================
          SUB-SUB PAGE: BEDAH KARYA & PROSES KREATIF MAESTRO
          ======================================================== */}
      {selectedStudyBook ? (
        <div className="w-full pb-16 animate-fade-in">
          {/* Sub-sub page Breadcrumb */}
          <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
            <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973] overflow-x-auto no-scrollbar">
              <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                Beranda
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <button 
                onClick={onNavigateAuthorsDirectory || onNavigateHome} 
                className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap"
              >
                Penulis
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <button 
                onClick={() => setSelectedStudyBook(null)} 
                className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap"
              >
                {author.name}
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <span className="text-[#483E37] font-semibold truncate">
                Bedah Karya: {selectedStudyBook.title}
              </span>
            </div>
          </div>

          {/* Sub-sub page Header */}
          <section className="w-full pt-10 pb-10 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
            <div className="max-w-[1080px] mx-auto">
              <button
                type="button"
                onClick={() => setSelectedStudyBook(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Profil Penulis "{author.name}"</span>
              </button>

              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="w-32 h-48 sm:w-40 sm:h-60 rounded-xl overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] shadow-md flex-shrink-0">
                  <img
                    src={selectedStudyBook.cover}
                    alt={selectedStudyBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-md bg-[#EAE2DC] text-[#483E37]">
                      Studi Proses Kreatif &amp; Kritik
                    </span>
                    <span className="text-xs text-[#737973]">
                      Karya {author.name} • Tahun {selectedStudyBook.year}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2E2722] mb-2 leading-tight">
                    {selectedStudyBook.title}
                  </h1>

                  <p className="text-xs text-[#737973] mb-4">
                    Kategori: <strong className="text-[#483E37]">{selectedStudyBook.category}</strong> • Skor Apresiasi Kurator: <strong>{selectedStudyBook.rating} / 5.0</strong>
                  </p>

                  <p className="font-serif text-sm sm:text-base text-[#5A554E] leading-relaxed mb-6 max-w-2xl">
                    {selectedStudyBook.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigateBookDetail && onNavigateBookDetail(selectedStudyBook.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Buka Halaman Buku di Katalog</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedStudyBook(null)}
                      className="px-4 py-2 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] text-xs font-medium transition-colors cursor-pointer"
                    >
                      Lihat Karya Lainnya dari {author.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-sub page Body */}
          <main className="max-w-[1080px] mx-auto px-6 md:px-8 py-10 space-y-10">
            {/* 1. Genesis & Creative Process */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7767] block">
                Genesis Gagasan &amp; Manuskrip Awal
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2E2722]">
                Bagaimana "{selectedStudyBook.title}" Terlahir dari Kesunyian
              </h2>
              <p className="text-xs sm:text-sm text-[#424844] leading-relaxed font-serif">
                Proses penulisan naskah ini memakan waktu lebih dari empat tahun penjelajahan batin. {author.name} menolak menggunakan struktur plot linear konvensional, melainkan memilih ritme gelombang laut yang repetitif namun mengendap. Melalui manuskrip draf ketujuh, novel ini akhirnya menemukan bentuk finalnya yang menggabungkan presisi arsitektural dengan lirisitas duka yang sunyi.
              </p>
            </div>

            {/* 2. Key Manuscript Quotes */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-medium text-[#2E2722]">
                Kutipan Kunci Manuskrip &amp; Anotasi Sastra
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#ECE4D8] space-y-2">
                  <Quote className="w-5 h-5 text-[#8C7767]/50" />
                  <blockquote className="font-serif italic text-sm text-[#3E3832] leading-relaxed">
                    “Dinding rumah tua ini tidak diciptakan untuk menahan angin, melainkan untuk menyimpan gema dari mereka yang tak lagi pulang.”
                  </blockquote>
                  <span className="text-[11px] text-[#737973] block pt-2 border-t border-[#ECE4D8]">
                    Halaman 47 • Metafora Ruang &amp; Memori
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#ECE4D8] space-y-2">
                  <Quote className="w-5 h-5 text-[#8C7767]/50" />
                  <blockquote className="font-serif italic text-sm text-[#3E3832] leading-relaxed">
                    “Ada kesedihan yang begitu hening hingga kita mengiranya sebagai kedamaian.”
                  </blockquote>
                  <span className="text-[11px] text-[#737973] block pt-2 border-t border-[#ECE4D8]">
                    Halaman 184 • Puncak Kontemplasi Tokoh
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Literary Critique Analysis */}
            <div className="p-6 rounded-2xl bg-white border border-[#ECE4D8] space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#483E37] block">
                Catatan Kritik Sastra Internasional
              </span>
              <p className="text-xs sm:text-sm text-[#424844] leading-relaxed">
                "Karya ini menempatkan {author.name} di barisan terdepan penulis kontemplatif masa kini. Kemampuannya melukiskan ruang kosong di antara kata-kata menjadikan novel ini sebuah pengalaman meditatif yang jarang ditemukan dalam sastra cepat masa kini."
              </p>
              <div className="text-[11px] text-[#737973]">
                — The Literary Horizon Review, Edisi Kuratorial Khusus
              </div>
            </div>

            {/* Bottom Back Button */}
            <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedStudyBook(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Profil Penulis "{author.name}"</span>
              </button>
            </div>
          </main>
        </div>
      ) : (
        /* ========================================================
           HALAMAN PROFIL PENULIS UTAMA (LEVEL 2)
           ======================================================== */
        <div>
      {/* Breadcrumb */}
      <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8">
        <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
          <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors">
            Beranda
          </button>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <button 
            onClick={onNavigateAuthorsDirectory || onNavigateHome} 
            className="hover:text-[#483E37] transition-colors"
          >
            Penulis
          </button>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <span className="text-[#483E37] font-medium">{author.name}</span>
        </div>
      </div>

      {/* ========================================================
          1. AUTHOR INTRO / HERO (NATURAL & SPACIOUS)
          ======================================================== */}
      <section className="w-full py-12 md:py-16 px-6 md:px-8 border-b border-[#ECE4D8]">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
          
          {/* Author Portrait */}
          <div className="w-36 h-48 sm:w-44 sm:h-60 rounded-xl overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] shadow-sm flex-shrink-0">
            <img
              src={author.portraitImage}
              alt={author.name}
              className="w-full h-full object-cover grayscale contrast-105"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-[#835418] font-semibold mb-1">
              {author.tagline}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#483E37] mb-2 tracking-tight">
              {author.name}
            </h1>

            <p className="text-xs text-[#737973] mb-4">
              {author.location} • {author.experience}
            </p>

            {author.featuredQuote && (
              <blockquote className="font-serif italic text-base sm:text-lg text-[#424844] max-w-xl border-l-2 border-[#483E37]/30 pl-3.5 mb-6">
                {author.featuredQuote}
              </blockquote>
            )}

            {/* Quick Metrics & Actions */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#424844] pt-2">
              <div>
                <strong className="font-serif text-lg text-[#483E37]">{author.metrics.publishedWorks}</strong> Karya Terbit
              </div>
              <div className="text-[#C2C8C2]">•</div>
              <div>
                <strong className="font-serif text-lg text-[#483E37]">{author.metrics.criticScore}</strong> Skor Kritik
              </div>
              <div className="text-[#C2C8C2]">•</div>
              <div>
                <strong className="font-serif text-lg text-[#483E37]">{author.metrics.activeReaders}</strong> Pembaca
              </div>

              <div className="flex items-center gap-2 ml-auto pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsFollowing(!isFollowing)
                    triggerToast(isFollowing ? `Batal mengikuti ${author.name}.` : `Mengikuti ${author.name}.`)
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isFollowing
                      ? 'bg-[#EFE8DD] text-[#483E37]'
                      : 'bg-[#483E37] text-white hover:bg-[#3D342E]'
                  }`}
                >
                  {isFollowing ? 'Mengikuti' : 'Ikuti Penulis'}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 border border-[#DFD5C7] hover:border-[#483E37] rounded-lg text-[#483E37] bg-white transition-colors cursor-pointer"
                  title="Bagikan Tautan Profil"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. BIOGRAPHY & AWARDS
          ======================================================== */}
      <section className="w-full py-12 px-6 md:px-8 border-b border-[#ECE4D8]">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Biography Prose */}
          <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-[#424844]">
            <h2 className="font-serif text-xl text-[#483E37] font-medium mb-3">
              Tentang Penulis
            </h2>
            <p>{author.bio?.para1}</p>
            {author.bio?.para2 && <p>{author.bio?.para2}</p>}
          </div>

          {/* Awards List */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-[#483E37] font-medium mb-2">
              Pencapaian Sastra
            </h3>
            {author.awards && author.awards.map((a, i) => (
              <div key={i} className="text-xs pb-3 border-b border-[#ECE4D8] last:border-none">
                <div className="flex items-center gap-2 text-[#835418] font-medium">
                  <span>{a.year}</span>
                  <span>—</span>
                  <span className="text-[#483E37] font-semibold">{a.title}</span>
                </div>
                <p className="text-[#737973] mt-0.5">{a.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. BIBLIOGRAFI / DAFTAR KARYA
          ======================================================== */}
      <section className="w-full py-12 px-6 md:px-8">
        <div className="max-w-[1080px] mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl text-[#483E37] font-medium">
                Daftar Karya {author.name}
              </h2>
              <p className="text-xs text-[#737973] mt-1">
                Karya sastra dan buku terkurasi yang telah diterbitkan.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateAuthorsDirectory || onNavigateHome}
              className="text-xs font-semibold text-[#483E37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Penulis Lainnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.books && author.books.map((book) => (
              <article
                key={book.id}
                onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id)}
                className="group p-4 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2] hover:bg-white hover:border-[#DFD5C7] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-56 rounded-lg overflow-hidden bg-[#E8DFD3] mb-3">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="text-[11px] text-[#737973] mb-1">
                    {book.category} • {book.year}
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#483E37] line-clamp-1 group-hover:underline">
                    {book.title}
                  </h3>

                  <p className="text-xs text-[#737973] mt-1 line-clamp-2 leading-relaxed">
                    {book.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#ECE4D8] flex items-center justify-between text-xs gap-2">
                  <span className="text-[#835418] font-medium">Rating {book.rating}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStudyBook(book)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        triggerToast(`Membuka studi proses kreatif "${book.title}"`)
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#483E37] text-white hover:bg-[#3D342E] font-medium transition-colors cursor-pointer text-[11px]"
                    >
                      Bedah Karya →
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onNavigateBookDetail) onNavigateBookDetail(book.id)
                      }}
                      className="text-[#737973] hover:text-[#483E37] hover:underline cursor-pointer text-[11px]"
                    >
                      Katalog
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
        </div>
      )}

    </div>
  )
}
