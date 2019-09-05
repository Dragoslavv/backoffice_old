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
	$sort = '';
}

/*$account_id = $DB->escape($_REQUEST['account_id']);

if (!$account_id)
{
	$response = array('data' => array());
	echo json_encode($response);
}*/


$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
$user_id = '';
$payment_status = '';
$payment_type = '';
$payment_data = '';
$ordertype = '';
$account_id = '';


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
$where = " WHERE TRUE ";



/*if ($payment_type == 'GooglePlay') { $payment_data ='google_order_id';}
elseif($payment_type == 'iTunes'){ $payment_data ='apple_transaction_id';}
	elseif($payment_type == 'cafebazaar') {$payment_data ='orderId';}
	else $payment_data = '';*/
	

if ($payment_type != '') $where.=" AND payment_type = '$payment_type' ";
if ($user_id != '') $where.=" AND user_id = '$user_id' ";
if ($payment_status != '') $where.=" AND payment_status = '$payment_status' ";
if ($ordertype != '') $where.=" AND payment_data ->>'google_order_id' = '$ordertype' OR payment_data ->>'apple_transaction_id' = '$ordertype' OR payment_data ->>'orderId' = '$ordertype' ";

if ($account_id != '')

{
 $where.=" AND u.billing_id = '$account_id' AND transaction_started >= timestamp '$log_start'- interval '3 hour' AND transaction_started <= '$log_end' ";
}
else
{
	$where .= " AND transaction_started >= '$log_start' AND transaction_started <= '$log_end' ";

}



/*$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND t.brand = '$brand_access' " : " WHERE true ";
*/
$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);



//$where .= " AND transaction_started >= '$log_start' AND transaction_started <= '$log_end' ";


$query = " SELECT o.*, u.billing_id FROM vs_orders o JOIN vs_users u ON u.id = o.user_id  $where ORDER BY transaction_started DESC $sort OFFSET $offset LIMIT $limit";


$total = $DB->sfetch(" SELECT count(*) FROM vs_orders o JOIN vs_users u ON u.id = o.user_id $where ");



$DB->query($query);

$arr = array();

while($obj = $DB->fetch_object())
{
	//$total = $obj->total;
	$arr[] = $obj;
}


$response = array();
$response['total'] = $total;
//$response['query'] = $query;
$response['data'] = $arr;

//echo $response;
//echo (implode(",", $arr));
$DB->close();
echo json_encode($response);
