<?php

require_once("../../lib/php/common2.php");


$duid = $DB->escape($_REQUEST["duid"]);



$query = " SELECT t.*, u.email FROM vs_trial_log t JOIN vs_users u ON u.id=t.user_id WHERE t.duid = '$duid' ";

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";

$total = $DB->sfetch("SELECT count(*) FROM vs_trial_log t JOIN vs_users u ON u.id=t.user_id WHERE true ");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	//$total = $obj->total;
	$arr[] = $obj;
}

// print_r($arr);

// echo implode(",", $arr);

//$response = '{"total":' . $total . ',"data":[' . implode(",", $arr) . ']}';

$response = array();
$response['total'] = $total;
//$response['sql'] = $query;
$response['data'] = $arr;

//echo $response;
//echo (implode(",", $arr));
$DB->close();
echo json_encode($response);
