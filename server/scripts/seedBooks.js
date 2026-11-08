require('dotenv').config();
const pool = require('../src/config/db');
const { searchBooks } = require('../src/services/googleBooks');
const { saveBook } = require('../src/services/bookService');
const { labelForSlug } = require('../src/config/categoryMap');

const FIKSI = 'literary-fiction';
const NONFIKSI = 'non-fiction';
const FILSAFAT = 'philosophy';
const SENI = 'art-design';
const PUISI = 'poetry';
const SAINS = 'nature-science';
const SEJARAH = 'history';

// isbn opsional: kalau salah, skrip otomatis lanjut ke pencarian teks
const SEED = [
  // Fiksi Indonesia
  { title: 'Laskar Pelangi', author: 'Andrea Hirata', cats: [FIKSI] },
  { title: 'Sang Pemimpi', author: 'Andrea Hirata', cats: [FIKSI] },
  { title: 'Edensor', author: 'Andrea Hirata', cats: [FIKSI] },
  { title: 'Maryamah Karpov', author: 'Andrea Hirata', cats: [FIKSI] },
  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', cats: [FIKSI] },
  { title: 'Lelaki Harimau', author: 'Eka Kurniawan', cats: [FIKSI] },
  { title: 'Seperti Dendam, Rindu Harus Dibayar Tuntas', author: 'Eka Kurniawan', cats: [FIKSI] },
  { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', cats: [FIKSI, SEJARAH] },
  { title: 'Anak Semua Bangsa', author: 'Pramoedya Ananta Toer', cats: [FIKSI, SEJARAH] },
  { title: 'Jejak Langkah', author: 'Pramoedya Ananta Toer', cats: [FIKSI, SEJARAH] },
  { title: 'Rumah Kaca', author: 'Pramoedya Ananta Toer', cats: [FIKSI, SEJARAH] },
  { title: 'Pulang', author: 'Leila S. Chudori', cats: [FIKSI] },
  { title: 'Laut Bercerita', author: 'Leila S. Chudori', cats: [FIKSI] },
  // Fiksi dunia
  { title: 'Norwegian Wood', author: 'Haruki Murakami', cats: [FIKSI] },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', isbn: '9780060883287', cats: [FIKSI] },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', cats: [FIKSI] },
  { title: 'Nineteen Eighty-Four', author: 'George Orwell', isbn: '9780451524935', cats: [FIKSI] },
  { title: 'Pride and Prejudice', author: 'Jane Austen', cats: [FIKSI] },
  // Filsafat & esai
  { title: 'The Stranger', author: 'Albert Camus', isbn: '9780679720201', cats: [FIKSI, FILSAFAT] },
  { title: 'The Myth of Sisyphus', author: 'Albert Camus', isbn: '9780679733737', cats: [FILSAFAT] },
  { title: 'The Plague', author: 'Albert Camus', cats: [FIKSI, FILSAFAT] },
  { title: 'Meditations', author: 'Marcus Aurelius', isbn: '9780140449334', cats: [FILSAFAT] },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', cats: [FILSAFAT] },
  { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', cats: [FILSAFAT] },
  // Puisi
  { title: 'Hujan Bulan Juni', author: 'Sapardi Djoko Damono', cats: [PUISI, FIKSI] },
  { title: 'Deru Campur Debu', author: 'Chairil Anwar', cats: [PUISI] },
  { title: 'Twenty Love Poems and a Song of Despair', author: 'Pablo Neruda', cats: [PUISI] },
  { title: 'Milk and Honey', author: 'Rupi Kaur', cats: [PUISI] },
  // Seni & desain
  { title: 'The Design of Everyday Things', author: 'Don Norman', isbn: '9780465050659', cats: [SENI] },
  { title: 'Ways of Seeing', author: 'John Berger', cats: [SENI] },
  { title: 'Steal Like an Artist', author: 'Austin Kleon', isbn: '9780761169253', cats: [SENI] },
  // Sains & alam
  { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', cats: [SAINS] },
  { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', cats: [SAINS] },
  { title: 'The Selfish Gene', author: 'Richard Dawkins', cats: [SAINS] },
  { title: 'Silent Spring', author: 'Rachel Carson', isbn: '9780618249060', cats: [SAINS] },
  { title: 'The Hidden Life of Trees', author: 'Peter Wohlleben', cats: [SAINS] },
  // Sejarah
  { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393317558', cats: [SEJARAH] },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', cats: [SEJARAH] },
  { title: 'A History of Modern Indonesia', author: 'M. C. Ricklefs', cats: [SEJARAH] },
  // Non-fiksi
  { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', cats: [NONFIKSI] },
  { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', cats: [NONFIKSI] },
];

// Huruf kecil, tanpa aksen dan tanda baca
const norm = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

// Hanya terima edisi berbahasa Inggris atau Indonesia, dengan judul beraksara Latin
const LATIN_TITLE = /^[\u0000-\u024F\u2000-\u206F]*$/;
const languageOk = (book) =>
  LATIN_TITLE.test(book.title) && (!book.language || ['en', 'id'].includes(book.language));

const stripThe = (s) => norm(s).replace(/^the /, '');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Kata yang menandakan buku itu bukan edisi aslinya (kajian, ringkasan, kumpulan karya, dan sebagainya)
const BAD_WORDS =
  /\b(critical|complete works|collection|study guide|summary|analysis|companion|workbook|cliffsnotes|cliffs notes|sparknotes|bookrags|interpretation|reader s guide)\b/;

// Judul Google harus sama dengan judul kita, atau diawali judul kita ("Educated: A Memoir")
function titleMatches(book, entry) {
  const want = stripThe(entry.title);
  const got = stripThe(book.title);
  if (BAD_WORDS.test(got) && !BAD_WORDS.test(want)) return false;
  return got === want || got.startsWith(want + ' ');
}

// Cukup satu kata nama penulis yang cocok (mengatasi ejaan "Tur" vs "Toer", aksen, dan sebagainya)
function authorMatches(book, entry) {
  const authors = norm(book.authors.join(' '));
  return norm(entry.author)
    .split(' ')
    .filter((w) => w.length > 2)
    .some((w) => authors.includes(w));
}

function score(book, entry) {
  return (
    (norm(book.title) === norm(entry.title) ? 4 : 0) +
    (book.cover_image ? 2 : 0) +
    (book.description ? 1 : 0) +
    (book.google_ratings_count ? 1 : 0)
  );
}

function buildQueries(entry) {
  const lastName = norm(entry.author).split(' ').pop();
  return [
    `${entry.title} ${entry.author}`,
    `${entry.title} ${lastName}`,
    `${entry.title} inauthor:${lastName}`,
    entry.title,
  ];
}

async function findBook(entry) {
  for (const q of buildQueries(entry)) {
    const { books } = await searchBooks(q, 40);
    const candidates = books.filter(
      (b) => titleMatches(b, entry) && authorMatches(b, entry) && languageOk(b)
    );

    if (candidates.length > 0) {
      candidates.sort((a, b) => score(b, entry) - score(a, entry));
      return { book: candidates[0], query: q };
    }
    await sleep(200);
  }
  return null;
}

// Opsional: node scripts/seedBooks.js "Gatsby" "Cosmos"  -> hanya judul yang mengandung kata itu
const only = process.argv.slice(2).map((s) => s.toLowerCase());
const list = only.length
  ? SEED.filter((e) => only.some((o) => e.title.toLowerCase().includes(o)))
  : SEED;

(async () => {
  let ok = 0;
  const missed = [];

  for (const entry of list) {
    try {
      const found = await findBook(entry);
      if (!found) {
        missed.push(entry.title);
        console.log(`TIDAK DITEMUKAN: ${entry.title}`);
      } else {
        // Judul, penulis, dan kategori memakai data kurasi; sisanya dari Google
        await saveBook({
          ...found.book,
          title: entry.title,
          authors: [entry.author],
          categories: entry.cats.map(labelForSlug),
        });
        ok++;
        console.log(`OK: ${entry.title} | ${entry.author}`);
        console.log(`    edisi Google: "${found.book.title}" | query: ${found.query}`);
      }
    } catch (err) {
      missed.push(entry.title);
      console.log(`GAGAL: ${entry.title} (${err.message})`);
    }
    await sleep(300);
  }

  console.log(`\nSelesai: ${ok} berhasil, ${missed.length} gagal`);
  if (missed.length) console.log('Gagal:', missed.join(' | '));
  await pool.end();
})();
