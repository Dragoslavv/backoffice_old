<?php

require_once("../../lib/php/common.php");

$exchange_rate = json_decode($_POST['exchange_rate']);

$brand_access = $_SESSION['USERDATA']["brand"];
$role = $_SESSION['USERDATA']["role"];
$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"].' id: '.$_SESSION['USER_ID'];


if($brand_access=='Virtual SIM')
{
	$response['message'] = 'Change exchange rate in brand tab!';
	$response['success'] = false;
}
else
{
	$brand_id = $DB->sfetch("SELECT id FROM vs_brand WHERE name = '$brand_access' ");
	
	$sql = "UPDATE vs_brand SET exchange_rate= '$exchange_rate' WHERE name = '$brand_access'";
		 $DB->query($sql);

	if ($DB->affected_rows() > 0)
	{	 

		$query = "INSERT INTO vs_brand_log (brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, exchange_rate, modified_by, update_time ) SELECT id as brand_id, name, pass, certificate_name, google_api_key, google_gcm_link, certificate_location, certificate_name_ios8, '$exchange_rate', '$modified_by', now() FROM  vs_brand WHERE id = $brand_id ";
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





echo json_encode($response);
