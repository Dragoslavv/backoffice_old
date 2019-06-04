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
	$sort = '';
}


$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

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


if ($id != '') $where.=" AND id = '$id' ";
if ($username != '') $where.=" AND username = '$username' ";
if ($firstname != '') $where.=" AND firstname  LIKE '$firstname%' ";
if ($lastname != '') $where.=" AND lastname  LIKE '$lastname%' ";
if ($role!= '' && $role!= 'ALL') $where.=" AND role = '$role' ";
if ($email != '') $where.=" AND email = '$email' ";
if ($brand != '') $where.=" AND brand = '$brand' ";


$query = " SELECT *, '' as password FROM vs_operators $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_operators $where ");

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	$total = $obj->total;
	$arr[] = $obj;
}

$response = array();
$response['data'] = $arr;
$response['total'] = $total;

echo json_encode($response);
