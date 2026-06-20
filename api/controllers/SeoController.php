<?php

declare(strict_types=1);

final class SeoController
{
    public static function getGlobal(): void
    {
        $row = Database::connection()->query('SELECT * FROM seo_global WHERE id = 1')->fetch();
        if (!$row) {
            Response::json([
                'metaTitle' => '',
                'metaDescription' => '',
                'ogImage' => '',
                'robots' => 'index,follow',
                'googleVerification' => '',
                'jsonLdExtra' => '',
            ]);
        }
        Response::json(self::formatGlobal($row));
    }

    public static function updateGlobal(array $body): void
    {
        $pdo = Database::connection();
        $pdo->prepare(
            'INSERT INTO seo_global (id, meta_title, meta_description, og_image, robots, google_verification, json_ld_extra)
             VALUES (1,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
               meta_title=excluded.meta_title,
               meta_description=excluded.meta_description,
               og_image=excluded.og_image,
               robots=excluded.robots,
               google_verification=excluded.google_verification,
               json_ld_extra=excluded.json_ld_extra'
        )->execute([
            $body['metaTitle'] ?? $body['meta_title'] ?? '',
            $body['metaDescription'] ?? $body['meta_description'] ?? '',
            $body['ogImage'] ?? $body['og_image'] ?? '',
            $body['robots'] ?? 'index,follow',
            $body['googleVerification'] ?? $body['google_verification'] ?? '',
            $body['jsonLdExtra'] ?? $body['json_ld_extra'] ?? '',
        ]);
        Response::json(['ok' => true]);
    }

    public static function getAi(): void
    {
        $row = Database::connection()->query('SELECT * FROM seo_ai WHERE id = 1')->fetch();
        if (!$row) {
            Response::json(['llmsTxt' => '', 'aiSiteSummary' => '', 'aiBrandFacts' => '']);
        }
        Response::json([
            'llmsTxt' => $row['llms_txt'] ?? '',
            'aiSiteSummary' => $row['ai_site_summary'] ?? '',
            'aiBrandFacts' => $row['ai_brand_facts'] ?? '',
        ]);
    }

    public static function updateAi(array $body): void
    {
        Database::connection()->prepare(
            'INSERT INTO seo_ai (id, llms_txt, ai_site_summary, ai_brand_facts)
             VALUES (1,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
               llms_txt=excluded.llms_txt,
               ai_site_summary=excluded.ai_site_summary,
               ai_brand_facts=excluded.ai_brand_facts'
        )->execute([
            $body['llmsTxt'] ?? $body['llms_txt'] ?? '',
            $body['aiSiteSummary'] ?? $body['ai_site_summary'] ?? '',
            $body['aiBrandFacts'] ?? $body['ai_brand_facts'] ?? '',
        ]);
        Response::json(['ok' => true]);
    }

    public static function audit(): void
    {
        $pdo = Database::connection();
        $issues = [];

        $articles = $pdo->query('SELECT id, slug, title, seo_title, seo_description, excerpt, ai_summary FROM articles')->fetchAll();
        foreach ($articles as $a) {
            $title = $a['seo_title'] ?: $a['title'];
            if (strlen($title) < 30) {
                $issues[] = ['type' => 'warning', 'entity' => 'article', 'slug' => $a['slug'], 'message' => 'Judul SEO terlalu pendek (< 30 karakter)'];
            }
            if (strlen($title) > 60) {
                $issues[] = ['type' => 'warning', 'entity' => 'article', 'slug' => $a['slug'], 'message' => 'Judul SEO terlalu panjang (> 60 karakter)'];
            }
            $desc = $a['seo_description'] ?: $a['excerpt'];
            if (strlen($desc) < 120) {
                $issues[] = ['type' => 'error', 'entity' => 'article', 'slug' => $a['slug'], 'message' => 'Meta description kurang dari 120 karakter'];
            }
            if (empty($a['ai_summary'])) {
                $issues[] = ['type' => 'info', 'entity' => 'article', 'slug' => $a['slug'], 'message' => 'Belum ada ringkasan AI'];
            }
        }

        $products = $pdo->query('SELECT id, slug, name, seo_title, seo_description, short_description, ai_summary FROM products')->fetchAll();
        foreach ($products as $p) {
            $desc = $p['seo_description'] ?: $p['short_description'];
            if (strlen($desc) < 80) {
                $issues[] = ['type' => 'warning', 'entity' => 'product', 'slug' => $p['slug'], 'message' => 'Deskripsi SEO produk terlalu pendek'];
            }
            if (empty($p['ai_summary'])) {
                $issues[] = ['type' => 'info', 'entity' => 'product', 'slug' => $p['slug'], 'message' => 'Belum ada ringkasan AI'];
            }
        }

        $llms = $pdo->query('SELECT llms_txt FROM seo_ai WHERE id = 1')->fetchColumn();
        if (!$llms || strlen((string) $llms) < 200) {
            $issues[] = ['type' => 'warning', 'entity' => 'site', 'slug' => 'llms.txt', 'message' => 'llms.txt terlalu pendek untuk AI crawler'];
        }

        Response::json([
            'total' => count($issues),
            'errors' => count(array_filter($issues, fn ($i) => $i['type'] === 'error')),
            'warnings' => count(array_filter($issues, fn ($i) => $i['type'] === 'warning')),
            'issues' => $issues,
        ]);
    }

    private static function formatGlobal(array $row): array
    {
        return [
            'metaTitle' => $row['meta_title'] ?? '',
            'metaDescription' => $row['meta_description'] ?? '',
            'ogImage' => $row['og_image'] ?? '',
            'robots' => $row['robots'] ?? 'index,follow',
            'googleVerification' => $row['google_verification'] ?? '',
            'jsonLdExtra' => $row['json_ld_extra'] ?? '',
        ];
    }
}
