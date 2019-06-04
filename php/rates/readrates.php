<?php

require_once("../../lib/php/common2.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

$destination = '';
$prefix = '';
$brand = '';

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


if ($destination != '') $where.=" AND destination  ILIKE '$destination%' ";
if ($prefix != '') $where.=" AND prefix::text  LIKE '$prefix%' ";
if ($brand != '') $where.=" AND brand  ILIKE '$brand%' ";

//if ($brand!= '') $where.=" AND $direction = TRUE ";

$query = " SELECT * FROM vs_rates $where OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch("SELECT count(*) FROM vs_rates $where ");

$DB->query($query);

$arr = array();

/*function format_value($val)
{
	if ($val == '{NULL}') return '';
	$val = trim($val, " \t\n\r\0\x0B{}");
	$val = explode (',', $val);
	$val = implode("\n", $val);
	return $val;
};*/

while($obj = $DB->fetch_object())
{
	//$obj->ip=format_value($obj->ip);
	//$total = $obj->total;
	$arr[] = $obj;
}

$response = array();
$response['data'] = $arr;
$response['total'] = $total;
//$response['query'] = $query;
$DB->close();
echo json_encode($response);
