export const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'literary-fiction', label: 'Fiksi Sastra' },
  { id: 'non-fiction', label: 'Non-Fiksi' },
  { id: 'philosophy', label: 'Filsafat & Esai' },
  { id: 'art-design', label: 'Seni & Desain' },
  { id: 'poetry', label: 'Puisi' },
  { id: 'nature-science', label: 'Sains & Alam' },
  { id: 'history', label: 'Sejarah' }
];

export const HERO_BOOK = {
  id: 'memory-of-water',
  badge: "PILIHAN EDITOR",
  title: "The Memory of Water",
  author: "Clara Sorenson",
  description: "Sebuah penjelajahan puitis yang memikat tentang memori, warisan keluarga, dan rahasia yang terpendam di antara arus waktu.",
  rating: 4.9,
  reviewsCount: "1.2k",
  coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  category: "literary-fiction",
};

export const TRENDING_BOOKS = [
  {
    id: 'architecture-of-dust',
    title: 'The Architecture of Dust',
    author: 'Julian Cross',
    rating: 4.9,
    reviewsCount: '1.2k',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    category: 'non-fiction',
  },
  {
    id: 'atlas-of-untraveled-roads',
    title: 'Atlas of Untraveled Roads',
    author: 'Elena Rostova',
    rating: 4.8,
    reviewsCount: '980',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop',
    category: 'literary-fiction',
  },
  {
    id: 'before-the-last-leaf',
    title: 'Before the Last Leaf',
    author: 'Marcus Chen',
    rating: 4.9,
    reviewsCount: '1.4k',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
    category: 'philosophy',
  },
  {
    id: 'notes-on-silence',
    title: 'Notes on Silence',
    author: 'Clara Sorenson',
    rating: 4.7,
    reviewsCount: '850',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
    category: 'poetry',
  },
];


export const CATALOG_BOOKS = [
  {
    id: 'architecture-of-dust',
    title: 'The Architecture of Dust',
    author: 'Julian Cross',
    authorId: 'julian-cross',
    rating: 4.9,
    reviewsCount: '1.2k',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    category: 'non-fiction',
    categoryLabel: 'Filsafat & Esai',
    genreKey: 'philosophy',
    era: 'kontemporer',
    format: 'Hardcover',
    thickness: 'Sedang',
    pages: 320,
    year: 2024,
    description: 'Kumpulan esai tentang reruntuhan kota modern, materialitas ingatan, dan seni hidup lambat di era serba cepat.'
  },
  {
    id: 'atlas-of-untraveled-roads',
    title: 'Atlas of Untraveled Roads',
    author: 'Elena Rostova',
    authorId: 'elena-rostova',
    rating: 4.8,
    reviewsCount: '980',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop',
    category: 'literary-fiction',
    categoryLabel: 'Fiksi Sastra',
    genreKey: 'fiction',
    era: 'kontemporer',
    format: 'Paperback',
    thickness: 'Sedang',
    pages: 280,
    year: 2023,
    description: 'Sebuah perjalanan yang memabukkan melintasi lanskap yang terlupakan dan geografi batin.'
  },
  {
    id: 'before-the-last-leaf',
    title: 'Before the Last Leaf',
    author: 'Marcus Chen',
    authorId: 'marcus-chen',
    rating: 4.9,
    reviewsCount: '1.4k',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
    category: 'philosophy',
    categoryLabel: 'Filsafat & Esai',
    genreKey: 'philosophy',
    era: 'kontemporer',
    format: 'Hardcover',
    thickness: 'Tipis',
    pages: 190,
    year: 2022,
    description: 'Merenungkan ritme lambat di tengah kecepatan dunia modern dan seni merawat keheningan.'
  },
  {
    id: 'notes-on-silence',
    title: 'Notes on Silence',
    author: 'Clara Sorenson',
    authorId: 'clara-sorenson',
    rating: 4.7,
    reviewsCount: '850',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
    category: 'poetry',
    categoryLabel: 'Puisi & Syair',
    genreKey: 'poetry',
    era: 'kontemporer',
    format: 'Paperback',
    thickness: 'Tipis',
    pages: 160,
    year: 2025,
    description: 'Fragmen puitis mengenai keheningan di sela-sela kata dan resonansi yang tak terucapkan.'
  },
  {
    id: 'memory-of-water',
    title: 'The Memory of Water',
    author: 'Valerie Vance',
    authorId: 'julian-cross',
    rating: 4.9,
    reviewsCount: '1.2k',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    category: 'literary-fiction',
    categoryLabel: 'Fiksi Sastra',
    genreKey: 'fiction',
    era: 'kontemporer',
    format: 'Hardcover',
    thickness: 'Sedang',
    pages: 384,
    year: 2026,
    description: 'Sebuah penjelajahan puitis yang memikat tentang memori, warisan keluarga, dan rahasia yang terpendam di antara arus waktu.'
  },
  {
    id: 'rivers-bend',
    title: "The River's Bend",
    author: 'Eleanor Vance',
    authorId: 'julian-cross',
    rating: 4.9,
    reviewsCount: '1.2k',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=800&auto=format&fit=crop',
    category: 'literary-fiction',
    categoryLabel: 'Fiksi Sastra',
    genreKey: 'fiction',
    era: 'modernis',
    format: 'Hardcover',
    thickness: 'Sedang',
    pages: 310,
    year: 1998,
    description: 'Perenungan tentang takdir, aliran sungai yang tenang, dan percakapan-percakapan tak terucap.'
  },
  {
    id: 'whispers-of-the-pines',
    title: 'Whispers of the Pines',
    author: 'Elara Vance',
    authorId: 'elena-rostova',
    rating: 4.9,
    reviewsCount: '980',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop',
    category: 'literary-fiction',
    categoryLabel: 'Fiksi Sastra',
    genreKey: 'fiction',
    era: 'kontemporer',
    format: 'Paperback',
    thickness: 'Tebal',
    pages: 460,
    year: 2021,
    description: 'Kisah misterius di hutan cemara utara tentang keterikatan jiwa dengan alam belantara.'
  },
  {
    id: 'catatan-dari-bawah-tanah',
    title: 'Catatan Dari Bawah Tanah',
    author: 'Fyodor Dostoevsky',
    authorId: 'albert-camus',
    rating: 4.9,
    reviewsCount: '1.2k',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    category: 'classics',
    categoryLabel: 'Sastra Klasik',
    genreKey: 'classics',
    era: 'klasik',
    format: 'Paperback',
    thickness: 'Tipis',
    pages: 180,
    year: 1864,
    description: 'Monolog psikologis mendalam dari seorang mantan pegawai negeri di Saint Petersburg yang memberontak terhadap rasionalisme semu.'
  }
];

export const CURATED_COLLECTIONS = [
  {
    id: 'melancholic-autumn',
    badge: 'DAFTAR KURASI • 12 BUKU',
    title: 'Bacaan Melankolis Musim Gugur',
    description: 'Cerita yang pas untuk sore hari yang berawan, jendela yang basah karena hujan, dan secangkir teh hangat...',
    linkText: 'Jelajahi Koleksi',
    bgImage: 'https://images.unsplash.com/photo-1507842229450-799042b9340e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'essential-essays',
    badge: 'DAFTAR KURASI • 8 BUKU',
    title: 'Esai Esensial',
    description: 'Kritik budaya yang mendalam dan refleksi pribadi dari para maestro klasik maupun pemikir kontemporer...',
    linkText: 'Jelajahi Koleksi',
    bgImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'award-winners-2026',
    badge: 'DAFTAR KURASI • 15 BUKU',
    title: 'Pemenang Penghargaan 2026',
    description: 'Mahakarya yang diakui dan debut mendobrak yang mendominasi penghargaan sastra tahun ini...',
    linkText: 'Jelajahi Koleksi',
    bgImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop',
  },
];

export const COMMUNITY_REVIEWS = [
  {
    id: 'review-1',
    bookTitle: 'The Architecture of Dust',
    bookAuthor: 'Julian Cross',
    reviewerName: 'Aditya Pratama',
    avatarInitial: 'A',
    avatarBg: '#483E37',
    rating: 5,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
    quote: 'Cross telah merangkai keajaiban prosa struktural yang luar biasa. Setiap kalimat terasa diukir dengan tangan dari kepedihan dan harapan.',
  },
  {
    id: 'review-2',
    bookTitle: 'Atlas of Untraveled Roads',
    bookAuthor: 'Elena Rostova',
    reviewerName: 'Siti Rahmawati',
    avatarInitial: 'S',
    avatarBg: '#695C56',
    rating: 5,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
    quote: 'Sebuah perjalanan yang memabukkan melintasi lanskap yang terlupakan dan geografi internal. Rostova menulis dengan kejujuran yang menawan.',
  },
];

export const BOOK_DETAILS = {
  id: 'memory-of-water',
  title: 'The Memory of Water',
  author: 'Valerie Vance',
  category: 'Fiksi Sastra',
  categoryId: 'literary-fiction',
  badges: ['FIKSI SASTRA', 'BESTSELLER'],
  availability: 'TERSEDIA',
  format: 'HARDCOVER',
  coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
  pages: '384 Hlm',
  publisher: 'Archipelago Press',
  publishYear: '2026',
  isbn: '978-602-03-8821-4',
  rating: 4.9,
  reviewsCount: '1.2k',
  communityEndorsement: 'Karya yang sangat diapresiasi oleh komunitas pembaca Bookly.',
  recommendationRate: '94% pembaca merekomendasikan buku ini untuk pembaca penikmat sastra kontemporer.',
  synopsisPara1: 'Di sebuah kota pesisir utara yang senantiasa diselimuti kabut tipis, seorang mantan kartografer bernama Julian kembali untuk merawat rumah masa kecilnya. Di sana, ia menemukan tumpukan jurnal tua milik ibunya yang mencatat aliran sungai-sungai bawah tanah yang hilang dari peta resmi.',
  pullQuote: '“Sebuah penjelajahan mendalam tentang kesunyian, memori, dan sungai sunyi yang membentuk batin kita...”',
  synopsisPara2: 'Novel ini menenun narasi puitis antara realitas geografis dan lanskap emosional manusia. Melalui prosa yang tenang namun menghunjam, Valerie Vance mengajak kita menyelami rahasia yang tergenang di dalam diri setiap individu.',
  ratingDistribution: [
    { stars: 5, label: '5 Bintang', percentage: 78, count: 936 },
    { stars: 4, label: '4 Bintang', percentage: 18, count: 216 },
    { stars: 3, label: '3 Bintang', percentage: 3, count: 36 },
    { stars: 2, label: '2 Bintang', percentage: 1, count: 12 },
    { stars: 1, label: '1 Bintang', percentage: 0.2, count: 2 },
  ],
  characteristics: [
    'Melankolis',
    'Puitis & Liris',
    'Eksplorasi Memori',
    'Pesisir Sunyi',
    'Filsafat Hidup',
  ],
  reviews: [
    {
      id: 'rev-1',
      name: 'Rian Ardianto',
      role: 'PEMBACA TERVERIFIKASI',
      avatar: 'R',
      rating: 5,
      date: '14 Okt 2026',
      content: 'Sebuah mahakarya kecil yang menenangkan jiwa. Valerie Vance memperlakukan kata-kata layaknya cat air di atas kertas tebal—menyerap perlahan namun meninggalkan bekas yang abadi. Setiap halaman terasa seperti berjalan di tepi sungai di pagi hari yang berkabut. Sangat direkomendasikan bagi siapa saja yang mencari pelarian dari bisingnya dunia modern.',
      likes: 42,
      hasSpoiler: false,
    },
    {
      id: 'rev-2',
      name: 'Citra Dewi',
      role: 'PEMBACA TERVERIFIKASI',
      avatar: 'C',
      rating: 4,
      date: '10 Okt 2026',
      content: 'Alurnya memang agak lambat di paruh pertama, butuh kesabaran ekstra untuk menikmati detail deskripsi kota pesisirnya. Namun, klimaks di bab akhir ketika Julian menemukan fakta bahwa jurnal ibunya adalah peta rahasia kota yang tenggelam benar-benar mengubah cara pandang saya terhadap keseluruhan cerita.',
      likes: 28,
      hasSpoiler: true,
      spoilerLabel: 'MENGANDUNG SPOILER BAB AKHIR',
    },
    {
      id: 'rev-3',
      name: 'Ahmad Fauzi',
      role: 'PEMBACA TERVERIFIKASI',
      avatar: 'A',
      rating: 5,
      date: '05 Okt 2026',
      content: 'Buku yang wajib dibaca oleh siapa saja yang menyukai sastra kontemporer Indonesia dengan cita rasa internasional. Pilihan kata Valerie sangat matang dan kaya makna.',
      likes: 19,
      hasSpoiler: false,
    },
  ],
};


export const POPULAR_AUTHORS = [
  {
    id: 'julian-cross',
    name: 'Julian Cross',
    tagline: 'Novelis Sastra Kontemporer',
    genre: 'Fiksi Sastra & Arsitektur',
    category: 'literary-fiction',
    location: 'Oxford, Inggris',
    experience: 'Karier 30+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.4',
    rating: 4.9,
    activeReaders: '14.2k',
    publishedWorks: '8',
    isFeatured: true,
    bioExcerpt: 'Menelusuri ketelitian struktural arsitektur dengan lirisitas mendalam tentang kehilangan, memori, dan ruang batin manusia.',
    popularBooks: ['The Memory of Water', 'The River\'s Bend', 'The Architecture of Dust']
  },
  {
    id: 'eka-kurniawan',
    name: 'Eka Kurniawan',
    tagline: 'Maestro Realisme Magis',
    genre: 'Realisme Magis & Sejarah',
    category: 'magical-realism',
    location: 'Tasikmalaya, Indonesia',
    experience: 'Karier 20+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.6',
    rating: 4.8,
    activeReaders: '28.5k',
    publishedWorks: '6',
    isFeatured: false,
    bioExcerpt: 'Merajut mitos lokal, tragedi sejarah, dan humor gelap dalam gaya penuturan bertenaga yang mengguncang panggung sastra dunia.',
    popularBooks: ['Cantik Itu Luka', 'Lelaki Harimau', 'Seperti Dendam, Rindu Harus Dibayar Tuntas']
  },
  {
    id: 'albert-camus',
    name: 'Albert Camus',
    tagline: 'Filsuf Absurdisme & Esais',
    genre: 'Filsafat & Esai',
    category: 'philosophy',
    location: 'Mondovi, Aljazair / Prancis',
    experience: 'Penerima Nobel Sastra',
    portraitImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.8',
    rating: 4.9,
    activeReaders: '64.1k',
    publishedWorks: '11',
    isFeatured: false,
    bioExcerpt: 'Eksplorasi mendalam mengenai makna eksistensi, pemberontakan manusia di hadapan absurditas semesta, dan integritas moral.',
    popularBooks: ['Orang Asing (L\'Étranger)', 'Mite Sisifos', 'Sampar (La Peste)']
  },
  {
    id: 'pramoedya',
    name: 'Pramoedya Ananta Toer',
    tagline: 'Sastrawan Realisme Kritis',
    genre: 'Klasik & Sejarah',
    category: 'classics',
    location: 'Blora, Indonesia',
    experience: 'Karier 50+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.9',
    rating: 4.9,
    activeReaders: '52.8k',
    publishedWorks: '24',
    isFeatured: false,
    bioExcerpt: 'Menyuarakannya martabat manusia dan perlawanan antikolonial melalui epik naratif yang mengukir sejarah kesusastraan nusantara.',
    popularBooks: ['Bumi Manusia', 'Anak Semua Bangsa', 'Rumah Kaca']
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    tagline: 'Penulis Sastra Kontemplatif',
    genre: 'Sastra Perjalanan & Fiksi',
    category: 'literary-fiction',
    location: 'Praha, Ceko',
    experience: 'Karier 15+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.2',
    rating: 4.8,
    activeReaders: '18.3k',
    publishedWorks: '5',
    isFeatured: false,
    bioExcerpt: 'Mencatat topografi kota-kota tua Eropa Timur, keheningan stasiun kereta, dan perjumpaan tak terduga antara para pengelana.',
    popularBooks: ['Atlas of Untraveled Roads', 'Waltz in the Fog', 'The Cartographer\'s Daughter']
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    tagline: 'Esais Filsafat & Meditatif',
    genre: 'Filsafat & Esai',
    category: 'philosophy',
    location: 'Singapura / Edinburgh',
    experience: 'Karier 12+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    criticScore: '9.3',
    rating: 4.7,
    activeReaders: '12.4k',
    publishedWorks: '4',
    isFeatured: false,
    bioExcerpt: 'Merenungkan ritme lambat di tengah kecepatan dunia digital, ketenangan daun gugur, dan seni merawat ruang hening dalam diri.',
    popularBooks: ['Before the Last Leaf', 'The Geometry of Silence', 'Tea and Solitude']
  }
];

export const AUTHORS_DETAIL_MAP = {
  'julian-cross': {
    id: 'julian-cross',
    name: 'Julian Cross',
    tagline: 'Novelis Sastra Kontemporer',
    location: 'Oxford, Inggris',
    experience: 'Karier 30+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    metrics: { publishedWorks: '8', criticScore: '9.4', activeReaders: '14.2k' },
    featuredQuote: '“Arsitektur bukan sekadar batu dan semen, melainkan cara kita memeluk kesunyian di antara reruntuhan waktu.”',
    bio: {
      para1: 'Julian Cross lahir di pesisir utara Northumberland dan menghabiskan masa mudanya di antara mercusuar tua dan arsip peta maritim. Karya-karyanya memadukan ketelitian struktural arsitektur dengan lirisitas mendalam tentang kehilangan, memori, dan ruang batin manusia.',
      para2: 'Sejak publikasi novel perdananya pada tahun 1994, Cross menolak kecepatan konsumsi sastra instan. Buku-bukunya telah diterjemahkan ke dalam lebih dari dua puluh bahasa, mengajarkan para pembaca untuk mendengarkan apa yang tersisa ketika riuh dunia mereda.'
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
  },
  'eka-kurniawan': {
    id: 'eka-kurniawan',
    name: 'Eka Kurniawan',
    tagline: 'Maestro Realisme Magis',
    location: 'Tasikmalaya, Indonesia',
    experience: 'Karier 20+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    metrics: { publishedWorks: '6', criticScore: '9.6', activeReaders: '28.5k' },
    featuredQuote: '“Di Halimunda, masa lalu tidak pernah benar-benar terkubur; ia selalu bangkit kembali dalam rupa cerita dan kutukan.”',
    bio: {
      para1: 'Eka Kurniawan adalah sastrawan Indonesia terkemuka yang karya-karyanya telah diterjemahkan ke lebih dari 30 bahasa. Tulisannya memadukan realisme magis, tradisi tutur nusantara, humor satir, serta tragedi sejarah yang pekat.',
      para2: 'Novel perdananya, Cantik Itu Luka (2002), diakui sebagai salah satu karya fiksi paling berpengaruh di Asia Tenggara dan meraih Prince Claus Award 2018.'
    },
    awards: [
      { year: '2018', title: 'Prince Claus Award', desc: 'Atas kontribusi luar biasa dalam sastra kontemporer' },
      { year: '2016', title: 'Man Booker International Prize (Longlist)', desc: 'Untuk novel Lelaki Harimau (Man Tiger)' }
    ],
    books: [
      {
        id: 'cantik-itu-luka',
        title: 'Cantik Itu Luka',
        year: '2002',
        category: 'Realisme Magis',
        rating: 4.8,
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
        desc: 'Kisah Dewi Ayu dan anak-anak perempuannya yang merangkai mitos kecantikan, kutukan, dan kekerasan sejarah Halimunda.'
      },
      {
        id: 'lelaki-harimau',
        title: 'Lelaki Harimau',
        year: '2004',
        category: 'Fiksi Kriminal Sastra',
        rating: 4.7,
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
        desc: 'Pembunuhan seorang pria di desa pantai dan misteri harimau putih yang bersemayam dalam diri pemuda bernama Margio.'
      }
    ]
  },
  'albert-camus': {
    id: 'albert-camus',
    name: 'Albert Camus',
    tagline: 'Filsuf Absurdisme & Esais',
    location: 'Mondovi, Aljazair / Prancis',
    experience: 'Penerima Nobel Sastra',
    portraitImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    metrics: { publishedWorks: '11', criticScore: '9.8', activeReaders: '64.1k' },
    featuredQuote: '“Di tengah musim dingin yang membeku, akhirnya saya menyadari bahwa di dalam diri saya ada musim panas yang tak terkalahkan.”',
    bio: {
      para1: 'Albert Camus adalah filsuf, novelis, dan jurnalis peraih Hadiah Nobel Sastra 1957. Ia terkenal karena merumuskan filsafat absurdisme: ketegangan antara kerinduan manusia akan makna dan kesunyian semesta yang tak bergeming.',
      para2: 'Karyanya melampaui batas zaman, menginspirasi generasi pemikir dan pembaca untuk hidup secara jujur, berani memberontak terhadap ketidakadilan, dan merayakan keindahan eksistensi.'
    },
    awards: [
      { year: '1957', title: 'Hadiah Nobel Sastra', desc: 'Atas karya sastra yang menyoroti masalah batin manusia modern' }
    ],
    books: [
      {
        id: 'orang-asing',
        title: 'Orang Asing (L\'Étranger)',
        year: '1942',
        category: 'Filsafat Eksistensial',
        rating: 4.9,
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
        desc: 'Kisah Meursault di bawah terik matahari Aljazair dan penolakannya terhadap kepura-puraan norma masyarakat.'
      }
    ]
  },
  'pramoedya': {
    id: 'pramoedya',
    name: 'Pramoedya Ananta Toer',
    tagline: 'Sastrawan Realisme Kritis',
    location: 'Blora, Indonesia',
    experience: 'Karier 50+ Tahun',
    portraitImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    metrics: { publishedWorks: '24', criticScore: '9.9', activeReaders: '52.8k' },
    featuredQuote: '“Seorang terpelajar harus sudah berbuat adil sejak dalam pikiran, apalagi dalam perbuatan.”',
    bio: {
      para1: 'Pramoedya Ananta Toer adalah sastrawan terbesar Indonesia yang karyanya mengguncang dunia melalui Tetralogi Buru. Ditulis di bawah penindasan dan pengasingan di Pulau Buru, karyanya merekam kebangkitan kesadaran nasional.',
      para2: 'Ia berkali-kali dinominasikan untuk Hadiah Nobel Sastra dan menerima Ramon Magsaysay Award atas kejujuran dan keteguhannya menyuarakan kebenaran lewat tulisan.'
    },
    awards: [
      { year: '1995', title: 'Ramon Magsaysay Award', desc: 'Jurnalisme, Sastra, dan Seni Komunikasi Kreatif' },
      { year: '2000', title: 'PEN Freedom-to-Write Award', desc: 'Keteguhan dalam memperjuangkan kebebasan berekspresi' }
    ],
    books: [
      {
        id: 'bumi-manusia',
        title: 'Bumi Manusia',
        year: '1980',
        category: 'Epik Sejarah',
        rating: 4.9,
        cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
        desc: 'Kisah cinta Minke dan Annelies di masa kolonial Hindia Belanda, serta pergulatan keadilan di bawah hukum yang timpang.'
      }
    ]
  }
};


// ============================================================================
// INTEGRASI API BOOKLY (sesuai spesifikasi server/API.md)
// Mengambil data dari backend Express + PostgreSQL dengan fallback ke mockData
// ============================================================================

export {
  authApi,
  booksApi,
  categoriesApi,
  authorsApi,
  reviewsApi,
  favoritesApi,
  readingListApi,
  normalizeBook,
  normalizeAuthor,
  getToken,
  setToken,
  clearAuth,
  isAuthenticated
} from '../services/api';

import {
  booksApi,
  categoriesApi,
  authorsApi,
  reviewsApi
} from '../services/api';

export const getApiBooks = (options) => booksApi.getBooks(options);
export const getApiCategories = () => categoriesApi.getCategories();
export const getApiBookDetail = (apiBookId) => booksApi.getBookDetail(apiBookId);
export const getApiAuthors = (q) => authorsApi.getAuthors(q);
export const getApiAuthorDetail = (authorId) => authorsApi.getAuthorDetail(authorId);
export const getApiBookReviews = (apiBookId) => reviewsApi.getBookReviews(apiBookId);
