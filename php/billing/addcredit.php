<?php

require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$password_hash = $DB->sfetch("SELECT md5('$password')");

$response = array();

if($account==0){

	$ammount=$ammount*100000;
}

if($account==1){

	$ammount=$ammount*1000000;
}

$ammount_array = array ();
$ammount_array[] = floatval($ammount);
$dedicated_accounts = array ();
$dedicated_accounts[] = floatval($account);

$req["req_type"] = "CM";
$req["auth"] = array("user" => "gui", "password" => "gui1234");
$req["type"] = "addbalance";
$req["account_id"] = floatval($billing_id);
$req["billing_profile"] = 4;
$req["rates"] = $ammount_array;
$req["dedicated_accounts"] = $dedicated_accounts;
$req["brand"] = $brand;
$req["meta_data"] = "GUI user: {$_SESSION['USERDATA']["username"]}\n$info ";

/*print_r(json_encode($req));
exit;*/

if (!$ammount || !$password || !$billing_id || $password_hash != $_SESSION['USERDATA']["password"])
{
	$response['success'] = false;
	echo json_encode($response);
	exit;
}

$req_str = "http://$BILLING_IP:9090/?jsonData=".urlencode(json_encode($req));
/*print_r($req_str);
exit;*/


$res = json_decode(file_get_contents($req_str));

$result = $res->results;
/*print_r($result);
exit;
*/
if (is_int($result[0]) && $result[0] == 1)
{
	$response['success'] = true;
}
else
{
	// $response['getIPs'] = getIPs();
    $response['req_str'] = $req_str;
    $response['res'] = $res;
	$response['success'] = false;
}
echo json_encode($response);
