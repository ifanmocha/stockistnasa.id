# Stockist NASA AB.720 Yogyakarta - stockistnasa.id

Website katalog produk NASA dengan keranjang WhatsApp, 55+ artikel SEO, dan landing page mitra.

Repo: https://github.com/ifanmocha/stockistnasa.id

## Tech Stack

- Next.js 16 (static export)
- Tailwind CSS 4
- Deploy ke HawkHost (`public_html`)

## Development

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `out/`. Upload seluruh isi folder `out/` ke `public_html` di HawkHost via FTP atau File Manager cPanel.

## Deploy ke HawkHost

```bash
./scripts/deploy.sh
```

Script ini akan `npm run build` lalu upload ke `hawkhost:stockistnasa.id/` via rsync SSH.

Manual (jika perlu):

1. `npm run build`
2. `rsync -avz --delete --exclude '.well-known' -e ssh out/ hawkhost:stockistnasa.id/`

Backup coming soon lama ada di server: `~/backups/stockistnasa-comingsoon-20250620/`

## Google Search Console (setelah deploy)

1. Buka https://search.google.com/search-console
2. Tambah property: `https://stockistnasa.id`
3. Verifikasi via DNS atau file HTML (pilih yang termudah)
4. Submit sitemap: `https://stockistnasa.id/sitemap.xml`
5. Minta indeks untuk halaman utama

## Google Business Profile

1. Buka https://business.google.com
2. Daftarkan: Stockist NASA AB.720, Yogyakarta
3. Isi WA 081328975345 dan link website stockistnasa.id

## Regenerate Konten

```bash
# Generate ulang gambar produk SVG
node scripts/generate-products.mjs

# Generate ulang artikel SEO
node scripts/generate-articles.mjs

npm run build
```

## Info Bisnis

- Stockist: AB.720 Yogyakarta
- WhatsApp: 081328975345
- Domain: stockistnasa.id

## Struktur Halaman

| Halaman | URL |
|---------|-----|
| Beranda | `/` |
| Katalog | `/produk/` |
| Kategori | `/kategori/[slug]/` |
| Artikel | `/artikel/` |
| Mitra | `/mitra/` |
| Kontak | `/kontak/` |
| Keranjang | `/keranjang/` |
| Lokasi | `/stockist-nasa-yogyakarta/` |
