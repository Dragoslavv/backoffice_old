<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$record = json_decode($_POST['record']);
/*
$this_id = $_SESSION["USER_ID"];

if (!$this_id or $_REQUEST["name"] == '' or $_REQUEST["lang"] == '')
{
	echo '{success:false}';
	exit;
}*/

$key_names = array();
$values = array();
$response = array();

foreach ($record as $key => $value)
{
    ${$DB->escape($key)} = $DB->escape($value);
	
	if($value != '' and $key != 'promotionid'){
			$key_names[] = $key;
			$values[] = "'".$value."'";
			
	}elseif($value != '' and $key = 'promotionid'){
		$key_names[] = 'promotion_id';
		$values[] = $value;
		//$promotion_id = $value;

	}	

	
}

if ($lang == '' and $promotionid == '')
{
	echo '{success:false}';
	exit;
}

$count = $DB->sfetch("SELECT count(*) FROM promo_text WHERE promotion_id = $promotionid AND lang = '$lang' ");
/*$x = "SELECT count(*) FROM promo_text WHERE promotion_id = $promotionid AND lang = $lang";
print_r($x);*/
if ($count > 0)
{
	$response['message'] = 'Promotion with that ID and Language alredy exists!';
	$response['success'] = false;
	/*echo json_encode($response);
	exit;*/
}
else 
{
	$names = '('.implode(",", $key_names).')';

	$values = '('.implode(",", $values).')';

	$sql = "INSERT INTO promo_text $names VALUES $values";

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
		$response['sql'] = $sql;
	}

}








echo json_encode($response);
