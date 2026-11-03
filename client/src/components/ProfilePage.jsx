import React, { useState, useRef } from 'react'
import {
  BookOpen,
  Bookmark,
  Star,
  Share2,
  Edit3,
  Plus,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  Lock,
  Eye,
  Trash2,
  X,
  User,
  Camera
} from 'lucide-react'

export default function ProfilePage({
  onNavigateHome,
  onNavigateAuthor,
  onNavigateBookDetail,
  initialTab = 'reading',
  userProfile = null,
  onUpdateProfile = null
}) {
  // User Profile Data
  const [profile, setProfile] = useState({
    name: userProfile?.name || 'Dewi Anggraini',
    handle: userProfile?.handle || '@dewianggr',
    role: userProfile?.role || 'Pembaca Aktif',
    location: userProfile?.location || 'Yogyakarta, Indonesia',
    joinDate: userProfile?.joinDate || 'Maret 2023',
    followersCount: 324,
    followingCount: 182,
    avatar: userProfile?.avatar || null,
    bio: userProfile?.bio || 'Mahasiswa Sastra Komparatif & penikmat teh senja. Mencari makna dalam setiap kalimat, merajut ulasan di antara sunyi perpustakaan tua.',
    yearlyTarget: 50,
    booksReadThisYear: 28,
    reviewsWritten: 14,
    averageRating: 4.6,
    favoriteGenre: 'Realisme Magis'
  })

  // Tab State: 'reading' | 'wishlist' | 'shelves' | 'finished' | 'reviews'
  const [activeTab, setActiveTab] = useState(initialTab)

  // Toast State
  const [toastMessage, setToastMessage] = useState('')
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Modals
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({ ...profile })
  const avatarFileRef = useRef(null)

  const [showProgressModal, setShowProgressModal] = useState(false)
  const [activeReadingBook, setActiveReadingBook] = useState(null)
  const [progressPage, setProgressPage] = useState(0)

  const [showShelfModal, setShowShelfModal] = useState(false)
  const [shelfTitle, setShelfTitle] = useState('')
  const [shelfDesc, setShelfDesc] = useState('')
  const [shelfPrivate, setShelfPrivate] = useState(false)

  // Sedang Dibaca Data
  const [currentlyReading, setCurrentlyReading] = useState([
    {
      id: 'cantik-itu-luka',
      title: 'Cantik Itu Luka',
      author: 'Eka Kurniawan',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
      currentPage: 320,
      totalPages: 512,
      lastRead: '2 jam yang lalu'
    },
    {
      id: 'orang-asing',
      title: 'Orang Asing (L\'Étranger)',
      author: 'Albert Camus',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
      currentPage: 84,
      totalPages: 148,
      lastRead: 'Kemarin'
    }
  ])

  // Ingin Dibaca Data
  const [wishlistBooks, setWishlistBooks] = useState([
    {
      id: 'before-the-last-leaf',
      title: 'Before the Last Leaf',
      author: 'Elena Vance',
      authorId: 'elena-vance',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      priority: 'Tinggi'
    },
    {
      id: 'notes-on-silence',
      title: 'Notes on Silence',
      author: 'Marcus Thorne',
      authorId: 'marcus-thorne',
      cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      priority: 'Sedang'
    },
    {
      id: 'the-rivers-bend',
      title: 'The River\'s Bend',
      author: 'Julian Cross',
      authorId: 'julian-cross',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      priority: 'Tinggi'
    },
    {
      id: 'atlas-of-untraveled-roads',
      title: 'Atlas of Untraveled Roads',
      author: 'Clara Dupont',
      authorId: 'clara-dupont',
      cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop',
      rating: 4.6,
      priority: 'Santai'
    }
  ])

  // Rak & Koleksi Data
  const [shelves, setShelves] = useState([
    {
      id: 'realisme-magis',
      title: 'Realisme Magis Nusantara',
      description: 'Menelusuri keajaiban yang hidup berdampingan dengan realitas sehari-hari.',
      bookCount: 8,
      isPrivate: false,
      covers: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop'
      ]
    },
    {
      id: 'filsafat-eksistensialisme',
      title: 'Filsafat Eksistensialisme',
      description: 'Kajian mendalam tentang kebebasan manusia dan perenungan batiniah.',
      bookCount: 12,
      isPrivate: false,
      covers: [
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=300&auto=format&fit=crop'
      ]
    },
    {
      id: 'kritik-arsitektur',
      title: 'Kritik Arsitektur & Ruang',
      description: 'Bagaimana ruang, bayang-bayang, dan kota membentuk psikologi manusia.',
      bookCount: 6,
      isPrivate: true,
      covers: [
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop'
      ]
    },
    {
      id: 'puisi-malam',
      title: 'Puisi & Malam Hari',
      description: 'Antologi liris terbaik untuk dibaca dalam keheningan malam.',
      bookCount: 9,
      isPrivate: false,
      covers: [
        'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop'
      ]
    }
  ])

  // Handlers
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      triggerToast('Tautan profil disalin!')
    }
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setProfile({ ...editFormData })
    if (onUpdateProfile) onUpdateProfile(editFormData)
    setShowEditModal(false)
    triggerToast('Profil berhasil diperbarui.')
  }

  const handleUpdateProgressSubmit = (e) => {
    e.preventDefault()
    if (!activeReadingBook) return
    const updated = currentlyReading.map((b) =>
      b.id === activeReadingBook.id
        ? { ...b, currentPage: Math.min(Number(progressPage), b.totalPages), lastRead: 'Baru saja' }
        : b
    )
    setCurrentlyReading(updated)
    setShowProgressModal(false)
    triggerToast(`Progres "${activeReadingBook.title}" diperbarui.`)
  }

  const handleStartReading = (book) => {
    setWishlistBooks(wishlistBooks.filter((b) => b.id !== book.id))
    setCurrentlyReading([
      {
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover,
        currentPage: 1,
        totalPages: 360,
        lastRead: 'Baru dimulai'
      },
      ...currentlyReading
    ])
    setActiveTab('reading')
    triggerToast(`"${book.title}" dipindahkan ke Sedang Dibaca.`)
  }

  const handleCreateShelfSubmit = (e) => {
    e.preventDefault()
    if (!shelfTitle.trim()) return
    const newShelf = {
      id: 'shelf-' + Date.now(),
      title: shelfTitle,
      description: shelfDesc || 'Koleksi bacaan pribadi.',
      bookCount: 0,
      isPrivate: shelfPrivate,
      covers: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop']
    }
    setShelves([newShelf, ...shelves])
    setShowShelfModal(false)
    setShelfTitle('')
    setShelfDesc('')
    setShelfPrivate(false)
    triggerToast(`Rak "${newShelf.title}" berhasil dibuat.`)
  }

  return (
    <div className="w-full bg-[#FCF9F3] min-h-screen text-[#1C1C18] font-sans antialiased">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#192F23] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs flex items-center gap-2">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sub-header / Breadcrumb */}
      <div className="w-full border-b border-[#ECE4D8] py-3 px-6 md:px-8">
        <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
          <button onClick={onNavigateHome} className="hover:text-[#192F23] transition-colors">
            Beranda
          </button>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <span className="text-[#192F23] font-medium">Profil</span>
          <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
          <span className="text-[#424844]">{profile.name}</span>
        </div>
      </div>

      {/* ========================================================
          1. NATURAL PROFILE HEADER
          ======================================================== */}
      <section className="w-full pt-10 pb-8 px-6 md:px-8">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#ECE4D8]">
            
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex items-center justify-center">
                  {profile.avatar
                    ? <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    : profile.name
                      ? <span className="font-serif text-3xl font-medium text-[#424844] select-none">
                          {profile.name.charAt(0).toUpperCase()}
                        </span>
                      : <User className="w-9 h-9 text-[#8C877E]" />
                  }
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#192F23]">
                    {profile.name}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFE8DD] text-[#736E65]">
                    {profile.role}
                  </span>
                </div>
                
                <p className="text-xs text-[#737973] mb-2">{profile.handle} • {profile.location}</p>
                
                <p className="text-sm text-[#424844] max-w-lg leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setEditFormData({ ...profile })
                  setShowEditModal(true)
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium border border-[#DFD5C7] hover:border-[#192F23] rounded-lg text-[#192F23] bg-white transition-colors"
              >
                Edit Profil
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="p-2 border border-[#DFD5C7] hover:border-[#192F23] rounded-lg text-[#192F23] bg-white transition-colors"
                title="Bagikan Tautan Profil"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Simple Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-center border-b border-[#ECE4D8]">
            <div>
              <div className="font-serif text-2xl font-medium text-[#192F23]">{profile.booksReadThisYear}</div>
              <div className="text-xs text-[#737973] mt-0.5">Buku Dibaca ({profile.yearlyTarget} Target)</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-medium text-[#192F23]">{profile.reviewsWritten}</div>
              <div className="text-xs text-[#737973] mt-0.5">Ulasan Ditulis</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-medium text-[#192F23]">{profile.averageRating} ★</div>
              <div className="text-xs text-[#737973] mt-0.5">Rata-Rata Rating</div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-medium text-[#192F23] truncate">{profile.favoriteGenre}</div>
              <div className="text-xs text-[#737973] mt-0.5">Genre Favorit</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. MINIMALIST TABS
          ======================================================== */}
      <section className="w-full px-6 md:px-8">
        <div className="max-w-[1080px] mx-auto border-b border-[#ECE4D8] flex items-center gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'reading', label: 'Sedang Dibaca', count: currentlyReading.length },
            { id: 'wishlist', label: 'Ingin Dibaca', count: wishlistBooks.length },
            { id: 'shelves', label: 'Rak Koleksi', count: shelves.length },
            { id: 'finished', label: 'Selesai', count: 28 },
            { id: 'reviews', label: 'Ulasan', count: 42 }
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#192F23] text-[#192F23]'
                    : 'border-transparent text-[#737973] hover:text-[#192F23]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-xs text-[#8C877E]">({tab.count})</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ========================================================
          3. TAB CONTENT
          ======================================================== */}
      <main className="w-full max-w-[1080px] mx-auto px-6 md:px-8 py-8">
        
        {/* TAB 1: SEDANG DIBACA */}
        {activeTab === 'reading' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentlyReading.map((book) => {
                const percent = Math.round((book.currentPage / book.totalPages) * 100)
                return (
                  <div
                    key={book.id}
                    className="p-5 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2] flex gap-4 items-center"
                  >
                    <div className="w-16 h-24 rounded overflow-hidden flex-shrink-0 bg-[#E8DFD3] shadow-sm">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base font-medium text-[#192F23] truncate">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#737973] mb-3">{book.author}</p>

                      <div className="w-full bg-[#E5DED4] h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="bg-[#192F23] h-full rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#737973]">
                        <span>{book.currentPage} / {book.totalPages} hal ({percent}%)</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveReadingBook(book)
                            setProgressPage(book.currentPage)
                            setShowProgressModal(true)
                          }}
                          className="text-[#192F23] font-medium hover:underline"
                        >
                          Perbarui
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INGIN DIBACA */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="group flex flex-col justify-between p-3.5 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2]"
                >
                  <div>
                    <div className="w-full h-44 rounded overflow-hidden bg-[#E8DFD3] mb-2.5">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-serif text-sm font-medium text-[#192F23] line-clamp-1">{book.title}</h4>
                    <button
                      type="button"
                      onClick={() => onNavigateAuthor && onNavigateAuthor(book.authorId || 'julian-cross')}
                      className="text-xs text-[#737973] hover:text-[#192F23] hover:underline line-clamp-1 text-left block"
                    >
                      {book.author}
                    </button>
                    <div className="text-[11px] text-[#835418] mt-1 font-medium">★ {book.rating} • {book.priority}</div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#ECE4D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleStartReading(book)}
                      className="text-xs font-semibold text-[#192F23] hover:underline"
                    >
                      Mulai Baca
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWishlistBooks(wishlistBooks.filter((b) => b.id !== book.id))
                        triggerToast(`"${book.title}" dihapus.`)
                      }}
                      className="text-xs text-[#737973] hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RAK KOLEKSI */}
        {activeTab === 'shelves' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#737973]">Koleksi tematik yang Anda susun</span>
              <button
                type="button"
                onClick={() => setShowShelfModal(true)}
                className="text-xs font-semibold text-[#192F23] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Rak Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shelves.map((shelf) => (
                <div key={shelf.id} className="p-4 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif text-base font-medium text-[#192F23]">{shelf.title}</h4>
                      <span className="text-[10px] text-[#737973] flex items-center gap-1">
                        {shelf.isPrivate ? <Lock className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {shelf.isPrivate ? 'Privat' : 'Publik'}
                      </span>
                    </div>
                    <p className="text-xs text-[#737973] mb-3">{shelf.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#737973] pt-2 border-t border-[#ECE4D8]">
                    <span>{shelf.bookCount} buku</span>
                    <button
                      type="button"
                      onClick={() => triggerToast(`Membuka koleksi "${shelf.title}"...`)}
                      className="font-medium text-[#192F23] hover:underline"
                    >
                      Lihat Rak →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SELESAI */}
        {activeTab === 'finished' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { title: 'The Memory of Water', author: 'Julian Cross', rating: 5, date: 'Okt 2026' },
              { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', rating: 5, date: 'Sep 2026' },
              { title: 'Dunia Sophie', author: 'Jostein Gaarder', rating: 4.5, date: 'Agu 2026' }
            ].map((b, i) => (
              <div key={i} className="p-4 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2]">
                <h4 className="font-serif text-sm font-medium text-[#192F23]">{b.title}</h4>
                <p className="text-xs text-[#737973] mb-2">{b.author}</p>
                <div className="text-[11px] text-[#737973] flex items-center justify-between">
                  <span>★ {b.rating}</span>
                  <span>{b.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: ULASAN */}
        {activeTab === 'reviews' && (
          <div className="p-5 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-sm font-medium text-[#192F23]">The Memory of Water — Julian Cross</span>
              <span className="text-xs text-[#835418]">★★★★★</span>
            </div>
            <p className="text-xs text-[#424844] leading-relaxed">
              "Gaya penulisannya seperti mengukir di atas batu basah—lambat, presisi, dan abadi. Bab tentang arsitektur mercusuar tua di bab 4 adalah salah satu prosa terindah yang pernah saya baca."
            </p>
            <div className="text-[10px] text-[#737973] mt-3 pt-2 border-t border-[#ECE4D8]">
              Ditulis 18 Okt 2026 • 34 pembaca terbantu
            </div>
          </div>
        )}

      </main>

      {/* ========================================================
          MODAL: EDIT PROFIL
          ======================================================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DFD5C7] rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="font-serif text-xl text-[#192F23] mb-4">Edit Profil</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">

              {/* Avatar Picker */}
              <div className="flex flex-col items-center gap-3 pb-4 mb-1 border-b border-[#ECE4D8]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex items-center justify-center">
                    {editFormData.avatar
                      ? <img src={editFormData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      : editFormData.name
                        ? <span className="font-serif text-3xl font-medium text-[#424844] select-none">
                            {editFormData.name.charAt(0).toUpperCase()}
                          </span>
                        : <User className="w-9 h-9 text-[#8C877E]" />
                    }
                  </div>
                  <button
                    type="button"
                    onClick={() => avatarFileRef.current?.click()}
                    className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#192F23] text-white flex items-center justify-center shadow hover:bg-[#13241b] transition-colors"
                    title="Ganti foto"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <input
                  ref={avatarFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = URL.createObjectURL(file)
                      setEditFormData({ ...editFormData, avatar: url })
                    }
                  }}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => avatarFileRef.current?.click()}
                    className="text-xs font-medium text-[#192F23] underline underline-offset-2"
                  >
                    Unggah Foto
                  </button>
                  {editFormData.avatar && (
                    <button
                      type="button"
                      onClick={() => setEditFormData({ ...editFormData, avatar: null })}
                      className="text-xs text-[#737973] hover:text-red-600"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#192F23] mb-1">Nama</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-[#FAF7F2] text-[#192F23] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#192F23] mb-1">Bio Singkat</label>
                <textarea
                  rows={2}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-[#FAF7F2] text-[#192F23] focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#192F23] text-white rounded font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PERBARUI PROGRES
          ======================================================== */}
      {showProgressModal && activeReadingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DFD5C7] rounded-xl max-w-sm w-full p-5 shadow-xl">
            <h4 className="font-serif text-lg text-[#192F23] mb-1">Perbarui Halaman</h4>
            <p className="text-xs text-[#737973] mb-4">{activeReadingBook.title}</p>
            <form onSubmit={handleUpdateProgressSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={activeReadingBook.totalPages}
                  value={progressPage}
                  onChange={(e) => setProgressPage(e.target.value)}
                  className="w-24 px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-[#FAF7F2] font-semibold text-[#192F23] focus:outline-none"
                />
                <span className="text-xs text-[#737973]">dari {activeReadingBook.totalPages} hal</span>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProgressModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#192F23] text-white rounded font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: BUAT RAK BARU
          ======================================================== */}
      {showShelfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DFD5C7] rounded-xl max-w-sm w-full p-5 shadow-xl">
            <h4 className="font-serif text-lg text-[#192F23] mb-1">Buat Rak Koleksi Baru</h4>
            <p className="text-xs text-[#737973] mb-3">Kelompokkan bacaan berdasarkan tema favorit Anda.</p>
            <form onSubmit={handleCreateShelfSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#192F23] mb-1">Nama Rak</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Sastra Jepang Pilihan"
                  value={shelfTitle}
                  onChange={(e) => setShelfTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-[#FAF7F2] text-[#192F23] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#192F23] mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Koleksi buku-buku..."
                  value={shelfDesc}
                  onChange={(e) => setShelfDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-[#FAF7F2] text-[#192F23] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shelf-private"
                  checked={shelfPrivate}
                  onChange={(e) => setShelfPrivate(e.target.checked)}
                  className="rounded text-[#192F23]"
                />
                <label htmlFor="shelf-private" className="text-xs text-[#424844] cursor-pointer">
                  Jadikan koleksi privat
                </label>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowShelfModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#192F23] text-white rounded font-medium"
                >
                  Buat Rak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
