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

/*$arr[] = array('value'=>'ANSWERED', 'display' => 'ANSWERED');
$arr[] = array('value'=>'BUSY', 'display' => 'BUSY');
$arr[] = array('value'=>'FAILED', 'display' => 'FAILED');
$arr[] = array('value'=>'NO ANSWER', 'display' => 'NO ANSWER');
*/
while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}

$response = array('data' => $arr);
//$response['sql'] = $query;

echo json_encode($response);


