<?php

require_once("../../lib/php/common2.php");

/*$database = $DB->escape($_REQUEST["database"]);
if ($database != '') $DB->select($database);*/

$table = $DB->escape($_REQUEST["table"]);
$valueField = $DB->escape($_REQUEST["valueField"]);
$displayField = stripslashes($DB->escape($_REQUEST["displayField"]));

$where = " WHERE true AND id NOT IN (4,6,7,8,9,19,22,23, 27, 28, 29)";

$orderField = (isset($_REQUEST["orderField"]) && $_REQUEST["orderField"]!='')?$DB->escape($_REQUEST["orderField"]):$valueField;

$sql = " SELECT DISTINCT $valueField AS value, $displayField AS display FROM $table $where ORDER BY $orderField ";

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
    $arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $sql;

echo json_encode($response);
