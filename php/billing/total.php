<?php

require_once("../../lib/php/common2.php");


$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
$brand = '';

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


$where .= " AND created_at >= '$log_start' AND created_at <= '$log_end' AND t.billing_profile_id != 26 ";

if ($brand)
{
	$where .= " AND t.brand = '$brand' ";
}

$query="SELECT count(committed) as counter, array_to_json(committed) as committed, name from (SELECT  committed, t.brand,  p.name, t.id FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where  group by  t.brand,  p.name,t.id) as tmp group by name, committed";



$DB->query($query);

$arr = array();

$arr['WallletTransfer']=$arr['PayPal']= $arr['WSPay'] = $arr['GooglePlay'] = $arr['iTunes'] = $arr['gui']= $arr['TransferCredit']= $arr['PromoBox']=$arr['messaging']=$arr['voice']=$arr['DIDWW']=$arr['maintanance']=$arr['SPOfferOrder']=$arr['TopUp']= $arr['Data']=$arr['callcentar']= $arr['Telekom']=0;

while($obj = $DB->fetch_object())
{
	$committed = json_decode($obj->committed);
	$obj->cash = $committed[0]/(-100000);
	$obj->data = $committed[1]/(1000000000);
	$obj->voice = $committed[2];
	$obj->sms = $committed[3];


		$arr[$obj->name]+=$obj->cash*$obj->counter;

}
//exit;
$arr['totalpayment'] = ($arr['PayPal'] +  $arr['WSPay'] +  $arr['GooglePlay'] +  $arr['iTunes']+  $arr['TopUp']).' din';
$arr['messaging'] = round($arr['messaging']*-1).' din';
$arr['PromoBox'] = round($arr['PromoBox']*-1,3).' din';
$arr['voice'] = round($arr['voice']*-1/2).' din';
$arr['DIDWW'] = round($arr['DIDWW']*-1/2).' din';
$arr['WallletTransfer'] = round($arr['WallletTransfer']*-1).' din';
$arr['Telekom'] = $arr['totalpayment'] - $arr['WallletTransfer'];


$query="SELECT  committed[2] as committed, p.name, t.id FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where and t.billing_profile_id = 26  group by  t.brand,  p.name,t.id order by t.id";

$response = array();
$response['query'] = $query;
$response['data'] = $arr;
$DB->close();
echo json_encode($response);
