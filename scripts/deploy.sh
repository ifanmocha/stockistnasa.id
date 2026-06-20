#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building..."
npm run build

echo "==> Deploying to HawkHost (stockistnasa.id)..."
rsync -avz --delete --exclude '.well-known' -e ssh out/ hawkhost:stockistnasa.id/

echo "==> Done! https://stockistnasa.id"
