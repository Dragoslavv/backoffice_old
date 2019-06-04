<?php

require_once("../../lib/php/common2.php");

/*$database = $DB->escape($_REQUEST["database"]);
if ($database != '') $DB->select($database);*/

/*$table = $DB->escape($_REQUEST["table"]);
$valueField = $DB->escape($_REQUEST["valueField"]);
$displayField = stripslashes($DB->escape($_REQUEST["displayField"]));


$query =isset($_REQUEST["query"])? $DB->escape($_REQUEST["query"]): '';
$queryField = isset ($_REQUEST["queryField"])? $DB->escape($_REQUEST["queryField"]): '';
*/

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND '$brand_access' = Any(brand) " : " WHERE true ";
//$where = " WHERE true";

$sql = "SELECT r.id as country_id , c.city_name as display, c.id as value FROM vs_special_offer_regions r JOIN  vs_special_offer_cities c ON r.id=c.country_id $where ";
    $DB->query($sql);

/*

if ($query != '' && $queryField != '')
{
	$where .= " AND $queryField::text ILIKE '$query%' ";
}
$orderField = (isset($_REQUEST["orderField"]) && $_REQUEST["orderField"]!='')?$DB->escape($_REQUEST["orderField"]):$valueField;

if ($brand_access != 'Virtual SIM')
{
	$sql = " SELECT DISTINCT $valueField AS value, $displayField AS display FROM $table $where AND provider_name = '$brand_access'  ORDER BY $orderField ";
	$DB->query($sql);
}
else
{
	$sql = " SELECT DISTINCT $valueField AS value, $displayField AS display FROM $table $where ORDER BY $orderField ";
	$DB->query($sql);
}



if(isset($_REQUEST["all"]))
{
	$arr = array(array('value'=>'', 'display' => 'ALL'));
}
else
{
	$arr = array();
}

*/
while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $sql;

echo json_encode($response);