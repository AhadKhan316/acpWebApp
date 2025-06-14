<?php
// Database configuration
$dsn = 'mysql:host=localhost;dbname=acp;charset=utf8mb4';
$user = 'myuser';
$pass = 'mypass';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

function sendMail($to, $subject, $message) {
    // Placeholder email function. Configure with real SMTP in production.
    @mail($to, $subject, $message);
}

?>
