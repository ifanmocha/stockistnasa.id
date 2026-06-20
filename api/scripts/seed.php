#!/usr/bin/env php
<?php

declare(strict_types=1);

/**
 * Initialize CMS database with seed data from cms/seed/*.json
 * Usage: php api/scripts/seed.php
 */

$root = dirname(__DIR__, 2);
require_once $root . '/api/lib/Database.php';

Database::migrate();
$pdo = Database::connection();

// Admin user: ifanmocha / makanmakan
$hash = password_hash('makanmakan', PASSWORD_BCRYPT);
$pdo->prepare('INSERT OR IGNORE INTO users (username, password_hash) VALUES (?,?)')->execute(['ifanmocha', $hash]);

$seedDir = $root . '/cms/seed';
if (!is_dir($seedDir)) {
    echo "Seed folder not found. Run: npm run cms:dump-seed\n";
    exit(1);
}

function loadJson(string $path): array
{
    return json_decode(file_get_contents($path), true) ?? [];
}

// Site settings
$site = loadJson($seedDir . '/site.json');
$stmt = $pdo->prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?,?)');
foreach ($site as $k => $v) {
    $stmt->execute([$k, is_string($v) ? $v : json_encode($v)]);
}

// SEO global
$seo = loadJson($seedDir . '/seo.json');
$pdo->prepare(
    'INSERT OR REPLACE INTO seo_global (id, meta_title, meta_description, og_image, robots, google_verification, json_ld_extra) VALUES (1,?,?,?,?,?,?)'
)->execute([
    $seo['global']['metaTitle'] ?? '',
    $seo['global']['metaDescription'] ?? '',
    $seo['global']['ogImage'] ?? '',
    $seo['global']['robots'] ?? 'index,follow',
    $seo['global']['googleVerification'] ?? '',
    $seo['global']['jsonLdExtra'] ?? '',
]);
$pdo->prepare(
    'INSERT OR REPLACE INTO seo_ai (id, llms_txt, ai_site_summary, ai_brand_facts) VALUES (1,?,?,?)'
)->execute([
    $seo['ai']['llmsTxt'] ?? '',
    $seo['ai']['aiSiteSummary'] ?? '',
    $seo['ai']['aiBrandFacts'] ?? '',
]);

// Products
$pdo->exec('DELETE FROM products');
$products = loadJson($seedDir . '/products.json');
$pStmt = $pdo->prepare(
    'INSERT INTO products (slug, name, category, short_description, description, benefits, usage, faq, image, featured, seo_title, seo_description, seo_keywords, ai_summary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
);
foreach ($products as $p) {
    $pStmt->execute([
        $p['slug'],
        $p['name'],
        $p['category'],
        $p['shortDescription'] ?? '',
        $p['description'] ?? '',
        json_encode($p['benefits'] ?? [], JSON_UNESCAPED_UNICODE),
        $p['usage'] ?? '',
        json_encode($p['faq'] ?? [], JSON_UNESCAPED_UNICODE),
        $p['image'] ?? '',
        !empty($p['featured']) ? 1 : 0,
        $p['seo']['title'] ?? $p['name'] ?? '',
        $p['seo']['description'] ?? $p['shortDescription'] ?? '',
        json_encode($p['seo']['keywords'] ?? $p['keywords'] ?? [], JSON_UNESCAPED_UNICODE),
        $p['aiSummary'] ?? $p['shortDescription'] ?? '',
    ]);
}

// Articles
$pdo->exec('DELETE FROM articles');
$articles = loadJson($seedDir . '/articles.json');
$aStmt = $pdo->prepare(
    'INSERT INTO articles (slug, title, excerpt, content, category, keywords, related_products, faq, published_at, seo_title, seo_description, focus_keyword, ai_summary, ai_key_facts) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
);
foreach ($articles as $a) {
    $aStmt->execute([
        $a['slug'],
        $a['title'],
        $a['excerpt'] ?? '',
        $a['content'] ?? '',
        $a['category'] ?? 'umum',
        json_encode($a['keywords'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($a['relatedProducts'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($a['faq'] ?? [], JSON_UNESCAPED_UNICODE),
        $a['publishedAt'] ?? date('Y-m-d'),
        $a['seo']['title'] ?? $a['title'] ?? '',
        $a['seo']['description'] ?? $a['excerpt'] ?? '',
        $a['seo']['focusKeyword'] ?? ($a['keywords'][0] ?? ''),
        $a['aiSummary'] ?? $a['excerpt'] ?? '',
        json_encode($a['aiKeyFacts'] ?? [], JSON_UNESCAPED_UNICODE),
    ]);
}

// Testimonials
$pdo->exec('DELETE FROM testimonials');
$testimonials = loadJson($seedDir . '/testimonials.json');
$tStmt = $pdo->prepare('INSERT INTO testimonials (name, role, quote, product, sort_order) VALUES (?,?,?,?,?)');
foreach ($testimonials as $i => $t) {
    $tStmt->execute([$t['name'], $t['role'] ?? '', $t['quote'], $t['product'] ?? '', $i]);
}

echo "✓ Database seeded successfully\n";
echo "  Admin: ifanmocha / makanmakan\n";
echo "  Products: " . count($products) . "\n";
echo "  Articles: " . count($articles) . "\n";
