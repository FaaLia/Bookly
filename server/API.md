# Bookly API

Base URL (lokal): `http://localhost:5000`

## Buku

### GET /api/books
Daftar koleksi buku yang tersimpan (untuk homepage).
Query: `page` (default 1), `limit` (default 20, maks 50), `category` (nama kategori, opsional).

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
      "average_rating": null
    }
  ]
}
```

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
      "categories": ["Indonesian fiction"]
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
  "categories": ["Indonesian fiction"],
  "average_rating": null,
  "reviews_count": 0
}
```

`average_rating` dan `reviews_count` dihitung dari review pengguna Bookly (skala 1-5). `null` berarti belum ada review.

## Kategori

### GET /api/categories
```json
[{ "category_id": 1, "category_name": "Indonesian fiction", "books_count": 1 }]
```

## Penulis

### GET /api/authors?q=hirata
Daftar penulis, `q` opsional untuk mencari nama.

### GET /api/authors/:id
Detail penulis beserta buku-bukunya di koleksi.

## Catatan untuk frontend
- Alur halaman: hasil pencarian → klik buku → panggil `/api/books/:apiBookId` → tampilkan detail.
- Field bisa `null` (sinopsis, penerbit, cover, rating). Siapkan tampilan cadangan.
- Error berformat `{ "message": "..." }` dengan status 400, 404, 500, atau 502 (Google Books bermasalah).