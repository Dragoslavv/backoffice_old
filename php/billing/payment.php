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
	$sort = ' ORDER BY t.id ';
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
$type = '';
$brand = '';
//$created_at = date('Y-m-d');

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

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND t.brand = '$brand_access' " : " WHERE true ";

	$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);



$where .= " AND created_at >= '$log_start' AND created_at <= '$log_end' ";

if ($type == '')
{
	$where .= "AND t.billing_profile_id IN (6,7,8,9,19,32,23) ";
}
else
{

	if ($type != ''){

		if ($type == 333){

			$where .= "AND t.billing_profile_id  = '33' AND committed[1] > 0 ";
		}elseif($type == 33){

        $where .= "AND t.billing_profile_id  = '$type' AND committed[1] = 0 ";

		}else{

			$where .= "AND t.billing_profile_id  = '$type'";
		}

	} 
}

if ($brand)
{
	$where .= " AND t.brand = '$brand' ";
}

$query = " SELECT t.id as paymentid, account_id, array_to_json(t.committed) as committed, t.brand, t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, d.meta_data, p.name FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where GROUP BY t.id, d.meta_data,p.name $sort OFFSET $offset LIMIT $limit";

$total = $DB->sfetch(" SELECT count(distinct t.id) FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where ");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	 $committed = json_decode($obj->committed);
	
	$obj->cash = $committed[0]/(-100000);
	$obj->data = $committed[1]/(-1000000).' MB';
	$obj->voice = $committed[2];
	$obj->sms = $committed[3];
    $arr[] = $obj;
}

$response = array();
$response['total'] = $total;
$response['query'] = $query;
$response['data'] = $arr;


$DB->close();
echo json_encode($response);
