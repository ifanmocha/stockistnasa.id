<?php

declare(strict_types=1);

final class SiteController
{
    public static function getSettings(): void
    {
        $rows = Database::connection()->query('SELECT key, value FROM site_settings')->fetchAll();
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['key']] = $row['value'];
        }
        Response::json($settings);
    }

    public static function updateSettings(array $body): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('INSERT INTO site_settings (key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value');
        foreach ($body as $key => $value) {
            if (is_string($key) && (is_string($value) || is_numeric($value))) {
                $stmt->execute([$key, (string) $value]);
            }
        }
        Response::json(['ok' => true]);
    }

    public static function getTestimonials(): void
    {
        $rows = Database::connection()->query('SELECT * FROM testimonials ORDER BY sort_order, id')->fetchAll();
        Response::json(array_map(fn ($r) => [
            'id' => (int) $r['id'],
            'name' => $r['name'],
            'role' => $r['role'],
            'quote' => $r['quote'],
            'product' => $r['product'],
            'sortOrder' => (int) $r['sort_order'],
        ], $rows));
    }

    public static function saveTestimonials(array $body): void
    {
        $pdo = Database::connection();
        $pdo->exec('DELETE FROM testimonials');
        $stmt = $pdo->prepare('INSERT INTO testimonials (name, role, quote, product, sort_order) VALUES (?,?,?,?,?)');
        foreach ($body['items'] ?? $body as $i => $t) {
            if (!is_array($t)) {
                continue;
            }
            $stmt->execute([
                $t['name'] ?? '',
                $t['role'] ?? '',
                $t['quote'] ?? '',
                $t['product'] ?? '',
                $t['sortOrder'] ?? $i,
            ]);
        }
        Response::json(['ok' => true]);
    }

    public static function dashboard(): void
    {
        $pdo = Database::connection();
        Response::json([
            'products' => (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn(),
            'articles' => (int) $pdo->query('SELECT COUNT(*) FROM articles')->fetchColumn(),
            'testimonials' => (int) $pdo->query('SELECT COUNT(*) FROM testimonials')->fetchColumn(),
            'lastPublish' => $pdo->query('SELECT published_at FROM publish_log ORDER BY id DESC LIMIT 1')->fetchColumn() ?: null,
        ]);
    }
}
