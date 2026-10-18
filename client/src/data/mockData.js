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
    avatarBg: '#192F23',
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
