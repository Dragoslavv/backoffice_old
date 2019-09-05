<?php

require_once("../../lib/php/common2.php");


$id = $DB->escape($_REQUEST["id"]);



$query = " SELECT t.transaction_id t_id, t.id as detail_id, ROUND(t.amount/-100000.00,3) as amount, t.result, t.meta_data, t.created_at, t.expires_at,  r.result_name FROM  b_transaction_detail t JOIN b_transaction_result r ON r.id = t.result WHERE t.transaction_id = '$id' ";

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";

$total = $DB->sfetch(" SELECT count(*) FROM b_transaction_detail t JOIN b_transaction_result r ON r.id = t.result WHERE t.transaction_id = '$id'");


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
