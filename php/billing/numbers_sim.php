<?php

require_once("../../lib/php/common2.php");

$user_id = $DB->escape($_REQUEST['user_id']);

if (!$user_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

$where = ' WHERE TRUE ';

$where .= " AND user_id = '$user_id' AND type in ('app_sim', 'sim')";

$number = $DB->sfetch("SELECT number FROM vs_numbers $where");

$sql = "SELECT * FROM mb_sim where msisdn = $number ";

$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
	//$obj->auto_renew = $obj->auto_renew == 't' ? true : false;
    $arr[] = $obj;
}


$response = array('data' => $arr);
$response['sql'] = $sql;
$DB->close();
echo json_encode($response);