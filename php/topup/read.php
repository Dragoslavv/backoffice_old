<?php

require_once("../../lib/php/common2.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];


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

if (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '')
{
	$sort = array();
	$ar = json_decode($_REQUEST['sort']);
	foreach ($ar as $ob)
	{
		$property = $DB->escape($ob->property);
		$direction = $DB->escape($ob->direction);
		$sort[] = " `$property` $direction ";
	}
	$sort = implode (', ', $sort);
}
else
{
	$sort = '';
}

$where = " WHERE true ";

if ($log_start == '')
{
	$log_start = date('Y-m-d 00:00:00');
}
else
{
	$log_start = str_replace('T', ' ', $log_start);
}

if ($log_end == '')
{
	$log_end = date('Y-m-d 23:59:59');
}
else
{
	$log_end = str_replace('T', ' ', $log_end);
}


$where .= " AND created >= '$log_start' AND  created <='$log_end' ";

if ($ConsumerId != '') $where.=" AND \"ConsumerId\" = '$ConsumerId' ";
if ($TransactionId != '') $where.=" AND \"TransactionId\" = '$TransactionId' ";
if ($topup_status != '') $where.=" AND topup_status = '$topup_status' ";

$total = $DB->sfetch("SELECT count(*) FROM b_topup_transactions $where  ");

$query = " SELECT  * FROM b_topup_transactions $where order by id OFFSET $offset LIMIT $limit";

/*if ($sort!="") $query .= " ORDER BY $sort ";

$query .= " LIMIT $start, $limit ";
*/
$DB->query($query);

$arr = array();

while($obj = $DB->fetch_object())
{

	$obj->MoneyAmount = $obj->MoneyAmount/100000;
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['query'] = $query;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
