<?php

require_once("../../lib/php/common2.php");

/*$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];
*/

$start = (isset($_REQUEST['start']) && $_REQUEST['start']) ? $DB->escape($_REQUEST['start']) : 0;
$limit = (isset($_REQUEST['limit']) && $_REQUEST['limit']) ? $DB->escape($_REQUEST['limit']) : 25;

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

$number = '';
$provider = '';
$type = '';
$brand = '';
$condition = '';
$reserved = '';
$quarantine = date('Y-m-d 23:59:59');


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

$quarantine = str_replace('T', ' ', $quarantine);

if ($number != '') $where .= " AND number::text LIKE '$number%' ";
if ($provider != '') $where .= " AND provider = '$provider' ";
if ($type != '') $where .= " AND type = '$type' ";
if ($brand != '') $where .= " AND brand = '$brand' ";
if ($condition != '') $where .= " AND quarantine $condition '$quarantine' ";
if ($reserved != '') $where .= " AND reserved = '$reserved' ";

$query = "SELECT * FROM vs_special_offer_numbers $where OFFSET $start LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_special_offer_numbers $where ");

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
$DB->close();
echo json_encode($response);

