<?php

require_once("../../lib/php/common2.php");

$start = (isset($_REQUEST["start"]) && $_REQUEST["start"])?$DB->escape($_REQUEST["start"]):0;
$limit = (isset($_REQUEST["limit"]) && $_REQUEST["limit"])?$DB->escape($_REQUEST["limit"]):20;

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

if (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '')
{
	$sort = array();
	$ar = json_decode($_REQUEST['sort']);
	foreach ($ar as $ob)
	{
		$property = $DB->escape($ob->property);
		$direction = $DB->escape($ob->direction);
		$sort[] = " `$property` $direction ";
	}
	$sort = implode (', ', $sort);
}
else
{
	$sort = '';
}

$where = " WHERE 1 ";

if ($log_start == '')
{
	$log_start = date('Y-m-d 00:00:00');
}
else
{
	$log_start = str_replace('T', ' ', $log_start);
}

if ($log_end == '')
{
	$log_end = date('Y-m-d 23:59:59');
}
else
{
	$log_end = str_replace('T', ' ', $log_end);
}


$where .= " AND (update_time BETWEEN '$log_start' AND '$log_end') ";

if ($user_id != '') $where.=" AND user_id = '$user_id' ";

if ($billing_id != '') $where.=" AND billing_id = '$billing_id' ";

if ($product != '') $where.=" AND product = '$product' ";

if ($google_order_id != '') $where.=" AND google_order_id = '$google_order_id' ";

if ($status == '') $status = 'pending';

if ($status != 'ALL')
{
	if ($status == 'IabResult')
	{
		$where.=" AND status LIKE '$status%' ";
	}
	else
	{
		$where.=" AND status = '$status' ";
	}
}

$query = " SELECT SQL_CALC_FOUND_ROWS * FROM orders/*.*, /*user.billing_id FROM orders LEFT JOIN user ON orders.user_id = user.id*/ $where ";

if ($sort!="") $query .= " ORDER BY $sort ";

$query .= " LIMIT $start, $limit ";

$DB->query($query);

$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}

$response = array('data' => $arr, 'total' => $total);
//$response['sql'] = $query;

echo json_encode($response);
