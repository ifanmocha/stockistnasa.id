<?php

declare(strict_types=1);

/**
 * CMS configuration — paths resolve relative to repo root on local,
 * or ~/ on HawkHost (stockistnasa.id + cms-data sibling folders).
 */
$root = dirname(__DIR__);
// HawkHost: api lives in ~/stockistnasa.id/api, data in ~/cms-data
$hawkData = '/home/stockis2/cms-data';
$hawkExport = '/home/stockis2/cms-export';
if (is_dir($hawkData)) {
    return [
        'db_path' => $hawkData . '/stockistnasa.db',
        'export_path' => $hawkExport,
        'upload_path' => $hawkData . '/uploads',
        'session_name' => 'sn_admin_session',
        'session_ttl' => 60 * 60 * 12,
        'cors_origin' => null,
    ];
}

if (!is_dir($root . '/cms-data') && is_dir(dirname($root) . '/cms-data')) {
    $root = dirname($root);
}

return [
    'db_path' => $root . '/cms-data/stockistnasa.db',
    'export_path' => $root . '/cms-export',
    'upload_path' => $root . '/cms-data/uploads',
    'session_name' => 'sn_admin_session',
    'session_ttl' => 60 * 60 * 12, // 12 hours
    'cors_origin' => null, // same-origin; set for dev if needed
];
