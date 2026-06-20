import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "src", "data", "articles.ts");

const articleTemplates = [
  // Pertanian
  { slug: "cara-pakai-poc-nasa-untuk-cabai", title: "Cara Pakai POC NASA untuk Tanaman Cabai Agar Panen Melimpah", category: "pertanian", keywords: ["poc nasa cabai", "pupuk organik cabai"], products: ["poc-nasa", "hormonik"] },
  { slug: "manfaat-hormonik-nasa-untuk-padi", title: "Manfaat Hormonik NASA untuk Tanaman Padi dan Cara Aplikasinya", category: "pertanian", keywords: ["hormonik nasa padi", "pupuk padi organik"], products: ["hormonik", "poc-nasa"] },
  { slug: "poc-nasa-untuk-tanaman-tomat", title: "POC NASA untuk Tomat: Dosis, Cara Pakai, dan Hasil Panen", category: "pertanian", keywords: ["poc nasa tomat", "pupuk tomat organik"], products: ["poc-nasa"] },
  { slug: "pupuk-nasa-untuk-tanaman-stroberi", title: "Pupuk NASA untuk Tanaman Stroberi: Panduan Lengkap Petani", category: "pertanian", keywords: ["pupuk stroberi nasa", "poc nasa stroberi"], products: ["poc-nasa", "hormonik"] },
  { slug: "aplikasi-poc-nasa-pohon-durian", title: "Aplikasi POC NASA untuk Pohon Durian: Tips dari Petani Berhasil", category: "pertanian", keywords: ["poc nasa durian", "pupuk durian organik"], products: ["poc-nasa", "power-nutrition"] },
  { slug: "poc-nasa-untuk-tanaman-sawit", title: "POC NASA untuk Kelapa Sawit: Meningkatkan Produktivitas Kebun", category: "pertanian", keywords: ["poc nasa sawit", "pupuk sawit organik"], products: ["poc-nasa", "pop-supernasa"] },
  { slug: "green-star-nasa-cara-pakai", title: "Green Star NASA: Cara Pakai dan Manfaat untuk Pupuk Daun", category: "pertanian", keywords: ["green star nasa", "pupuk daun nasa"], products: ["green-star"] },
  { slug: "pop-supernasa-untuk-lahan-kering", title: "POP Supernasa untuk Lahan Kering: Solusi Pupuk Organik NASA", category: "pertanian", keywords: ["pop supernasa", "pupuk lahan kering"], products: ["pop-supernasa"] },
  { slug: "power-nutrition-untuk-buah-mangga", title: "Power Nutrition NASA untuk Buah Mangga Lebih Manis dan Besar", category: "pertanian", keywords: ["power nutrition nasa", "pupuk mangga"], products: ["power-nutrition"] },
  { slug: "poc-nasa-vs-pupuk-kimia", title: "POC NASA vs Pupuk Kimia: Perbandingan dan Keuntungan Organik", category: "pertanian", keywords: ["poc nasa vs pupuk kimia", "pupuk organik nasa"], products: ["poc-nasa"] },
  { slug: "cara-meningkatkan-hasil-panen-tebu", title: "Cara Meningkatkan Hasil Panen Tebu dengan Pupuk NASA", category: "pertanian", keywords: ["pupuk tebu nasa", "poc nasa tebu"], products: ["poc-nasa", "hormonik"] },
  { slug: "pupuk-nasa-untuk-tanaman-bawang", title: "Pupuk NASA untuk Bawang Merah dan Bawang Putih", category: "pertanian", keywords: ["pupuk bawang nasa", "poc nasa bawang"], products: ["poc-nasa", "green-star"] },
  // Peternakan
  { slug: "dosis-viterna-plus-ayam-broiler", title: "Dosis Viterna Plus untuk Ayam Broiler: Panduan Lengkap", category: "peternakan", keywords: ["viterna plus ayam", "pakan ayam nasa"], products: ["viterna-plus"] },
  { slug: "viterna-plus-untuk-kambing", title: "Viterna Plus untuk Kambing: Manfaat dan Cara Pemberian", category: "peternakan", keywords: ["viterna plus kambing", "suplemen kambing nasa"], products: ["viterna-plus"] },
  { slug: "viterna-plus-untuk-sapi", title: "Viterna Plus untuk Sapi Potong dan Sapi Perah", category: "peternakan", keywords: ["viterna plus sapi", "pakan sapi organik"], products: ["viterna-plus"] },
  { slug: "pakan-ternak-ayam-petelur-nasa", title: "Pakan Ternak Ayam Petelur dengan Viterna Plus NASA", category: "peternakan", keywords: ["ayam petelur nasa", "viterna plus petelur"], products: ["viterna-plus"] },
  { slug: "ton-pupuk-tambak-udang-vaname", title: "TON Pupuk Tambak untuk Budidaya Udang Vaname", category: "peternakan", keywords: ["pupuk tambak nasa", "ton pupuk tambak"], products: ["ton-pupuk-tambak"] },
  { slug: "viterna-plus-untuk-ikan-lele", title: "Viterna Plus untuk Ikan Lele: Meningkatkan Pertumbuhan", category: "peternakan", keywords: ["viterna plus ikan", "pakan ikan nasa"], products: ["viterna-plus"] },
  { slug: "tanya-jawab-peternakan-nasa", title: "Tanya Jawab Peternakan NASA: Pertanyaan yang Sering Diajukan", category: "peternakan", keywords: ["tanya jawab peternakan nasa", "viterna plus"], products: ["viterna-plus", "ton-pupuk-tambak"] },
  { slug: "cara-merawat-ternak-dengan-nasa", title: "Cara Merawat Ternak dengan Produk NASA Agar Sehat dan Cepat Tumbuh", category: "peternakan", keywords: ["produk peternakan nasa", "viterna plus"], products: ["viterna-plus"] },
  // Herbal & Kesehatan
  { slug: "manfaat-propolis-nasa-untuk-imunitas", title: "Manfaat Super Nano Propolis NASA untuk Imunitas Tubuh", category: "herbal", keywords: ["propolis nasa", "super nano propolis"], products: ["super-nano-propolis"] },
  { slug: "lecithin-nasa-untuk-kesehatan-otak", title: "Natural Lecithin NASA: Manfaat untuk Otak dan Memori", category: "herbal", keywords: ["lecithin nasa", "natural lecithin"], products: ["natural-lecithin"] },
  { slug: "royal-jelly-nasa-untuk-stamina", title: "Royal Jelly NASA untuk Meningkatkan Stamina dan Vitalitas", category: "herbal", keywords: ["royal jelly nasa", "stamina nasa"], products: ["royal-jelly"] },
  { slug: "tangguh-probiotik-manfaat", title: "Tangguh Probiotik NASA: Manfaat untuk Pencernaan Sehat", category: "herbal", keywords: ["tangguh probiotik nasa", "probiotik nasa"], products: ["tangguh-probiotik"] },
  { slug: "tanya-jawab-kesehatan-nasa", title: "Tanya Jawab Kesehatan NASA: Produk untuk Stamina dan Vitalitas", category: "herbal", keywords: ["tanya jawab kesehatan nasa", "produk kesehatan nasa"], products: ["super-nano-propolis", "natural-lecithin", "royal-jelly"] },
  { slug: "amne-nasa-khasiat", title: "AMNE NASA: Khasiat dan Cara Konsumsi yang Benar", category: "herbal", keywords: ["amne nasa", "suplemen nasa"], products: ["amne"] },
  { slug: "natural-bvr-kesehatan-jantung", title: "Natural BVR NASA untuk Kesehatan Jantung dan Pembuluh Darah", category: "herbal", keywords: ["natural bvr nasa", "kesehatan jantung nasa"], products: ["natural-bvr"] },
  { slug: "honey-super-kids-nafsu-makan", title: "Honey Super Kids NASA: Mengatasi Anak Susah Makan", category: "herbal", keywords: ["honey super kids", "madu anak nasa"], products: ["honey-super-kids"] },
  { slug: "kopi-vitrex-manfaat", title: "Kopi VITREX NASA: Manfaat untuk Stamina dan Vitalitas Pria", category: "herbal", keywords: ["kopi vitrex nasa", "vitrex nasa"], products: ["kopi-vitrex"] },
  { slug: "beras-merah-nasa-khasiat", title: "Serbuk Beras Merah NASA: Khasiat untuk Diet dan Pencernaan", category: "herbal", keywords: ["beras merah nasa", "serbuk beras merah"], products: ["beras-merah"] },
  // Bodycare
  { slug: "manfaat-crystal-x-nasa", title: "Manfaat Crystal X NASA untuk Kesehatan Kewanitaan", category: "bodycare", keywords: ["crystal x nasa", "crystal x asli"], products: ["crystal-x"] },
  { slug: "cara-pakai-crystal-x", title: "Cara Pakai Crystal X NASA yang Benar dan Aman", category: "bodycare", keywords: ["cara pakai crystal x", "crystal x nasa"], products: ["crystal-x"] },
  { slug: "moreskin-cream-review", title: "MORESKIN Clean & Glow Cream NASA: Manfaat untuk Kulit Wajah", category: "bodycare", keywords: ["moreskin nasa", "krim wajah nasa"], products: ["moreskin-cream"] },
  { slug: "rose-v-nasa-khasiat", title: "ROSE-V NASA: Produk Perawatan Kewanitaan Herbal", category: "bodycare", keywords: ["rose v nasa", "perawatan kewanitaan nasa"], products: ["rose-v"] },
  { slug: "collagen-cleanser-nasa", title: "Collagen Facial Cleanser NASA untuk Kulit Kenyal dan Bersih", category: "bodycare", keywords: ["collagen cleanser nasa", "pembersih wajah nasa"], products: ["collagen-cleanser"] },
  // Homecare
  { slug: "pasta-gigi-nasa-manfaat", title: "Pasta Gigi NASA: Manfaat Herbal untuk Gigi dan Gusi Sehat", category: "homecare", keywords: ["pasta gigi nasa", "odol nasa"], products: ["pasta-gigi-nasa"] },
  { slug: "shanas-shampoo-manfaat", title: "SHANAS Shampoo 3 in 1 NASA: Manfaat untuk Rambut Sehat", category: "homecare", keywords: ["shanas shampoo nasa", "shampoo nasa"], products: ["shanas-shampoo"] },
  // Kemitraan & Umum
  { slug: "cara-daftar-mitra-nasa", title: "Cara Daftar Mitra NASA Rp 25.000: Panduan Lengkap 2025", category: "kemitraan", keywords: ["daftar mitra nasa", "mitra nasa 25000"], products: [] },
  { slug: "keuntungan-jadi-mitra-nasa", title: "Keuntungan Jadi Mitra NASA: Harga Distributor dan Komisi", category: "kemitraan", keywords: ["keuntungan mitra nasa", "bisnis nasa"], products: [] },
  { slug: "stockist-nasa-yogyakarta-terpercaya", title: "Stockist NASA Yogyakarta Terpercaya AB.720", category: "umum", keywords: ["stockist nasa yogyakarta", "distributor nasa jogja"], products: [] },
  { slug: "cara-membeli-produk-nasa-online", title: "Cara Membeli Produk NASA Online Aman dan Original", category: "umum", keywords: ["beli produk nasa online", "produk nasa original"], products: [] },
  { slug: "produk-nasa-untuk-pertanian-organik", title: "Produk NASA untuk Pertanian Organik: Panduan Pemula", category: "pertanian", keywords: ["pertanian organik nasa", "pupuk organik nasa"], products: ["poc-nasa", "pop-supernasa"] },
  { slug: "biopestisida-nasa-cara-pakai", title: "NASA Biopestisida: Cara Pakai untuk Kendalikan Hama Alami", category: "teknologi", keywords: ["biopestisida nasa", "pestisida hayati nasa"], products: ["nasa-biopestisida"] },
  { slug: "biofungisida-nasa-manfaat", title: "NASA Biofungisida: Solusi Jamur Tanaman Secara Alami", category: "teknologi", keywords: ["biofungisida nasa", "fungisida hayati"], products: ["nasa-biofungisida"] },
  { slug: "perbedaan-crystal-x-asli-dan-palsu", title: "Perbedaan Crystal X NASA Asli dan Palsu: Tips Memilih Stockist", category: "bodycare", keywords: ["crystal x asli", "crystal x palsu"], products: ["crystal-x"] },
  { slug: "poc-nasa-untuk-tanaman-jeruk", title: "POC NASA untuk Tanaman Jeruk: Buah Lebih Besar dan Manis", category: "pertanian", keywords: ["poc nasa jeruk", "pupuk jeruk organik"], products: ["poc-nasa", "power-nutrition"] },
  { slug: "viterna-plus-ayam-kampung", title: "Viterna Plus untuk Ayam Kampung: Bobot Naik, Sehat, Cepat Panen", category: "peternakan", keywords: ["viterna plus ayam kampung", "pakan ayam kampung"], products: ["viterna-plus"] },
  { slug: "propolis-nasa-untuk-anak", title: "Super Nano Propolis NASA untuk Anak: Manfaat dan Dosis Aman", category: "herbal", keywords: ["propolis nasa anak", "propolis untuk anak"], products: ["super-nano-propolis"] },
  { slug: "hormonik-nasa-untuk-bunga", title: "Hormonik NASA untuk Meningkatkan Pembungaan Tanaman", category: "pertanian", keywords: ["hormonik nasa bunga", "zat pengatur tumbuh nasa"], products: ["hormonik"] },
  { slug: "daftar-harga-produk-nasa-mitra", title: "Daftar Harga Produk NASA Harga Mitra vs Eceran", category: "kemitraan", keywords: ["harga produk nasa", "harga mitra nasa"], products: [] },
  { slug: "pengiriman-produk-nasa-ke-seluruh-indonesia", title: "Pengiriman Produk NASA ke Seluruh Indonesia dari Yogyakarta", category: "umum", keywords: ["pengiriman nasa", "order nasa online"], products: [] },
  { slug: "supernasa-granule-cara-pakai", title: "Supernasa Granule: Cara Pakai dan Manfaat untuk Tanaman", category: "pertanian", keywords: ["supernasa granule", "pupuk granule nasa"], products: ["supernasa-granule"] },
  { slug: "grece-deodoran-herbal-nasa", title: "GRECE Body Perspirant NASA: Deodoran Herbal Alami", category: "bodycare", keywords: ["grece nasa", "deodoran herbal nasa"], products: ["grece-body-perspirant"] },
  { slug: "natural-glio-khasiat", title: "Natural GLIO NASA: Khasiat Suplemen Herbal untuk Kesehatan", category: "herbal", keywords: ["natural glio nasa", "glio nasa"], products: ["natural-glio"] },
  { slug: "chlorella-soap-manfaat", title: "Chlorella Facial Soap NASA: Manfaat Sabun Wajah Herbal", category: "bodycare", keywords: ["chlorella soap nasa", "sabun wajah nasa"], products: ["chlorella-soap"] },
];

function makeContent(t) {
  const productLinks = t.products.length
    ? `\n\nProduk NASA yang relevan: ${t.products.map((p) => p.replace(/-/g, " ").toUpperCase()).join(", ")}. Hubungi Stockist NASA AB.720 Yogyakarta via WhatsApp 081328975345 untuk pemesanan produk original.`
    : "";

  return `${t.title} - panduan lengkap dari Stockist NASA resmi AB.720 Yogyakarta.

Produk PT Natural Nusantara (NASA) telah dipercaya masyarakat Indonesia selama puluhan tahun untuk kebutuhan pertanian, peternakan, kesehatan, dan perawatan tubuh. Sebagai stockist resmi NASA di Yogyakarta, kami menyediakan produk original dengan harga mitra dan pengiriman ke seluruh Indonesia.

${t.category === "pertanian" ? "Dalam dunia pertanian modern, pupuk organik menjadi pilihan utama petani yang ingin hasil panen optimal tanpa merusak lingkungan. POC NASA, Hormonik, Green Star, dan produk pertanian NASA lainnya telah membantu ribuan petani di Indonesia meningkatkan produktivitas lahan mereka." : ""}${t.category === "peternakan" ? "Peternak di seluruh Indonesia telah merasakan manfaat Viterna Plus dan produk peternakan NASA lainnya. Nutrisi organik ini membantu meningkatkan nafsu makan ternak, pertumbuhan, dan kesehatan ternak secara alami." : ""}${t.category === "herbal" ? "Produk herbal NASA seperti Super Nano Propolis, Natural Lecithin, dan Royal Jelly membantu menjaga kesehatan tubuh secara alami. Bahan-bahan alami pilihan diproses dengan standar kualitas tinggi PT Natural Nusantara." : ""}${t.category === "bodycare" ? "Produk bodycare NASA seperti Crystal X, MORESKIN, dan ROSE-V menggunakan bahan herbal alami yang aman untuk perawatan rutin. Produk-produk ini telah menjadi favorit jutaan wanita Indonesia." : ""}${t.category === "kemitraan" ? "Bergabung sebagai mitra NASA hanya dengan biaya pendaftaran Rp 25.000 sekali bayar. Anda langsung mendapatkan harga distributor yang 30-40% lebih murah dari harga eceran, tanpa target penjualan dan tanpa biaya bulanan." : ""}${t.category === "umum" ? "Membeli produk NASA dari stockist resmi menjamin keaslian produk dan mendapatkan pendampingan langsung. Stockist NASA AB.720 Yogyakarta melayani pemesanan via WhatsApp dengan pengiriman ke seluruh Indonesia." : ""}

## Tips Praktis

1. Pastikan membeli dari stockist resmi NASA untuk menjamin keaslian produk
2. Konsultasikan dosis dan cara pakai sesuai kebutuhan Anda
3. Gunakan produk secara rutin dan konsisten untuk hasil optimal
4. Kombinasikan produk NASA yang sesuai untuk hasil maksimal
5. Simpan produk di tempat sejuk dan kering

## Mengapa Membeli dari Stockist NASA AB.720 Yogyakarta?

- Stockist resmi PT Natural Nusantara kode AB.720
- Produk 100% original bergaransi keaslian
- Harga mitra untuk member NASA
- Konsultasi gratis via WhatsApp
- Pengiriman ke seluruh Indonesia
- Melayani pembelian eceran dan partai besar${productLinks}

Hubungi kami di WhatsApp 081328975345 untuk konsultasi gratis dan pemesanan produk NASA original.`;
}

const articles = articleTemplates.map((t, i) => {
  const date = new Date(2025, 0, 1 + i);
  return {
    slug: t.slug,
    title: t.title,
    excerpt: `${t.title}. Panduan lengkap produk NASA original dari Stockist AB.720 Yogyakarta. Konsultasi & pemesanan WA 081328975345.`,
    content: makeContent(t),
    category: t.category,
    keywords: t.keywords,
    relatedProducts: t.products,
    faq: [
      {
        question: `Di mana bisa beli ${t.keywords[0]} original?`,
        answer: `Beli dari Stockist NASA resmi AB.720 Yogyakarta via WhatsApp 081328975345. Produk original dengan pengiriman seluruh Indonesia.`,
      },
      {
        question: "Apakah produk NASA di stockistnasa.id original?",
        answer: "Ya, 100% original dari PT Natural Nusantara. Stockist resmi kode AB.720.",
      },
      {
        question: "Berapa ongkir pengiriman produk NASA?",
        answer: "Ongkir disesuaikan dengan lokasi tujuan. Hubungi WA 081328975345 untuk info ongkir.",
      },
    ],
    publishedAt: date.toISOString().split("T")[0],
  };
});

const file = `import type { Article } from "@/lib/types";

export const articles: Article[] = ${JSON.stringify(articles, null, 2)};

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getRecentArticles(limit = 6): Article[] {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
`;

fs.writeFileSync(out, file);
console.log(`Generated ${articles.length} articles`);
