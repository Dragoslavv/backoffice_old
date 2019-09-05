<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);

$set = array();
$set_version = array();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
	if($key != 'id')
	{
		$set[] = " $key = '$value' ";
	}
}

$set = implode (', ', $set);


//$id = json_decode($_POST['id']);

$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"].' id: '.$_SESSION['USER_ID'];


$response = array();

if (!$id || !$set)
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
}
else
{
	$duplicate = $DB->sfetch("SELECT COUNT(*) FROM vs_brand WHERE name = '$name' AND id != '$id' ");
	if ($duplicate)
	{
		$response['message'] = 'Name exists!';
		$response['success'] = false;
	}
	else
	{
		$duplicate_id = $DB->sfetch("SELECT COUNT(*) FROM vs_brand_log WHERE brand_id = '$id' ");

		if ($duplicate_id==0)
		{
			 $query = "INSERT INTO vs_brand_log (brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, modified_by, update_time ) SELECT id as brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, '$modified_by', now() FROM  vs_brand WHERE id = $id ";/* VALUES ('$brand_id','$name', '$pass', '$certificate_name', '$google_api_key', '$google_gcm_link', '$certificate_location', '$certificate_name_ios8', '$exchange_rate', '$modified_by', now() )";*/
			 $DB->query($query);
		}

		$sql = "UPDATE vs_brand SET $set WHERE id = '$id'";
		 $DB->query($sql);
		
		if ($DB->affected_rows() > 0)
		{
			    $query = "INSERT INTO vs_brand_log (brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, modified_by, update_time ) SELECT id as brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, '$modified_by', now() FROM  vs_brand WHERE id = $id";

				  $DB->query($query);

	              if ($DB->affected_rows() > 0)
				{

					$response['success'] = true;
				}
				else
				{
					$response['message'] = 'Error!';
					$response['success'] = false;
					//$response['sql'] = $query;
				}
			
				
		}
		else
		{
			$response['message'] = 'No data changed!';
			$response['success'] = false;
		}
	}
}

echo json_encode($response);
