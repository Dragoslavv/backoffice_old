<?php
session_start();
error_reporting(E_ALL);
date_default_timezone_set('Europe/Belgrade');
header("Content-Type: application/json");

// SEND HEADERS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Expires: Tue, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", true);
header("Pragma: no-cache");
header("Set-Cookie","GLOBALTEL=".$_SESSION['tokenSession'][0]."; Path=/");


if(isset($_SESSION['tokenSession'][0])){

    $url = 'https://api.globaltel.rs/api-gui/php/operator/update.php';

    $headers = array();
    $headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8';


    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_COOKIE,	"GLOBALTEL=".$_SESSION['tokenSession'][0]);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_COOKIESESSION, true);
    curl_setopt($ch, CURLOPT_FAILONERROR,false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,false);
    curl_setopt($ch, CURLOPT_FRESH_CONNECT,true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,	true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $responseFromApi  = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (curl_errno($ch)) {
        $retVal = array("result"=>false);
    }
    else
    {
        $retVal = $responseFromApi;
    }
    curl_close($ch);

    echo $retVal;

    exit();
}else {
    $retVal = array("result"=>false);
    echo json_encode($retVal);

}
?>
