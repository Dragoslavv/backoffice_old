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
	$sort = 'ORDER BY id';
}

$brand='';

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND name = '$brand_access' " : " WHERE true ";

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



if ($brand != '' && $brand != 'ALL') $where.=" AND name = '$brand' ";


$query = " SELECT *, '' as password FROM vs_brand  $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_brand $where ");

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

echo json_encode($response);
