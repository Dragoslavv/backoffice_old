<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$response = array();

$brand_access = $_SESSION['USERDATA']["brand"];

if ($brand_access != 'Virtual SIM')
{
	$brand= $brand_access;
}

if ( $exchange_rate == '') $exchange_rate =1;

if ( $name == '')
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}
else
{
	$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_brand WHERE name = '$name' ");
	if ($duplicate)
	{
		$response['message'] = 'Brand with same name exists!';
		$response['success'] = false;
	}
	else
	{

	   	$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"];

		$sql = "INSERT INTO vs_brand (name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate ) VALUES ('$name', '$pass', '$certificate_name', '$google_api_key', '$google_gcm_link', '$certificate_location', '$certificate_name_ios8', '$exchange_rate' )";
 

		$DB->query($sql);

		$brand_id = $DB->insert_id();

		$affected_rows = $DB->affected_rows();

			if ($affected_rows > 0)
			{

				$query = "INSERT INTO vs_brand_log (brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, modified_by, update_time ) SELECT id as brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, '$modified_by', now() FROM  vs_brand WHERE id = $brand_id";

				  $DB->query($query);
	              if ($DB->affected_rows() > 0)
				{

					$response['success'] = true;
				}
				else
				{
					$response['message'] = 'Error!';
					$response['success'] = false;
					//$response['sql'] = $sql;
				}
			}
			else
			{
				$response['message'] = 'Error!';
				$response['success'] = false;
				//$response['sql'] = $sql;
			}

	}
}
$DB->close();

echo json_encode($response);
