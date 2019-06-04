<?php

require_once("../../lib/php/common.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

if (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '')
{
	$sort = array();
	$ar = json_decode($_REQUEST['sort']);
	foreach ($ar as $ob)
	{
		$property = $DB->escape($ob->property);
		$direction = $DB->escape($ob->direction);
		$sort[] = " $property $direction ";
	}
	$sort = implode (', ', $sort);
	$sort = " ORDER BY $sort ";
}
else
{
	$sort = 'ORDER BY total_price DESC';
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');

$where =  " WHERE true AND status = 0 ";

if (isset($_REQUEST['filter']) && $_REQUEST['filter'] != '')
{
	$filter = json_decode($_REQUEST['filter']);
	foreach ($filter as $f)
	{
		$property = $DB->escape($f->property);
		$value = $DB->escape($f->value);
		$$property = $value;
	}
}


$where .= " AND response_time >= '$log_start' AND response_time <= '$log_end' ";

/*if ($destination != '' && $destination != 'ALL') $where.=" AND destination = '$destination' ";
if ($source != '' ) $where.=" AND source = '$source' ";*/

$query = " SELECT sender_number, COUNT(sender_number) as counter, SUM(service_price) as total_price FROM vas_response $where GROUP BY sender_number $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vas_response $where GROUP BY sender_number  ");

$DB->query($query);
$sum_price = 0.00;
$arr = array();
while($obj = $DB->fetch_object())
{
	$sum_price +=  $obj->total_price;
	$sum_counter +=  $obj->counter;
	$arr[] = $obj;
}
$arr_total = array('sender_number' => 'TOTAL', 'counter' => $sum_counter, 'total_price' => $sum_price);
$arr[] = $arr_total;
//$result = array_merge_recursive($arr, $arr_total);
$response = array();
$response['data'] = $arr;
$response['total'] = $total;
//$response['sql'] = $query;

echo json_encode($response);
