<?php

require_once("../../lib/php/common2.php");

$record = json_decode($_POST['record']);

$set = array();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = trim($DB->escape($value));

	if (in_array ($key , array('inbound', 'outbound', 'active') ) )
	{
		if ($value == true)
		{
			$value = 't';
		}
		else 
		{
			$value = 'f';
		}
	}
		
	$$key = $value;
	
	if(!in_array ($key , array('route', 'ip') ) )
	{
		$set[] = " $key = '$value' ";
	}
}

$where = implode (' AND ', $set);

$set = implode (', ', $set);

$response = array();

$affected_rows = 0;



$pg_ip = '{' . str_replace("\n", ",", $ip) . '}';

if (!$route || !$set)
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
}
else
{
	$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_routes WHERE name = '$name' AND route != '$route' ");
	
	$no_change = $DB->sfetch("SELECT COUNT(*) FROM vs_routes WHERE $where AND route = '$route' ");
     
   $no_change_ip = $DB->sfetch("SELECT array_agg(ip)='$pg_ip'::inet[] from vs_providers_addr where id = $route");

 $response['no_change_ip'] = $no_change_ip;

	if ($duplicate)
	{
		$response['message'] = 'Route name exists!';
		$response['success'] = false;
		echo json_encode($response);
		exit;
	}
	elseif ($no_change && $no_change_ip == 't')
	{
		$response['message'] = 'No data changed!';
		$response['success'] = false;
		echo json_encode($response);
		exit;
	}
	else
	{
		$sql = "UPDATE vs_routes SET $set WHERE route = '$route'";
		
		$DB->query($sql);

		$affected_rows = $DB->affected_rows();

		//$response['sql'] = $sql;
		$response['affected_rows1'] = $affected_rows;
		
		/*if ($affected_rows > 0)
		{
			$response['success'] = true;
		}
		else
		{
			$response['message'] = 'No data changed!';
			$response['sql'] = $sql;
			$response['success'] = false;
			echo json_encode($response);
			exit;
		}*/
	}
}

// $ip 123.123.123\n234.234.234...

// DELETE FROM vs_providers_addr_temp WHERE id = 3 and NOT ip = ANY ('{46.19.211.11,46.19.211.14,46.19.209.0/25}'::inet[]);

//$pg_ip = '{' . str_replace("\n", ",", $ip) . '}';

$sql = "DELETE FROM vs_providers_addr WHERE id = $route and NOT ip = ANY ('$pg_ip'::inet[])";

$DB->query($sql);

$affected_rows += $DB->affected_rows();

$response['affected_rows2'] = $affected_rows;


/*if ($DB->affected_rows() >= 0)
{
	$response['success'] = true;
}
else
{
	$response['message'] = 'opet ne radi';
	$response['sql'] = $sql;
	$response['success'] = false;
	echo json_encode($response);
	exit;
}*/

$sql = "SELECT array_agg(ip) ip FROM vs_providers_addr WHERE id = $route";

$old_ip = $DB->sfetch($sql);
$old_ip = trim($old_ip,'{}');
$old_ip = explode(",", $old_ip);

$pg_ip = trim($pg_ip,'{}');
$pg_ip = explode(",", $pg_ip);

$new_ip = array_diff($pg_ip, $old_ip);
// $response['pg_ip'] = $pg_ip;
 //$response['old_ip'] = $old_ip;
// $response['new_ip'] = $new_ip;

$errors = array();

$errors = array_unique(array_diff_assoc($pg_ip, array_unique($pg_ip)));



$response['duplicate_ip'] = $duplicate_ip;



foreach ($new_ip as $ip) 
{
	$sql = "INSERT INTO vs_providers_addr (id, ip, created) VALUES ($route, '$ip', now()) ";
	
	$result = $DB->query($sql);
	
	if ($result == false)
	{
		$errors[] = $ip;
	}
	else
	{
		$affected_rows++;
	}
}

$response['affected_rows3'] = $affected_rows;
//$response['result'] = $result;
//$response['errors'] = $errors;


if ($errors)
{
	$response['message'] = 'Error! Invalid syntax for type inet or already existing IP: ' . implode('; ', $errors);
}


if ($affected_rows > 0)
{
	$response['success'] = true;
}
else
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
}

echo json_encode($response);
