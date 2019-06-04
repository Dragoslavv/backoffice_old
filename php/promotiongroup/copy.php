<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$id = $DB->escape($_REQUEST['id']);

if ($id == '' )
{
	echo '{success:false}';
	exit;
}


$sql = "INSERT INTO promo_group (params, parent_id, dedicated_account_id, visible, type, group_order) SELECT params, parent_id, dedicated_account_id, visible, type, group_order FROM promo_group WHERE id = $id ";

$DB->query($sql);

$response = array();


$affected_rows = $DB->affected_rows();

if ($affected_rows > 0)
{
	$response['success'] = true;
}
else
{
	$response['message'] = 'Error!';
	$response['success'] = false;
	$response['sql'] = $sql;
}



echo json_encode($response);
