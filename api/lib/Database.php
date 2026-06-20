<?php

declare(strict_types=1);

final class Database
{
    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (self::$pdo) {
            return self::$pdo;
        }

        $config = require dirname(__DIR__) . '/config.php';
        $path = $config['db_path'];
        $dir = dirname($path);
        if (!is_dir($dir)) {
            mkdir($dir, 0750, true);
        }

        self::$pdo = new PDO('sqlite:' . $path, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        self::$pdo->exec('PRAGMA foreign_keys = ON');
        self::$pdo->exec('PRAGMA journal_mode = WAL');

        return self::$pdo;
    }

    public static function migrate(): void
    {
        $sql = file_get_contents(dirname(__DIR__) . '/migrations/001_init.sql');
        self::connection()->exec($sql);
    }
}
