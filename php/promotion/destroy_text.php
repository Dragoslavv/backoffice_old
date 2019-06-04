<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$record = json_decode($_POST['record']);
$id = $DB->escape($_POST['id']);

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
	$sql = "DELETE FROM promo_text WHERE id = ".$id;
	$DB->query($sql);
	if ($DB->affected_rows() > 0)
	{
		$response['success'] = true;
	}
	else
	{
		$response['message'] = 'No data deleted!';
		$response['success'] = false;
		$response['sql'] = $sql;
	}
}

echo json_encode($response);