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
$params_lang = new stdClass();


foreach ($record as $key => $value)
{
	//${$DB->escape($key)} = $DB->escape($value);

	/*if (($key == 'name' || $key == 'description' || $key == 'lang') && $value != '' ){
		
	$key_names_text[] = $key;
	$values_text[] = "'".$value."'";
	}
	elseif ($key == 'sim_required' ){

			$params->$key = strtolower($value) == "true" ;
			

	}
	elseif (( $key == 'countries_list') && $value != '' ){
			$params_lang->$key = explode(",",$value);
			

	}elseif (($key == 'header') && $value != '' ){
			$params_lang->$key = $value;
			//$params_json = json_encode($params, JSON_NUMERIC_CHECK | JSON_HEX_QUOT);
			

	}else*/
	if($value != '' and $key == 'visible'){
			$key_names[] = $key;
			if($value === 't'){
				$values[] = 'TRUE';
				
			}else{
				$values[] = 'FALSE';
			}
			
	}
	elseif($value != ''){
			$key_names[] = $key;
			$values[] = $value;
			
	}
	
}
/*print_r($values);
exit;*/
$params_json = json_encode($params, JSON_NUMERIC_CHECK);
$params_lang_json = json_encode($params_lang, JSON_NUMERIC_CHECK);

$key_names[] = 'params';
$values[] = "'".$params_json."'";

/*$key_names_text[] = 'params_lang';
$values_text[] = "'".$params_lang_json."'";*/

$response = array();


$names = '('.implode(",", $key_names).')';

$values = '('.implode(",", $values).')';

//$sql = "INSERT INTO promo_promotion $names VALUES $values RETURNING id";

//$last_id = $DB->sfetch("INSERT INTO promo_group $names VALUES $values ");

/*print_r($sql);
exit;*/

// if ($last_id)
// 	{
		/*$response['success'] = true;
		$response['id'] = $last_id;*/
// $names_text = '('.implode(",", $key_names_text).', group_id )';

// $values_text[] = $last_id;

// $values_text = '('.implode(",", $values_text).')';

$sql = "INSERT INTO promo_group $names VALUES $values ";

$DB->query($sql);

$affected_rows = $DB->affected_rows();

if ($affected_rows > 0)
{
	$response['success'] = true;
}
else
{
	$response['message'] = 'Error2!';
	$response['success'] = false;
	$response['sql'] = $sql;
}

	// }
	// else
	// {
	// 	$response['message'] = 'Error1!';
	// 	$response['success'] = false;
	// 	$response['id'] = $last_id;
	// }



echo json_encode($response);
