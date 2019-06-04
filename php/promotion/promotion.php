<?php

require_once("../../lib/php/common2.php");
/*
$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/


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
	$sort = 'ORDER BY p.id';
}

/*$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
*/
$where =  " WHERE true ";

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




/*if ($destination != '' && $destination != 'ALL') $where.=" AND destination = '$destination' ";
if ($source != '' ) $where.=" AND source = '$source' ";*/
//if ($name != '' ) $where.=" AND name LIKE '$name%' ";
if ($id != '' ) $where.=" AND id = '$id' ";
if ($package_group_id != '' ) $where.=" AND p.promo_group_id = '$package_group_id' ";



$query = " SELECT p.id as promotionid, p.notification_rules, p.price, p.duration, p.params, p.auto_renew, p.promo_group_id, is_bundle, visible FROM promo_promotion p  $where  $sort OFFSET $offset LIMIT $limit";

//SELECT * FROM vas_incoming_request  $where $sort OFFSET $offset LIMIT $limit

$total = $DB->sfetch(" SELECT count(*) FROM promo_promotion p $where  ");

$DB->query($query);

$arr = array();

while($obj = $DB->fetch_object())
{
	/* $params = json_decode($obj->params);
	 $notifications = json_decode($obj->notifications);*/
	/* $dedicatedAccounts = $params->dedicatedAccounts;
	 $day_1_before_expyre =  $notifications->day_1_before_expyre;
	 $day_3_before_expyre =  $notifications->day_3_before_expyre;
	 $amounts = $params->amounts;
	 $obj->day_1_before_expyre = $day_1_before_expyre;
	 $obj->day_3_before_expyre = $day_3_before_expyre;
	 $obj->dedicatedAccounts = $dedicatedAccounts;*/
	 if ($obj->is_bundle == 't') {

    $obj->is_bundle = true;
 
  }else{
  	$obj->is_bundle = false;
  }
if ($obj->visible == 't') {

    $obj->visible = true;
 
  }else{
  	$obj->visible = false;
  }
	 $obj->price =  $obj->price/100000;
	 //$obj->amounts = $amounts[0];
	 //print_r($dedicatedAccounts[0]);
	//$total = $obj->total;
	$arr[] = $obj;
}
//exit;

$response = array();
$response['data'] = $arr;
$response['sql'] = $query;
$response['total'] = $total;

echo json_encode($response);
