/**
 * Dump existing data into cms/seed/*.json for CMS initialization.
 * Run: npx tsx scripts/dump-seed.ts
 */
import fs from "node:fs";
import path from "node:path";
import productCatalog from "./product-catalog.mjs";
import { articles } from "../src/data/articles";
import { testimonials } from "../src/data/testimonials.source";
import { siteConfig } from "../src/lib/site.defaults";

const seedDir = path.join(process.cwd(), "cms/seed");
fs.mkdirSync(seedDir, { recursive: true });

const site = {
  name: siteConfig.name,
  domain: siteConfig.domain,
  title: siteConfig.title,
  description: siteConfig.description,
  stockistCode: siteConfig.stockistCode,
  stockistLabel: siteConfig.stockistLabel,
  city: siteConfig.city,
  region: siteConfig.region,
  phone: siteConfig.phone,
  phoneIntl: siteConfig.phoneIntl,
  whatsappUrl: siteConfig.whatsappUrl,
  email: siteConfig.email,
  address: siteConfig.address,
  shipping: siteConfig.shipping,
  memberFee: String(siteConfig.memberFee),
};

const llmsPath = path.join(process.cwd(), "public/llms.txt");
const llmsTxt = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, "utf8") : "";

const seo = {
  global: {
    metaTitle: siteConfig.title,
    metaDescription: siteConfig.description,
    ogImage: `${siteConfig.domain}/og-image.png`,
    robots: "index,follow",
    googleVerification: "",
    jsonLdExtra: "",
  },
  ai: {
    llmsTxt,
    aiSiteSummary:
      "Stockist NASA resmi AB.720 Yogyakarta. Menjual produk PT Natural Nusantara original: pupuk organik, herbal, peternakan, bodycare. Pengiriman seluruh Indonesia. WhatsApp 081328975345.",
    aiBrandFacts: JSON.stringify(
      {
        business: "Stockist resmi PT Natural Nusantara",
        stockistCode: "AB.720",
        location: "Yogyakarta, Indonesia",
        phone: "081328975345",
        services: ["penjualan produk", "pendaftaran mitra", "konsultasi gratis"],
      },
      null,
      2,
    ),
  },
};

const articleExport = articles.map((a) => ({
  ...a,
  seo: {
    title: a.title,
    description: a.excerpt,
    focusKeyword: a.keywords[0] ?? "",
  },
  aiSummary: a.excerpt,
  aiKeyFacts: [
    "Stockist NASA AB.720 Yogyakarta",
    "WhatsApp: 081328975345",
    "Produk original PT Natural Nusantara",
  ],
}));

fs.writeFileSync(path.join(seedDir, "site.json"), JSON.stringify(site, null, 2));
fs.writeFileSync(path.join(seedDir, "seo.json"), JSON.stringify(seo, null, 2));
fs.writeFileSync(path.join(seedDir, "products.json"), JSON.stringify(productCatalog, null, 2));
fs.writeFileSync(path.join(seedDir, "articles.json"), JSON.stringify(articleExport, null, 2));
fs.writeFileSync(path.join(seedDir, "testimonials.json"), JSON.stringify(testimonials, null, 2));

console.log(`✓ Seed JSON written to ${seedDir}`);
