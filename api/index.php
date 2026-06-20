<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/Database.php';
require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Auth.php';
require_once __DIR__ . '/controllers/ProductController.php';
require_once __DIR__ . '/controllers/ArticleController.php';
require_once __DIR__ . '/controllers/SeoController.php';
require_once __DIR__ . '/controllers/SiteController.php';
require_once __DIR__ . '/controllers/PublishController.php';

Database::migrate();
Auth::start();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

// Strip /api prefix when deployed under stockistnasa.id/api/
$uri = preg_replace('#^/api#', '', $uri) ?: '/';

$body = [];
if (in_array($method, ['POST', 'PUT', 'PATCH'], true)) {
    $raw = file_get_contents('php://input') ?: '';
    $body = json_decode($raw, true) ?? [];
}

// Public routes
if ($method === 'POST' && $uri === '/auth/login') {
    $user = $body['username'] ?? '';
    $pass = $body['password'] ?? '';
    if (!Auth::login($user, $pass)) {
        Response::error('Username atau password salah', 401);
    }
    Response::json(['ok' => true, 'user' => Auth::user()]);
}

if ($method === 'POST' && $uri === '/auth/logout') {
    Auth::logout();
    Response::json(['ok' => true]);
}

if ($method === 'GET' && $uri === '/auth/me') {
    $user = Auth::user();
    if (!$user) {
        Response::error('Unauthorized', 401);
    }
    Response::json(['user' => $user]);
}

// Protected routes
Auth::require();

if ($method === 'GET' && $uri === '/dashboard') {
    SiteController::dashboard();
}

if ($method === 'GET' && $uri === '/products') {
    ProductController::list();
}
if ($method === 'GET' && preg_match('#^/products/(\d+)$#', $uri, $m)) {
    ProductController::get((int) $m[1]);
}
if ($method === 'POST' && $uri === '/products') {
    ProductController::create($body);
}
if ($method === 'PUT' && preg_match('#^/products/(\d+)$#', $uri, $m)) {
    ProductController::update((int) $m[1], $body);
}
if ($method === 'DELETE' && preg_match('#^/products/(\d+)$#', $uri, $m)) {
    ProductController::delete((int) $m[1]);
}

if ($method === 'GET' && $uri === '/articles') {
    ArticleController::list();
}
if ($method === 'GET' && preg_match('#^/articles/(\d+)$#', $uri, $m)) {
    ArticleController::get((int) $m[1]);
}
if ($method === 'POST' && $uri === '/articles') {
    ArticleController::create($body);
}
if ($method === 'PUT' && preg_match('#^/articles/(\d+)$#', $uri, $m)) {
    ArticleController::update((int) $m[1], $body);
}
if ($method === 'DELETE' && preg_match('#^/articles/(\d+)$#', $uri, $m)) {
    ArticleController::delete((int) $m[1]);
}

if ($method === 'GET' && $uri === '/seo/global') {
    SeoController::getGlobal();
}
if ($method === 'PUT' && $uri === '/seo/global') {
    SeoController::updateGlobal($body);
}
if ($method === 'GET' && $uri === '/seo/ai') {
    SeoController::getAi();
}
if ($method === 'PUT' && $uri === '/seo/ai') {
    SeoController::updateAi($body);
}
if ($method === 'GET' && $uri === '/seo/audit') {
    SeoController::audit();
}

if ($method === 'GET' && $uri === '/site/settings') {
    SiteController::getSettings();
}
if ($method === 'PUT' && $uri === '/site/settings') {
    SiteController::updateSettings($body);
}
if ($method === 'GET' && $uri === '/testimonials') {
    SiteController::getTestimonials();
}
if ($method === 'PUT' && $uri === '/testimonials') {
    SiteController::saveTestimonials($body);
}

if ($method === 'POST' && $uri === '/publish') {
    PublishController::export();
}

Response::error('Not found', 404);
