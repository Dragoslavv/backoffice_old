<?php

require_once("../../lib/php/common2.php");

$record = json_decode($_POST['record']);

$set = array();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
	/*if ($key == 'password' and $value!='')
	{
		$set[] = " $key = md5('$value') ";
	}
	else*/
		if($key != 'id')
	{
		$set[] = " $key = '$value' ";
	}
}

$set = implode (', ', $set);

$response = array();

if (!$id || !$set)
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
}
else
{
	/*$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_routes_sms WHERE id != '$id' ");
	if ($duplicate)
	{
		$response['message'] = 'Route with that id exists!';
		$response['success'] = false;
	}*/
	/*else
	{*/
		$sql = "UPDATE vs_routes_sms SET $set WHERE id = '$id'";
		$DB->query($sql);
		if ($DB->affected_rows() > 0)
		{
			$response['success'] = true;
		}
		else
		{
			$response['message'] = 'No data changed!';
			$response['success'] = false;
		}
	//}
}

echo json_encode($response);
