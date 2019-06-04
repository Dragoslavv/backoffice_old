<?php

require_once("../../lib/php/common2.php");


$number = $DB->escape($_REQUEST["number"]);
$email = $DB->escape($_REQUEST["email"]);


if ($number!='')
{
	$sql = " SELECT brand AS value, brand AS display  FROM vs_numbers WHERE number = $number ";

	$DB->query($sql);

	while($obj = $DB->fetch_object())
	{
	    $arr[] = $obj;
	}
}

if ($email!='')
{
	$sql = " SELECT brand AS value, brand AS display  FROM vs_users WHERE email = '$email' ";

	$DB->query($sql);

	while($obj = $DB->fetch_object())
	{
	    $arr[] = $obj;
	}
}

$response = array('data' => $arr);
$response['sql'] = $sql;

echo json_encode($response);
