<?php

require_once("../../lib/php/common2.php");


$cdr_id = $DB->escape($_REQUEST["meta_data"]);



$query = " SELECT c.id, c.start, c.end, c.answer, c.userfield, c.duration, c.billsec, c.disposition, c.src, c.dst, c.dcontext,c.roaming FROM vs_cdr  c  WHERE cdr_id = '$cdr_id' order by start  ";


$total = $DB->sfetch(" SELECT count(*)  FROM vs_cdr  WHERE cdr_id = '$cdr_id'");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	//$total = $obj->total;
	$arr[] = $obj;
}


$response = array();
$response['total'] = $total;
$response['data'] = $arr;

$DB->close();
echo json_encode($response);