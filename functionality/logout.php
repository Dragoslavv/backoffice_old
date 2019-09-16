<?php
session_name("GLOBALTEL");

session_start();

header("Access-Control-Allow-Origin: *");

$url = 'http://new-gui.com/php/login/logout.php';

$headers = array();
$headers[] = 'Content-Type: application/json; charset=UTF-8'; //application/json -- application/x-www-form-urlencoded

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
    unset($_SESSION["tokenSession"][0]);
    session_destroy();
}

exit();
