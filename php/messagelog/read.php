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
	$sort = ' ORDER BY created_at DESC';
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');

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

$where = " WHERE  true ";



$log_start = str_replace('T', ' ', $log_start);

$log_end = str_replace('T', ' ', $log_end);


$where .= " AND m.created_at >= '$log_start' AND m.created_at <= '$log_end' ";

if ($from_no != '') $where.=" AND m.from_no = '$from_no' ";
if ($to_no != '') $where.=" AND m.to_no = '$to_no' ";
if ($type != '' and $type != 'ALL') $where.=" AND m.type = $type ";



$query = "SELECT m.*, t.name FROM msg_messages_log m LEFT JOIN msg_messages_log_type t on m.type = t.type $where $sort OFFSET $offset LIMIT $limit";

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";

//$total = (int)($DB->sfetch(" SELECT count(*) FROM msg_messages $where "));
$total += (int)($DB->sfetch(" SELECT count(*) FROM msg_messages_log m $where "));
//$billsec = $DB->sfetch(" SELECT SUM(billsec) FROM vs_cdr $where ");
/*if ($sort!="") $query .= " ORDER BY `$sort` $dir ";

$query .= " LIMIT $start, $limit ";*/

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	
	$arr[] = $obj;
}

$response = array();
$response['sql'] = $query;
$response['data'] = $arr;
$response['total'] = $total;
//$response['billsec'] = $billsec;
$DB->close();
echo json_encode($response);
