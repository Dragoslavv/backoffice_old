<?php

require_once("../../lib/php/common2.php");

error_reporting(0);

$number = '';
$email = '';
$user_id = '';
$brand = '';
$billing_id='';

$brand_access = 'globaltel';

$where = " WHERE true  ";

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
/*print_r($number);
exit*/

if ($number=='exit')
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

if (!$number && !$email && !$user_id && !$billing_id && $key=='value' )
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

if ($user_id)
{
	$wallet_id = $DB->sfetch( "SELECT w.wallet_id from vs_ipaywallet_user_profiles p left join vs_ipaywallet_user_wallets w on p.id = w.user_profile_id where p.user_id = $user_id LIMIT 1");
}



if ($number)
	{
		
		$where .= " AND u.id = (SELECT user_id FROM vs_numbers WHERE number = $number ) ";
	}


if ($email)
{
	$where .= " AND u.email ilike '%$email%' ";
}


if ($user_id)
{
	$where .= " AND u.id = '$user_id' ";
}

if ($billing_id)
{
	$where .= " AND u.billing_id = '$billing_id' ";
}

$sql = $query = "SELECT u.id user_id, u.email, u.created, u.active, t.desc as user_type, first_name::text || ' ' || last_name::text AS name, b.id billing_id, u.brand, b.balances, b.reservations, u.force_app FROM vs_users u JOIN b_user b ON u.billing_id = b.id left join vs_users_type t on u.user_type = t.user_type  $where  LIMIT 1";

$DB->query($sql);

$arr = array();

function format_value(&$val)
{
	global $DB;
	$val = trim($val, '{}');
	$val = explode (',', $val);
	//$account_name = 'test';

	//$account_name = $DB->sfetch("SELECT account_name FROM b_account_profile where id = 0");

	//print_r($val);
	//exit;
	foreach ($val as $key => $value) {
		//{
		$account_name = $DB->sfetch("SELECT account_name FROM b_account_profile where id = $key");
		$divide_unit = $DB->sfetch("SELECT divide_unit FROM b_account_profile where id = $key");
		$unit = $DB->sfetch("SELECT unit FROM b_account_profile where id = $key");
		//$x = "SELECT account_name FROM b_account_profile where id = $key";
		/*print_r($x);
		exit;*/
		if($value!=0){
		$arr_billing[$key] = $key+1 . ".\t" . round($value/$divide_unit, 3)." ". $unit." ". $account_name ;
	}
			
	}
	/*print_r($arr_billing);
	exit;*/
	//return $arr_billing = implode("\n", $arr_billing);
	$val = implode("\n", $arr_billing);
};

while($obj = $DB->fetch_object())
{
	format_value($obj->balances);
	format_value($obj->reservations);
	switch($obj->force_app){
		case "t":
		{$obj->force_app = 'ON';}
		break;
		case "f":
		{$obj->force_app = 'OFF';}
		break;
	}
	if(!$wallet_id || $wallet_id == ''){
		$obj->wallet_id = 'NOT MASTERCARD USER';
	}else{
	$obj->wallet_id = $wallet_id;
		
	} 
    $arr[] = $obj;
}

$response = array('data' => $arr);
//$response['sql'] = $query;
$DB->close();

echo json_encode($response);
