# stockistnasa.id

Landing page resmi **Stockist NASA AB.720** — static HTML + Tailwind CSS.

## Stack

- HTML5, [Tailwind CSS](https://tailwindcss.com/) (CDN)
- JavaScript vanilla (progress bar, countdown)
- Apache `.htaccess` (security headers, HTTPS, www → apex)

## Lokal

Buka `index.html` di browser, atau serve dengan Herd/php:

```bash
cd sites/stockistnasa.id
python3 -m http.server 8080
```

## Deploy ke HawkHost

```bash
# Dari repo hawkhost-web
bash sites/stockistnasa.id/scripts/deploy.sh

# Atau setup lengkap (cPanel addon + Cloudflare DNS + security)
bash scripts/setup-stockistnasa-id.sh
```

Production path: `/home/stockis2/stockistnasa.id`

## DNS & subdomain lain

| Host | Target | Keterangan |
|------|--------|------------|
| `stockistnasa.id` | HawkHost | Landing (repo ini) |
| `www.stockistnasa.id` | HawkHost → redirect apex | |
| `mitra.stockistnasa.id` | Nevacloud VPS | App NASA (repo terpisah) |

## Repo

https://github.com/ifanmocha/stockistnasa.id
