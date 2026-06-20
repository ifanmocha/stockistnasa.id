#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> 1/6 Regenerate articles..."
node scripts/generate-articles.mjs
node scripts/generate-products.mjs

echo "==> 2/6 Dump seed from current data..."
npx tsx scripts/dump-seed.ts

echo "==> 3/6 Initialize database..."
php api/scripts/seed.php

echo "==> 4/6 Export CMS to JSON..."
php api/scripts/export.php

echo "==> 5/6 Restore CMS re-exports..."
cat > src/data/products.ts <<'EOF'
export {
  products,
  getProduct,
  getFeaturedProducts,
  getProductsByCategory,
} from "./cms";
EOF
cat > src/data/articles.ts <<'EOF'
export {
  articles,
  getArticle,
  getRecentArticles,
  getArticlesByCategory,
} from "./cms";
EOF

echo "==> 6/6 Sync llms.txt to public..."
if [ -f cms-export/llms.txt ]; then
  cp cms-export/llms.txt public/llms.txt
fi

echo "==> Done! Run: npm run publish"
