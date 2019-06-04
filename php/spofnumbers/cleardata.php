<?php

require_once("../../lib/php/common2.php");

$sql = "DELETE FROM vs_special_offer_numbers_errors";
$DB->query($sql);

$response['success'] = true;

echo json_encode($response);
