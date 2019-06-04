<?php

require_once("../../lib/php/common.php");

$response = array();

if (clearSession())
{
	$response['success'] = true;
}
else
{
	$response['success'] = false;
}

echo json_encode($response);
