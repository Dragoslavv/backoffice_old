<?php

require_once("../../lib/php/common2.php");

$user_id = $DB->escape($_REQUEST['user_id']);

if (!$user_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND app_name = '$brand_access' " : " WHERE true ";

$where .= " AND user_id = '$user_id' ";

$sql = "SELECT * FROM vs_devices $where";

$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
	$obj->registered = $obj->registered == 't' ? true : false;
    $arr[] = $obj;
}

$response = array('data' => $arr);
//$response['sql'] = $sql;
$DB->close();
echo json_encode($response);

