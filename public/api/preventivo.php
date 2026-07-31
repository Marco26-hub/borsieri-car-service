<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message)
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Metodo non consentito.');
}

if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, true, 'Richiesta ricevuta.');
}

$clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateFile = sys_get_temp_dir() . '/borsieri-quote-' . hash('sha256', $clientIp);
$lastRequest = is_file($rateFile) ? (int) file_get_contents($rateFile) : 0;

if ($lastRequest > 0 && time() - $lastRequest < 45) {
    respond(429, false, 'Attendi qualche secondo prima di inviare una nuova richiesta.');
}

$fields = [
    'intervento' => 80,
    'gestione_pneumatici' => 80,
    'tipologia' => 40,
    'misura' => 30,
    'indice_carico' => 30,
    'codice_velocita' => 30,
    'fascia' => 40,
    'nome' => 120,
    'telefono' => 40,
    'email' => 160,
    'veicolo' => 120,
    'targa' => 20,
    'consenso' => 2,
];

$data = [];
foreach ($fields as $field => $maxLength) {
    $value = trim((string) ($_POST[$field] ?? ''));
    $data[$field] = substr($value, 0, $maxLength);
}

$required = [
    'intervento',
    'gestione_pneumatici',
    'tipologia',
    'misura',
    'fascia',
    'nome',
    'telefono',
    'email',
    'veicolo',
    'consenso',
];

foreach ($required as $field) {
    if ($data[$field] === '') {
        respond(422, false, 'Compila tutti i campi obbligatori.');
    }
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Indirizzo email non valido.');
}

if ($data['consenso'] !== 'si') {
    respond(422, false, 'Il consenso al ricontatto e obbligatorio.');
}

$safeEmail = str_replace(["\r", "\n"], '', $data['email']);
$safeName = str_replace(["\r", "\n"], ' ', $data['nome']);
$recipient = 'borsiericar@gmail.com';
$subject = 'Richiesta preventivo pneumatici - ' . $safeName;
$message = implode("\n", [
    'Nuova richiesta preventivo dal sito Borsieri Car Service',
    '',
    'Intervento: ' . $data['intervento'],
    'Gestione pneumatici: ' . $data['gestione_pneumatici'],
    'Tipologia: ' . $data['tipologia'],
    'Misura: ' . $data['misura'],
    'Indice di carico: ' . ($data['indice_carico'] ?: 'Da verificare'),
    'Codice velocita: ' . ($data['codice_velocita'] ?: 'Da verificare'),
    'Fascia: ' . $data['fascia'],
    '',
    'Cliente: ' . $data['nome'],
    'Telefono: ' . $data['telefono'],
    'Email: ' . $data['email'],
    'Veicolo: ' . $data['veicolo'],
    'Targa: ' . ($data['targa'] ?: 'Non indicata'),
    'Consenso al ricontatto: si',
]);
$headers = implode("\r\n", [
    'From: Borsieri Car Service <noreply@borsiericarservice.it>',
    'Reply-To: ' . $safeEmail,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (!mail($recipient, $subject, $message, $headers)) {
    respond(500, false, 'Invio momentaneamente non disponibile.');
}

file_put_contents($rateFile, (string) time(), LOCK_EX);
respond(200, true, 'Richiesta inviata correttamente.');
