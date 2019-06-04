<?php

require_once("../../lib/php/common2.php");


$table = $DB->escape($_REQUEST["table"]);
$valueField = $DB->escape($_REQUEST["valueField"]);
$displayField = stripslashes($DB->escape($_REQUEST["displayField"]));

$query =isset($_REQUEST["query"])? $DB->escape($_REQUEST["query"]): '';
$queryField = isset ($_REQUEST["queryField"])? $DB->escape($_REQUEST["queryField"]): '';



$where = " WHERE true";

if ($query != '' && $queryField != '')
{
	$where .= " AND $queryField::text ILIKE '$query%' ";
}

$orderField = (isset($_REQUEST["orderField"]) && $_REQUEST["orderField"]!='')?$DB->escape($_REQUEST["orderField"]):$valueField;

$sql = " SELECT DISTINCT regexp_replace(destination, '( Fixed| Mobile).*| *-.*','') AS display FROM $table $where ORDER BY display ";

$DB->query($sql);

if(isset($_REQUEST["all"]))
{
	$arr = array(array('value'=>'', 'display' => 'ALL'));
}
else
{
	$arr = array();
}

while($obj = $DB->fetch_object())
{
    $obj->value = $obj->display;
    $arr[] = $obj;
}

$response = array('data' => $arr);
//response['sql'] = $sql;

echo json_encode($response);
