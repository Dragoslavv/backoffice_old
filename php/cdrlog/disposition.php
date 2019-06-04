<?php

require_once("../../lib/php/common2.php");

//$log_start = date('Y-m-d 00:00:00');

$log_end = date('Y-m-d 23:59:59');

$log_start = date('Y-m-d 00:00:00', strtotime( '-1 month'));

$where .= " AND start >= '$log_start' AND start <= '$log_end' ";

$query = "SELECT DISTINCT disposition AS value, disposition AS display FROM vs_cdr WHERE  disposition IS NOT NULL $where ORDER BY disposition";

$DB->query($query);

$arr = array();

if ($DB->escape($_REQUEST["all"]))
{
	$arr[] = array('value'=>'', 'display' => 'ALL');
}

while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}

$response = array('data' => $arr);

echo json_encode($response);


