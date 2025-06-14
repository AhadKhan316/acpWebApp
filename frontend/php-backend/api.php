<?php
require 'config.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function generateOtp() {
    return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
}

// Simple router
switch (true) {
    case $method === 'POST' && $path === '/register':
        $input = json_decode(file_get_contents('php://input'), true);
        $required = ['name','email','city','age','gender','password','confirm_password'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                json_response(['error'=>"$field required"], 400);
            }
        }
        if ($input['password'] !== $input['confirm_password']) {
            json_response(['error'=>'Password confirmation mismatch'], 400);
        }
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$input['email']]);
        if ($stmt->fetch()) {
            json_response(['error'=>'Email already registered'], 400);
        }
        $hash = password_hash($input['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('INSERT INTO users (name,email,city,age,gender,password) VALUES (?,?,?,?,?,?)');
        $stmt->execute([$input['name'],$input['email'],$input['city'],$input['age'],$input['gender'],$hash]);
        $userId = $pdo->lastInsertId();
        $otp = generateOtp();
        $expires = date('Y-m-d H:i:s', time()+600);
        $pdo->prepare('INSERT INTO otps (user_id,otp,expires_at) VALUES (?,?,?)')->execute([$userId,$otp,$expires]);
        sendMail($input['email'], 'Verify your account', "Your OTP is $otp");
        json_response(['message'=>'Registered. Please verify OTP']);
        break;

    case $method === 'POST' && $path === '/verify':
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['email']) || empty($input['otp'])) {
            json_response(['error'=>'email and otp required'], 400);
        }
        $stmt = $pdo->prepare('SELECT u.id, o.otp, o.expires_at FROM users u JOIN otps o ON u.id=o.user_id WHERE u.email=?');
        $stmt->execute([$input['email']]);
        $row = $stmt->fetch();
        if (!$row || $row['otp'] !== $input['otp'] || strtotime($row['expires_at']) < time()) {
            json_response(['error'=>'Invalid OTP'], 400);
        }
        $pdo->prepare('UPDATE users SET verified=1 WHERE id=?')->execute([$row['id']]);
        $pdo->prepare('DELETE FROM otps WHERE user_id=?')->execute([$row['id']]);
        json_response(['message'=>'Account verified']);
        break;

    case $method === 'POST' && $path === '/login':
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['email']) || empty($input['password'])) {
            json_response(['error'=>'email and password required'], 400);
        }
        $stmt = $pdo->prepare('SELECT id,password,verified FROM users WHERE email=?');
        $stmt->execute([$input['email']]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($input['password'], $user['password'])) {
            json_response(['error'=>'Invalid credentials'], 400);
        }
        if (!$user['verified']) {
            json_response(['error'=>'Account not verified'], 400);
        }
        session_start();
        $_SESSION['user_id'] = $user['id'];
        json_response(['message'=>'Logged in']);
        break;

    case $method === 'GET' && $path === '/events':
        $stmt = $pdo->query('SELECT * FROM events WHERE event_date >= NOW() ORDER BY event_date');
        json_response($stmt->fetchAll());
        break;

    case $method === 'POST' && preg_match('#^/events/(\d+)/register$#', $path, $m):
        session_start();
        if (empty($_SESSION['user_id'])) json_response(['error'=>'Unauthorized'], 401);
        $eventId = $m[1];
        $input = json_decode(file_get_contents('php://input'), true);
        $tickets = $input['tickets'] ?? [];
        if (!is_array($tickets) || count($tickets) === 0) json_response(['error'=>'tickets required'],400);
        foreach ($tickets as $ticket) {
            if (empty($ticket['name'])) json_response(['error'=>'attendee name required'],400);
            $qr = bin2hex(random_bytes(16));
            $stmt = $pdo->prepare('INSERT INTO tickets (user_id,event_id,attendee_name,qr_code) VALUES (?,?,?,?)');
            $stmt->execute([$_SESSION['user_id'],$eventId,$ticket['name'],$qr]);
        }
        json_response(['message'=>'Registered for event']);
        break;

    case $method === 'GET' && $path === '/tickets':
        session_start();
        if (empty($_SESSION['user_id'])) json_response(['error'=>'Unauthorized'], 401);
        $stmt = $pdo->prepare('SELECT * FROM tickets WHERE user_id=?');
        $stmt->execute([$_SESSION['user_id']]);
        json_response($stmt->fetchAll());
        break;

    default:
        json_response(['error'=>'Not found'],404);
}
?>
