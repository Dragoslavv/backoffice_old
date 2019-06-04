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
		$dir = $DB->escape($ob->direction);
		$sort[] = " $property $dir ";
	}
	$sort = implode (', ', $sort);
	$sort = " ORDER BY $sort ";
}
else
{
	$sort = '';
}
$gt_name = '';
$source = '';
$destination = '';
$brand = '';
$type = '';

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

$where = " WHERE true ";

if ($gt_name != '') $where.=" AND s.gt_name  LIKE '$gt_name%' ";
if ($source != '') $where.=" AND s.source  LIKE '$source%' ";
if ($destination != '') $where.=" AND s.destination  LIKE '$destination%' ";
if ($brand != '') $where.=" AND s.brand= '$brand' ";
if ($type != '') $where.=" AND s.type= '$type' ";


$query = " SELECT s.*, r.name as provider, v.name as charge_provider, b.name as brand_name FROM vs_routes_sms s LEFT JOIN vs_routes r ON s.provider_id = r.route LEFT JOIN vs_routes v ON s.charge_provider_id = v.route LEFT JOIN vs_brand b ON s.brand = b.id $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch("SELECT count(*) FROM msg_routing  $where");

$DB->query($query);

$arr = array();



while($obj = $DB->fetch_object())
{
	
	$arr[] = $obj;
}

$response = array();
$response['data'] = $arr;
$response['total'] = $total;
$response['query'] = $query;
$DB->close();
echo json_encode($response);
