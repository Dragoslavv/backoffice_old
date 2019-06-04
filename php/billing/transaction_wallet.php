<?php
require_once("../../lib/php/common2.php");

date_default_timezone_set('Europe/Belgrade');

$user_id = $DB->escape($_REQUEST['user_id']);


if ( !$user_id || $_SESSION['USERDATA']["role"]=='USER')
{
	$response['failure'] = false;
	echo json_encode($response);
	exit;
}
$today = date( "Y-m-d");


$response = array();

$sql = "SELECT u.user_id as user_id, external_device_id_hash as device_id, platform_data::json->>'app_id' as app_id, platform from vs_ipaywallet_user_profiles u left join vs_devices dev on u.user_id = dev.user_id left join vs_ipaywallet_user_wallets w on u.id = w.user_profile_id left join vs_ipaywallet_wallet_cards c on w.id = c.wallet_id left join vs_ipaywallet_user_devices d on u.id = d.user_profile_id  where card_preset is true and d.device_active = TRUE and dev.registered is true and u.user_id = $user_id";

$DB->query($sql);

$arr = $DB->afetch($sql);


if (!$arr) {
   // echo "An error occurred.\n";
	$response['failure'] = false;
	$response['message'] = "User hasn't got wallet!";
	echo json_encode($response);
    exit;
}

	$req["app_id"] = $arr[2];
	$req["platform"] = $arr[3];
	$req["app_name"] = 'globaltel';
	$req["user_id"] = $arr[0];
	$req["device_id"] = $arr[1];
	$req["lang"] = 'en';
	$req["date_from"] = '2017-11-23';
	$req["date_to"] = $today;
    //$req["page_size"] = 1;
	$response = array();

	$query = str_replace(
    array('+', '%7E'), 
    array('%20', '~'), 
    http_build_query($req)
    );


	$req_str = "http://api.globaltel.rs/api6/iPayWallet/getTransactions.php?".$query;
	$res = json_decode(file_get_contents($req_str));
	$res = $res->transactions;


foreach($res as $key=>$value){
	if($value->direction=='d'){
		$value->amount = -($value->amount);
		$value->{'amount-local'} = -($value->{'amount-local'});
	}
}
$response['data'] = $res;

echo json_encode($response);
