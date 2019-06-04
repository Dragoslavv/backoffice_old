<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$record = json_decode($_POST['record']);
$groupid = $DB->escape($_POST['groupid']);

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$response = array();

if (!$groupid)
{
	$response['message'] = 'No data deleted!';
	$response['success'] = false;
}
else
{
	$sql = "DELETE FROM promo_group WHERE id = $groupid";
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