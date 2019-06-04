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

//print_r($sql);

$arr = $DB->afetch($sql);


if (!$arr) {
   // echo "An error occurred.\n";
	$response['failure'] = false;
	$response['message'] = "User hasn't got wallet!";
	echo json_encode($response);
    exit;
}


$response['success'] = true;
echo json_encode($response);
