<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
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
	$sort = 'ORDER BY groupid';
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
if ($name != '' ) $where.=" AND name LIKE '$name%' ";
if ($id != '' ) $where.=" AND p.id = '$id' ";


$query = " SELECT p.id as groupid, p.dedicated_account_id, p.parent_id, p.params, p.type, p.visible, p.group_order FROM promo_group p $where $sort  OFFSET $offset LIMIT $limit";

//SELECT * FROM vas_incoming_request  $where $sort OFFSET $offset LIMIT $limit

$total = $DB->sfetch(" SELECT count(*) FROM promo_group p  $where ");

$DB->query($query);

$arr = array();

while($obj = $DB->fetch_object())
{/*
	$params_lang = json_decode($obj->params_lang);
	 $params = json_decode($obj->params);
	 $sim_required = $params->sim_required;
	 $header = $params_lang->header;
	 $countries_list = $params_lang->countries_list;
	 $obj->sim_required = $sim_required;
	 $obj->header = $header;
	 $obj->countries_list = $countries_list;
	 //print_r($dedicatedAccounts[0]);
	//$total = $obj->total;
	if ($obj->visible == 't') {
    
        $obj->visible = true;
     
      }else{
      	$obj->visible = false;
      }*/
  if ($obj->visible == 't') {

    $obj->visible = true;
 
  }else{
  	$obj->visible = false;
  }
	$arr[] = $obj;
}
//exit;

$response = array();
$response['data'] = $arr;
$response['sql'] = $query;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
