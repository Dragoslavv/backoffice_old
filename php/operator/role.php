<?php

require_once("../../lib/php/common2.php");

/*$query = "SELECT DISTINCT `status` AS `value`, `status` AS `display` FROM `orders` WHERE  `status` LIKE 'IabResult%' ORDER BY `status`";

$DB->query($query);*/

$arr = array();

if ($DB->escape($_REQUEST["all"]))
{
	$arr[] = array('value'=>'ALL', 'display' => 'ALL');
}

$arr[] = array('value'=>'ADMIN', 'display' => 'ADMIN');
$arr[] = array('value'=>'USER', 'display' => 'USER');

/*while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}*/

$response = array('data' => $arr, 'total' => $total);
//$response['sql'] = $query;

echo json_encode($response);
