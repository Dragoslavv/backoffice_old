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
	$sort = ' ORDER BY c.id DESC ';
}

$src = '';
$dst = '';
$user_id = '';
$user_id_b = '';
$call_type= '' ;
$brand = '' ;
$route = '';
$name = '';
$disposition = '';

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND c.brand = '$brand_access' " : " WHERE true ";

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

//$where = " WHERE true ";


$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);


$where .= " AND start >= '$log_start' AND start <= '$log_end' ";

if ($src != '') $where.=" AND src LIKE '%$src%' ";
if ($dst != '') $where.=" AND dst = '$dst' ";
if ($user_id != '') $where.=" AND user_id = '$user_id' ";
if ($user_id_b != '') $where.=" AND user_id_b = '$user_id_b' ";
//if ($clid != '') $where.=" AND clid IN ('$clid', '+$clid') ";
//if ($dst != '' && $dst != 'ALL') $where.=" AND dst = '$dst' ";
if ($call_type!= '' && $call_type!= 'ALL') $where.=" AND call_type = '$call_type' ";
if ($brand!= '' && $brand!= 'ALL') $where.=" AND brand = '$brand' ";
if ($route != '' && $route != 'ALL') $where.=" AND route = '$route' ";
if ($name != '' && $name != 'ALL') $where.=" AND name = '$name' ";
if ($disposition != '' && $disposition != 'ALL') $where.=" AND disposition LIKE '%$disposition%' ";

$query = " SELECT c.id, c.start, c.end, c.answer, c.duration, c.billsec, c.disposition, c.src, c.dst, c.dcontext,c.clid, c.call_type, c.brand, c.user_id, c.payed_per_min, c.billed_per_min, r.route, r.name, c.user_id_b, c.reply_status, c.cdr_id, c.sip_reason, c.sip_code, c.cdr_id, c.userfield FROM vs_cdr c join vs_routes r on c.route = r.route $where $sort OFFSET $offset LIMIT $limit";


$total = $DB->sfetch(" SELECT count(*) FROM vs_cdr c join vs_routes r on c.route = r.route $where ");


$billsec = $DB->sfetch("  SELECT sum(billsec) as billsec from (SELECT MAX(billsec) as billsec FROM vs_cdr c join vs_routes r on c.route = r.route $where group by cdr_id) as t");

$total_bill = " SELECT sum(billsec) from (SELECT MAX(billsec) as billsec FROM vs_cdr c join vs_routes r on c.route = r.route $where group by cdr_id) as t ";

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{

	$obj->billsectotal= (int)($billsec/60);
	$arr[] = $obj;
}
$response = array();
$response['sql'] = $query;
$response['data'] = $arr;
$response['total'] = $total;
$response['billsec'] = $billsec;
$DB->close();
echo json_encode($response);
