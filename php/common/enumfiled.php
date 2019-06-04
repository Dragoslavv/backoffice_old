<?php

require_once("../../lib/php/common2.php");

$database = $DB->escape($_REQUEST["database"]);
if ($database != '') $DB->select($database);

$table = $DB->escape($_REQUEST["table"]);
$field = $DB->escape($_REQUEST["field"]);

$query = "SHOW COLUMNS FROM $table LIKE '$field'";

$DB->query($query);

if ($DB->escape($_REQUEST["all"]))
{
	$arr = array(array('value'=>'', 'display' => 'ALL'));
}
else
{
	$arr = array();
}

if ($DB->num_rows())
{
	$row=$DB->fetch_row();
	$options=explode("','", preg_replace("/(enum|set)\('(.+?)'\)/","\\2", $row[1]));
	foreach ($options as $value)
	{
		$arr[] = array
		(
		    'value' => $value,
		    'display' => str_replace('_', ' ',htmlentities($value))
		);
	}
}

$result = array('data' => $arr);

echo json_encode($result);
