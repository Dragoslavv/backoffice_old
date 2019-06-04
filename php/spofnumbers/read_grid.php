<?php

require_once("../../lib/php/common2.php");



$start = (isset($_REQUEST['start']) && $_REQUEST['start']) ? $DB->escape($_REQUEST['start']) : 0;
$limit = (isset($_REQUEST['limit']) && $_REQUEST['limit']) ? $DB->escape($_REQUEST['limit']) : 35;

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

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

$startday=date('Y-m-d', strtotime("-30 days"));
//$startday = date('Y-m-01');
$endday = date('Y-m-d');
$brandStat = '';
$type = '';
$expired = '';

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


$where .= " AND dan >= '$startday' AND dan <= '$endday' ";


if ($brandStat != '') $where .= " AND brand = '$brandStat' ";
if ($expired != '') $where .= " AND expired = '$expired' ";
if ($type != '') $where .= " AND type = '$type' ";


$query = "SELECT * FROM vs_numbers_stat_old $where 	ORDER BY dan ASC OFFSET $start LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_numbers_stat $where ");

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}

$response = array();
//$response['query'] = $query;
$response['data'] = $arr;
$response['total'] = $total;

echo json_encode($response);

