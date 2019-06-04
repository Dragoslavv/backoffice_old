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


$where = " WHERE true ";

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


if ($key != '') $where.=" AND key ILIKE '$key%' ";
if ($script != '' && $script != 'ALL') $where.=" AND script = '$script' ";
if ($brand != '' && $brand != 'ALL') $where.=" AND brand = '$brand' ";



$query = " SELECT id, key as key_gui, value as value_gui, script, lang, brand FROM vs_texts  $where $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_texts $where ");

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
//$response['total'] = $query;


echo json_encode($response);
