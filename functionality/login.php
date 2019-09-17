<?php
session_start();
$_SESSION['tokenSession'] = array();
$_SESSION['firstName'] = array();
$_SESSION['lastName'] = array();
$_SESSION['role'] = array();

$url = 'http://new-gui.com/php/login/login.php';

$headers = array();
$headers[] = 'Content-Type application/json; charset=UTF-8';

$post_data = '';

foreach ($_POST as $key => $value) {
    if ($post_data == '') {
        $post_data = $key . '=' . $value;
    } else {
        $post_data = $post_data . '&' . $key . '=' .$value;
    }
}

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$responseFromApi = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);


if (curl_errno($ch)) {
    $retVal = array("result"=>false);
} else {
    $retVal = $responseFromApi;
}

curl_close($ch);
echo $retVal;

if(isset($_SESSION['tokenSession']) && isset($_SESSION['firstName']) && isset($_SESSION['lastName']) && isset($_SESSION['role'])){
    $token = json_decode($retVal, true);
    array_push($_SESSION['tokenSession'],$token["data"]["session"]);
    array_push($_SESSION['firstName'],$token["data"]["firstname"]);
    array_push($_SESSION['lastName'],$token["data"]["lastname"]);
    array_push($_SESSION['role'],$token["data"]["role"]);
}
exit();

?>
