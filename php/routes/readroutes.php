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
$name = '';
$host = '';
$direction = '';
$active = '';

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

if ($name != '') $where.=" AND name  LIKE '$name%' ";
if ($host != '') $where.=" AND host  LIKE '$host%' ";
if ($active!= '') 
	{
		if ($active == 'TRUE')
		{
			$where.=" AND active = TRUE ";
		}
		else 
		{
			$where.=" AND (active is null or active = FALSE) ";
		}

	}
if ($direction!= '') $where.=" AND $direction = TRUE ";

$query = " SELECT r.route, r.name,r.host, r.outbound, r.inbound, r.active, array_agg(p.ip) ip FROM vs_routes r LEFT JOIN vs_providers_addr p ON r.route=p.id $where GROUP BY r.route $sort OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch("SELECT count(*) FROM vs_routes  $where");

$DB->query($query);

$arr = array();

function format_value($val)
{
	if ($val == '{NULL}') return '';
	$val = trim($val, " \t\n\r\0\x0B{}");
	$val = explode (',', $val);
	$val = implode("\n", $val);
	return $val;
};

while($obj = $DB->fetch_object())
{
	$obj->ip=format_value($obj->ip);
	//$total = $obj->total;
	$arr[] = $obj;
}

$response = array();
$response['data'] = $arr;
$response['total'] = $total;
//$response['query'] = $query;
$DB->close();
echo json_encode($response);
