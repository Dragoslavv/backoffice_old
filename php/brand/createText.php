<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);
$record1 = array();

foreach ($record as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}


$response = array();


$brand = 'globaltel';

if ( $key == '' or $script == '' or $value == '' or $lang == '')
{
	$response['message'] = 'Insufficient data!';
	$response['success'] = false;
}
else
{
	

	   //	$modified_by = $_SESSION['USERDATA']["firstname"]. ' '.$_SESSION['USERDATA']["lastname"];

		$sql = "INSERT INTO vs_texts (key, value, lang, brand, script ) VALUES ('$key_gui', '$value_gui', '$lang', '$brand', '$script')";
 

		$DB->query($sql);

		//$brand_id = $DB->insert_id();

		$affected_rows = $DB->affected_rows();

			if ($affected_rows > 0)
			{
					$response['success'] = true;
					$response['sql'] = $sql;
			
			}
			else
			{
				$response['message'] = 'Error!';
				$response['success'] = false;
				$response['sql'] = $sql;
			}


}
$DB->close();

echo json_encode($response);
