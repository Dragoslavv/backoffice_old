<?php

require_once("../../lib/php/common2.php");

$DB->select('asterisk');

$query = " SELECT SQL_CALC_FOUND_ROWS * FROM stat ";

$DB->query($query);

$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	$obj->record = "record/roll.mp4";
	$arr[] = $obj;
}

$response = array('data' => $arr, 'total' => $total);

echo json_encode($response);
