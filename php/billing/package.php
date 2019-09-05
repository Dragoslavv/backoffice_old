<?php

require_once("../../lib/php/common2.php");

$user_id = $DB->escape($_REQUEST['user_id']);

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

if (!$user_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

$brand_access = $_SESSION['USERDATA']["brand"];

$where =  " WHERE true ";

$where .= " AND p.user_id = '$user_id' ";

$sql = "SELECT p.*, t.name, s.promo_state FROM pack_log p LEFT JOIN promo_text t ON p.package_id = t.promotion_id LEFT JOIN active_promo_state s ON p.action = s.id   $where group by p.id,  t.name, s.promo_state ORDER BY p.id DESC OFFSET $offset LIMIT $limit";

$total = $DB->sfetch(" SELECT count(*) FROM pack_log p $where  ");


$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
	$obj->free_of_charge = $obj->free_of_charge == 't' ? true : false;
    $arr[] = $obj;
}

//$total = $DB->sfetch(" SELECT count(*) FROM vs_numbers $where ");
//$response = array('data' => $arr, 'total' => $total);

$response = array();
//$response['query'] = $sql;
$response['data'] = $arr;
$response['total'] = $total;
$DB->close();
echo json_encode($response);

