<?php

require_once("../../lib/php/common.php");

$DB->select('virtualsim');

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

$start = (isset($_REQUEST["start"]) && $_REQUEST["start"])?$DB->escape($_REQUEST["start"]):0;
$limit = (isset($_REQUEST["limit"]) && $_REQUEST["limit"])?$DB->escape($_REQUEST["limit"]):20;
$sort = (isset($_REQUEST["sort"]) && $_REQUEST["sort"]!='')?$DB->escape($_REQUEST["sort"]):"";
$dir = (isset($_REQUEST["dir"]) && $_REQUEST["dir"] == "DESC")?"DESC":"";

$where .= " AND (transaction_time BETWEEN '$log_start' AND '$log_end') ";


if ($number != '') $where.=" AND number IN ('$number', '+$number') ";
if ($user_id != '') $where.=" AND user_id IN ('$user_id', '+$user_id') ";
if ($billing_id != '') $where.=" AND billing_id IN ('$billing_id', '+$billing_id') ";
if ($status != '') $where.=" AND status IN ('$status', '+$status') ";
if ($provider != '' && $provider != 'ALL') $where.=" AND provider = '$provider' ";

$query = " SELECT SQL_CALC_FOUND_ROWS * FROM autorenewlog $where ";

if ($sort!="") $query .= " ORDER BY `$sort` $dir ";

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
