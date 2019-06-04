<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);

$set = array();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
	if($key != 'id' && $key != 'key_gui' && $key != 'value_gui' )
	{
		$set[] = " $key = '$value' ";
	}
	elseif($key == 'key_gui' )
	{
		$set[] = " key = '$value' ";
	}
	elseif($key == 'value_gui' )
	{
		$set[] = " value = '$value' ";
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
	

	$sql = "UPDATE vs_texts SET $set WHERE id = '$id'";
	 $DB->query($sql);
	
	if ($DB->affected_rows() > 0)
	{
		$response['success'] = true;
		$response['sql'] = $query;
	}			
	else
	{
		$response['message'] = 'Error!';
		$response['success'] = false;
		$response['sql'] = $sql;
	}
			
				
}

echo json_encode($response);
