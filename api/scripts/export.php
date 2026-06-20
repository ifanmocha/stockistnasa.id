#!/usr/bin/env php
<?php

declare(strict_types=1);

$root = dirname(__DIR__, 2);
$config = require $root . '/api/config.php';
require_once $root . '/api/lib/Database.php';

if (!class_exists('JsonHelper')) {
    final class JsonHelper
    {
        public static function decode(?string $json, mixed $default = []): mixed
        {
            if ($json === null || $json === '') return $default;
            $decoded = json_decode($json, true);
            return json_last_error() === JSON_ERROR_NONE ? $decoded : $default;
        }
    }
}

Database::migrate();
$pdo = Database::connection();
$exportDir = $config['export_path'];
if (!is_dir($exportDir)) mkdir($exportDir, 0755, true);

$products = array_map(function ($row) {
    return [
        'slug' => $row['slug'],
        'name' => $row['name'],
        'category' => $row['category'],
        'shortDescription' => $row['short_description'],
        'description' => $row['description'],
        'benefits' => JsonHelper::decode($row['benefits'], []),
        'usage' => $row['usage'],
        'faq' => JsonHelper::decode($row['faq'], []),
        'image' => $row['image'] ?: '/products/' . $row['slug'] . '.svg',
        'featured' => (bool) $row['featured'],
        'seo' => [
            'title' => $row['seo_title'],
            'description' => $row['seo_description'],
            'keywords' => JsonHelper::decode($row['seo_keywords'], []),
            'robots' => $row['robots'],
            'sitemapPriority' => (float) $row['sitemap_priority'],
            'sitemapChangefreq' => $row['sitemap_changefreq'],
        ],
        'aiSummary' => $row['ai_summary'],
    ];
}, $pdo->query('SELECT * FROM products ORDER BY name')->fetchAll());

$articles = array_map(function ($row) {
    return [
        'slug' => $row['slug'],
        'title' => $row['title'],
        'excerpt' => $row['excerpt'],
        'content' => $row['content'],
        'category' => $row['category'],
        'keywords' => JsonHelper::decode($row['keywords'], []),
        'relatedProducts' => JsonHelper::decode($row['related_products'], []),
        'faq' => JsonHelper::decode($row['faq'], []),
        'publishedAt' => $row['published_at'],
        'seo' => [
            'title' => $row['seo_title'],
            'description' => $row['seo_description'],
            'focusKeyword' => $row['focus_keyword'],
            'robots' => $row['robots'],
            'sitemapPriority' => (float) $row['sitemap_priority'],
            'sitemapChangefreq' => $row['sitemap_changefreq'],
        ],
        'aiSummary' => $row['ai_summary'],
        'aiKeyFacts' => JsonHelper::decode($row['ai_key_facts'], []),
    ];
}, $pdo->query('SELECT * FROM articles ORDER BY published_at DESC')->fetchAll());

$settings = [];
foreach ($pdo->query('SELECT key, value FROM site_settings')->fetchAll() as $row) {
    $settings[$row['key']] = $row['value'];
}

$seoGlobal = $pdo->query('SELECT * FROM seo_global WHERE id = 1')->fetch() ?: [];
$seoAi = $pdo->query('SELECT * FROM seo_ai WHERE id = 1')->fetch() ?: [];

$seo = [
    'global' => [
        'metaTitle' => $seoGlobal['meta_title'] ?? '',
        'metaDescription' => $seoGlobal['meta_description'] ?? '',
        'ogImage' => $seoGlobal['og_image'] ?? '',
        'robots' => $seoGlobal['robots'] ?? 'index,follow',
        'googleVerification' => $seoGlobal['google_verification'] ?? '',
        'jsonLdExtra' => $seoGlobal['json_ld_extra'] ?? '',
    ],
    'ai' => [
        'llmsTxt' => $seoAi['llms_txt'] ?? '',
        'aiSiteSummary' => $seoAi['ai_site_summary'] ?? '',
        'aiBrandFacts' => $seoAi['ai_brand_facts'] ?? '',
    ],
];

$testimonials = array_map(fn ($r) => [
    'name' => $r['name'],
    'role' => $r['role'],
    'quote' => $r['quote'],
    'product' => $r['product'],
], $pdo->query('SELECT * FROM testimonials ORDER BY sort_order, id')->fetchAll());

$write = fn ($file, $data) => file_put_contents(
    $exportDir . '/' . $file,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
);

$write('products.json', $products);
$write('articles.json', $articles);
$write('site.json', $settings);
$write('seo.json', $seo);
$write('testimonials.json', $testimonials);

if (!empty($seoAi['llms_txt'])) {
    file_put_contents($exportDir . '/llms.txt', $seoAi['llms_txt']);
}

$pdo->prepare('INSERT INTO publish_log (note) VALUES (?)')->execute(['CLI export']);

echo "✓ Exported to {$exportDir}\n";
echo "  products: " . count($products) . "\n";
echo "  articles: " . count($articles) . "\n";
