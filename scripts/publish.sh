#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Export CMS..."
php api/scripts/export.php

if [ -f cms-export/llms.txt ]; then
  cp cms-export/llms.txt public/llms.txt
fi

echo "==> Building site..."
npm run build

if [ -d admin/dist ]; then
  echo "==> Copying admin panel..."
  rm -rf out/admin
  mkdir -p out/admin
  cp -r admin/dist/* out/admin/
  cp admin/public/.htaccess out/admin/.htaccess 2>/dev/null || true
fi

echo "==> Deploying to HawkHost..."
rsync -avz --delete --exclude '.well-known' -e ssh out/ hawkhost:stockistnasa.id/
rsync -avz --exclude 'scripts' -e ssh api/ hawkhost:stockistnasa.id/api/
ssh hawkhost "mkdir -p cms-data cms-export && chmod 750 cms-data"

# Sync database (preserve server edits)
rsync -avz -e ssh cms-data/stockistnasa.db hawkhost:cms-data/stockistnasa.db 2>/dev/null || true

echo "==> Done! https://stockistnasa.id"
echo "    Admin: https://stockistnasa.id/admin/"
