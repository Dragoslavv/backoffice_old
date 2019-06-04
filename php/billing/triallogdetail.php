<?php

require_once("../../lib/php/common2.php");


$duid = $DB->escape($_REQUEST["duid"]);



$query = " SELECT t.*, u.email FROM vs_trial_log t JOIN vs_users u ON u.id=t.user_id WHERE t.duid = '$duid' ";


$total = $DB->sfetch("SELECT count(*) FROM vs_trial_log t JOIN vs_users u ON u.id=t.user_id WHERE true ");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}


$response = array();
$response['total'] = $total;
$response['data'] = $arr;

$DB->close();
echo json_encode($response);
