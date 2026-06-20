import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slugs = [
  "poc-nasa", "hormonik", "green-star", "pop-supernasa", "supernasa-granule",
  "power-nutrition", "viterna-plus", "ton-pupuk-tambak", "crystal-x",
  "super-nano-propolis", "natural-lecithin", "royal-jelly", "amne",
  "tangguh-probiotik", "natural-bvr", "natural-glio", "honey-super-kids",
  "pasta-gigi-nasa", "shanas-shampoo", "grece-body-perspirant", "rose-v",
  "moreskin-cream", "collagen-cleanser", "chlorella-soap", "quwless",
  "beras-merah", "kopi-vitrex", "nasa-biopestisida", "nasa-biofungisida",
];

const names = {
  "poc-nasa": "POC NASA", "hormonik": "Hormonik", "green-star": "Green Star",
  "pop-supernasa": "POP Supernasa", "supernasa-granule": "Supernasa Granule",
  "power-nutrition": "Power Nutrition", "viterna-plus": "Viterna Plus",
  "ton-pupuk-tambak": "TON Tambak", "crystal-x": "Crystal X",
  "super-nano-propolis": "Propolis", "natural-lecithin": "Lecithin",
  "royal-jelly": "Royal Jelly", "amne": "AMNE", "tangguh-probiotik": "Probiotik",
  "natural-bvr": "Natural BVR", "natural-glio": "Natural GLIO",
  "honey-super-kids": "Honey Kids", "pasta-gigi-nasa": "Pasta Gigi",
  "shanas-shampoo": "SHANAS", "grece-body-perspirant": "GRECE", "rose-v": "ROSE-V",
  "moreskin-cream": "MORESKIN", "collagen-cleanser": "Collagen",
  "chlorella-soap": "Chlorella", "quwless": "QUWLESS", "beras-merah": "Beras Merah",
  "kopi-vitrex": "VITREX", "nasa-biopestisida": "Biopestisida",
  "nasa-biofungisida": "Biofungisida",
};

const dir = path.join(root, "public", "products");
fs.mkdirSync(dir, { recursive: true });

for (const slug of slugs) {
  const name = names[slug] || slug;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#CCFBF1"/>
      <stop offset="50%" style="stop-color:#E0F2FE"/>
      <stop offset="100%" style="stop-color:#FFEDD5"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)" rx="28"/>
  <circle cx="200" cy="140" r="80" fill="#0D9488" opacity="0.1"/>
  <rect x="115" y="95" width="170" height="190" rx="20" fill="rgba(255,255,255,0.7)" stroke="rgba(13,148,136,0.3)" stroke-width="2"/>
  <rect x="135" y="115" width="130" height="90" rx="12" fill="rgba(249,115,22,0.12)"/>
  <text x="200" y="315" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#0F766E">${name}</text>
  <text x="200" y="340" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F97316">NASA Original</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${slug}.svg`), svg);
}

console.log(`Generated ${slugs.length} product images`);
