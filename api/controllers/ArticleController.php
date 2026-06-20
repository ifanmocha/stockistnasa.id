<?php

declare(strict_types=1);

final class ArticleController
{
    public static function list(): void
    {
        $rows = Database::connection()->query('SELECT * FROM articles ORDER BY published_at DESC')->fetchAll();
        Response::json(array_map([self::class, 'format'], $rows));
    }

    public static function get(int $id): void
    {
        $stmt = Database::connection()->prepare('SELECT * FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            Response::error('Artikel tidak ditemukan', 404);
        }
        Response::json(self::format($row));
    }

    public static function create(array $body): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'INSERT INTO articles (slug, title, excerpt, content, category, keywords, related_products, faq, published_at, seo_title, seo_description, focus_keyword, ai_summary, ai_key_facts, robots, sitemap_priority, sitemap_changefreq)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute(self::bindValues($body));
        Response::json(['id' => (int) $pdo->lastInsertId()], 201);
    }

    public static function update(int $id, array $body): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'UPDATE articles SET slug=?, title=?, excerpt=?, content=?, category=?, keywords=?, related_products=?, faq=?, published_at=?, seo_title=?, seo_description=?, focus_keyword=?, ai_summary=?, ai_key_facts=?, robots=?, sitemap_priority=?, sitemap_changefreq=?, updated_at=datetime(\'now\') WHERE id=?'
        );
        $values = self::bindValues($body);
        $values[] = $id;
        $stmt->execute($values);
        Response::json(['ok' => true]);
    }

    public static function delete(int $id): void
    {
        Database::connection()->prepare('DELETE FROM articles WHERE id = ?')->execute([$id]);
        Response::json(['ok' => true]);
    }

    private static function bindValues(array $b): array
    {
        return [
            $b['slug'] ?? '',
            $b['title'] ?? '',
            $b['excerpt'] ?? '',
            $b['content'] ?? '',
            $b['category'] ?? 'umum',
            JsonHelper::encode($b['keywords'] ?? []),
            JsonHelper::encode($b['relatedProducts'] ?? $b['related_products'] ?? []),
            JsonHelper::encode($b['faq'] ?? []),
            $b['publishedAt'] ?? $b['published_at'] ?? date('Y-m-d'),
            $b['seoTitle'] ?? $b['seo_title'] ?? '',
            $b['seoDescription'] ?? $b['seo_description'] ?? '',
            $b['focusKeyword'] ?? $b['focus_keyword'] ?? '',
            $b['aiSummary'] ?? $b['ai_summary'] ?? '',
            JsonHelper::encode($b['aiKeyFacts'] ?? $b['ai_key_facts'] ?? []),
            $b['robots'] ?? 'index,follow',
            (float) ($b['sitemapPriority'] ?? $b['sitemap_priority'] ?? 0.7),
            $b['sitemapChangefreq'] ?? $b['sitemap_changefreq'] ?? 'monthly',
        ];
    }

    private static function format(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'slug' => $row['slug'],
            'title' => $row['title'],
            'excerpt' => $row['excerpt'],
            'content' => $row['content'],
            'category' => $row['category'],
            'keywords' => JsonHelper::decode($row['keywords'], []),
            'relatedProducts' => JsonHelper::decode($row['related_products'], []),
            'faq' => JsonHelper::decode($row['faq'], []),
            'publishedAt' => $row['published_at'],
            'seoTitle' => $row['seo_title'],
            'seoDescription' => $row['seo_description'],
            'focusKeyword' => $row['focus_keyword'],
            'aiSummary' => $row['ai_summary'],
            'aiKeyFacts' => JsonHelper::decode($row['ai_key_facts'], []),
            'robots' => $row['robots'],
            'sitemapPriority' => (float) $row['sitemap_priority'],
            'sitemapChangefreq' => $row['sitemap_changefreq'],
            'updatedAt' => $row['updated_at'],
        ];
    }
}
