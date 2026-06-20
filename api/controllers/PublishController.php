<?php

declare(strict_types=1);

final class PublishController
{
    public static function export(): void
    {
        $config = require dirname(__DIR__) . '/config.php';
        $exportDir = $config['export_path'];
        if (!is_dir($exportDir)) {
            mkdir($exportDir, 0755, true);
        }

        $pdo = Database::connection();

        // Products
        $products = array_map(
            fn ($row) => self::exportProduct($row),
            $pdo->query('SELECT * FROM products ORDER BY name')->fetchAll()
        );
        file_put_contents($exportDir . '/products.json', json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        // Articles
        $articles = array_map(
            fn ($row) => self::exportArticle($row),
            $pdo->query('SELECT * FROM articles ORDER BY published_at DESC')->fetchAll()
        );
        file_put_contents($exportDir . '/articles.json', json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        // Site settings
        $settings = [];
        foreach ($pdo->query('SELECT key, value FROM site_settings')->fetchAll() as $row) {
            $settings[$row['key']] = $row['value'];
        }
        file_put_contents($exportDir . '/site.json', json_encode($settings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        // SEO
        $seoGlobal = $pdo->query('SELECT * FROM seo_global WHERE id = 1')->fetch() ?: [];
        $seoAi = $pdo->query('SELECT * FROM seo_ai WHERE id = 1')->fetch() ?: [];
        file_put_contents($exportDir . '/seo.json', json_encode([
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
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        // Testimonials
        $testimonials = array_map(fn ($r) => [
            'name' => $r['name'],
            'role' => $r['role'],
            'quote' => $r['quote'],
            'product' => $r['product'],
        ], $pdo->query('SELECT * FROM testimonials ORDER BY sort_order, id')->fetchAll());
        file_put_contents($exportDir . '/testimonials.json', json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        // llms.txt for live site
        $llms = $seoAi['llms_txt'] ?? '';
        if ($llms) {
            file_put_contents($exportDir . '/llms.txt', $llms);
        }

        $pdo->prepare('INSERT INTO publish_log (note) VALUES (?)')->execute(['Export JSON']);

        Response::json([
            'ok' => true,
            'exportPath' => $exportDir,
            'files' => ['products.json', 'articles.json', 'site.json', 'seo.json', 'testimonials.json', 'llms.txt'],
            'message' => 'Export berhasil. Jalankan npm run publish untuk rebuild & deploy situs.',
        ]);
    }

    private static function exportProduct(array $row): array
    {
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
    }

    private static function exportArticle(array $row): array
    {
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
    }
}
