<?php
header("Access-Control-Allow-Origin: *");

session_start();

if(isset($_SESSION['tokenSession'][0])){
    $url = 'http://new-gui.com/php/operator/read.php';

    $headers = array();
    $headers[] = 'Content-Type: application/json; charset=UTF-8';

    $post_data = '';
    foreach ($_REQUEST as $key => $value) {
        if($post_data == ''){
            $post_data =  '?' . $key . '=' . trim($value);
        }else{
            $post_data = $post_data . '&'. $key . '=' . trim($value);
        }

    }
    $post_data = str_replace(" ","+",$post_data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url . $post_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
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

    echo json_encode($retVal);
    exit();
}else {
    $retVal = array("result"=>false);
    echo json_encode($retVal);

}
?>
