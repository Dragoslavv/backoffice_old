<?php

require_once("../../lib/php/common.php");

$response = array();

if (checkSession())
{
	$response['success'] = true;
	$response['data'] = $_SESSION['USERDATA'];
}
else
{
	$response['success'] = false;
}

echo json_encode($response);
