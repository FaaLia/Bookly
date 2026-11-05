// 7 kategori tetap, sama dengan filter di frontend (slug = id di frontend)
const CATEGORIES = [
  { slug: 'literary-fiction', label: 'Fiksi Sastra' },
  { slug: 'non-fiction', label: 'Non-Fiksi' },
  { slug: 'philosophy', label: 'Filsafat & Esai' },
  { slug: 'art-design', label: 'Seni & Desain' },
  { slug: 'poetry', label: 'Puisi' },
  { slug: 'nature-science', label: 'Sains & Alam' },
  { slug: 'history', label: 'Sejarah' },
];

// Urutan penting: aturan paling atas diperiksa lebih dulu
const RULES = [
  { slug: 'poetry', pattern: /poet|poem|puisi/i },
  // "fiction" tapi bukan "nonfiction" / "non-fiction"
  { slug: 'literary-fiction', pattern: /(?<!non-?)fiction|novel|short stories|sastra|cerita/i },
  { slug: 'philosophy', pattern: /philosoph|essay|ethic|filsafat|esai/i },
  { slug: 'history', pattern: /histor|\bwars?\b|military|sejarah/i },
  { slug: 'art-design', pattern: /\barts?\b|design|architecture|photograph|music|film|motion picture|painting|\bcrafts?\b/i },
  { slug: 'non-fiction', pattern: /social science|political science|computer|business|biograph|self-help|psycholog|religio/i },
  { slug: 'nature-science', pattern: /science|nature|mathematic|biolog|physic|chemistry|ecolog|animal|garden|environment|astronom|sains/i },
];

function labelForSlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.label || null;
}

// Ubah daftar label Google menjadi daftar label kategori tetap (tanpa duplikat)
function mapCategories(googleLabels = []) {
  const slugs = new Set();
  for (const raw of googleLabels) {
    const rule = RULES.find((r) => r.pattern.test(raw));
    slugs.add(rule ? rule.slug : 'non-fiction');
  }
  return [...slugs].map(labelForSlug);
}

module.exports = { CATEGORIES, mapCategories, labelForSlug };
