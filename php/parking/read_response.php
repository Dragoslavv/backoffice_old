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



//if ($brand != '' && $brand != 'ALL') $where.=" AND name = '$brand' ";
$where .= " AND response_time >= '$log_start' AND response_time <= '$log_end' ";
if ($destination != '' && $destination != 'ALL') $where.=" AND sender_number = '$destination' ";
if ($source != '' ) $where.=" AND 	receiver_number = '$source' ";

$query = " SELECT * FROM vas_response $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vas_response $where ");

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
