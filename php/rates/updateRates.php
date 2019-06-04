<?php

require_once("../../lib/php/common2.php");

//$exchange_rate = json_decode($_POST['exchange_rate']);
$record = json_decode($_POST['record']); 

$brand_access = $_SESSION['USERDATA']["brand"];
$role = $_SESSION['USERDATA']["role"];
//$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"].' id: '.$_SESSION['USER_ID'];

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;	
}


if($role!='ADMIN')
{
	$response['message'] = 'You do not have credential, you are not ADMIN!';
	$response['success'] = false;
}
else
{
	
	$sql = "UPDATE vs_rates SET perminutecost= '$perminutecost' WHERE id = '$id' ";
		 $DB->query($sql);

	if ($DB->affected_rows() > 0)
	{	 

	  $response['success'] = true;
					
	}
	else
	{
		$response['message'] = 'No data changed!';
		$response['success'] = false;
		//$response['success'] = $sql;
	
	}

}

echo json_encode($response);
