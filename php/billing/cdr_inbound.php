<?php

require_once("../../lib/php/common2.php");

$user_id = $DB->escape($_REQUEST['user_id']);
$name_exit = $DB->escape($_REQUEST['name_exit']);

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
	$sort = 'ORDER BY start DESC';
}

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


if (!$user_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

if ($name_exit == 'exit' ) {

	exit;
}


//$brand_access = $_SESSION['USERDATA']["brand"];

$where = " WHERE true ";

if ($disposition != '' && $disposition != 'ALL') $where.=" AND disposition = '$disposition' ";

$where .= " AND user_id_b = '$user_id' ";


$query = " SELECT c.start, c.end, c.answer, c.duration, c.billsec, c.disposition, c.roaming, c.src, c.dst, c.dcontext,c.clid, c.call_type, c.brand, c.user_id, c.payed_per_min, c.billed_per_min, r.route, r.name FROM vs_cdr c join vs_routes r on c.route = r.route $where $sort OFFSET $offset LIMIT $limit";



$total = $DB->sfetch(" SELECT count(*) FROM vs_cdr c join vs_routes r on c.route = r.route $where ");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	
	$arr[] = $obj;
}

$response = array();
$response['query'] = $query;
$response['data'] = $arr;
$response['total'] = $total;
//$response['billsec'] = $billsec;
$DB->close();
echo json_encode($response);
