<?php
session_start();
define('ADMIN_EMAIL', 'a@a.com');
define('ADMIN_PASSWORD', 'a');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

function jsonResponse(array $data, int $statusCode = 200): void {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function requireAdmin(): void {
    if (!isset($_SESSION['admin'])) {
        jsonResponse([
            'error' => 'Unauthorized'
        ], 401);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'POST' && $path === '/api/admin/login') {
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if ($email !== ADMIN_EMAIL || $password !== ADMIN_PASSWORD){
        jsonResponse([
            'error' => 'Invalid Credentials'
        ], 404);
    }

    $_SESSION['admin'] = true;

    jsonResponse([
        'message' => 'Logged In'
    ]);
}

if ($method === 'POST' && $path === '/api/admin/logout') {
    $_SESSION = [];
    session_destroy;
    jsonResponse([
        'message' => 'Logged Out'
    ]);
}

if ($method === 'GET' && $path === '/api/admin/me') {
    requireAdmin();
    jsonResponse([
        'authenticated' => true
    ]);
}

if ($method === 'GET' && $path === '/api/health') {
    jsonResponse([
        'status' => 'ok'
    ]);
    exit;
} else if (http_response_code(404)) {
    jsonResponse([
        'error' => 'Not Found'
    ]);
};