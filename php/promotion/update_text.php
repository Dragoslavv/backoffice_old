<?php

require_once("../../lib/php/common2.php");
/*
$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();
*/

$promotionid = $DB->escape($_POST['promotionid']);


$record = json_decode($_POST['record']);
$set = array();
$set_text = array();

$params = new stdClass();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
    if ($key == 'id' ) continue;

	if($value != ''){

			$set[] = $key . " = '$value'" ;
			
	}

	
}

$set = implode (', ', $set);
//$set_text = implode (', ', $set_text);

$response = array();

if ( !$set)
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
	$response['promotionid'] = $promotionid;

}
else
{

	
	$sql = 'UPDATE promo_text SET '.$set.' WHERE id = '.$id ;
	/* print_r($sql) ;
	exit;*/
	$DB->query($sql);
	if ($DB->affected_rows() > 0)
	{
		$response['success'] = true;
	}
	else
	{
		$response['success'] = true;
		$response['message'] = 'No text data changed!';
		$response['success'] = false;
		$response['sql'] = $sql;
	}

	
}

echo json_encode($response);
