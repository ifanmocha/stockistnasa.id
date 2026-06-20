<?php

declare(strict_types=1);

final class JsonHelper
{
    public static function decode(?string $json, mixed $default = []): mixed
    {
        if ($json === null || $json === '') {
            return $default;
        }
        $decoded = json_decode($json, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : $default;
    }

    public static function encode(mixed $data): string
    {
        return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

final class ProductController
{
    public static function list(): void
    {
        $rows = Database::connection()->query('SELECT * FROM products ORDER BY name')->fetchAll();
        Response::json(array_map([self::class, 'format'], $rows));
    }

    public static function get(int $id): void
    {
        $stmt = Database::connection()->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            Response::error('Produk tidak ditemukan', 404);
        }
        Response::json(self::format($row));
    }

    public static function create(array $body): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'INSERT INTO products (slug, name, category, short_description, description, benefits, usage, faq, image, featured, seo_title, seo_description, seo_keywords, ai_summary, robots, sitemap_priority, sitemap_changefreq)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute(self::bindValues($body));
        Response::json(['id' => (int) $pdo->lastInsertId()], 201);
    }

    public static function update(int $id, array $body): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'UPDATE products SET slug=?, name=?, category=?, short_description=?, description=?, benefits=?, usage=?, faq=?, image=?, featured=?, seo_title=?, seo_description=?, seo_keywords=?, ai_summary=?, robots=?, sitemap_priority=?, sitemap_changefreq=?, updated_at=datetime(\'now\') WHERE id=?'
        );
        $values = self::bindValues($body);
        $values[] = $id;
        $stmt->execute($values);
        Response::json(['ok' => true]);
    }

    public static function delete(int $id): void
    {
        Database::connection()->prepare('DELETE FROM products WHERE id = ?')->execute([$id]);
        Response::json(['ok' => true]);
    }

    private static function bindValues(array $b): array
    {
        return [
            $b['slug'] ?? '',
            $b['name'] ?? '',
            $b['category'] ?? 'pertanian',
            $b['shortDescription'] ?? $b['short_description'] ?? '',
            $b['description'] ?? '',
            JsonHelper::encode($b['benefits'] ?? []),
            $b['usage'] ?? '',
            JsonHelper::encode($b['faq'] ?? []),
            $b['image'] ?? '',
            !empty($b['featured']) ? 1 : 0,
            $b['seoTitle'] ?? $b['seo_title'] ?? '',
            $b['seoDescription'] ?? $b['seo_description'] ?? '',
            JsonHelper::encode($b['seoKeywords'] ?? $b['seo_keywords'] ?? []),
            $b['aiSummary'] ?? $b['ai_summary'] ?? '',
            $b['robots'] ?? 'index,follow',
            (float) ($b['sitemapPriority'] ?? $b['sitemap_priority'] ?? 0.8),
            $b['sitemapChangefreq'] ?? $b['sitemap_changefreq'] ?? 'weekly',
        ];
    }

    private static function format(array $row): array
    {
        return [
            'id' => (int) $row['id'],
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
            'seoTitle' => $row['seo_title'],
            'seoDescription' => $row['seo_description'],
            'seoKeywords' => JsonHelper::decode($row['seo_keywords'], []),
            'aiSummary' => $row['ai_summary'],
            'robots' => $row['robots'],
            'sitemapPriority' => (float) $row['sitemap_priority'],
            'sitemapChangefreq' => $row['sitemap_changefreq'],
            'updatedAt' => $row['updated_at'],
        ];
    }
}
