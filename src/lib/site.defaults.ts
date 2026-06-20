export const siteConfig = {
  name: "Stockist NASA",
  domain: "https://stockistnasa.id",
  title: "Stockist NASA AB.720 Yogyakarta | Produk Original PT Natural Nusantara",
  description:
    "Stockist resmi NASA AB.720 Yogyakarta. Produk pupuk organik, herbal, peternakan & bodycare original. Harga mitra, pengiriman seluruh Indonesia. WA 081328975345.",
  stockistCode: "720",
  stockistLabel: "AB.720",
  city: "Yogyakarta",
  region: "DI Yogyakarta",
  phone: "081328975345",
  phoneIntl: "6281328975345",
  whatsappUrl: "https://wa.me/6281328975345",
  email: "info@stockistnasa.id",
  address: "Yogyakarta, DI Yogyakarta, Indonesia",
  shipping: "Seluruh Indonesia",
  memberFee: 25000,
  stats: {
    years: "10+",
    productsSold: "50 rb+",
    original: "100%",
  },
} as const;

export const categories = [
  {
    slug: "pertanian",
    name: "Pertanian",
    description: "Pupuk organik & nutrisi tanaman NASA",
    icon: "sprout",
  },
  {
    slug: "peternakan",
    name: "Peternakan",
    description: "Nutrisi ternak ayam, kambing, sapi & ikan",
    icon: "beef",
  },
  {
    slug: "herbal",
    name: "Herbal & Kesehatan",
    description: "Suplemen & produk kesehatan alami",
    icon: "heart-pulse",
  },
  {
    slug: "bodycare",
    name: "Bodycare",
    description: "Perawatan tubuh & kewanitaan",
    icon: "sparkles",
  },
  {
    slug: "homecare",
    name: "Home Care",
    description: "Produk perawatan rumah tangga",
    icon: "home",
  },
  {
    slug: "teknologi",
    name: "Agroteknologi",
    description: "Inovasi teknologi pertanian NASA",
    icon: "cpu",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type ArticleCategory = CategorySlug | "kemitraan" | "umum";
