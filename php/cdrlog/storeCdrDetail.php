<?php

require_once("../../lib/php/common2.php");


$cdr_id = $DB->escape($_REQUEST["cdr_id"]);



$query = " SELECT c.id, c.start, c.end, c.answer, c.userfield, c.duration, c.billsec, c.disposition, c.src, c.dst, c.dcontext,c.clid, c.call_type, c.brand, c.user_id, c.payed_per_min, c.billed_per_min, r.route, r.name, c.user_id_b, c.reply_status, c.cdr_id, c.sip_reason, c.sip_code, c.cdr_id FROM vs_cdr c join vs_routes r on c.route = r.route WHERE cdr_id = '$cdr_id' order by start  ";

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";`

$total = $DB->sfetch(" SELECT count(*) FROM vs_cdr c join vs_routes r on c.route = r.route WHERE cdr_id = '$cdr_id'");


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
$response['sql'] = $query;
$response['data'] = $arr;

//echo $response;
//echo (implode(",", $arr));
echo json_encode($response);
