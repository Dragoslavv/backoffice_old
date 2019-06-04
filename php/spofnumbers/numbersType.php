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
$user_id = '';
$type = '';
$brand = '';
$expiration_date = date('Y-m-d 00:00:00');
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

//$quarantine = str_replace('T', ' ', $quarantine);



$expiration_date=str_replace('T', ' ', $expiration_date);
//$log_start=str_replace('T', ' ', $log_start);
//$log_end=str_replace('T', ' ', $log_start);

if ($log_end != ''){$log_end=str_replace('T', ' ', $log_end);}else{$log_end = date('Y-m-d 23:59:59');}
if ($log_start != ''){$log_start=str_replace('T', ' ', $log_start);}else{$log_start = date('Y-m-d 23:59:59');}


$where .= " AND created >= '$log_start' AND created <= '$log_end' ";

if ($number != '') $where .= " AND number::text LIKE '$number%' ";
if ($user_id != '') $where .= " AND user_id::text LIKE '$user_id%' ";
if ($type != '' && $type != 'real') { $where .= " AND type = '$type' ";}
elseif( $type == 'real')
{
	$where .= " AND type = '$type' AND expiration_date >= '$log_start' ";
}


if ($brand != '') $where .= " AND brand = '$brand' ";
if ($expiration_date != '' && $type != 'real' ) $where .= " AND expiration_date >= '$expiration_date'";

/*$query = "SELECT n.user_id, n.number, n.provider, n.type, n.expiration_date, n.created, n.auto_renew, n.price_input, n.price_output, n.status, u.id, u.brand FROM vs_numbers n JOIN vs_users u ON u.id = n.user_id $where OFFSET $start LIMIT $limit ";
*/

$query = "SELECT * FROM vs_numbers $where OFFSET $start LIMIT $limit ";

$total = $DB->sfetch(" SELECT count(*) FROM vs_numbers $where ");

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

echo json_encode($response);

