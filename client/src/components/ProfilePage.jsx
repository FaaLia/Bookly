import React, { useState, useRef, useEffect } from 'react'
import {
  BookOpen,
  Bookmark,
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
  Camera,
  ArrowLeft,
  Search,
  Globe,
  CheckCircle2,
  BookMarked,
  Filter,
  Check,
  Quote,
  MapPin,
  Mail,
  Link as LinkIcon,
  Target,
  BarChart3,
  FileText,
  ArrowRight,
  BookmarkCheck,
  Compass
} from 'lucide-react'

export default function ProfilePage({
  onNavigateHome,
  onNavigateAuthor,
  onNavigateBookDetail,
  initialTab = 'reading',
  initialShelfId = null,
  userProfile = null,
  onUpdateProfile = null
}) {
  // Comprehensive User Profile Data
  const [profile, setProfile] = useState({
    name: userProfile?.name || 'Dewi Anggraini',
    handle: userProfile?.handle || '@dewianggr',
    email: userProfile?.email || 'dewi.anggraini@literasi.id',
    role: userProfile?.role || 'Pembaca Aktif & Pengulas Sastra',
    location: userProfile?.location || 'Yogyakarta, Indonesia',
    joinDate: userProfile?.joinDate || 'Maret 2023',
    website: userProfile?.website || 'instagram.com/dewianggr',
    avatar: userProfile?.avatar || null,
    bio: userProfile?.bio || 'Mahasiswa Sastra Komparatif & penikmat teh senja. Mencari makna dalam setiap kalimat, merajut ulasan di antara sunyi perpustakaan tua, dan mengoleksi novel surealis.',
    favoriteQuote: userProfile?.favoriteQuote || 'Membaca adalah jembatan menuju keheningan batin di tengah riuhnya dunia.',
    favoriteAuthor: userProfile?.favoriteAuthor || 'Pramoedya Ananta Toer & Albert Camus',
    favoriteGenre: userProfile?.favoriteGenre || 'Realisme Magis & Filsafat',
    yearlyTarget: userProfile?.yearlyTarget || 50,
    booksReadThisYear: userProfile?.booksReadThisYear || 28,
    reviewsWritten: userProfile?.reviewsWritten || 14,
    readingPace: userProfile?.readingPace || '3-4 buku per bulan',
    averageRating: 4.8,
    followersCount: 342,
    followingCount: 189
  })

  // Tab State: 'reading' | 'wishlist' | 'shelves' | 'finished' | 'reviews'
  const [activeTab, setActiveTab] = useState(initialTab)

  // Selected shelf for Subpage: if not null, renders the Shelf Subpage
  const [selectedShelf, setSelectedShelf] = useState(null)

  // Filter & Search inside Shelf Subpage
  const [shelfSearch, setShelfSearch] = useState('')
  const [shelfStatusFilter, setShelfStatusFilter] = useState('all')

  // Sub-sub page state inside Shelf:
  // 1. selectedShelfBook: if set, renders Sub-sub page "Jurnal & Refleksi Kurasi Buku dalam Rak"
  // 2. showShelfAnalytics: if true, renders Sub-sub page "Roadmap & Analisis Rak Koleksi"
  const [selectedShelfBook, setSelectedShelfBook] = useState(null)
  const [showShelfAnalytics, setShowShelfAnalytics] = useState(false)
  const [bookJournalNotes, setBookJournalNotes] = useState([
    {
      id: 1,
      chapter: 'Bab 1',
      title: 'Menatap Kesunyian Pesisir',
      date: '12 Nov 2026',
      text: 'Dinding mercusuar digambarkan bukan sebagai penghalang badai, melainkan sebagai saksi bisu waktu yang memudar. Refleksi yang sangat puitis tentang memori masa kecil.'
    },
    {
      id: 2,
      chapter: 'Bab 4',
      title: 'Geometri Kehilangan & Memori',
      date: '15 Nov 2026',
      text: 'Penulis memahami bahwa ingatan kita memiliki arsitektur tersendiri. Bab ini menjadi alasan kuat mengapa buku ini terpilih di rak kurasi ini.'
    }
  ])
  const [newJournalChapter, setNewJournalChapter] = useState('')
  const [newJournalTitle, setNewJournalTitle] = useState('')
  const [newJournalText, setNewJournalText] = useState('')

  const [bookQuotes, setBookQuotes] = useState([
    '“Arsitektur bukan sekadar batu dan semen, melainkan cara kita memeluk kesunyian di antara reruntuhan waktu.”',
    '“Air selalu menemukan jalannya pulang, sama seperti ingatan yang tak pernah benar-benar tenggelam.”'
  ])
  const [newQuoteText, setNewQuoteText] = useState('')
  const [readingProgressPage, setReadingProgressPage] = useState(140)

  // Toast State
  const [toastMessage, setToastMessage] = useState('')
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Modals State
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({ ...profile })
  const [editModalSection, setEditModalSection] = useState('identity') // 'identity' | 'reading' | 'bio'
  const avatarFileRef = useRef(null)

  const [showProgressModal, setShowProgressModal] = useState(false)
  const [activeReadingBook, setActiveReadingBook] = useState(null)
  const [progressPage, setProgressPage] = useState(0)

  // Create shelf modal
  const [showShelfModal, setShowShelfModal] = useState(false)
  const [shelfTitle, setShelfTitle] = useState('')
  const [shelfDesc, setShelfDesc] = useState('')
  const [shelfPrivate, setShelfPrivate] = useState(false)

  // Add book to shelf modal
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookAuthor, setNewBookAuthor] = useState('')
  const [newBookNote, setNewBookNote] = useState('')
  const [newBookStatus, setNewBookStatus] = useState('Selesai')

  // Edit Shelf modal
  const [showEditShelfModal, setShowEditShelfModal] = useState(false)
  const [editShelfTitle, setEditShelfTitle] = useState('')
  const [editShelfDesc, setEditShelfDesc] = useState('')
  const [editShelfPrivate, setEditShelfPrivate] = useState(false)

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

  // Rak & Koleksi Data with Comprehensive Books Data for Subpage
  const [shelves, setShelves] = useState([
    {
      id: 'realisme-magis',
      title: 'Realisme Magis Nusantara',
      description: 'Menelusuri keajaiban yang hidup berdampingan dengan realitas sehari-hari dalam sastra nusantara.',
      bookCount: 6,
      isPrivate: false,
      createdDate: '15 Januari 2026',
      readHours: '~42 Jam Membaca',
      covers: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop'
      ],
      books: [
        {
          id: 'cantik-itu-luka',
          title: 'Cantik Itu Luka',
          author: 'Eka Kurniawan',
          rating: 4.9,
          pages: 512,
          year: '2002',
          status: 'Sedang Dibaca',
          progress: '320 / 512 hal (62%)',
          cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
          note: 'Epos surealis terbaik tentang sejarah Halimunda, mitos dewi kembang, dan tragedi masa revolusi.'
        },
        {
          id: 'lelaki-harimau',
          title: 'Lelaki Harimau',
          author: 'Eka Kurniawan',
          rating: 4.8,
          pages: 192,
          year: '2004',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
          note: 'Alur mundur yang memukau menguak alasan di balik amukan Margio di malam pembunuhan.'
        },
        {
          id: 'burung-burung-manyar',
          title: 'Burung-Burung Manyar',
          author: 'Y.B. Mangunwijaya',
          rating: 4.9,
          pages: 408,
          year: '1981',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
          note: 'Perspektif cinta dan alam pikiran di tengah kegamangan transisi kemerdekaan republik.'
        },
        {
          id: 'raden-mandasia',
          title: 'Raden Mandasia Si Pencuri Daging Sapi',
          author: 'Yusi Avianto Pareanom',
          rating: 4.8,
          pages: 448,
          year: '2016',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
          note: 'Petualangan jenaka, puitis, dan berbobot epik menuju Kerajaan Gerbang Kencur.'
        },
        {
          id: 'saman',
          title: 'Saman',
          author: 'Ayu Utami',
          rating: 4.7,
          pages: 200,
          year: '1998',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=600&auto=format&fit=crop',
          note: 'Mendobrak tabu dan merestrukturisasi bahasa sastra Indonesia era reformasi.'
        },
        {
          id: 'amba',
          title: 'Amba',
          author: 'Laksmi Pamuntjak',
          rating: 4.8,
          pages: 494,
          year: '2012',
          status: 'Belum Dibaca',
          cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop',
          note: 'Reinterpretasi kisah cinta Mahabharata di Pulau Buru yang sarat estetika kata.'
        }
      ]
    },
    {
      id: 'filsafat-eksistensialisme',
      title: 'Filsafat Eksistensialisme',
      description: 'Kajian mendalam tentang kebebasan manusia, absurditas, dan perenungan batiniah.',
      bookCount: 5,
      isPrivate: false,
      createdDate: '10 Februari 2026',
      readHours: '~35 Jam Membaca',
      covers: [
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=300&auto=format&fit=crop'
      ],
      books: [
        {
          id: 'orang-asing',
          title: 'Orang Asing (L\'Étranger)',
          author: 'Albert Camus',
          rating: 4.8,
          pages: 148,
          year: '1942',
          status: 'Sedang Dibaca',
          progress: '84 / 148 hal (57%)',
          cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
          note: 'Meursault yang menolak kepalsuan sosial dan menghadapi kematian dengan tenang.'
        },
        {
          id: 'mitos-sisifus',
          title: 'Mitos Sisifus',
          author: 'Albert Camus',
          rating: 4.9,
          pages: 216,
          year: '1942',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
          note: 'Esai filosofis abadi tentang pemberontakan melawan keputusasaan absurd.'
        },
        {
          id: 'dunia-sophie',
          title: 'Dunia Sophie',
          author: 'Jostein Gaarder',
          rating: 4.9,
          pages: 560,
          year: '1991',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
          note: 'Gerbang paling memikat untuk memahami evolusi pemikiran filsafat barat.'
        },
        {
          id: 'demian',
          title: 'Demian',
          author: 'Hermann Hesse',
          rating: 4.8,
          pages: 208,
          year: '1919',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=600&auto=format&fit=crop',
          note: 'Perjalanan Emil Sinclair menembus dualitas terang dan gelap dalam diri manusia.'
        },
        {
          id: 'madilog',
          title: 'Madilog',
          author: 'Tan Malaka',
          rating: 4.8,
          pages: 568,
          year: '1943',
          status: 'Belum Dibaca',
          cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
          note: 'Mahakarya dialektika materialisme dan logika rasional karya anak bangsa.'
        }
      ]
    },
    {
      id: 'kritik-arsitektur',
      title: 'Kritik Arsitektur & Ruang',
      description: 'Bagaimana ruang, bayang-bayang, dan kota membentuk psikologi manusia.',
      bookCount: 4,
      isPrivate: true,
      createdDate: '20 Februari 2026',
      readHours: '~28 Jam Membaca',
      covers: [
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop'
      ],
      books: [
        {
          id: 'the-rivers-bend',
          title: 'The River\'s Bend',
          author: 'Julian Cross',
          rating: 4.9,
          pages: 360,
          year: '2024',
          status: 'Sedang Dibaca',
          cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
          note: 'Refleksi mendalam arsitektur pelabuhan dan kenangan masa silam.'
        },
        {
          id: 'invisible-cities',
          title: 'Invisible Cities (Kota-Kota Tak Kasat Mata)',
          author: 'Italo Calvino',
          rating: 4.9,
          pages: 165,
          year: '1972',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
          note: 'Puisasi kota-kota khayal yang dipaparkan Marco Polo kepada Kublai Khan.'
        },
        {
          id: 'poetics-of-space',
          title: 'The Poetics of Space',
          author: 'Gaston Bachelard',
          rating: 4.8,
          pages: 288,
          year: '1958',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
          note: 'Analisis puitis tentang loteng, lemari, sudut sunyi, dan sarang ingatan rumah.'
        },
        {
          id: 'eyes-of-the-skin',
          title: 'The Eyes of the Skin: Architecture and the Senses',
          author: 'Juhani Pallasmaa',
          rating: 4.7,
          pages: 128,
          year: '1996',
          status: 'Belum Dibaca',
          cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
          note: 'Pentingnya sensasi rabaan dan indrawi melawan hegemoni visual dalam tata ruang.'
        }
      ]
    },
    {
      id: 'puisi-malam',
      title: 'Puisi & Malam Hari',
      description: 'Antologi liris terbaik untuk dibaca dalam keheningan malam.',
      bookCount: 4,
      isPrivate: false,
      createdDate: '1 Maret 2026',
      readHours: '~20 Jam Membaca',
      covers: [
        'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop'
      ],
      books: [
        {
          id: 'hujan-bulan-juni',
          title: 'Hujan Bulan Juni',
          author: 'Sapardi Djoko Damono',
          rating: 5.0,
          pages: 144,
          year: '1994',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=600&auto=format&fit=crop',
          note: 'Tak ada yang lebih tabah dari hujan bulan juni, dirahasiakannya rintik rindunya.'
        },
        {
          id: 'before-the-last-leaf',
          title: 'Before the Last Leaf',
          author: 'Elena Vance',
          rating: 4.8,
          pages: 240,
          year: '2024',
          status: 'Sedang Dibaca',
          cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
          note: 'Bait-bait liris tentang pelepasan duka dan musim gugur di batin.'
        },
        {
          id: 'aku-ini-binatang-jalang',
          title: 'Aku Ini Binatang Jalang',
          author: 'Chairil Anwar',
          rating: 4.9,
          pages: 112,
          year: '1949',
          status: 'Selesai',
          cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
          note: 'Semangat pembaharu dan keteguhan jiwa sajak-sajak Chairil.'
        },
        {
          id: 'notes-on-silence',
          title: 'Notes on Silence',
          author: 'Marcus Thorne',
          rating: 4.7,
          pages: 180,
          year: '2023',
          status: 'Belum Dibaca',
          cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop',
          note: 'Perenungan hening tentang sunyi di tengah kebisingan peradaban.'
        }
      ]
    }
  ])

  // Open initial shelf if provided in URL or props
  useEffect(() => {
    if (initialShelfId) {
      const found = shelves.find((s) => s.id === initialShelfId)
      if (found) {
        setSelectedShelf(found)
        setActiveTab('shelves')
      }
    }
  }, [initialShelfId])

  // Handlers
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      triggerToast('Tautan profil berhasil disalin!')
    }
  }

  const handleOpenShelfSubpage = (shelf) => {
    setSelectedShelf(shelf)
    setShelfSearch('')
    setShelfStatusFilter('all')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    triggerToast(`Membuka subpage rak "${shelf.title}"`)
  }

  const handleBackToShelvesList = () => {
    setSelectedShelfBook(null)
    setShowShelfAnalytics(false)
    setSelectedShelf(null)
    setActiveTab('shelves')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToShelfSubpage = () => {
    setSelectedShelfBook(null)
    setShowShelfAnalytics(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenBookJournalSubSubpage = (book) => {
    setSelectedShelfBook(book)
    setShowShelfAnalytics(false)
    setReadingProgressPage(book.pages ? Math.floor(book.pages / 2) : 140)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    triggerToast(`Membuka jurnal bacaan "${book.title}"`)
  }

  const handleOpenShelfAnalytics = () => {
    setShowShelfAnalytics(true)
    setSelectedShelfBook(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    triggerToast('Membuka roadmap & analisis rak koleksi')
  }

  const handleAddJournalEntry = (e) => {
    e.preventDefault()
    if (!newJournalText.trim()) return
    const newEntry = {
      id: Date.now(),
      chapter: newJournalChapter.trim() || 'Catatan Baru',
      title: newJournalTitle.trim() || 'Refleksi Bacaan',
      date: 'Hari ini',
      text: newJournalText.trim()
    }
    setBookJournalNotes([newEntry, ...bookJournalNotes])
    setNewJournalChapter('')
    setNewJournalTitle('')
    setNewJournalText('')
    triggerToast('Catatan jurnal berhasil ditambahkan!')
  }

  const handleAddQuote = (e) => {
    e.preventDefault()
    if (!newQuoteText.trim()) return
    setBookQuotes([`“${newQuoteText.trim().replace(/^["“]+|["”]+$/g, '')}”`, ...bookQuotes])
    setNewQuoteText('')
    triggerToast('Kutipan berkesan berhasil diarsipkan!')
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setProfile({ ...editFormData })
    if (onUpdateProfile) onUpdateProfile(editFormData)
    setShowEditModal(false)
    triggerToast('Data profil lengkap berhasil diperbarui.')
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
      description: shelfDesc || 'Koleksi bacaan pribadi terkurasi.',
      bookCount: 0,
      isPrivate: shelfPrivate,
      createdDate: 'Hari ini',
      readHours: '~0 Jam Membaca',
      covers: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop'],
      books: []
    }
    setShelves([newShelf, ...shelves])
    setShowShelfModal(false)
    setShelfTitle('')
    setShelfDesc('')
    setShelfPrivate(false)
    triggerToast(`Rak "${newShelf.title}" berhasil dibuat.`)
  }

  // Shelf subpage actions
  const handleAddBookToCurrentShelf = (e) => {
    e.preventDefault()
    if (!newBookTitle.trim() || !selectedShelf) return

    const newBook = {
      id: 'book-' + Date.now(),
      title: newBookTitle,
      author: newBookAuthor || 'Penulis Anonim',
      rating: 4.8,
      pages: 320,
      year: new Date().getFullYear().toString(),
      status: newBookStatus,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      note: newBookNote || 'Catatan bacaan pribadi pada rak ini.'
    }

    const updatedShelves = shelves.map((s) => {
      if (s.id === selectedShelf.id) {
        const nextBooks = [newBook, ...(s.books || [])]
        return {
          ...s,
          bookCount: nextBooks.length,
          books: nextBooks
        }
      }
      return s
    })

    setShelves(updatedShelves)
    setSelectedShelf({
      ...selectedShelf,
      bookCount: (selectedShelf.books?.length || 0) + 1,
      books: [newBook, ...(selectedShelf.books || [])]
    })

    setShowAddBookModal(false)
    setNewBookTitle('')
    setNewBookAuthor('')
    setNewBookNote('')
    triggerToast(`"${newBook.title}" berhasil ditambahkan ke rak.`)
  }

  const handleRemoveBookFromCurrentShelf = (bookId, bookTitle) => {
    if (!selectedShelf) return
    const nextBooks = (selectedShelf.books || []).filter((b) => b.id !== bookId)
    const updatedShelves = shelves.map((s) => {
      if (s.id === selectedShelf.id) {
        return { ...s, bookCount: nextBooks.length, books: nextBooks }
      }
      return s
    })
    setShelves(updatedShelves)
    setSelectedShelf({ ...selectedShelf, bookCount: nextBooks.length, books: nextBooks })
    triggerToast(`"${bookTitle}" dihapus dari rak ini.`)
  }

  const handleSaveShelfDetail = (e) => {
    e.preventDefault()
    if (!editShelfTitle.trim() || !selectedShelf) return

    const updatedShelves = shelves.map((s) => {
      if (s.id === selectedShelf.id) {
        return {
          ...s,
          title: editShelfTitle,
          description: editShelfDesc,
          isPrivate: editShelfPrivate
        }
      }
      return s
    })

    setShelves(updatedShelves)
    setSelectedShelf({
      ...selectedShelf,
      title: editShelfTitle,
      description: editShelfDesc,
      isPrivate: editShelfPrivate
    })
    setShowEditShelfModal(false)
    triggerToast('Detail rak berhasil diperbarui.')
  }

  // Filter books inside the shelf subpage
  const filteredShelfBooks = (selectedShelf?.books || []).filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(shelfSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(shelfSearch.toLowerCase()) ||
      (b.note && b.note.toLowerCase().includes(shelfSearch.toLowerCase()))

    if (!matchSearch) return false
    if (shelfStatusFilter === 'all') return true
    if (shelfStatusFilter === 'finished') return b.status === 'Selesai'
    if (shelfStatusFilter === 'reading') return b.status === 'Sedang Dibaca'
    if (shelfStatusFilter === 'unread') return b.status === 'Belum Dibaca'
    return true
  })

  // Calculation for reading target progress
  const targetPercent = Math.min(
    100,
    Math.round((profile.booksReadThisYear / (profile.yearlyTarget || 1)) * 100)
  )

  return (
    <div className="w-full bg-[#FCF9F3] min-h-screen text-[#1C1C18] font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#483E37] text-[#FAF7F2] px-5 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-3 border border-[#6B5E53] animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#D6C8BE]" />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-[#D6C8BE] hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================
          SUBPAGE SETELAH BUTTON "LIHAT RAK" & SUB-SUB PAGES
          (Tampil jika selectedShelf tidak bernilai null)
          ======================================================== */}
      {selectedShelf ? (
        selectedShelfBook ? (
          /* ========================================================
             SUB-SUB PAGE: JURNAL & REFLEKSI BUKU DALAM RAK
             ======================================================== */
          <div className="w-full pb-16">
            {/* Sub-sub page Breadcrumb (4 Levels) */}
            <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
              <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973] overflow-x-auto no-scrollbar">
                <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Beranda
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Profil Saya
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Rak Koleksi
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelfSubpage} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  {selectedShelf.title}
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <span className="text-[#483E37] font-semibold truncate">
                  Jurnal: {selectedShelfBook.title}
                </span>
              </div>
            </div>

            {/* Sub-sub page Header */}
            <section className="w-full pt-8 pb-8 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
              <div className="max-w-[1080px] mx-auto">
                <button
                  type="button"
                  onClick={handleBackToShelfSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Rak "{selectedShelf.title}"</span>
                </button>

                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  <div className="w-28 h-40 sm:w-36 sm:h-52 rounded-xl overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] shadow-md flex-shrink-0">
                    <img
                      src={selectedShelfBook.cover}
                      alt={selectedShelfBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-md bg-[#EAE2DC] text-[#483E37] border border-[#D6C8BE]">
                        Bagian dari Rak {selectedShelf.title}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                        selectedShelfBook.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedShelfBook.status === 'Sedang Dibaca'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {selectedShelfBook.status}
                      </span>
                    </div>

                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2E2722] mb-2 leading-tight">
                      {selectedShelfBook.title}
                    </h1>

                    <p className="text-sm text-[#737973] mb-4">
                      Penulis: <span className="text-[#483E37] font-medium">{selectedShelfBook.author}</span> • {selectedShelfBook.pages || 320} Halaman
                    </p>

                    {/* Curated Reason Box */}
                    <div className="p-4 rounded-xl bg-white/80 border border-[#ECE4D8] mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7767] block mb-1">
                        Alasan Kurasi Masuk Rak:
                      </span>
                      <p className="text-xs sm:text-sm text-[#5A554E] italic leading-relaxed font-serif">
                        "{selectedShelfBook.note || 'Karya ini menjadi pilar utama dalam menghidupkan tema kuratorial rak ini.'}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onNavigateBookDetail && onNavigateBookDetail(selectedShelfBook.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Buka Detail di Katalog Utama</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveBookFromCurrentShelf(selectedShelfBook.id, selectedShelfBook.title)
                          handleBackToShelfSubpage()
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-700 text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus dari Rak Ini</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sub-sub page Body */}
            <main className="max-w-[1080px] mx-auto px-6 md:px-8 py-10 space-y-10">
              {/* 1. Interactive Reading Progress Slider */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2E2722]">
                      Pelacak Progres Membaca Pribadi
                    </h3>
                    <p className="text-xs text-[#737973] mt-0.5">
                      Geser slider atau perbarui nomor halaman untuk memperbarui status pencapaianmu.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-semibold text-[#483E37]">
                      {readingProgressPage} / {selectedShelfBook.pages || 320}
                    </span>
                    <span className="text-xs text-[#8C7767] ml-2">
                      ({Math.min(100, Math.round((readingProgressPage / (selectedShelfBook.pages || 320)) * 100))}%)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max={selectedShelfBook.pages || 320}
                  value={readingProgressPage}
                  onChange={(e) => setReadingProgressPage(Number(e.target.value))}
                  className="w-full accent-[#483E37] cursor-pointer mb-3"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReadingProgressPage(Math.min((selectedShelfBook.pages || 320), readingProgressPage + 10))}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#DFD5C7] text-[#483E37] font-medium hover:border-[#483E37] cursor-pointer"
                    >
                      +10 Hlm
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingProgressPage(Math.min((selectedShelfBook.pages || 320), readingProgressPage + 25))}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#DFD5C7] text-[#483E37] font-medium hover:border-[#483E37] cursor-pointer"
                    >
                      +25 Hlm
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingProgressPage(selectedShelfBook.pages || 320)}
                      className="px-2.5 py-1 rounded-lg bg-[#EAE2DC] text-[#483E37] font-semibold hover:bg-[#D6C8BE] cursor-pointer"
                    >
                      Tandai Selesai Dibaca
                    </button>
                  </div>
                  <span className="text-[#737973]">
                    Status: {readingProgressPage >= (selectedShelfBook.pages || 320) ? 'Selesai Dibaca' : readingProgressPage > 0 ? 'Sedang Berjalan' : 'Belum Dimulai'}
                  </span>
                </div>
              </div>

              {/* 2. Journal & Chapter Reflections */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#2E2722]">
                      Jurnal Membaca &amp; Refleksi Bab ({bookJournalNotes.length})
                    </h3>
                    <p className="text-xs text-[#737973] mt-0.5">
                      Catatan perenungan batinmu saat menelusuri alur buku ini dalam rak koleksi.
                    </p>
                  </div>
                </div>

                {/* Add New Journal Entry Form */}
                <form onSubmit={handleAddJournalEntry} className="p-5 rounded-2xl bg-white border border-[#ECE4D8] shadow-xs space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#483E37] block">
                    Tulis Entri Jurnal Baru
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Bab / Bagian (cth. Bab 5)"
                      value={newJournalChapter}
                      onChange={(e) => setNewJournalChapter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#DFD5C7] bg-[#FCF9F3] text-xs text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                    <input
                      type="text"
                      placeholder="Judul Refleksi (cth. Percakapan Terakhir)"
                      value={newJournalTitle}
                      onChange={(e) => setNewJournalTitle(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 rounded-xl border border-[#DFD5C7] bg-[#FCF9F3] text-xs text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan catatan renungan, impresi emosional, atau makna simbolik dari bab yang baru kamu baca..."
                    value={newJournalText}
                    onChange={(e) => setNewJournalText(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DFD5C7] bg-[#FCF9F3] text-xs text-[#2E2722] focus:outline-none focus:border-[#483E37] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Simpan Entri Jurnal</span>
                    </button>
                  </div>
                </form>

                {/* Journal List */}
                <div className="space-y-4">
                  {bookJournalNotes.map((note) => (
                    <div key={note.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] shadow-xs">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#EAE2DC] text-[#483E37] text-[11px] font-semibold uppercase">
                            {note.chapter}
                          </span>
                          <h4 className="font-serif text-base font-medium text-[#2E2722]">
                            {note.title}
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#8C7767]">{note.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#424844] leading-relaxed">
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Memorable Quotes from this Book */}
              <div className="space-y-6 pt-4 border-t border-[#ECE4D8]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#2E2722]">
                      Kutipan Jiwa &amp; Kalimat Berkesan ({bookQuotes.length})
                    </h3>
                    <p className="text-xs text-[#737973] mt-0.5">
                      Kutipan-kutipan pilihan yang kamu arsipkan khusus untuk buku ini di rak koleksi.
                    </p>
                  </div>
                </div>

                {/* Add Quote Form */}
                <form onSubmit={handleAddQuote} className="p-4 rounded-2xl bg-white border border-[#ECE4D8] flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Ketik kutipan kalimat dari buku yang paling membekas..."
                    value={newQuoteText}
                    onChange={(e) => setNewQuoteText(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 rounded-xl border border-[#DFD5C7] bg-[#FCF9F3] text-xs text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Arsipkan Kutipan</span>
                  </button>
                </form>

                {/* Quotes List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookQuotes.map((q, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] relative">
                      <Quote className="w-5 h-5 text-[#BAA798]/40 absolute top-4 right-4" />
                      <blockquote className="font-serif italic text-sm text-[#3E3832] leading-relaxed pr-6">
                        {q}
                      </blockquote>
                      <div className="mt-3 text-[11px] text-[#8C7767]">
                        Tersimpan di Rak {selectedShelf.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToShelfSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Rak "{selectedShelf.title}"</span>
                </button>
                <button
                  type="button"
                  onClick={handleBackToShelvesList}
                  className="text-xs text-[#737973] hover:text-[#483E37] hover:underline cursor-pointer"
                >
                  Lihat Semua Rak Koleksi
                </button>
              </div>
            </main>
          </div>
        ) : showShelfAnalytics ? (
          /* ========================================================
             SUB-SUB PAGE: ROADMAP & ANALISIS RAK KOLEKSI
             ======================================================== */
          <div className="w-full pb-16">
            {/* Sub-sub page Breadcrumb (4 Levels) */}
            <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
              <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973] overflow-x-auto no-scrollbar">
                <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Beranda
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Profil Saya
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Rak Koleksi
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToShelfSubpage} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  {selectedShelf.title}
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <span className="text-[#483E37] font-semibold truncate">
                  Roadmap &amp; Analisis Rak
                </span>
              </div>
            </div>

            {/* Sub-sub page Header */}
            <section className="w-full pt-8 pb-8 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
              <div className="max-w-[1080px] mx-auto">
                <button
                  type="button"
                  onClick={handleBackToShelfSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Rak "{selectedShelf.title}"</span>
                </button>

                <div className="max-w-2xl">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37] mb-2 inline-block">
                    Studi Kuratorial &amp; Peta Bacaan
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2E2722] mb-3">
                    Roadmap &amp; Analisis: {selectedShelf.title}
                  </h1>
                  <p className="text-sm text-[#5A554E] leading-relaxed">
                    Eksplorasi mendalam struktur alur membaca, distribusi tema karya, dan estimasi waktu penuntasan untuk rak kurasi ini.
                  </p>
                </div>
              </div>
            </section>

            {/* Sub-sub page Analytics Body */}
            <main className="max-w-[1080px] mx-auto px-6 md:px-8 py-10 space-y-10">
              {/* 1. Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <span className="text-xs text-[#737973] block mb-1">Total Buku</span>
                  <span className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {selectedShelf.books?.length || 0} Judul
                  </span>
                  <span className="text-[11px] text-[#8C7767] block mt-1">Koleksi terkurasi</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <span className="text-xs text-[#737973] block mb-1">Estimasi Waktu</span>
                  <span className="font-serif text-2xl font-semibold text-[#2E2722]">
                    ~28 Jam
                  </span>
                  <span className="text-[11px] text-[#8C7767] block mt-1">Kecepatan 250 kata/mnt</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <span className="text-xs text-[#737973] block mb-1">Tingkat Selesai</span>
                  <span className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {Math.round(((selectedShelf.books?.filter(b => b.status === 'Selesai').length || 0) / (selectedShelf.books?.length || 1)) * 100)}%
                  </span>
                  <span className="text-[11px] text-[#8C7767] block mt-1">
                    {selectedShelf.books?.filter(b => b.status === 'Selesai').length || 0} dari {selectedShelf.books?.length || 0} buku
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <span className="text-xs text-[#737973] block mb-1">Rentang Era</span>
                  <span className="font-serif text-2xl font-semibold text-[#2E2722]">
                    1942 — 2026
                  </span>
                  <span className="text-[11px] text-[#8C7767] block mt-1">Klasik hingga kontemporer</span>
                </div>
              </div>

              {/* 2. Curated Reading Roadmap Sequence */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#2E2722]">
                    Peta Urutan Membaca Terkurasi (Recommended Reading Roadmap)
                  </h3>
                  <p className="text-xs text-[#737973] mt-0.5">
                    Urutan ideal yang dirancang kurator untuk menyelami lapis-lapis pemikiran rak ini secara runut.
                  </p>
                </div>

                <div className="space-y-4">
                  {(selectedShelf.books || []).map((book, idx) => (
                    <div
                      key={book.id}
                      onClick={() => handleOpenBookJournalSubSubpage(book)}
                      className="p-4 rounded-xl bg-white border border-[#ECE4D8] hover:border-[#483E37] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-[#EAE2DC] text-[#483E37] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#483E37] group-hover:text-white transition-colors">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C7767] block">
                            {idx === 0 ? 'Langkah 1: Fondasi Gagasan' : idx === 1 ? 'Langkah 2: Eksplorasi Tematik' : `Langkah ${idx + 1}: Refleksi & Sintesis`}
                          </span>
                          <h4 className="font-serif text-base font-semibold text-[#2E2722] group-hover:underline">
                            {book.title}
                          </h4>
                          <p className="text-xs text-[#737973]">{book.author} • {book.pages || 320} hal</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md ${
                          book.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : book.status === 'Sedang Dibaca'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {book.status}
                        </span>
                        <span className="text-xs font-semibold text-[#483E37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Buka Jurnal <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Thematic Distribution */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-medium text-[#2E2722]">
                  Distribusi Tema &amp; Atmosfer Koleksi
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-[#424844]">
                      <span>Fiksi Sastra &amp; Eksistensialisme</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EAE2DC] overflow-hidden">
                      <div className="h-full bg-[#483E37] rounded-full" style={{ width: '55%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-[#424844]">
                      <span>Memori, Kehilangan &amp; Waktu</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EAE2DC] overflow-hidden">
                      <div className="h-full bg-[#68574B] rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-[#424844]">
                      <span>Esai Sosiokultural Nusantara</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EAE2DC] overflow-hidden">
                      <div className="h-full bg-[#8C7767] rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToShelfSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Rak "{selectedShelf.title}"</span>
                </button>
              </div>
            </main>
          </div>
        ) : (
          /* ========================================================
             SUBPAGE: DETAIL RAK KOLEKSI (Level 2)
             ======================================================== */
          <div className="w-full pb-16">
          {/* Subpage Breadcrumb */}
          <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
            <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
              <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer">
                Beranda
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer">
                Profil Saya
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <button onClick={handleBackToShelvesList} className="hover:text-[#483E37] transition-colors cursor-pointer">
                Rak Koleksi
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <span className="text-[#483E37] font-semibold">{selectedShelf.title}</span>
            </div>
          </div>

          {/* Subpage Hero Header */}
          <section className="w-full pt-8 pb-8 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
            <div className="max-w-[1080px] mx-auto">
              {/* Back to Profile Shelves button */}
              <button
                type="button"
                onClick={handleBackToShelvesList}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Semua Rak</span>
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37] flex items-center gap-1.5">
                      {selectedShelf.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      <span>{selectedShelf.isPrivate ? 'Rak Privat' : 'Rak Publik'}</span>
                    </span>
                    <span className="text-xs text-[#737973]">
                      Dibuat oleh <span className="font-medium text-[#2E2722]">{profile.name}</span>
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2E2722] mb-3">
                    {selectedShelf.title}
                  </h1>

                  <p className="text-sm text-[#5A554E] max-w-2xl leading-relaxed">
                    {selectedShelf.description}
                  </p>
                </div>

                {/* Subpage Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleOpenShelfAnalytics}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    title="Buka Analisis & Roadmap Rak"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Roadmap &amp; Analisis</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Buku</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditShelfTitle(selectedShelf.title)
                      setEditShelfDesc(selectedShelf.description)
                      setEditShelfPrivate(selectedShelf.isPrivate)
                      setShowEditShelfModal(true)
                    }}
                    className="p-2.5 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] transition-colors cursor-pointer"
                    title="Edit Detail Rak"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href)
                        triggerToast('Tautan rak buku disalin!')
                      }
                    }}
                    className="p-2.5 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] transition-colors cursor-pointer"
                    title="Bagikan Rak"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Shelf Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-[#ECE4D8]">
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE4D8]">
                  <div className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {selectedShelf.books?.length || 0}
                  </div>
                  <div className="text-xs text-[#737973] mt-0.5">Total Buku Tersimpan</div>
                </div>
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE4D8]">
                  <div className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {selectedShelf.books?.filter((b) => b.status === 'Selesai').length || 0}
                  </div>
                  <div className="text-xs text-[#737973] mt-0.5">Buku Telah Selesai</div>
                </div>
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE4D8]">
                  <div className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {selectedShelf.readHours || '~35 Jam'}
                  </div>
                  <div className="text-xs text-[#737973] mt-0.5">Estimasi Waktu Membaca</div>
                </div>
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE4D8]">
                  <div className="font-serif text-2xl font-semibold text-[#2E2722]">
                    {selectedShelf.createdDate || 'Januari 2026'}
                  </div>
                  <div className="text-xs text-[#737973] mt-0.5">Waktu Kurasi Rak</div>
                </div>
              </div>

            </div>
          </section>

          {/* Subpage Main: Book List & Filters */}
          <main className="max-w-[1080px] mx-auto px-6 md:px-8 pt-8">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-[#ECE4D8] mb-8">
              
              {/* Status Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'Semua Buku', count: selectedShelf.books?.length || 0 },
                  {
                    id: 'finished',
                    label: 'Selesai',
                    count: selectedShelf.books?.filter((b) => b.status === 'Selesai').length || 0
                  },
                  {
                    id: 'reading',
                    label: 'Sedang Dibaca',
                    count: selectedShelf.books?.filter((b) => b.status === 'Sedang Dibaca').length || 0
                  },
                  {
                    id: 'unread',
                    label: 'Belum Dibaca',
                    count: selectedShelf.books?.filter((b) => b.status === 'Belum Dibaca').length || 0
                  }
                ].map((f) => {
                  const isActive = shelfStatusFilter === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setShelfStatusFilter(f.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#483E37] text-[#FAF7F2] font-semibold'
                          : 'bg-[#FAF7F2] border border-[#ECE4D8] text-[#5A554E] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      <span>{f.label}</span>
                      <span className={`text-[10px] px-1.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAE2DC] text-[#483E37]'
                      }`}>
                        {f.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search Inside Shelf */}
              <div className="w-full sm:w-64 h-9 bg-[#FAF7F2] border border-[#DFD5C7] rounded-full px-3.5 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#8C7767] flex-shrink-0" />
                <input
                  type="text"
                  value={shelfSearch}
                  onChange={(e) => setShelfSearch(e.target.value)}
                  placeholder="Cari judul dalam rak ini..."
                  className="w-full bg-transparent font-sans text-xs text-[#2E2722] placeholder-[#8C7767] focus:outline-none"
                />
              </div>

            </div>

            {/* Books in Shelf Grid */}
            {filteredShelfBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShelfBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] flex flex-col justify-between hover:border-[#BAA798] transition-all shadow-xs group"
                  >
                    <div>
                      {/* Top: Cover & Basic Info */}
                      <div className="flex gap-4 mb-4">
                        <div
                          onClick={() => handleOpenBookJournalSubSubpage(book)}
                          className="w-20 h-28 rounded-lg overflow-hidden bg-[#E8DFD3] shadow-xs flex-shrink-0 cursor-pointer"
                          title="Klik untuk membuka jurnal bacaan buku ini"
                        >
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md mb-1.5 inline-block ${
                            book.status === 'Selesai'
                              ? 'bg-[#EAE2DC] text-[#483E37]'
                              : book.status === 'Sedang Dibaca'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-zinc-200 text-zinc-700'
                          }`}>
                            {book.status}
                          </span>

                          <h3
                            onClick={() => handleOpenBookJournalSubSubpage(book)}
                            className="font-serif text-base font-semibold text-[#2E2722] leading-snug line-clamp-2 hover:underline cursor-pointer"
                            title="Buka jurnal refleksi buku ini"
                          >
                            {book.title}
                          </h3>
                          <p className="text-xs text-[#737973] mt-0.5">{book.author}</p>
                          <div className="text-[11px] text-[#8C7767] mt-1.5 flex items-center gap-1 font-medium">
                            <span>Rating {book.rating}</span>
                            <span>•</span>
                            <span>{book.pages} hal</span>
                          </div>
                        </div>
                      </div>

                      {/* Personal Curated Note on Book */}
                      {book.note && (
                        <div className="p-3 rounded-xl bg-white border border-[#ECE4D8] text-xs text-[#5A554E] leading-relaxed mb-4">
                          <span className="font-serif italic font-medium text-[#483E37] block mb-0.5">
                            Catatan Kurasi:
                          </span>
                          "{book.note}"
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#ECE4D8] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenBookJournalSubSubpage(book)}
                          className="text-xs font-semibold text-white bg-[#483E37] hover:bg-[#3D342E] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                          Buka Jurnal &amp; Refleksi →
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigateBookDetail && onNavigateBookDetail(book.id)}
                          className="text-xs font-medium text-[#737973] hover:text-[#483E37] hover:underline cursor-pointer"
                        >
                          Katalog
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveBookFromCurrentShelf(book.id, book.title)}
                        className="text-xs text-[#737973] hover:text-red-600 transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-red-50"
                        title="Hapus buku dari rak ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DFD5C7]">
                <BookOpen className="w-10 h-10 text-[#8C7767] mx-auto mb-3 opacity-60" />
                <h4 className="font-serif text-lg font-medium text-[#2E2722] mb-1">
                  Belum ada buku yang cocok
                </h4>
                <p className="text-xs text-[#737973] max-w-sm mx-auto mb-5">
                  {shelfSearch
                    ? 'Tidak ditemukan buku dengan kata kunci pencarian tersebut.'
                    : 'Rak ini masih kosong. Mulai tambahkan buku pilihan untuk memperkaya koleksi.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#483E37] text-white text-xs font-semibold hover:bg-[#3D342E] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Buku Pertama</span>
                </button>
              </div>
            )}
          </main>
        </div>
        )
      ) : (
        /* ========================================================
           HALAMAN PROFIL UTAMA (Jika tidak dalam subpage rak)
           ======================================================== */
        <div>
          {/* Sub-header / Breadcrumb */}
          <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/60">
            <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
              <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer">
                Beranda
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <span className="text-[#483E37] font-semibold">Profil Saya</span>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <span className="text-[#5A554E]">{profile.name}</span>
            </div>
          </div>

          {/* 1. NATURAL PROFILE HEADER WITH COMPREHENSIVE DATA */}
          <section className="w-full pt-10 pb-8 px-6 md:px-8 bg-gradient-to-b from-[#F7F3EB] to-[#FCF9F3] border-b border-[#ECE4D8]">
            <div className="max-w-[1080px] mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#ECE4D8]">
                
                {/* Left: Avatar & Comprehensive Profile Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#E8DFD3] border-2 border-[#DFD5C7] flex items-center justify-center shadow-xs">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                      ) : profile.name ? (
                        <span className="font-serif text-3xl font-medium text-[#483E37] select-none">
                          {profile.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className="w-9 h-9 text-[#8C7767]" />
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E2722]">
                        {profile.name}
                      </h1>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37] font-medium border border-[#D6C8BE]">
                        {profile.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#737973] mb-2.5">
                      <span className="font-medium text-[#483E37]">{profile.handle}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8C7767]" />
                        <span>{profile.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#8C7767]" />
                        <span>{profile.email}</span>
                      </span>
                      {profile.website && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#483E37] hover:underline">
                            <LinkIcon className="w-3 h-3 text-[#8C7767]" />
                            <span>{profile.website}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#424844] max-w-xl leading-relaxed mb-3">
                      {profile.bio}
                    </p>

                    {/* Favorite Quote Box */}
                    {profile.favoriteQuote && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#ECE4D8] text-xs text-[#5A554E] italic font-serif">
                        <Quote className="w-3.5 h-3.5 text-[#8C7767] flex-shrink-0" />
                        <span>"{profile.favoriteQuote}"</span>
                        {profile.favoriteAuthor && (
                          <span className="text-[#8C7767] not-italic font-sans text-[11px] font-medium">
                            — {profile.favoriteAuthor}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-stretch md:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setEditFormData({ ...profile })
                      setEditModalSection('identity')
                      setShowEditModal(true)
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold border border-[#DFD5C7] hover:border-[#483E37] rounded-xl text-[#483E37] bg-white transition-colors cursor-pointer shadow-xs"
                  >
                    Edit Profil Lengkap
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 border border-[#DFD5C7] hover:border-[#483E37] rounded-xl text-[#483E37] bg-white transition-colors cursor-pointer shadow-xs"
                    title="Bagikan Tautan Profil"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Comprehensive Metric Strip with Reading Target Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[#ECE4D8]">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#737973]">Target Tahunan</span>
                    <span className="text-xs font-semibold text-[#483E37]">{targetPercent}%</span>
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-semibold text-[#2E2722]">
                    {profile.booksReadThisYear} <span className="text-xs font-sans text-[#737973] font-normal">/ {profile.yearlyTarget} buku</span>
                  </div>
                  <div className="w-full bg-[#E5DED4] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#483E37] h-full rounded-full transition-all" style={{ width: `${targetPercent}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <div className="text-xs text-[#737973] mb-1">Ulasan Tertulis</div>
                  <div className="font-serif text-xl sm:text-2xl font-semibold text-[#2E2722]">
                    {profile.reviewsWritten}
                  </div>
                  <div className="text-[11px] text-[#8C7767] mt-1">Rating {profile.averageRating} Rata-rata</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <div className="text-xs text-[#737973] mb-1">Genre Favorit</div>
                  <div className="font-serif text-base sm:text-lg font-semibold text-[#2E2722] truncate">
                    {profile.favoriteGenre}
                  </div>
                  <div className="text-[11px] text-[#8C7767] mt-1">{profile.readingPace}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE4D8]">
                  <div className="text-xs text-[#737973] mb-1">Penulis Favorit</div>
                  <div className="font-serif text-base sm:text-lg font-semibold text-[#2E2722] truncate">
                    {profile.favoriteAuthor || 'Pramoedya & Camus'}
                  </div>
                  <div className="text-[11px] text-[#8C7767] mt-1">Bergabung {profile.joinDate}</div>
                </div>
              </div>

            </div>
          </section>

          {/* 2. MINIMALIST TABS */}
          <section className="w-full px-6 md:px-8 border-b border-[#ECE4D8] bg-[#FAF7F2]/50">
            <div className="max-w-[1080px] mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: 'reading', label: 'Sedang Dibaca', count: currentlyReading.length },
                { id: 'wishlist', label: 'Ingin Dibaca', count: wishlistBooks.length },
                { id: 'shelves', label: 'Rak Koleksi', count: shelves.length },
                { id: 'finished', label: 'Selesai', count: 28 },
                { id: 'reviews', label: 'Ulasan', count: 14 }
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'border-[#483E37] text-[#483E37] font-semibold'
                        : 'border-transparent text-[#737973] hover:text-[#2E2722]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-xs text-[#8C7767]">({tab.count})</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* 3. TAB CONTENT */}
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
                        className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] flex gap-4 items-center shadow-xs"
                      >
                        <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#E8DFD3] shadow-xs">
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base font-semibold text-[#2E2722] truncate">
                            {book.title}
                          </h3>
                          <p className="text-xs text-[#737973] mb-3">{book.author}</p>

                          <div className="w-full bg-[#E5DED4] h-1.5 rounded-full overflow-hidden mb-1.5">
                            <div
                              className="bg-[#483E37] h-full rounded-full transition-all"
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
                              className="text-[#483E37] font-semibold hover:underline cursor-pointer"
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
                      className="group flex flex-col justify-between p-3.5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] shadow-xs"
                    >
                      <div>
                        <div className="w-full h-44 rounded-xl overflow-hidden bg-[#E8DFD3] mb-2.5">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-[#2E2722] line-clamp-1">
                          {book.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onNavigateAuthor && onNavigateAuthor(book.authorId || 'julian-cross')}
                          className="text-xs text-[#737973] hover:text-[#483E37] hover:underline line-clamp-1 text-left block"
                        >
                          {book.author}
                        </button>
                        <div className="text-[11px] text-[#8C7767] mt-1 font-medium">
                          Rating {book.rating} • {book.priority}
                        </div>
                      </div>

                      <div className="pt-3 mt-2 border-t border-[#ECE4D8] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleStartReading(book)}
                          className="text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
                        >
                          Mulai Baca
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setWishlistBooks(wishlistBooks.filter((b) => b.id !== book.id))
                            triggerToast(`"${book.title}" dihapus.`)
                          }}
                          className="text-xs text-[#737973] hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: RAK KOLEKSI (DENGAN BUTTON "LIHAT RAK →" YANG MEMBUKA SUBPAGE) */}
            {activeTab === 'shelves' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECE4D8]">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2E2722]">Daftar Rak Koleksi</h3>
                    <p className="text-xs text-[#737973]">Klik "Lihat Rak →" pada koleksi mana saja untuk membuka subpage lengkapnya.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowShelfModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#483E37] text-white text-xs font-semibold hover:bg-[#3D342E] transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Buat Rak Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {shelves.map((shelf) => (
                    <div
                      key={shelf.id}
                      className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] flex flex-col justify-between hover:border-[#BAA798] transition-all shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-serif text-base font-semibold text-[#2E2722]">
                            {shelf.title}
                          </h4>
                          <span className="text-[10px] text-[#737973] flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAE2DC]">
                            {shelf.isPrivate ? <Lock className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{shelf.isPrivate ? 'Privat' : 'Publik'}</span>
                          </span>
                        </div>
                        <p className="text-xs text-[#5A554E] leading-relaxed mb-4">
                          {shelf.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#737973] pt-3 border-t border-[#ECE4D8]">
                        <span className="font-medium">{shelf.bookCount} buku tersimpan</span>
                        <button
                          type="button"
                          onClick={() => handleOpenShelfSubpage(shelf)}
                          className="font-semibold text-[#483E37] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Lihat Rak</span>
                          <ChevronRight className="w-3.5 h-3.5" />
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
                  { title: 'Dunia Sophie', author: 'Jostein Gaarder', rating: 4.5, date: 'Agu 2026' },
                  { title: 'Orang Asing', author: 'Albert Camus', rating: 4.8, date: 'Jul 2026' },
                  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', rating: 4.9, date: 'Jun 2026' }
                ].map((b, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#ECE4D8] bg-[#FAF7F2] shadow-xs">
                    <h4 className="font-serif text-sm font-semibold text-[#2E2722]">{b.title}</h4>
                    <p className="text-xs text-[#737973] mb-2">{b.author}</p>
                    <div className="text-[11px] text-[#8C7767] flex items-center justify-between font-medium">
                      <span>Rating {b.rating}</span>
                      <span>{b.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: ULASAN */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-[#2E2722]">The Memory of Water — Julian Cross</span>
                    <span className="text-xs font-semibold text-[#8C7767]">Rating 5 / 5</span>
                  </div>
                  <p className="text-xs text-[#424844] leading-relaxed">
                    "Gaya penulisannya seperti mengukir di atas batu basah—lambat, presisi, dan abadi. Bab tentang arsitektur mercusuar tua di bab 4 adalah salah satu prosa terindah yang pernah saya baca."
                  </p>
                  <div className="text-[10px] text-[#737973] mt-3 pt-2 border-t border-[#ECE4D8]">
                    Ditulis 18 Okt 2026 • 34 pembaca terbantu
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-[#2E2722]">Bumi Manusia — Pramoedya Ananta Toer</span>
                    <span className="text-xs font-semibold text-[#8C7767]">Rating 5 / 5</span>
                  </div>
                  <p className="text-xs text-[#424844] leading-relaxed">
                    "Karya monumental yang wajib dibaca setiap manusia Indonesia. Karakter Nyai Ontosoroh mengajarkan martabat dan perlawanan tanpa pamrih melawan penindasan hukum kolonial."
                  </p>
                  <div className="text-[10px] text-[#737973] mt-3 pt-2 border-t border-[#ECE4D8]">
                    Ditulis 28 Sep 2026 • 52 pembaca terbantu
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PROFIL LENGKAP & DISESUAIKAN
          (Bukan cuma nama & bio: Foto, Handle, Email, Peran,
           Lokasi, Website, Genre Favorit, Penulis Favorit,
           Target Tahunan, Kecepatan Membaca, Kutipan Jiwa)
          ======================================================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FCF9F3] border border-[#DFD5C7] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ECE4D8]">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#2E2722]">Edit Profil Pembaca</h3>
                <p className="text-xs text-[#737973]">Perbarui identitas, preferensi, dan target literasimu.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-[#8C7767] hover:text-[#2E2722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Section Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#ECE4D8] mb-5">
              {[
                { id: 'identity', label: 'Identitas & Kontak' },
                { id: 'reading', label: 'Target & Preferensi' },
                { id: 'bio', label: 'Bio & Kutipan' }
              ].map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setEditModalSection(sec.id)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    editModalSection === sec.id
                      ? 'bg-[#483E37] text-white shadow-xs'
                      : 'text-[#737973] hover:text-[#2E2722]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* SECTION 1: IDENTITAS & FOTO & KONTAK */}
              {editModalSection === 'identity' && (
                <div className="space-y-3.5">
                  {/* Avatar Picker */}
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE4D8]">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#E8DFD3] border border-[#DFD5C7] flex items-center justify-center">
                        {editFormData.avatar ? (
                          <img src={editFormData.avatar} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-[#8C7767]" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => avatarFileRef.current?.click()}
                        className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#483E37] text-white flex items-center justify-center shadow hover:bg-[#3D342E]"
                        title="Ganti Foto"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-1">
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
                      <button
                        type="button"
                        onClick={() => avatarFileRef.current?.click()}
                        className="text-xs font-semibold text-[#483E37] hover:underline block"
                      >
                        Unggah Foto Baru
                      </button>
                      {editFormData.avatar && (
                        <button
                          type="button"
                          onClick={() => setEditFormData({ ...editFormData, avatar: null })}
                          className="text-[11px] text-red-600 hover:underline block"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Username / Handle</label>
                      <input
                        type="text"
                        required
                        value={editFormData.handle}
                        onChange={(e) => setEditFormData({ ...editFormData, handle: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Peran Pembaca</label>
                      <input
                        type="text"
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                        placeholder="Contoh: Penikmat Sastra"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Surel / Email</label>
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Domisili / Lokasi</label>
                      <input
                        type="text"
                        value={editFormData.location}
                        onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Tautan Medsos / Web</label>
                    <input
                      type="text"
                      value={editFormData.website}
                      onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                      placeholder="instagram.com/username atau goodreads.com/user"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 2: TARGET & PREFERENSI MEMBACA */}
              {editModalSection === 'reading' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Target Buku Setahun</label>
                      <input
                        type="number"
                        min="1"
                        max="300"
                        value={editFormData.yearlyTarget}
                        onChange={(e) => setEditFormData({ ...editFormData, yearlyTarget: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#483E37] mb-1">Kecepatan Membaca</label>
                      <input
                        type="text"
                        value={editFormData.readingPace}
                        onChange={(e) => setEditFormData({ ...editFormData, readingPace: e.target.value })}
                        placeholder="Contoh: 3-4 buku per bulan"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Genre Favorit</label>
                    <input
                      type="text"
                      value={editFormData.favoriteGenre}
                      onChange={(e) => setEditFormData({ ...editFormData, favoriteGenre: e.target.value })}
                      placeholder="Contoh: Realisme Magis, Filsafat, Puisi"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Penulis Favorit</label>
                    <input
                      type="text"
                      value={editFormData.favoriteAuthor}
                      onChange={(e) => setEditFormData({ ...editFormData, favoriteAuthor: e.target.value })}
                      placeholder="Contoh: Pramoedya Ananta Toer & Albert Camus"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 3: BIO & KUTIPAN JIWA */}
              {editModalSection === 'bio' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Bio Singkat</label>
                    <textarea
                      rows={3}
                      value={editFormData.bio}
                      onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                      placeholder="Tuliskan latar belakang atau filosofi membacamu..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#483E37] mb-1">Kutipan Jiwa / Motto Membaca</label>
                    <textarea
                      rows={2}
                      value={editFormData.favoriteQuote}
                      onChange={(e) => setEditFormData({ ...editFormData, favoriteQuote: e.target.value })}
                      placeholder="Kutipan sastra atau perenungan favoritmu..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                    />
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#ECE4D8]">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs text-[#737973] hover:text-[#2E2722]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs bg-[#483E37] hover:bg-[#3D342E] text-white rounded-xl font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TAMBAH BUKU KE RAK SUBPAGE
          ======================================================== */}
      {showAddBookModal && selectedShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-medium text-[#2E2722] mb-1">
              Tambah Buku ke Rak
            </h3>
            <p className="text-xs text-[#737973] mb-4">
              Menambahkan koleksi ke "{selectedShelf.title}".
            </p>

            <form onSubmit={handleAddBookToCurrentShelf} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Judul Buku</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Seperti Dendam, Rindu Harus Dibayar Tuntas"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Penulis</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Eka Kurniawan"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Status Membaca</label>
                <select
                  value={newBookStatus}
                  onChange={(e) => setNewBookStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                >
                  <option value="Selesai">Selesai Dibaca</option>
                  <option value="Sedang Dibaca">Sedang Dibaca</option>
                  <option value="Belum Dibaca">Belum Dibaca</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Catatan Kurasi (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Alasan mengapa buku ini disimpan dalam rak ini..."
                  value={newBookNote}
                  onChange={(e) => setNewBookNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE4D8]">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#483E37] hover:bg-[#3D342E] text-white rounded-lg font-semibold"
                >
                  Tambahkan Buku
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT DETAIL RAK
          ======================================================== */}
      {showEditShelfModal && selectedShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-medium text-[#2E2722] mb-1">
              Edit Detail Rak
            </h3>
            <p className="text-xs text-[#737973] mb-4">
              Ubah judul, deskripsi, atau status privasi rak ini.
            </p>

            <form onSubmit={handleSaveShelfDetail} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Nama Rak</label>
                <input
                  type="text"
                  required
                  value={editShelfTitle}
                  onChange={(e) => setEditShelfTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#483E37] mb-1">Deskripsi Rak</label>
                <textarea
                  rows={2}
                  value={editShelfDesc}
                  onChange={(e) => setEditShelfDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-shelf-private"
                  checked={editShelfPrivate}
                  onChange={(e) => setEditShelfPrivate(e.target.checked)}
                  className="rounded text-[#483E37]"
                />
                <label htmlFor="edit-shelf-private" className="text-xs text-[#424844] cursor-pointer">
                  Jadikan koleksi privat (hanya terlihat oleh Anda)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE4D8]">
                <button
                  type="button"
                  onClick={() => setShowEditShelfModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#483E37] hover:bg-[#3D342E] text-white rounded-lg font-semibold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PERBARUI PROGRES BACA
          ======================================================== */}
      {showProgressModal && activeReadingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-xl max-w-sm w-full p-5 shadow-xl">
            <h4 className="font-serif text-lg text-[#483E37] mb-1">Perbarui Halaman</h4>
            <p className="text-xs text-[#737973] mb-4">{activeReadingBook.title}</p>
            <form onSubmit={handleUpdateProgressSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={activeReadingBook.totalPages}
                  value={progressPage}
                  onChange={(e) => setProgressPage(e.target.value)}
                  className="w-24 px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-white font-semibold text-[#483E37] focus:outline-none"
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
                  className="px-4 py-1.5 text-xs bg-[#483E37] text-white rounded font-medium"
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
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-xl max-w-sm w-full p-5 shadow-xl">
            <h4 className="font-serif text-lg text-[#483E37] mb-1">Buat Rak Koleksi Baru</h4>
            <p className="text-xs text-[#737973] mb-3">Kelompokkan bacaan berdasarkan tema favorit Anda.</p>
            <form onSubmit={handleCreateShelfSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#483E37] mb-1">Nama Rak</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Sastra Jepang Pilihan"
                  value={shelfTitle}
                  onChange={(e) => setShelfTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-white text-[#483E37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#483E37] mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Koleksi buku-buku..."
                  value={shelfDesc}
                  onChange={(e) => setShelfDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#DFD5C7] bg-white text-[#483E37] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shelf-private"
                  checked={shelfPrivate}
                  onChange={(e) => setShelfPrivate(e.target.checked)}
                  className="rounded text-[#483E37]"
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
                  className="px-4 py-1.5 text-xs bg-[#483E37] text-white rounded font-medium"
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
