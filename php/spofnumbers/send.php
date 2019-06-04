<?php

require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$brand_access = $_SESSION['USERDATA']["brand"];

if($brand_access != 'Virtual SIM') $brand = $brand_access;

if ($special_offer_regions_id == '' || $reserved == '' || $type == '' || $provider == '' || $price_id === '' || $special_offer_cities_id == '' || $brand == '')
{
	echo '{success:false, file:'.json_encode($_FILES['number']['name']).'}';
	exit;
}

$uploadfile = $_FILES['number']['tmp_name'];

//$affected_rows = 0;

if (is_uploaded_file($uploadfile))
{
	$pattern = "/^[0-9]{7,}$/";
	$rows_in_query = 0;
	$handle = @fopen($uploadfile, "r");

$query = "CREATE RULE vs_special_offer_numbers_errors_on_duplicate_ignore AS ON INSERT TO vs_special_offer_numbers_errors
  WHERE EXISTS (SELECT 1 FROM vs_special_offer_numbers_errors WHERE \"number\"=NEW.\"number\")
  DO INSTEAD NOTHING ";
$DB->query($query);

	if ($handle)
	{
		while (($numbers = fgetcsv($handle)) !== FALSE)
		{
			$number = trim($numbers[0], " +\t\n\r\0\x0B");

			if (preg_match($pattern, $number))
			{
				if($rows_in_query == 0)
				{
				  	$query = "INSERT INTO vs_special_offer_numbers_errors (\"number\", special_offer_regions_id, reserved, type, provider, price_id, quarantine, special_offer_cities_id, brand) VALUES ";
			  	}
			  	else
			  	{
			    	$query .= ",";
			  	}

			  	$query .= " ('$number', '$special_offer_regions_id', '$reserved', '$type',  '$provider', '$price_id', '$quarantine','$special_offer_cities_id', '$brand') ";
			  	$rows_in_query++;

			    if($rows_in_query == 1000)
			    {
				    $DB->query($query);
				    //$affected_rows += $DB->affected_rows();
				    $rows_in_query = 0;
			    }
		  	}
		}
		fclose($handle);
	}
	if($rows_in_query > 0)
	{
		$DB->query($query);
		//echo $query;
		//$affected_rows += $DB->affected_rows();
	}


$query="DROP RULE vs_special_offer_numbers_errors_on_duplicate_ignore ON vs_special_offer_numbers_errors";

$DB->query($query);

	$sql = "UPDATE vs_special_offer_numbers_errors SET status = 0 WHERE \"number\" IN (SELECT \"number\" FROM vs_special_offer_numbers)";
	$DB->query($sql);

	$insert_error = $DB->affected_rows();

	$query = "CREATE RULE vs_special_offer_numbers_on_duplicate_ignore AS ON INSERT TO vs_special_offer_numbers
	  WHERE EXISTS(SELECT 1 FROM vs_special_offer_numbers WHERE \"number\"=NEW.\"number\")
	  DO INSTEAD NOTHING ";

	 $DB->query($query);

	$sql = "INSERT INTO vs_special_offer_numbers SELECT \"number\", special_offer_regions_id, reserved, type, provider, price_id, quarantine, special_offer_cities_id, brand FROM vs_special_offer_numbers_errors WHERE status = 1";
	$DB->query($sql);

	$insert_ok = $DB->affected_rows();

    $query="DROP RULE vs_special_offer_numbers_on_duplicate_ignore ON vs_special_offer_numbers";

    $DB->query($query);

	$sql = "DELETE FROM vs_special_offer_numbers_errors WHERE status = 1";
	$DB->query($sql);

	$response = array();
	$response['success'] = true;
	$response['inserted'] = $insert_ok;
	$response['errors'] = $insert_error;
	$response['file'] = $_FILES['number']['name'];

	echo json_encode($response);

	// echo '{success:true, inserted: ' . $insert_ok . ' errors: ' . $insert_error . ', file:'.json_encode($_FILES['number']['name']).'}';
}
else
{
	echo '{success:false, file:'.json_encode($_FILES['number']['name']).'}';
}
