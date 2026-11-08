# Bookly API

Base URL (lokal): `http://localhost:5000`

Semua request dan respons memakai JSON. Error selalu berformat `{ "message": "..." }`.

## Daftar isi
- [Autentikasi](#autentikasi)
- [Buku](#buku)
- [Kategori](#kategori)
- [Penulis](#penulis)
- [Review](#review)
- [Favorit](#favorit)
- [Reading list](#reading-list)
- [Admin: kelola buku](#admin-kelola-buku)
- [Admin: kelola penulis](#admin-kelola-penulis)
- [Kode status dan catatan frontend](#kode-status-dan-catatan-frontend)

---

## Autentikasi

Endpoint bertanda **(login)** butuh header:

```
Authorization: Bearer <token>
```

Token didapat dari register atau login, berlaku 1 hari. Endpoint bertanda **(admin)** butuh login dengan akun ber-`role` `admin`. Akun baru selalu `user`, dan role admin hanya bisa diubah lewat database. Kalau role akun diubah, login ulang untuk mendapat token baru.

### POST /api/auth/register
Body: `name`, `email`, `password` (semua wajib, password minimal 6 karakter).

```json
{
  "message": "Registrasi berhasil",
  "token": "eyJhbGciOi...",
  "user": {
    "user_id": 1,
    "name": "Radhin",
    "email": "radhin@example.com",
    "role": "user",
    "created_at": "2026-11-08T07:24:44.630Z"
  }
}
```

Status: `201` berhasil, `400` data tidak valid, `409` email sudah terdaftar.

### POST /api/auth/login
Body: `email`, `password`. Respons berbentuk sama dengan register (`message`, `token`, `user`) dengan status `200`.
Email salah dan password salah memberi pesan yang sama (`401`, "Email atau password salah").

### GET /api/auth/me (login)
Data user yang sedang login: `user_id`, `name`, `email`, `role`, `created_at`.

---

## Buku

### GET /api/books
Daftar koleksi buku (beranda, katalog, filter).
Query: `page` (default 1), `limit` (default 20, maks 50),
`category` (salah satu `slug` dari /api/categories),
`sort` (`newest` default, `rating`, atau `title`).

```json
{
  "page": 1,
  "limit": 20,
  "books": [
    {
      "book_id": 4,
      "api_book_id": "vzD-3U60S34C",
      "title": "Maryamah Karpov",
      "cover_image": "https://...",
      "published_date": "2008-11-01",
      "authors": ["Andrea Hirata"],
      "categories": ["Fiksi Sastra"],
      "rating": 3.5,
      "ratings_count": 34,
      "rating_source": "google",
      "average_rating": null,
      "reviews_count": 0,
      "google_average_rating": 3.5,
      "google_ratings_count": 34
    }
  ]
}
```

- `rating` dan `ratings_count` sudah siap pakai: rating review Bookly kalau sudah ada, kalau belum rating Google. `rating_source` bernilai `"bookly"`, `"google"`, atau `null`.
- `rating` bisa `null` untuk buku tanpa rating sama sekali.
- `sort=rating` mengurutkan dengan rating tertimbang (buku dengan sedikit rating tidak otomatis di atas), jadi cocok untuk bagian "Trending" atau "Terpopuler".
- `published_date` bisa berupa tahun saja (`"1962"`) atau tanggal lengkap. Ambil 4 karakter pertama untuk tahun.
- `categories` selalu berisi nama dari 7 kategori tetap (lihat bagian Kategori).

### GET /api/books/search?q=laskar+pelangi
Cari buku lewat Google Books. Query: `q` (wajib), `page`, `limit` (maks 40).
Hasil pencarian belum tersimpan di database dan belum punya `book_id`.

```json
{
  "page": 1,
  "limit": 20,
  "total": 158,
  "books": [
    {
      "api_book_id": "vzD-3U60S34C",
      "title": "Maryamah Karpov",
      "description": "...",
      "publisher": "Bentang Pustaka",
      "published_date": "2008-11-01",
      "cover_image": "https://...",
      "google_average_rating": 3.5,
      "google_ratings_count": 35,
      "authors": ["Andrea Hirata"],
      "categories": ["Fiksi Sastra"]
    }
  ]
}
```

### GET /api/books/:apiBookId
Detail buku. Pertama kali dibuka, buku disimpan ke database, sehingga mendapat `book_id`.
Gunakan `book_id` untuk review, favorit, dan reading list.

```json
{
  "book_id": 4,
  "api_book_id": "vzD-3U60S34C",
  "title": "Maryamah Karpov",
  "description": "...",
  "publisher": "Bentang Pustaka",
  "published_date": "2008-11-01",
  "cover_image": "https://...",
  "google_average_rating": 3.5,
  "google_ratings_count": 35,
  "authors": ["Andrea Hirata"],
  "categories": ["Fiksi Sastra"],
  "average_rating": null,
  "reviews_count": 0
}
```

`average_rating` dan `reviews_count` dihitung dari review pengguna Bookly (skala 1-5). `null` berarti belum ada review.

---

## Kategori

### GET /api/categories
Mengembalikan tepat 7 kategori tetap, berurutan seperti di bawah. Pakai `slug` untuk filter `GET /api/books?category=<slug>` dan `category_name` untuk tampilan. `category_id` berbeda-beda di tiap database, jadi jangan dipakai sebagai patokan di frontend.

```json
[
  { "slug": "literary-fiction", "category_id": 1, "category_name": "Fiksi Sastra", "books_count": 21 },
  { "slug": "non-fiction", "category_id": 38, "category_name": "Non-Fiksi", "books_count": 2 },
  { "slug": "philosophy", "category_id": 22, "category_name": "Filsafat & Esai", "books_count": 5 },
  { "slug": "art-design", "category_id": 29, "category_name": "Seni & Desain", "books_count": 3 },
  { "slug": "poetry", "category_id": 25, "category_name": "Puisi", "books_count": 3 },
  { "slug": "nature-science", "category_id": 32, "category_name": "Sains & Alam", "books_count": 4 },
  { "slug": "history", "category_id": 9, "category_name": "Sejarah", "books_count": 7 }
]
```

Angka `books_count` di atas hanya contoh. `category_id` bisa `null` kalau kategori belum pernah dipakai oleh buku mana pun.

---

## Penulis

### GET /api/authors?q=hirata
Daftar penulis (maks 100), `q` opsional untuk mencari nama.

```json
[
  { "author_id": 3, "author_name": "Andrea Hirata", "biography": null, "books_count": 4 }
]
```

### GET /api/authors/:id
Detail penulis beserta buku-bukunya di koleksi.

```json
{
  "author_id": 3,
  "author_name": "Andrea Hirata",
  "biography": null,
  "books": [
    {
      "book_id": 4,
      "api_book_id": "vzD-3U60S34C",
      "title": "Maryamah Karpov",
      "cover_image": "https://...",
      "published_date": "2008-11-01"
    }
  ]
}
```

---

## Review

Rating harus bilangan bulat 1 sampai 5. Satu user hanya boleh punya satu review per buku.

### GET /api/reviews/book/:apiBookId
Publik. Semua review sebuah buku, terbaru dulu.

```json
{
  "total": 1,
  "reviews": [
    {
      "review_id": 1,
      "rating": 5,
      "review_text": "Bagus",
      "created_at": "2026-11-08T07:24:44.668Z",
      "updated_at": "2026-11-08T07:24:44.668Z",
      "user_id": 1,
      "user_name": "Radhin"
    }
  ]
}
```

### GET /api/reviews/me (login)
Review milik user yang login. Setiap item juga memuat `book_id`, `api_book_id`, `title`, dan `cover_image`.

### POST /api/reviews (login)
Body: `rating` (wajib), `review_text` (opsional), dan salah satu dari `book_id` atau `api_book_id`.
Kalau memakai `api_book_id` dan buku belum ada di database, buku otomatis diimpor dari Google Books.

```json
{ "book_id": 4, "rating": 5, "review_text": "Bagus" }
```

Respons `201`: `review_id`, `user_id`, `book_id`, `rating`, `review_text`, `created_at`, `updated_at`.
Status: `400` rating tidak valid, `404` buku tidak ditemukan, `409` sudah pernah mereview buku ini (pakai edit).

### PUT /api/reviews/:id (login, hanya pemilik)
Body: `rating` dan/atau `review_text`. Field yang tidak dikirim tidak berubah. Respons `200` berisi review terbaru.
Status: `403` bukan milik user, `404` review tidak ada.

### DELETE /api/reviews/:id (login, pemilik atau admin)
Respons `200`: `{ "message": "Review dihapus" }`.

---

## Favorit

Semua endpoint favorit butuh login.

### GET /api/favorites
```json
{
  "total": 1,
  "favorites": [
    { "book_id": 4, "api_book_id": "vzD-3U60S34C", "title": "Maryamah Karpov", "cover_image": "https://...", "created_at": "2026-11-08T07:30:00.000Z" }
  ]
}
```

### POST /api/favorites
Body: `book_id` atau `api_book_id`. Respons `201`: `user_id`, `book_id`, `created_at`.
Status: `404` buku tidak ditemukan, `409` sudah ada di favorit.

### DELETE /api/favorites/:bookId
`:bookId` adalah `book_id` angka. Respons `200`: `{ "message": "Dihapus dari favorit" }`. `404` kalau buku tidak ada di favorit.

---

## Reading list

Semua endpoint reading list butuh login. `reading_status` hanya boleh `want_to_read`, `reading`, atau `finished`.

### GET /api/reading-list?status=reading
`status` opsional untuk memfilter.

```json
{
  "total": 1,
  "reading_list": [
    {
      "book_id": 4,
      "api_book_id": "vzD-3U60S34C",
      "title": "Maryamah Karpov",
      "cover_image": "https://...",
      "reading_status": "reading",
      "added_at": "2026-11-08T07:30:00.000Z",
      "updated_at": "2026-11-08T07:45:00.000Z"
    }
  ]
}
```

### POST /api/reading-list
Body: `book_id` atau `api_book_id`, dan `reading_status` (opsional, default `want_to_read`).
Respons `201`: `user_id`, `book_id`, `reading_status`, `added_at`, `updated_at`.
Status: `400` status tidak valid, `404` buku tidak ditemukan, `409` sudah ada di reading list (pakai update status).

### PUT /api/reading-list/:bookId
Body: `reading_status` (wajib). Respons `200` berisi baris terbaru. `404` kalau buku belum ada di reading list.

### DELETE /api/reading-list/:bookId
Respons `200`: `{ "message": "Dihapus dari reading list" }`.

---

## Admin: kelola buku

Semua endpoint di bagian ini butuh login sebagai admin dan memakai `book_id` angka (bukan `api_book_id`). Akun non-admin mendapat `403`, tanpa token mendapat `401`.

Nama penulis dan kategori dikirim sebagai array nama:
- `authors`: nama bebas. Penulis yang belum ada dibuat otomatis, nama yang sudah ada dipakai ulang (huruf besar-kecil tidak dibedakan).
- `categories`: harus persis salah satu dari 7 `category_name` di /api/categories (misalnya `"Fiksi Sastra"`). Nama lain ditolak `400`.

### POST /api/books (admin)
Body: `title` (wajib), lalu opsional `description`, `publisher`, `published_date`, `cover_image` (harus URL `http`/`https`), `authors`, `categories`, dan `api_book_id`.
Kalau `api_book_id` tidak dikirim, dibuat otomatis berawalan `manual-`.

```json
{
  "title": "Buku Baru",
  "publisher": "Penerbit A",
  "published_date": "2024",
  "authors": ["Penulis A", "Penulis B"],
  "categories": ["Fiksi Sastra"]
}
```

Respons `201`: detail buku (`book_id`, `api_book_id`, `title`, `description`, `publisher`, `published_date`, `cover_image`) plus `authors` dan `categories` sebagai array objek (`author_id` / `author_name`, `category_id` / `category_name`).
Status: `400` data tidak valid atau kategori tidak dikenal, `409` `api_book_id` sudah dipakai.

### PUT /api/books/:id (admin)
Semua field opsional. Field yang tidak dikirim tidak berubah. `authors` dan `categories` **mengganti seluruh daftar** lama (kirim daftar lengkap, bukan hanya tambahannya). `api_book_id` dan rating Google tidak bisa diubah.
Respons `200`: detail buku terbaru, bentuknya sama dengan respons POST. `404` kalau buku tidak ada.

### DELETE /api/books/:id (admin)
Menghapus buku beserta semua review, favorit, dan reading list yang terkait. Respons `200`: `{ "message": "Buku dihapus" }`. `404` kalau buku tidak ada.

---

## Admin: kelola penulis

Butuh login sebagai admin.

### POST /api/authors (admin)
Body: `author_name` (wajib), `biography` (opsional). Respons `201`: `author_id`, `author_name`, `biography`.
`409` kalau nama sudah ada (huruf besar-kecil tidak dibedakan).

### PUT /api/authors/:id (admin)
Body: `author_name` dan/atau `biography`. Respons `200` berisi data terbaru. `404` penulis tidak ada, `409` nama sudah dipakai penulis lain.

### DELETE /api/authors/:id (admin)
Hanya bisa kalau penulis tidak terhubung ke buku mana pun. Kalau masih terhubung, `409` dengan pesan jumlah bukunya. Lepaskan dulu lewat `PUT /api/books/:id`.

> Kategori tidak punya endpoint tambah atau hapus: daftarnya tetap 7. Mengatur kategori sebuah buku dilakukan lewat field `categories` pada `POST` / `PUT /api/books`.

---

## Kode status dan catatan frontend

| Status | Arti |
|---|---|
| 400 | Data yang dikirim tidak valid |
| 401 | Belum login, token salah, atau token kedaluwarsa |
| 403 | Login tapi tidak berhak (bukan pemilik, atau bukan admin) |
| 404 | Data tidak ditemukan |
| 409 | Bentrok, misalnya data ganda atau masih terhubung ke data lain |
| 500 | Kesalahan server |
| 502 | Google Books bermasalah |

- Alur halaman: hasil pencarian -> klik buku -> panggil `/api/books/:apiBookId` -> tampilkan detail.
- Field bisa `null` (sinopsis, penerbit, cover, rating, bio penulis). Siapkan tampilan cadangan.
- Simpan `token` setelah login dan kirim di header `Authorization: Bearer <token>`. Kalau menerima `401` di endpoint login, arahkan user ke halaman login.
- `CORS` terbuka untuk semua origin di lingkungan lokal.