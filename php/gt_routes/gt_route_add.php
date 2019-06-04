<?php

require_once("../../lib/php/common2.php");

$record = json_decode($_POST['record']);
//print_r($record) ;
//exit;
$response = array();

if ( $type == '' or $charge_provider_id == '')
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}

$query1 = '';

$query = '';

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
	/*$value = char_converter($value);
	$value = $DB->escape($value);*/
	//echo $key;
	//if($key == 'provider_')

	if (($key == 'sorce' || $key == 'destination' || $key == 'provider_id' || $key == 'brand' || $key == 'comment' || $key == 'gt_name' ) && $value === '')
		{
			$query1 .="$key,";
			$query .= " $value = NULL , ";
		}
		elseif ($key != 'route_gt')
		{
			$query1 .="$key,";
			$query .= " '$value',";
		}

}

/*foreach ($_POST as $key => $value) {
		$value = char_converter($value);
		$value = $DB->escape($value);

		if (($key == 'sorce' || $key == 'destination' || $key == 'provider_id' || $key == 'brand' || $key == 'comment' || $key == 'gt_name' ) && $value === '')
		{
			$query .= " $key = NULL , ";
		}
		else//if ($key != 'pid')
		{
			
			$query .= " $key = '$value' , ";
		}

}*/

/*$response = array();

if ( $type == '' or $charge_provider_id == '')
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}*/

//trim($query, ",");
$query1 = substr($query1, 0, -1);

$query = substr($query, 0, -1);

$query = "INSERT INTO vs_routes_sms (".$query1.") values (". $query. ")";

	$DB->query($query);

if ($DB->affected_rows() > 0)
    echo "{success:true}";
else
    echo "{success:false,sql:'$query'}";
	/*else
	{

	   //	$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"];

		$sql = "INSERT INTO vs_routes_sms (name, host, active, inbound, outbound ) VALUES ('$name', '$host', '$active', '$inbound', '$outbound') RETURNING route AS id";
*/
/*
		$DB->query($sql);


		while($obj = $DB->fetch_object())
		{
			$id=$obj->id;
		}

		$affected_rows = $DB->affected_rows();

		if ($affected_rows > 0)
		{
			$response['success'] = true;
			$response['sql'] = $sql;
			$response['id'] = $id;
			
		}
		else
		{
			$response['message'] = 'Error!';
			$response['success'] = false;
			$response['sql'] = $sql;
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


echo json_encode($response);*/
