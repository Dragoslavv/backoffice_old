<?php

require_once("../../lib/php/common2.php");

$record = json_decode($_POST['record']);

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$response = array();


if ( $name == '' or $host == '' )
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}
else
{
	$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_routes WHERE name = '$name' ");
	if ($duplicate)
	{
		$response['message'] = 'Route with same name exists!';
		$response['success'] = false;
	}
	else
	{

	   //	$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"];

		$sql = "INSERT INTO vs_routes (name, host, active, inbound, outbound ) VALUES ('$name', '$host', '$active', '$inbound', '$outbound') RETURNING route AS id";


		$DB->query($sql);


		while($obj = $DB->fetch_object())
		{
			$id=$obj->id;
		}

		$affected_rows = $DB->affected_rows();

		if ($affected_rows > 0)
		{
			$response['success'] = true;
			//$response['sql'] = $sql;
			$response['id'] = $id;
			
		}
		else
		{
			$response['message'] = 'Error!';
			$response['success'] = false;
			//$response['sql'] = $sql;
		}
	}
}


$pg_ip = trim($ip);
$pg_ip = explode("\n", $pg_ip);

$errors = array();

foreach ($pg_ip as $ip  ) 
{
	$sql = "INSERT INTO vs_providers_addr (id, ip, created) VALUES ($id, '$ip', now()) ";
	$result = $DB->query($sql);
	if ($result == false)
	{
		$errors[] = $ip;
	}
}

if ($errors)
{
	$response['message'] = 'Error! Invalid syntax for type inet or already existing IP: ' . implode('; ', $errors);
}


echo json_encode($response);
