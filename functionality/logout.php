<?php
session_start();
error_reporting(E_ALL);
date_default_timezone_set('Europe/Belgrade');

// SEND HEADERS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Expires: Tue, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", true);
header("Pragma: no-cache");
header("Set-Cookie","GLOBALTEL=".$_SESSION['tokenSession'][0]."; Path=/");


$url = 'https://api.globaltel.rs/api-gui/php/login/logout.php';

$headers = array();
$headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8'; //application/json -- application/x-www-form-urlencoded

$post_data = '';
foreach ($_REQUEST as $key => $value) {
    if($post_data == ''){
        $post_data =  '?' . $key . '=' . $value;
    }else{
        $post_data = $post_data . '&'. $key . '=' . $value;
    }

}


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url . $post_data );
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec( $ch );
$http = curl_getinfo( $ch );

( curl_errno( $ch ) ) ? $returnValue = array( "result" => false ) : $returnValue = $response;

curl_close($ch);

echo $returnValue;


if(isset($_SESSION["tokenSession"][0]))
{
    setcookie("GLOBALTEL", $_SESSION['tokenSession'][0], time() - 60 * 60,'/');
    unset($_SESSION["tokenSession"][0]);

    session_destroy();

}

exit();
