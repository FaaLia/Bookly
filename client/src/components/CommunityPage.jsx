import React, { useState } from 'react'
import {
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Compass,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  Send,
  X,
  Heart,
  Quote,
  Clock,
  UserCheck,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Share2
} from 'lucide-react'

export default function CommunityPage({
  onNavigateHome,
  onNavigateCatalog,
  onNavigateAuthor,
  onNavigateBookDetail,
  initialSection = 'all'
}) {
  const [activeTab, setActiveTab] = useState(initialSection)
  const [toastMessage, setToastMessage] = useState('')
  const [joinedClubs, setJoinedClubs] = useState(['magis-nusantara'])
  
  // Modals state
  const [showCreateClubModal, setShowCreateClubModal] = useState(false)
  const [showInterviewModal, setShowInterviewModal] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  // Create club form state
  const [newClubName, setNewClubName] = useState('')
  const [newClubCategory, setNewClubCategory] = useState('Sastra & Fiksi')
  const [newClubDesc, setNewClubDesc] = useState('')
  const [newClubSchedule, setNewClubSchedule] = useState('')
  const [newClubFirstBook, setNewClubFirstBook] = useState('')

  // Help form state
  const [helpEmail, setHelpEmail] = useState('')
  const [helpTopic, setHelpTopic] = useState('Klub Buku')
  const [helpMessage, setHelpMessage] = useState('')
  const [helpSubmitted, setHelpSubmitted] = useState(false)

  // Subpage & Sub-sub page navigation states
  // 1. selectedClub: if set, renders Subpage "Detail Klub Buku" (Level 2)
  // 2. selectedClubThread: if set inside selectedClub, renders Sub-sub page "Ruang Diskusi Tematik Klub" (Level 3)
  // 3. selectedInterviewArticle: if set, renders Sub-sub page "Transkrip Wawancara Penulis" (Level 3)
  const [selectedClub, setSelectedClub] = useState(null)
  const [selectedClubThread, setSelectedClubThread] = useState(null)
  const [selectedInterviewArticle, setSelectedInterviewArticle] = useState(null)

  const [threadComments, setThreadComments] = useState([
    {
      id: 1,
      author: 'Dewi Anggraini',
      role: 'Moderator Klub',
      avatar: 'D',
      date: '2 jam lalu',
      text: 'Mari kita mulai diskusi ini dengan meninjau paragraf pembuka bab: bagaimana penulis memadukan ironi sejarah dengan kepedihan eksistensial para tokohnya?'
    },
    {
      id: 2,
      author: 'Bambang Sudibyo',
      role: 'Anggota Aktif',
      avatar: 'B',
      date: '1 jam lalu',
      text: 'Menurut saya, kekuatan naratifnya terletak pada penolakan karakter untuk dikasihani. Karakter menerima absurditas dunia dengan martabat yang tenang.'
    },
    {
      id: 3,
      author: 'Clara Sinta',
      role: 'Pembaca Setia',
      avatar: 'C',
      date: '35 menit lalu',
      text: 'Kutipan di halaman tengah buku tentang memori air sangat menggetarkan hati saya. Rasanya relevan dengan apa yang kita rasakan di era serba cepat ini.'
    }
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const handleSendComment = (e) => {
    e.preventDefault()
    if (!newCommentText.trim()) return
    const comment = {
      id: Date.now(),
      author: 'Anda (Pembaca)',
      role: 'Anggota Klub',
      avatar: 'A',
      date: 'Baru saja',
      text: newCommentText.trim()
    }
    setThreadComments([...threadComments, comment])
    setNewCommentText('')
    triggerToast('Tanggapan berhasil dikirim ke ruang diskusi!')
  }

  const handleBackToCommunityMain = () => {
    setSelectedClub(null)
    setSelectedClubThread(null)
    setSelectedInterviewArticle(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToClubSubpage = () => {
    setSelectedClubThread(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3200)
  }

  // Book clubs mock data
  const [bookClubs, setBookClubs] = useState([
    {
      id: 'magis-nusantara',
      name: 'Lingkar Realisme Magis Nusantara',
      category: 'Sastra Magis & Surealis',
      description: 'Menelusuri bagaimana mitos leluhur, kepedihan sejarah, dan keajaiban berjalin kelindan dalam mahakarya prosa modern Indonesia.',
      currentBook: {
        title: 'Cantik Itu Luka',
        author: 'Eka Kurniawan',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
        chapter: 'Diskusi Bab 12 - 18'
      },
      nextMeet: 'Sabtu ini, 19.30 WIB',
      moderator: 'Dewi Anggraini & Dr. Farhan',
      membersCount: 412,
      bannerImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'filsafat-eksistensial',
      name: 'Lingkar Filsafat & Eksistensialisme',
      category: 'Filsafat & Refleksi Batin',
      description: 'Membahas makna keberadaan manusia, absurditas, dan kebebasan nurani lewat dialog kritis teks-teks pemikir besar dunia.',
      currentBook: {
        title: 'Orang Asing (L\'Étranger)',
        author: 'Albert Camus',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
        chapter: 'Bagian II: Pengadilan Absurditas'
      },
      nextMeet: 'Rabu depan, 20.00 WIB',
      moderator: 'Rayhan Maulana',
      membersCount: 389,
      bannerImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'puisi-keheningan',
      name: 'Pojok Puisi & Keheningan Malam',
      category: 'Puisi & Lirik Sastra',
      description: 'Menikmati ritme kata, metafora hening, dan perenungan senja bersama bait-bait Sapardi, Chairil, hingga penyair liris kontemporer.',
      currentBook: {
        title: 'Hujan Bulan Juni',
        author: 'Sapardi Djoko Damono',
        cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e35b34?q=80&w=600&auto=format&fit=crop',
        chapter: 'Tadarus Sajak-Sajak Hujan'
      },
      nextMeet: 'Minggu, 21.00 WIB',
      moderator: 'Clara Sinta',
      membersCount: 560,
      bannerImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'arsitektur-memori',
      name: 'Arsitektur, Kota, & Memori Sunyi',
      category: 'Esai & Sastra Ruang',
      description: 'Menganalisis bagaimana dinding rumah kuno, gang kota kelabu, dan lanskap arsitektur membentuk psikologi narasi dalam karya fiksi.',
      currentBook: {
        title: 'The River\'s Bend',
        author: 'Julian Cross',
        cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
        chapter: 'Bab 5: Kota yang Mengalir'
      },
      nextMeet: 'Kamis, 19.00 WIB',
      moderator: 'Arka Danendra',
      membersCount: 245,
      bannerImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop'
    }
  ])

  // Author interviews data
  const interviews = [
    {
      id: 'julian-cross',
      authorName: 'Julian Cross',
      authorId: 'julian-cross',
      title: 'Menulis Air, Memori, dan Waktu yang Menolak Hilang',
      subtitle: 'Refleksi penciptaan The Memory of Water dan proses menyelami kesunyian pesisir utara.',
      pullQuote: 'Air adalah arsip purba bumi; setiap tetesnya merekam ingatan mereka yang pernah mencintai dan merelakan.',
      publishDate: '2 November 2026',
      readTime: '7 menit baca',
      topics: ['Metafora Alam', 'Psikologi Duka', 'Teknik Narasi'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      bookTitle: 'The Memory of Water',
      content: [
        {
          q: 'Apa yang mengawali lahirnya The Memory of Water?',
          a: 'Bagi saya, air bukanlah sekadar elemen cair. Saat menghabiskan dua musim dingin di mercusuar tua di Skotlandia, saya menyadari bagaimana suara ombak membangkitkan ingatan-ingatan yang saya kira telah mati. Saya ingin menulis buku di mana lanskap air menjadi karakter yang bernapas dan mengingat.'
        },
        {
          q: 'Bagaimana Anda menyeimbangkan kesedihan dengan harapan dalam prosa Anda?',
          a: 'Kesedihan bukanlah kebalikan dari harapan, melainkan tanah tempat harapan berakar. Dalam menulis duka, kuncinya adalah jujur dan tidak terburu-buru menghibur pembaca. Biarkan mereka duduk bersama karakter dalam sunyi.'
        },
        {
          q: 'Apa pesan Anda bagi para pembaca setia Bookly yang juga tengah memulai menulis?',
          a: 'Jangan terobsesi pada kata-kata indah yang kosong. Dengarkan dunia dengan seksama, catat detail kecil yang luput dari pandangan orang lain, dan tuliskan dengan kejujuran nurani yang paling sunyi.'
        }
      ]
    },
    {
      id: 'elena-vance',
      authorName: 'Elena Vance',
      authorId: 'elena-vance',
      title: 'Daun Terakhir dan Keheningan di Penghujung Musim',
      subtitle: 'Percakapan intim tentang Before the Last Leaf dan bagaimana alam merawat kerinduan kita.',
      pullQuote: 'Sastra tidak ada untuk menyelesaikan kebingungan duniawi, melainkan untuk menemani kita merenunginya.',
      publishDate: '25 Oktober 2026',
      readTime: '6 menit baca',
      topics: ['Puitika Prosa', 'Keheningan', 'Ritme Musim'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
      bookTitle: 'Before the Last Leaf',
      content: [
        {
          q: 'Sebelum buku ini rampung, apa pergulatan batin terberat yang Anda alami?',
          a: 'Ketakutan bahwa keheningan dalam novel ini akan terasa membosankan di era serba bising. Namun para pembaca di komunitas seperti Bookly membuktikan bahwa ruang lambat dan teduh adalah kebutuhan manusia modern.'
        },
        {
          q: 'Mengapa metafora daun berguguran begitu kuat dalam karya Anda?',
          a: 'Karena gugur bukanlah tanda kematian semata, melainkan pelepasan yang anggun. Tanpa daun yang gugur, pohon tak akan pernah memiliki tunas baru.'
        }
      ]
    },
    {
      id: 'eka-kurniawan',
      authorName: 'Eka Kurniawan',
      authorId: 'eka-kurniawan',
      title: 'Menguliti Sejarah Nusantara Lewat Satir dan Dongeng Surealis',
      subtitle: 'Catatan perjalanan Cantik Itu Luka dan keberanian mendobrak batasan realitas dalam fiksi.',
      pullQuote: 'Sejarah seringkali terlalu brutal untuk diceritakan secara lurus; kadang hanya keajaiban dan dongeng yang mampu memikulnya.',
      publishDate: '14 Oktober 2026',
      readTime: '8 menit baca',
      topics: ['Realisme Magis', 'Sejarah Kritis', 'Satir Sosial'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      bookTitle: 'Cantik Itu Luka',
      content: [
        {
          q: 'Bagaimana perpaduan antara humor gelap dan tragedi bekerja dalam kisah Anda?',
          a: 'Masyarakat kita terbiasa bertahan hidup lewat tawa getir. Ketika tragedi sejarah terlalu berat, satir dan humor gelap menjadi perisai pertahanan emosional manusia Nusantara.'
        },
        {
          q: 'Bagaimana pandangan Anda tentang antusiasme pembaca muda di Bookly terhadap novel sastra klasik?',
          a: 'Sangat membahagiakan. Pembaca muda saat ini cerdas dan kritis. Mereka tidak hanya membaca cerita, tetapi menggali lapisan-lapisan historis dan filosofis di baliknya.'
        }
      ]
    },
    {
      id: 'clara-dupont',
      authorName: 'Clara Dupont',
      authorId: 'clara-dupont',
      title: 'Peta-Peta Sunyi yang Tak Tercatat Dalam Atlas Manapun',
      subtitle: 'Membongkar rahasia penulisan Atlas of Untraveled Roads dan pencarian jati diri antarbenua.',
      pullQuote: 'Setiap jalan yang enggan kita lewati tetap melahirkan kota rahasia di dalam batin kita.',
      publishDate: '30 September 2026',
      readTime: '5 menit baca',
      topics: ['Perjalanan Batin', 'Geografi Emosi', 'Memoar'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
      bookTitle: 'Atlas of Untraveled Roads',
      content: [
        {
          q: 'Apakah buku ini sebuah memoar terselubung?',
          a: 'Sebagian besar perasaan adalah nyata, namun rute perjalanannya adalah fiksi puitis. Saya ingin pembaca merasa sedang memegang kompas batin mereka sendiri.'
        }
      ]
    }
  ]

  // Community guidelines data
  const guidelines = [
    {
      number: '01',
      title: 'Kritik Gagasan, Hormati Martabat Pribadi',
      desc: 'Setiap karya mengundang sudut pandang berlainan. Sampaikan kritik terhadap ide, karakter, atau gaya bahasa dengan bahasa santun tanpa menyerang kepribadian penulis maupun sesama pembaca.',
      badge: 'Etika Berdiskusi'
    },
    {
      number: '02',
      title: 'Kewajiban Penanda Spoiler (Anti-Spoiler)',
      desc: 'Hormati magisnya kejutan cerita bagi sahabat lain. Tandai selalu ulasan atau pesan yang membongkar plot penting, twist, atau akhir cerita dengan tanda [Spoiler Alert].',
      badge: 'Penghormatan Pembaca'
    },
    {
      number: '03',
      title: 'Orisinalitas & Penolakan Mutlak Terhadap Pembajakan',
      desc: 'Bookly menjunjung tinggi perlindungan hak kekayaan intelektual. Dilarang keras menyebarkan tautan PDF bajakan, buku ilegal, maupun melakukan plagiarisme terhadap esai pembaca lain.',
      badge: 'Hak Cipta'
    },
    {
      number: '04',
      title: 'Ruang Suaka Literasi Bebas Spam & Komersialisasi',
      desc: 'Komunitas Bookly didedikasikan murni untuk pertukaran budi pekerti sastra dan pengalaman membaca. Promosi produk non-literasi, tautan afiliasi liar, atau spam akan langsung dibersihkan oleh kurator.',
      badge: 'Kenyamanan Ruang'
    },
    {
      number: '05',
      title: 'Moderasi Berkeadilan & Transparansi Bersama',
      desc: 'Moderator kami berkomitmen menjaga ketenteraman dialog tanpa diskriminasi. Siapapun berhak melaporkan interaksi yang mengganggu untuk ditinjau secara adil dan transparan.',
      badge: 'Keadilan Sanctuary'
    }
  ]

  // FAQs data
  const faqs = [
    {
      q: 'Bagaimana cara bergabung dengan sesi tatap maya atau ruang diskusi Klub Buku?',
      a: 'Cukup klik tombol "Gabung Klub" pada klub buku yang Anda minati. Tautan ruang temu virtual dan topik diskusi berkala akan otomatis terhubung ke kalender profil Anda dan dikirimkan lewat notifikasi.'
    },
    {
      q: 'Apakah saya bisa mendirikan Klub Buku baru secara mandiri di Bookly?',
      a: 'Tentu saja! Siapapun pembaca di Bookly dapat mengajukan klub buku baru melalui tombol "Buat Klub Baru". Komunitas ini terbuka bagi berbagai minat sastra dari fiksi klasik hingga kajian esai ilmiah.'
    },
    {
      q: 'Bagaimana proses pemilihan dan kurasi Wawancara Penulis di Bookly?',
      a: 'Kurasi dilakukan oleh Dewan Redaksi Bookly bersama masukan komunitas pembaca. Kami memprioritaskan karya yang memiliki bobot reflektif mendalam serta dialog segar yang menginspirasi pembaca.'
    },
    {
      q: 'Bagaimana jika saya menemukan ulasan atau komentar yang melanggar pedoman?',
      a: 'Anda dapat mengklik tombol "Laporkan Masalah" pada bagian Pedoman Komunitas atau langsung menghubungi kurator melalui formulir Bantuan di halaman ini. Tim kami merespons dalam waktu kurang dari 24 jam.'
    },
    {
      q: 'Apakah semua kegiatan di Komunitas Bookly bebas biaya?',
      a: 'Ya, seluruh lingkar klub buku, wawancara literasi, dan ruang dialog Bookly dapat diakses sepenuhnya secara cuma-cuma oleh seluruh anggota terdaftar demi kemajuan literasi nusantara.'
    }
  ]

  // Handlers
  const handleToggleClub = (clubId, clubName) => {
    if (joinedClubs.includes(clubId)) {
      setJoinedClubs(joinedClubs.filter((id) => id !== clubId))
      triggerToast(`Anda telah keluar dari klub "${clubName}".`)
    } else {
      setJoinedClubs([...joinedClubs, clubId])
      triggerToast(`Selamat datang di klub "${clubName}"!`)
    }
  }

  const handleCreateClubSubmit = (e) => {
    e.preventDefault()
    if (!newClubName.trim()) return

    const newClub = {
      id: 'club-' + Date.now(),
      name: newClubName,
      category: newClubCategory,
      description: newClubDesc || 'Klub pembaca setia Bookly.',
      currentBook: {
        title: newClubFirstBook || 'Buku Pilihan Bersama',
        author: 'Kurasi Anggota',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
        chapter: 'Sesi Pembuka'
      },
      nextMeet: newClubSchedule || 'Segera Diumumkan',
      moderator: 'Anda (Inisiator)',
      membersCount: 1,
      bannerImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop'
    }

    setBookClubs([newClub, ...bookClubs])
    setJoinedClubs([...joinedClubs, newClub.id])
    setShowCreateClubModal(false)
    setNewClubName('')
    setNewClubDesc('')
    setNewClubSchedule('')
    setNewClubFirstBook('')
    triggerToast(`Klub buku "${newClub.name}" berhasil didirikan!`)
  }

  const handleHelpSubmit = (e) => {
    e.preventDefault()
    if (!helpEmail.trim() || !helpMessage.trim()) return
    setHelpSubmitted(true)
    triggerToast('Pesan bantuan Anda telah terkirim ke Tim Dukungan Bookly.')
    setTimeout(() => {
      setHelpEmail('')
      setHelpMessage('')
      setHelpSubmitted(false)
    }, 3500)
  }

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
          SUBPAGE / SUB-SUB PAGE KOMUNITAS ATAU HALAMAN UTAMA
          ======================================================== */}
      {selectedClub ? (
        selectedClubThread ? (
          /* ========================================================
             SUB-SUB PAGE: RUANG DISKUSI TEMATIK KLUB (LEVEL 3)
             ======================================================== */
          <div className="w-full pb-16">
            {/* Sub-sub page Breadcrumb */}
            <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
              <div className="max-w-[1180px] mx-auto flex items-center gap-2 text-xs text-[#737973] overflow-x-auto no-scrollbar">
                <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Beranda
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToCommunityMain} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  Komunitas
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <button onClick={handleBackToClubSubpage} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                  {selectedClub.name}
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
                <span className="text-[#483E37] font-semibold truncate">
                  Diskusi: {selectedClubThread.title}
                </span>
              </div>
            </div>

            {/* Sub-sub page Header */}
            <section className="w-full pt-8 pb-8 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
              <div className="max-w-[1080px] mx-auto">
                <button
                  type="button"
                  onClick={handleBackToClubSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Klub "{selectedClub.name}"</span>
                </button>

                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37]">
                      Ruang Diskusi Tematik • {selectedClub.name}
                    </span>
                    <span className="text-xs text-[#737973]">
                      Oleh <strong className="text-[#2E2722]">{selectedClubThread.author}</strong> ({selectedClubThread.role || 'Moderator'}) • {selectedClubThread.date}
                    </span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2E2722] mb-4 leading-tight">
                    {selectedClubThread.title}
                  </h1>

                  {/* Quotation Under Discussion */}
                  {selectedClubThread.quote && (
                    <div className="p-4 rounded-xl bg-white/90 border-l-4 border-[#483E37] shadow-xs mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C7767] block mb-1">
                        Kutipan Teks yang Dibahas:
                      </span>
                      <blockquote className="font-serif italic text-sm sm:text-base text-[#3E3832] leading-relaxed">
                        {selectedClubThread.quote}
                      </blockquote>
                    </div>
                  )}

                  {/* Discussion Prompt */}
                  <p className="text-sm text-[#424844] leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE4D8]">
                    <strong>Pemantik Diskusi:</strong> {selectedClubThread.prompt || selectedClubThread.previewText || 'Bagaimana pandangan Anda terhadap dinamika karakter dan pesan filosofis di bagian ini?'}
                  </p>
                </div>
              </div>
            </section>

            {/* Sub-sub page Comments Stream */}
            <main className="max-w-[1080px] mx-auto px-6 md:px-8 py-10 space-y-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
                <h3 className="font-serif text-xl font-medium text-[#2E2722] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8C7767]" />
                  <span>Tanggapan Diskusi Anggota ({threadComments.length})</span>
                </h3>
                <span className="text-xs text-[#737973]">
                  Etika: Diskusi santun &amp; saling menghargai
                </span>
              </div>

              {/* Form Input Komentar Baru */}
              <form onSubmit={handleSendComment} className="p-5 rounded-2xl bg-white border border-[#ECE4D8] shadow-xs space-y-3">
                <span className="text-xs font-semibold text-[#483E37] block">
                  Bagikan Refleksi atau Tanggapanmu:
                </span>
                <textarea
                  rows={3}
                  required
                  placeholder="Ketik analisis, pertanyaan kritis, atau kesan membacamu terhadap bab ini..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DFD5C7] bg-[#FCF9F3] text-xs sm:text-sm text-[#2E2722] focus:outline-none focus:border-[#483E37] resize-none"
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#8C7767]">
                    Tanggapan akan langsung terbaca oleh seluruh anggota klub
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Tanggapan</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {threadComments.map((com) => (
                  <div key={com.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EAE2DC] text-[#483E37] font-serif font-bold text-xs flex items-center justify-center">
                          {com.avatar}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#2E2722] block leading-tight">
                            {com.author}
                          </span>
                          <span className="text-[10px] text-[#8C7767]">
                            {com.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#737973]">{com.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#424844] leading-relaxed pt-1">
                      {com.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Back Button */}
              <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToClubSubpage}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Daftar Diskusi "{selectedClub.name}"</span>
                </button>
              </div>
            </main>
          </div>
        ) : (
          /* ========================================================
             SUBPAGE: DETAIL RUANG KLUB BUKU (LEVEL 2)
             ======================================================== */
          <div className="w-full pb-16">
            {/* Subpage Breadcrumb */}
            <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
              <div className="max-w-[1180px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
                <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer">
                  Beranda
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
                <button onClick={handleBackToCommunityMain} className="hover:text-[#483E37] transition-colors cursor-pointer">
                  Komunitas
                </button>
                <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
                <span className="text-[#483E37] font-semibold">{selectedClub.name}</span>
              </div>
            </div>

            {/* Subpage Hero Header */}
            <section className="relative w-full pt-10 pb-10 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
              <div className="max-w-[1180px] mx-auto">
                <button
                  type="button"
                  onClick={handleBackToCommunityMain}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Semua Komunitas</span>
                </button>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37]">
                        {selectedClub.category}
                      </span>
                      <span className="text-xs text-[#737973]">
                        Moderator: <span className="font-medium text-[#2E2722]">{selectedClub.moderator}</span>
                      </span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2E2722] mb-3">
                      {selectedClub.name}
                    </h1>

                    <p className="text-sm text-[#5A554E] max-w-2xl leading-relaxed">
                      {selectedClub.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleClub(selectedClub.id, selectedClub.name)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                        joinedClubs.includes(selectedClub.id)
                          ? 'bg-[#EAE2DC] text-[#483E37] hover:bg-[#D6C8BE]'
                          : 'bg-[#483E37] text-white hover:bg-[#3D342E]'
                      }`}
                    >
                      {joinedClubs.includes(selectedClub.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Tergabung dalam Klub</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Gabung Klub Ini</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href)
                          triggerToast('Tautan klub buku berhasil disalin!')
                        }
                      }}
                      className="p-2.5 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] transition-colors cursor-pointer"
                      title="Bagikan Klub"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-[#ECE4D8]">
                  <div className="p-3.5 rounded-xl bg-white border border-[#ECE4D8]">
                    <div className="text-xs text-[#737973]">Total Anggota</div>
                    <div className="font-serif text-xl font-semibold text-[#2E2722] mt-0.5">
                      {selectedClub.membersCount} Sahabat
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#ECE4D8]">
                    <div className="text-xs text-[#737973]">Jadwal Temu Daring</div>
                    <div className="font-serif text-base font-semibold text-[#2E2722] mt-0.5">
                      {selectedClub.nextMeet}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#ECE4D8]">
                    <div className="text-xs text-[#737973]">Buku Bahasan Saat Ini</div>
                    <div className="font-serif text-sm font-semibold text-[#2E2722] mt-0.5 truncate">
                      {selectedClub.currentBook.title}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#ECE4D8]">
                    <div className="text-xs text-[#737973]">Status Kelompok</div>
                    <div className="font-serif text-sm font-semibold text-emerald-800 mt-0.5">
                      Aktif Berdiskusi
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Subpage Main Content */}
            <main className="max-w-[1180px] mx-auto px-6 md:px-8 py-10 space-y-12">
              {/* 1. Buku Bulan Ini & Silabus */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Current Book Feature */}
                <div className="lg:col-span-1 p-6 rounded-2xl bg-[#FAF7F2] border border-[#ECE4D8] space-y-4">
                  <span className="text-[10px] uppercase font-semibold text-[#8C7767] tracking-wider block">
                    Buku Bacaan Bulan Ini
                  </span>
                  <div className="flex gap-4 items-center">
                    <img
                      src={selectedClub.currentBook.cover}
                      alt={selectedClub.currentBook.title}
                      className="w-20 h-28 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h4 className="font-serif text-lg font-medium text-[#2E2722]">
                        {selectedClub.currentBook.title}
                      </h4>
                      <p className="text-xs text-[#737973]">{selectedClub.currentBook.author}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[11px] bg-[#EAE2DC] text-[#483E37] font-medium">
                        {selectedClub.currentBook.chapter}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5A554E] leading-relaxed">
                    Sesi temu berikutnya akan membahas analisis bab tengah dan konstruksi karakter. Pastikan telah membaca hingga bagian yang ditentukan.
                  </p>
                </div>

                {/* 2. Discussion Threads (Level 3 Triggers) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ECE4D8]">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#2E2722]">
                        Ruang Diskusi &amp; Topik Bahasan (Klik untuk Masuk Sub-sub Page)
                      </h3>
                      <p className="text-xs text-[#737973] mt-0.5">
                        Pilih topik diskusi di bawah ini untuk membaca pemantik kurator dan membalas komentar anggota.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'thread-1',
                        title: 'Paradoks Waktu dan Mitos Dendam dalam Bab 12 - 18',
                        author: selectedClub.moderator || 'Dewi Anggraini',
                        role: 'Moderator',
                        date: '2 jam lalu',
                        repliesCount: 14,
                        quote: '“Mati itu gampang, yang susah itu hidup dengan ingatan yang tak pernah mau tertidur.”',
                        prompt: 'Bagaimana adegan pembuka bab ini membalikkan logika sejarah kolonial menjadi sebuah parodi yang getir namun puitis?'
                      },
                      {
                        id: 'thread-2',
                        title: 'Suara Arwah Leluhur: Metafora Realisme Magis atau Trauma Kolektif?',
                        author: 'Dr. Farhan',
                        role: 'Kurator Sastra',
                        date: 'Kemarin',
                        repliesCount: 28,
                        quote: '“Di kota Halimunda, angin laut membawa kabar tentang orang-orang yang menolak mati sebelum dendam mereka lunas.”',
                        prompt: 'Mari kita diskusikan batas antara mitologi lokal dengan trauma psikologis para penyintas perang.'
                      },
                      {
                        id: 'thread-3',
                        title: 'Gaya Bahasa Prosa: Memadukan Lelucon Pasar dengan Tragedi Klasik',
                        author: 'Bambang Sudibyo',
                        role: 'Anggota Aktif',
                        date: '3 hari lalu',
                        repliesCount: 19,
                        quote: '“Kecantikan adalah kutukan paling mengerikan yang pernah diberikan semesta kepada seorang perempuan.”',
                        prompt: 'Apakah gaya bahasa yang liar di beberapa bagian justru memperkuat kesakralan duka para tokohnya?'
                      }
                    ].map((th) => (
                      <div
                        key={th.id}
                        onClick={() => {
                          setSelectedClubThread(th)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                          triggerToast(`Membuka ruang diskusi: "${th.title}"`)
                        }}
                        className="p-5 rounded-2xl bg-white border border-[#ECE4D8] hover:border-[#483E37] transition-all cursor-pointer group shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] font-semibold text-[#8C7767] uppercase">
                            Oleh {th.author} • {th.date}
                          </span>
                          <span className="text-xs text-[#483E37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Masuk Diskusi &amp; Balas <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <h4 className="font-serif text-base sm:text-lg font-medium text-[#2E2722] group-hover:underline leading-snug">
                          {th.title}
                        </h4>
                        <p className="text-xs text-[#5A554E] line-clamp-2 italic font-serif">
                          "{th.quote}"
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-[#737973] border-t border-[#ECE4D8]/60">
                          <span>{th.repliesCount} tanggapan anggota</span>
                          <span className="text-[#483E37] font-medium">Buka Sub-sub Page Thread →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToCommunityMain}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Semua Komunitas</span>
                </button>
              </div>
            </main>
          </div>
        )
      ) : selectedInterviewArticle ? (
        /* ========================================================
           SUB-SUB PAGE: TRANSKRIP WAWANCARA PENULIS (LEVEL 3)
           ======================================================== */
        <div className="w-full pb-16">
          {/* Sub-sub page Breadcrumb */}
          <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/70">
            <div className="max-w-[1080px] mx-auto flex items-center gap-2 text-xs text-[#737973] overflow-x-auto no-scrollbar">
              <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                Beranda
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <button onClick={handleBackToCommunityMain} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                Komunitas
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <button onClick={handleBackToCommunityMain} className="hover:text-[#483E37] transition-colors cursor-pointer whitespace-nowrap">
                Wawancara Penulis
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2] flex-shrink-0" />
              <span className="text-[#483E37] font-semibold truncate">
                {selectedInterviewArticle.authorName} - Dialog Lengkap
              </span>
            </div>
          </div>

          {/* Sub-sub page Header */}
          <section className="w-full pt-10 pb-10 px-6 md:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FCF9F3] border-b border-[#ECE4D8]">
            <div className="max-w-[860px] mx-auto">
              <button
                type="button"
                onClick={handleBackToCommunityMain}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:text-[#2E2722] mb-6 px-3.5 py-1.5 rounded-lg bg-[#EAE2DC] hover:bg-[#D6C8BE] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Komunitas</span>
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedInterviewArticle.avatar}
                  alt={selectedInterviewArticle.authorName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#DFD5C7] shadow-xs"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7767] block">
                    Transkrip Sastra Eksklusif
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-[#2E2722]">
                    {selectedInterviewArticle.authorName}
                  </h2>
                  <p className="text-xs text-[#737973]">
                    Karya Pilihan: <span className="font-medium text-[#483E37]">{selectedInterviewArticle.bookTitle}</span> • {selectedInterviewArticle.publishDate} • {selectedInterviewArticle.readTime}
                  </p>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2E2722] leading-tight mb-4">
                "{selectedInterviewArticle.title}"
              </h1>

              <p className="font-serif text-base sm:text-lg text-[#5A554E] leading-relaxed mb-6">
                {selectedInterviewArticle.subtitle}
              </p>

              {/* Big Pull Quote */}
              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#483E37] shadow-sm my-6">
                <Quote className="w-6 h-6 text-[#8C7767] mb-2 opacity-70" />
                <p className="font-serif italic text-base sm:text-xl text-[#3D342E] leading-relaxed">
                  "{selectedInterviewArticle.pullQuote}"
                </p>
              </div>
            </div>
          </section>

          {/* Sub-sub page Article Body */}
          <main className="max-w-[860px] mx-auto px-6 md:px-8 py-10 space-y-10">
            <div className="space-y-8">
              {selectedInterviewArticle.content && selectedInterviewArticle.content.map((qa, idx) => (
                <div key={idx} className="space-y-3 pb-8 border-b border-[#ECE4D8] last:border-none">
                  <div className="font-serif text-lg sm:text-xl font-medium text-[#483E37] leading-snug">
                    <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#8C7767] block mb-1">
                      Pertanyaan Kurator #{idx + 1}
                    </span>
                    {qa.q}
                  </div>
                  <div className="font-serif text-sm sm:text-base text-[#3E3832] leading-relaxed pl-4 border-l-2 border-[#DFD5C7]">
                    <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#483E37] block mb-1">
                      Tanggapan {selectedInterviewArticle.authorName}:
                    </span>
                    {qa.a}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#ECE4D8] flex items-center justify-between">
              <button
                type="button"
                onClick={handleBackToCommunityMain}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#483E37] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Komunitas</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                    triggerToast('Tautan transkrip berhasil disalin!')
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFD5C7] text-xs font-medium text-[#483E37] hover:border-[#483E37] bg-white cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Transkrip</span>
              </button>
            </div>
          </main>
        </div>
      ) : (
        /* ========================================================
           HALAMAN KOMUNITAS UTAMA (LEVEL 1)
           ======================================================== */
        <div>
          {/* Sub-header Breadcrumb */}
          <div className="w-full border-b border-[#ECE4D8] py-3.5 px-6 md:px-8 bg-[#FAF7F2]/60">
            <div className="max-w-[1180px] mx-auto flex items-center gap-2 text-xs text-[#737973]">
              <button onClick={onNavigateHome} className="hover:text-[#483E37] transition-colors cursor-pointer">
                Beranda
              </button>
              <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
              <span className="text-[#483E37] font-semibold">Komunitas</span>
              {activeTab !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3 text-[#C2C8C2]" />
                  <span className="text-[#737973] capitalize">
                    {activeTab === 'clubs' && 'Klub Buku'}
                    {activeTab === 'interviews' && 'Wawancara Penulis'}
                    {activeTab === 'guidelines' && 'Pedoman Komunitas'}
                    {activeTab === 'help' && 'Pusat Bantuan'}
                  </span>
                </>
              )}
            </div>
          </div>

      {/* HERO SECTION KOMUNITAS */}
      <section className="w-full pt-12 pb-10 px-6 md:px-8 border-b border-[#ECE4D8] bg-gradient-to-b from-[#F7F3EB] to-[#FCF9F3]">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-[#EAE2D8] text-[#54463C] text-[11px] font-semibold uppercase tracking-wider mb-3">
                <span>Sanctuary Literasi Nusantara</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#2E2722] leading-tight mb-4">
                Komunitas Pembaca Bookly
              </h1>
              <p className="text-sm sm:text-base text-[#5A554E] leading-relaxed">
                Ruang teduh tempat para pecinta sastra, pemikir, dan pembaca setia berkumpul. 
                Diskusikan buku pilihan dalam klub tematik, selami percakapan mendalam bersama penulis maestro, 
                dan temukan kehangatan dialog di antara baris-baris kalimat.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowCreateClubModal(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#483E37] hover:bg-[#3D342E] text-[#FAF7F2] text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Klub Baru</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('help')
                  const el = document.getElementById('bantuan-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFD5C7] hover:border-[#483E37] bg-white text-[#483E37] text-xs font-medium transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Bantuan</span>
              </button>
            </div>
          </div>

          {/* Metric Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#ECE4D8]/80 text-center sm:text-left">
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE4D8]">
              <div className="font-serif text-2xl font-semibold text-[#2E2722]">{bookClubs.length}+</div>
              <div className="text-xs text-[#737973] mt-0.5">Klub Buku Aktif</div>
            </div>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE4D8]">
              <div className="font-serif text-2xl font-semibold text-[#2E2722]">{interviews.length} Edisi</div>
              <div className="text-xs text-[#737973] mt-0.5">Wawancara Penulis</div>
            </div>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE4D8]">
              <div className="font-serif text-2xl font-semibold text-[#2E2722]">5 Prinsip</div>
              <div className="text-xs text-[#737973] mt-0.5">Pedoman Komunitas</div>
            </div>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE4D8]">
              <div className="font-serif text-2xl font-semibold text-[#2E2722]">1,600+</div>
              <div className="text-xs text-[#737973] mt-0.5">Sahabat Pembaca</div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY / SUB-NAVIGATION TAB PILLS */}
      <section className="sticky top-[81px] z-40 bg-[#FCF9F3]/95 backdrop-blur-md border-b border-[#ECE4D8]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Semua Bagian', icon: Compass },
            { id: 'clubs', label: 'Klub Buku', icon: Users, count: bookClubs.length },
            { id: 'interviews', label: 'Wawancara Penulis', icon: BookOpen, count: interviews.length },
            { id: 'guidelines', label: 'Pedoman Komunitas', icon: ShieldCheck },
            { id: 'help', label: 'Pusat Bantuan', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  window.scrollTo({ top: 320, behavior: 'smooth' })
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#483E37] text-[#FAF7F2] shadow-sm font-semibold'
                    : 'bg-[#FAF7F2] border border-[#ECE4D8] text-[#5A554E] hover:bg-[#EFE9DF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EAE2D8] text-[#54463C]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* MAIN COMMUNITY CONTENT */}
      <main className="max-w-[1180px] mx-auto px-6 md:px-8 py-10 space-y-16">
        
        {/* ========================================================
            1. KLUB BUKU (BOOK CLUBS)
            ======================================================== */}
        {(activeTab === 'all' || activeTab === 'clubs') && (
          <section id="klub-buku-section" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#ECE4D8]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#68574B] uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>Lingkar Diskusi Terbuka</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E2722]">
                  Klub Buku Pilihan
                </h2>
                <p className="text-xs sm:text-sm text-[#737973] mt-1">
                  Pilih lingkar baca yang selaras dengan minat sastramu dan ikuti diskusi berkala bersama kurator.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateClubModal(true)}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#DFD5C7] hover:border-[#483E37] text-xs font-semibold text-[#483E37] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dirikan Klub Baru</span>
              </button>
            </div>

            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookClubs.map((club) => {
                const isJoined = joinedClubs.includes(club.id)
                return (
                  <div
                    key={club.id}
                    className="rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    {/* Club Header / Banner */}
                    <div
                      onClick={() => {
                        setSelectedClub(club)
                        setSelectedClubThread(null)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        triggerToast(`Membuka ruang klub "${club.name}"`)
                      }}
                      className="relative h-36 bg-[#E8DFD3] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={club.bannerImage}
                        alt={club.name}
                        className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-[11px] font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                          {club.category}
                        </span>
                        <span className="text-xs font-medium flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                          <Users className="w-3 h-3" />
                          <span>{club.membersCount + (isJoined && !['magis-nusantara'].includes(club.id) ? 1 : 0)} Anggota</span>
                        </span>
                      </div>
                    </div>

                    {/* Club Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => {
                            setSelectedClub(club)
                            setSelectedClubThread(null)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            triggerToast(`Membuka ruang klub "${club.name}"`)
                          }}
                          className="font-serif text-lg sm:text-xl font-medium text-[#2E2722] mb-2 hover:text-[#483E37] transition-colors cursor-pointer"
                        >
                          {club.name}
                        </h3>
                        <p className="text-xs text-[#5A554E] leading-relaxed mb-4">
                          {club.description}
                        </p>

                        {/* Currently Reading Book Card */}
                        <div
                          onClick={() => {
                            setSelectedClub(club)
                            setSelectedClubThread(null)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="p-3 rounded-xl bg-white border border-[#ECE4D8] flex items-center gap-3 mb-4 cursor-pointer hover:border-[#BAA798] transition-colors"
                        >
                          <img
                            src={club.currentBook.cover}
                            alt={club.currentBook.title}
                            className="w-10 h-14 object-cover rounded shadow-xs flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-semibold text-[#8C7767] tracking-wider block">
                              Sedang Dibahas
                            </span>
                            <h4 className="font-serif text-sm font-medium text-[#2E2722] truncate">
                              {club.currentBook.title}
                            </h4>
                            <p className="text-[11px] text-[#737973] truncate">
                              {club.currentBook.author} • <span className="text-[#483E37] font-medium">{club.currentBook.chapter}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer & Actions */}
                      <div className="pt-3 border-t border-[#ECE4D8] flex items-center justify-between gap-3">
                        <div className="text-[11px] text-[#737973] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8C7767]" />
                          <span>{club.nextMeet}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClub(club)
                              setSelectedClubThread(null)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                              triggerToast(`Membuka ruang klub "${club.name}"`)
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#483E37] text-white hover:bg-[#3D342E] transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <span>Masuk Klub</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleClub(club.id, club.name)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isJoined
                                ? 'bg-[#EAE2DC] text-[#483E37] hover:bg-[#D6C8BE]'
                                : 'bg-[#483E37] text-white hover:bg-[#3D342E] shadow-xs'
                            }`}
                          >
                            {isJoined ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Tergabung</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Gabung Klub</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ========================================================
            2. WAWANCARA PENULIS (AUTHOR INTERVIEWS)
            ======================================================== */}
        {(activeTab === 'all' || activeTab === 'interviews') && (
          <section id="wawancara-section" className="space-y-6">
            <div className="pb-4 border-b border-[#ECE4D8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68574B] uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Arsip Percakapan Maestro</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E2722]">
                Wawancara Penulis
              </h2>
              <p className="text-xs sm:text-sm text-[#737973] mt-1">
                Menyelami ruang sunyi di balik meja kerja para penulis, proses penemuan ide, dan perenungan literatur mendalam.
              </p>
            </div>

            {/* Interviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviews.map((item) => (
                <article
                  key={item.id}
                  className="p-6 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] flex flex-col justify-between hover:border-[#BAA798] transition-colors shadow-xs"
                >
                  <div>
                    {/* Author Meta */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.authorName}
                          className="w-12 h-12 rounded-full object-cover border border-[#DFD5C7]"
                        />
                        <div>
                          <h4 className="font-serif text-base font-semibold text-[#2E2722]">
                            {item.authorName}
                          </h4>
                          <span className="text-[11px] text-[#737973]">Penulis "{item.bookTitle}"</span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-[#8C7767] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>

                    {/* Interview Title & Subtitle */}
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#2E2722] leading-snug mb-2 hover:text-[#483E37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5A554E] leading-relaxed mb-4">
                      {item.subtitle}
                    </p>

                    {/* Pull Quote Box */}
                    <div className="p-3.5 rounded-xl bg-white border-l-3 border-[#483E37] mb-4 shadow-xs">
                      <Quote className="w-4 h-4 text-[#8C7767] mb-1 opacity-70" />
                      <p className="font-serif text-xs italic text-[#3D342E] leading-relaxed">
                        "{item.pullQuote}"
                      </p>
                    </div>

                    {/* Topics Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#EAE2DC] text-[#483E37] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="pt-3 border-t border-[#ECE4D8] flex items-center justify-between">
                    <span className="text-[11px] text-[#737973]">{item.publishDate}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedInterviewArticle(item)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        triggerToast(`Membuka transkrip wawancara "${item.authorName}"`)
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#483E37] hover:bg-[#3D342E] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Buka Transkrip Sastra</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            3. PEDOMAN KOMUNITAS (COMMUNITY GUIDELINES)
            ======================================================== */}
        {(activeTab === 'all' || activeTab === 'guidelines') && (
          <section id="pedoman-section" className="space-y-6">
            <div className="pb-4 border-b border-[#ECE4D8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68574B] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Nilai Bersama & Suaka Teduh</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E2722]">
                Pedoman Komunitas
              </h2>
              <p className="text-xs sm:text-sm text-[#737973] mt-1">
                Prinsip etika demi menjaga Bookly sebagai ruang yang beradab, hangat, dan mengutamakan kecintaan murni pada literatur.
              </p>
            </div>

            {/* Guidelines Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guidelines.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-[#ECE4D8] bg-[#FAF7F2] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif text-2xl font-light text-[#8C7767]">
                        {rule.number}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAE2DC] text-[#483E37] font-medium">
                        {rule.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-medium text-[#2E2722] mb-2 leading-snug">
                      {rule.title}
                    </h3>
                    <p className="text-xs text-[#5A554E] leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#ECE4D8] text-[11px] text-[#737973] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#68574B]" />
                    <span>Dipatuhi seluruh anggota</span>
                  </div>
                </div>
              ))}

              {/* Special Box: Lapor Pelanggaran */}
              <div className="p-5 rounded-2xl border border-[#BAA798] bg-[#F7F3EB] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#483E37] text-white flex items-center justify-center mb-3">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#2E2722] mb-1">
                    Menemukan Pelanggaran?
                  </h3>
                  <p className="text-xs text-[#5A554E] leading-relaxed mb-4">
                    Jika Anda menemukan ulasan yang mengandung ujaran kebencian, spam, atau spoiler tanpa penanda, laporkan pada kurator.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2 px-3 rounded-lg bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Laporkan Pelanggaran
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            4. PUSAT BANTUAN & FAQ (HELP & FAQ)
            ======================================================== */}
        {(activeTab === 'all' || activeTab === 'help') && (
          <section id="bantuan-section" className="space-y-8">
            <div className="pb-4 border-b border-[#ECE4D8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68574B] uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Pusat Informasi & Bantuan</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E2722]">
                Bantuan & Tanya Jawab
              </h2>
              <p className="text-xs sm:text-sm text-[#737973] mt-1">
                Temukan jawaban seputar fitur komunitas, panduan bergabung, dan dukungan kurasi Bookly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* FAQ Accordion (Left 2 cols) */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#2E2722] mb-2">
                  Pertanyaan Sering Diajukan (FAQ)
                </h3>
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div
                      key={index}
                      className="border border-[#ECE4D8] rounded-xl bg-[#FAF7F2] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-[#2E2722] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
                      >
                        <span className="font-serif text-base">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#8C7767] flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#5A554E] leading-relaxed border-t border-[#ECE4D8]/60 bg-white/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Contact Support Form (Right 1 col) */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#ECE4D8] h-fit">
                <h3 className="font-serif text-lg font-medium text-[#2E2722] mb-1">
                  Hubungi Tim Dukungan
                </h3>
                <p className="text-xs text-[#737973] mb-4">
                  Punya pertanyaan spesifik atau butuh asistensi khusus dari kurator?
                </p>

                {helpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#EAE2DC] text-[#483E37] text-xs space-y-2">
                    <p className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Pesan Anda Telah Diterima
                    </p>
                    <p>Tim Bookly akan membalas melalui email dalam waktu 24 jam.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHelpSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#483E37] mb-1">Surel Anda</label>
                      <input
                        type="email"
                        required
                        value={helpEmail}
                        onChange={(e) => setHelpEmail(e.target.value)}
                        placeholder="nama@literasi.id"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#483E37] mb-1">Topik Bantuan</label>
                      <select
                        value={helpTopic}
                        onChange={(e) => setHelpTopic(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      >
                        <option value="Klub Buku">Klub Buku & Jadwal</option>
                        <option value="Kurasi & Wawancara">Kurasi & Wawancara</option>
                        <option value="Akun & Profil">Akun & Profil</option>
                        <option value="Lainnya">Pertanyaan Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#483E37] mb-1">Pesan Anda</label>
                      <textarea
                        rows={3}
                        required
                        value={helpMessage}
                        onChange={(e) => setHelpMessage(e.target.value)}
                        placeholder="Tuliskan pertanyaan atau kendala yang Anda alami..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#483E37] hover:bg-[#3D342E] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Permintaan Bantuan</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>
        )}

      </main>
        </div>
      )}

      {/* ========================================================
          MODAL: BACA WAWANCARA LENGKAP
          ======================================================== */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FCF9F3] border border-[#DFD5C7] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto my-8">
            <button
              onClick={() => setShowInterviewModal(null)}
              className="absolute top-5 right-5 text-[#8C7767] hover:text-[#2E2722] p-1.5 rounded-full hover:bg-[#EAE2DC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#ECE4D8]">
              <img
                src={showInterviewModal.avatar}
                alt={showInterviewModal.authorName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#DFD5C7]"
              />
              <div>
                <span className="text-[11px] font-semibold text-[#8C7767] uppercase tracking-wider block mb-1">
                  Wawancara Eksklusif Bookly
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#2E2722]">
                  {showInterviewModal.authorName}
                </h3>
                <p className="text-xs text-[#737973]">
                  Karya Pilihan: <span className="text-[#483E37] font-semibold">{showInterviewModal.bookTitle}</span> • {showInterviewModal.publishDate}
                </p>
              </div>
            </div>

            {/* Interview Headline */}
            <div className="mb-6">
              <h4 className="font-serif text-xl font-medium text-[#2E2722] mb-2 leading-snug">
                "{showInterviewModal.title}"
              </h4>
              <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed">
                {showInterviewModal.subtitle}
              </p>
            </div>

            {/* Q&A Content */}
            <div className="space-y-5 mb-8">
              {showInterviewModal.content.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#ECE4D8]">
                  <p className="font-serif text-sm font-semibold text-[#483E37] mb-2 flex items-start gap-2">
                    <span className="text-[#8C7767]">T:</span>
                    <span>{item.q}</span>
                  </p>
                  <p className="text-xs text-[#424844] leading-relaxed pl-4 border-l-2 border-[#ECE4D8]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#ECE4D8] flex items-center justify-between">
              <span className="text-xs text-[#737973]">
                Dewan Redaksi Bookly Sastra
              </span>
              <button
                type="button"
                onClick={() => setShowInterviewModal(null)}
                className="px-5 py-2 rounded-lg bg-[#483E37] text-white text-xs font-semibold hover:bg-[#3D342E] transition-colors"
              >
                Tutup Wawancara
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: BUAT KLUB BUKU BARU
          ======================================================== */}
      {showCreateClubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ECE4D8]">
              <h3 className="font-serif text-xl text-[#2E2722] font-medium">Dirikan Klub Buku Baru</h3>
              <button
                onClick={() => setShowCreateClubModal(false)}
                className="text-[#8C7767] hover:text-[#2E2722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClubSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#483E37] mb-1">Nama Klub Buku</label>
                <input
                  type="text"
                  required
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  placeholder="Contoh: Lingkar Sastra Klasik Dunia"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#483E37] mb-1">Kategori / Fokus Sastra</label>
                <select
                  value={newClubCategory}
                  onChange={(e) => setNewClubCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                >
                  <option value="Sastra & Fiksi">Sastra & Fiksi</option>
                  <option value="Filsafat & Esai">Filsafat & Esai</option>
                  <option value="Puisi & Sastra Liris">Puisi & Sastra Liris</option>
                  <option value="Sejarah & Biografi">Sejarah & Biografi</option>
                  <option value="Sains & Pemikiran">Sains & Pemikiran</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#483E37] mb-1">Deskripsi & Tujuan</label>
                <textarea
                  rows={2}
                  required
                  value={newClubDesc}
                  onChange={(e) => setNewClubDesc(e.target.value)}
                  placeholder="Ceritakan fokus diskusi dan karya yang akan dibahas bersama..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#483E37] mb-1">Jadwal Temu Rutin</label>
                  <input
                    type="text"
                    value={newClubSchedule}
                    onChange={(e) => setNewClubSchedule(e.target.value)}
                    placeholder="Contoh: Sabtu, 20.00 WIB"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#483E37] mb-1">Buku Pertama</label>
                  <input
                    type="text"
                    value={newClubFirstBook}
                    onChange={(e) => setNewClubFirstBook(e.target.value)}
                    placeholder="Judul buku pembuka"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none focus:border-[#483E37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE4D8]">
                <button
                  type="button"
                  onClick={() => setShowCreateClubModal(false)}
                  className="px-4 py-2 text-xs text-[#737973] hover:text-[#2E2722]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#483E37] hover:bg-[#3D342E] text-white rounded-lg transition-colors cursor-pointer"
                >
                  Resmikan Klub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: LAPORKAN PELANGGARAN
          ======================================================== */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DFD5C7] rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-medium text-[#2E2722] mb-2">
              Laporkan Pelanggaran Etika
            </h3>
            <p className="text-xs text-[#737973] mb-4">
              Laporan Anda dijaga kerahasiaannya dan akan ditinjau dalam 24 jam.
            </p>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none">
                <option>Ujaran Kebencian / Serangan Personal</option>
                <option>Spoiler Tanpa Penanda [Spoiler Alert]</option>
                <option>Penyebaran Tautan Buku Bajakan</option>
                <option>Spam / Iklan Komersial</option>
              </select>
              <textarea
                rows={3}
                placeholder="Jelaskan detail konten atau tautan yang melanggar..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD5C7] bg-white text-[#2E2722] focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-xs text-[#737973]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReportModal(false)
                    triggerToast('Laporan Anda berhasil dikirimkan ke Dewan Etika Bookly.')
                  }}
                  className="px-4 py-1.5 text-xs bg-[#483E37] text-white rounded-lg font-semibold"
                >
                  Kirim Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
