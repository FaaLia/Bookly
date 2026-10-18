# Bookly Client

Landing page dan antarmuka web Bookly dibangun menggunakan **React**, **Tailwind CSS**, dan **JavaScript (ES Modules)** dengan **Vite**.

## Menjalankan Proyek

1. Masuk ke direktori `client`:
   ```bash
   cd client
   ```

2. Jalankan server pengembangan (development server):
   ```bash
   npm run dev
   ```

3. Buka di browser:
   `http://localhost:5173`

## Perintah Tersedia

- `npm run dev`: Menjalankan Vite development server dengan HMR.
- `npm run build`: Melakukan compile dan bundling aplikasi untuk mode produksi ke folder `dist/`.
- `npm run preview`: Meninjau build produksi secara lokal.

## Struktur Komponen

- `src/components/Navbar.jsx`: Navigasi utama, kolom pencarian, tautan kategori, dan tombol masuk.
- `src/components/HeroSection.jsx`: Sorotan kurasi editor (*Editor's Choice: The Memory of Water*) dengan rating, sinopsis, dan sampul bergradien tilt.
- `src/components/CategoryFilterPills.jsx`: Tab filter pil kategori dengan status aktif dan scroll responsif.
- `src/components/TrendingSection.jsx`: Kartu buku terpopuler (*The Architecture of Dust*, *Atlas of Untraveled Roads*, dll.).
- `src/components/CuratedCollectionsSection.jsx`: Kartu koleksi khusus dengan overlay gradien dan jumlah daftar kurasi.
- `src/components/ReviewsSection.jsx`: Kartu ulasan komunitas pembaca dengan rating bintang dan kutipan estetik.
- `src/components/Footer.jsx`: Catatan kaki literasi lengkap dengan buletin dan tautan bantuan.
- `src/data/mockData.js`: Data mock buku, ulasan, dan kategori.
