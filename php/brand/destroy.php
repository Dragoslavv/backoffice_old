<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$response = array();

if (!$id)
{
	$response['message'] = 'No data deleted!';
	$response['success'] = false;
}
else
{
	$sql = "DELETE FROM vs_brand WHERE id = '$id'";
	$DB->query($sql);
	if ($DB->affected_rows() > 0)
	{
		$response['success'] = true;
	}
	else
	{
		$response['message'] = 'No data deleted!';
		$response['success'] = false;
	}
}

echo json_encode($response);
