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
$key_names_text = array();
$values_text = array();
$key_names = array();
$values = array();

$params = new stdClass();

foreach ($record as $key => $value)
{

	if (($key == 'price') && $value != '' ){
			$key_names[] = $key;
			$values[] = $value*100000;	

	}elseif($value != '' and $key == 'auto_renew'){
			$key_names[] = $key;
			if($value === 't'){
				$values[] = 1;
				
			}else{
				$values[] = 0;
			}
			
	}elseif($value != '' and $key == 'visible'){
			$key_names[] = $key;
			if($value === 't'){
				$values[] = 'TRUE';
				
			}else{
				$values[] = 'FALSE';
			}
			
	}elseif($value != '' and $key == 'is_bundle'){
			$key_names[] = $key;
			if($value === 't'){
				$values[] = 'TRUE';
				
			}else{
				$values[] = 'FALSE';
			}
			
	}elseif($value != ''){
			$key_names[] = $key;
			$values[] = $value;
			
	}
	
	
	
}

$response = array();


$names = '('.implode(",", $key_names).')';

$values = '('.implode(",", $values).')';

$sql = "INSERT INTO promo_promotion $names VALUES $values";

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




echo json_encode($response);
