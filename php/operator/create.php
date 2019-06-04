<?php

require_once("../../lib/php/common2.php");

$record = json_decode($_POST['record']);

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$response = array();

$brand_access = $_SESSION['USERDATA']["brand"];

/*if ($brand_access != 'Virtual SIM')
{
	$brand= $brand_access;
}*/

$brand = 'Virtual SIM';

if ( $username == '' or $password == '' or $firstname == '' or $lastname == '' or $role == '')
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}
else
{
	$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_operators WHERE username = '$username' ");
	if ($duplicate)
	{
		$response['message'] = 'Operator with same name exists!';
		$response['success'] = false;
	}
	else
	{

	   	$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"];

		$sql = "INSERT INTO vs_operators (username, password, firstname, lastname, role, email, phone, brand ) VALUES ('$username', md5('$password'), '$firstname', '$lastname', '$role', '$email', '$phone', '$brand' )";


		$DB->query($sql);
		$affected_rows = $DB->affected_rows();

		if ($affected_rows > 0)
		{
			$response['success'] = true;
		}
		else
		{
			$response['message'] = 'Error!';
			$response['success'] = false;
		}
	}
}

echo json_encode($response);
