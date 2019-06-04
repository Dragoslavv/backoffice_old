<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/


/*function escapeJsonString($value) { # list from www.json.org: (\b backspace, \f formfeed)
    $escapers = array("\\", "/", "\"", "\n", "\r", "\t", "\x08", "\x0c");
    $replacements = array("\\\\", "\\/"," ", "\\n", "\\r", "\\t", "\\f", "\\b");
    $result = str_replace($escapers, $replacements, $value);
    return $result;
}*/

/*$response['message'] = 'Zovi Tanju za update!';
$response['success'] = false;
$response['promotionid'] = $promotionid;
echo json_encode($response);

exit;*/

$groupid = $DB->escape($_POST['groupid']);
$lang = $DB->escape($_POST['lang']);
$name = $DB->escape($_POST['name']);

$record_data = json_decode($_POST['record_data']);
$set = array();
$set_text = array();

/*print_r($record_data);
	exit;*/
$params = new stdClass();
$params_lang = new stdClass();

foreach ($record_data as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
    if (($key == 'parent_id' or $key == 'dedicated_account_id' or $key == 'type'  or $key == 'group_order') && $value != '' ){
		if($value != ''){

				$set[] = $key . ' = '. $value ;
				
		}
    	
    }elseif( $key == 'visible'){
				$key_names[] = $key;
				if($value){
					//$values[] = 'TRUE';
					$set[] = $key . ' = TRUE';
					
				}else{
					//$values[] = 'FALSE';
					$set[] = $key . ' = FALSE';
				}
				
		}else{
    
    	continue;
    } 
	
}
//exit;
$params_json = json_encode($params, JSON_NUMERIC_CHECK);
$params_lang_json = json_encode($params_lang, JSON_NUMERIC_CHECK);

//$params_json_x = stripslashes($params_json);
//$params = escapeJsonString($params_json);
/*print_r($params);
	exit;*/

$set[] = ' params = \'' . $params_json .'\'';

//$set_text[] = ' params_lang = \'' . $params_lang_json .'\'';


$set = implode (', ', $set);
//$set_text = implode (', ', $set_text);

$response = array();

if ($parent_id == $groupid)
{
	$response['message'] = 'Parent ID can not be the same as Group ID!';
	$response['success'] = false;
	$response['promotionid'] = $promotionid;
}
else
{
	
	$sql = 'UPDATE promo_group SET '.$set.' WHERE id = ' . $groupid;
	// print_r($sql);
	// exit;
	// $DB->query($sql);
	//$query = "SELECT count(*) FROM promo_group_text WHERE group_id = $groupid AND lang = '$lang'";
	/*if ($DB->affected_rows() > 0)
	{*/
	//$count = $DB->sfetch("SELECT count(*) FROM promo_group_text WHERE group_id = $groupid AND lang = '$lang'");
    /*print_r($count) ;
    exit;*/
	/*if ($count > 0)
	{
		$sql = 'UPDATE promo_group_text SET '.$set_text.' WHERE group_id = '.$groupid .' AND lang = \''.$lang.'\'';
		
		$DB->query($sql);*/
	// 	if ($DB->affected_rows() > 0)
	// 	{
	// 		$response['success'] = true;
	// 		$response['sql'] = $sql;
	// 	}
	// 	else
	// 	{
	// 		$response['success'] = true;
	// 		/*$response['message'] = 'No text data changed!';
	// 		$response['success'] = false;
	// 		$response['sql'] = $sql;*/
	// 	}
	// }else
	// {
	// 	$key_names_text[] = 'params_lang';
	// 	$values_text[] = "'".$params_lang_json."'";
		
	// 	$names_text = '('.implode(",", $key_names_text);

	// //	$values_text[] = "'".$name."'";
	// 	$names_text .= ', group_id )';

	// 	$values_text[] = $groupid;

	// 	$values_text = '('.implode(",", $values_text).')';

	// 	$sql = "INSERT INTO promo_group_text $names_text VALUES $values_text ";
		/*print_r($sql) ;
    	exit;*/
	$DB->query($sql);
	if ($DB->affected_rows() > 0)
	{
		$response['success'] = true;
		$response['sql'] = $sql;

	}
	else
	{
		$response['message'] = 'No text data changed!';
		$response['success'] = false;
		$response['sql'] = $sql;
	}
	//}

		

	/*}
	else
	{
		$response['message'] = 'No data changed!';
		$response['success'] = false;
		$response['sql'] = $sql;
	}*/
	//}
}

echo json_encode($response);
