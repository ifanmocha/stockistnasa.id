<?php

declare(strict_types=1);

final class Auth
{
    public static function start(): void
    {
        $config = require dirname(__DIR__) . '/config.php';
        if (session_status() === PHP_SESSION_NONE) {
            session_name($config['session_name']);
            session_set_cookie_params([
                'lifetime' => $config['session_ttl'],
                'path' => '/',
                'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
                'httponly' => true,
                'samesite' => 'Lax',
            ]);
            session_start();
        }
    }

    public static function login(string $username, string $password): bool
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) {
            return false;
        }
        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['login_at'] = time();
        return true;
    }

    public static function logout(): void
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'] ?? '', $p['secure'], $p['httponly']);
        }
        session_destroy();
    }

    public static function user(): ?array
    {
        if (empty($_SESSION['user_id'])) {
            return null;
        }
        return [
            'id' => (int) $_SESSION['user_id'],
            'username' => $_SESSION['username'] ?? '',
        ];
    }

    public static function require(): void
    {
        if (!self::user()) {
            Response::error('Unauthorized', 401);
        }
    }
}
