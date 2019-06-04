<?php

require_once("../../lib/php/common2.php");

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
	$sort = 'ORDER BY id DESC';
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');

$where =  " WHERE true ";

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


$where .= " AND created_at >= '$log_start' AND created_at <= '$log_end' ";

if ($destination != '' && $destination != 'ALL') $where.=" AND destination = '$destination' ";
if ($source != '' ) $where.=" AND source = '$source' ";

$query = " SELECT * FROM vas_incoming_request  $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vas_incoming_request $where ");

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	//$total = $obj->total;
	$arr[] = $obj;
}

$response = array();
$response['data'] = $arr;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
