/**
 * Build minimal products seed from catalog metadata (used before full CMS export exists).
 */
import fs from "node:fs";
import path from "node:path";

const catalog = [
  { slug: "poc-nasa", name: "POC NASA", category: "pertanian", featured: true, short: "Pupuk organik cair untuk semua jenis tanaman" },
  { slug: "hormonik", name: "Hormonik NASA", category: "pertanian", featured: true, short: "Zat pengatur tumbuh alami untuk tanaman" },
  { slug: "green-star", name: "Green Star NASA", category: "pertanian", short: "Pupuk daun organik untuk tanaman" },
  { slug: "pop-supernasa", name: "POP Supernasa", category: "pertanian", short: "Pupuk organik padat untuk tanaman" },
  { slug: "supernasa-granule", name: "Supernasa Granule", category: "pertanian", short: "Pupuk granule organik NASA" },
  { slug: "power-nutrition", name: "Power Nutrition NASA", category: "pertanian", short: "Nutrisi lengkap untuk tanaman buah" },
  { slug: "viterna-plus", name: "Viterna Plus", category: "peternakan", featured: true, short: "Nutrisi organik untuk ternak sehat" },
  { slug: "ton-pupuk-tambak", name: "TON Pupuk Tambak NASA", category: "peternakan", short: "Pupuk organik untuk budidaya tambak" },
  { slug: "crystal-x", name: "Crystal X NASA", category: "bodycare", featured: true, short: "Perawatan kewanitaan herbal alami" },
  { slug: "super-nano-propolis", name: "Super Nano Propolis", category: "herbal", featured: true, short: "Propolis nano untuk daya tahan tubuh" },
  { slug: "natural-lecithin", name: "Natural Lecithin NASA", category: "herbal", short: "Suplemen lecithin untuk kesehatan" },
  { slug: "royal-jelly", name: "Royal Jelly NASA", category: "herbal", short: "Royal jelly untuk stamina dan vitalitas" },
  { slug: "amne", name: "AMNE NASA", category: "herbal", short: "Suplemen herbal NASA" },
  { slug: "tangguh-probiotik", name: "Tangguh Probiotik NASA", category: "herbal", short: "Probiotik untuk kesehatan pencernaan" },
  { slug: "natural-bvr", name: "Natural BVR NASA", category: "herbal", short: "Suplemen herbal untuk kesehatan" },
  { slug: "natural-glio", name: "Natural GLIO NASA", category: "herbal", short: "Suplemen herbal alami NASA" },
  { slug: "honey-super-kids", name: "Honey Super Kids NASA", category: "herbal", short: "Madu herbal untuk anak" },
  { slug: "pasta-gigi-nasa", name: "Pasta Gigi NASA", category: "bodycare", short: "Pasta gigi herbal alami" },
  { slug: "shanas-shampoo", name: "SHANAS Shampoo NASA", category: "bodycare", short: "Shampoo herbal perawatan rambut" },
  { slug: "grece-body-perspirant", name: "GRECE Body Perspirant NASA", category: "bodycare", short: "Deodoran herbal alami" },
  { slug: "rose-v", name: "ROSE-V NASA", category: "bodycare", short: "Perawatan kewanitaan herbal" },
  { slug: "moreskin-cream", name: "MORESKIN Cream NASA", category: "bodycare", short: "Krim perawatan kulit" },
  { slug: "collagen-cleanser", name: "Collagen Cleanser NASA", category: "bodycare", short: "Pembersih wajah collagen" },
  { slug: "chlorella-soap", name: "Chlorella Facial Soap NASA", category: "bodycare", short: "Sabun wajah chlorella herbal" },
  { slug: "quwless", name: "QUWLESS NASA", category: "herbal", short: "Suplemen herbal NASA" },
  { slug: "beras-merah", name: "Beras Merah NASA", category: "herbal", short: "Beras merah organik kesehatan" },
  { slug: "kopi-vitrex", name: "Kopi VITREX NASA", category: "herbal", short: "Kopi herbal kesehatan" },
  { slug: "nasa-biopestisida", name: "NASA Biopestisida", category: "teknologi", short: "Biopestisida ramah lingkungan" },
  { slug: "nasa-biofungisida", name: "NASA Biofungisida", category: "teknologi", short: "Biofungisida organik NASA" },
];

const products = catalog.map((c) => ({
  slug: c.slug,
  name: c.name,
  category: c.category,
  shortDescription: c.short,
  description: `${c.name} adalah produk original PT Natural Nusantara (NASA). ${c.short}. Tersedia di Stockist NASA resmi AB.720 Yogyakarta dengan pengiriman ke seluruh Indonesia.`,
  benefits: [
    "Produk 100% original PT NASA",
    "Harga mitra tersedia",
    "Konsultasi gratis via WhatsApp",
  ],
  usage: "Konsultasikan dosis dan cara pakai dengan stockist NASA AB.720 via WhatsApp 081328975345.",
  faq: [
    {
      question: `Apakah ${c.name} original?`,
      answer: "Ya, 100% original dari PT Natural Nusantara. Stockist resmi AB.720 Yogyakarta.",
    },
    {
      question: "Bagaimana cara pesan?",
      answer: "Hubungi WhatsApp 081328975345 untuk pemesanan dan konsultasi gratis.",
    },
  ],
  image: `/products/${c.slug}.svg`,
  featured: Boolean(c.featured),
  seo: {
    title: `${c.name} Original | Stockist AB.720 Yogyakarta`,
    description: c.short,
    keywords: [c.name.toLowerCase(), c.category, "nasa", "stockist nasa"],
  },
  aiSummary: `${c.name}: ${c.short}. Tersedia di Stockist NASA AB.720 Yogyakarta. WA 081328975345.`,
}));

export default products;
