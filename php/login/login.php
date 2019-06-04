<?php

require_once("../../lib/php/common.php");

$response = array();

if (login($_POST["username"], $_POST["password"]))
{
	$response['success'] = true;
	$response['data'] = $_SESSION['USERDATA'];
}
else
{
	$response['success'] = false;
}

echo json_encode($response);
