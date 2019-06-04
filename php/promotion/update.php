<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/


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
    if (($key == 'price' or $key == 'duration' or $key == 'promo_group_id' ) && $value != '' ){
		if (($key == 'price') && $value != '' ){

				$set[] = $key . ' = '. $value*100000;	

		}
		elseif($value != ''){

				$set[] = $key . ' = '. $value ;
				
		}
    	
    }elseif( $key == 'auto_renew'){
				$key_names[] = $key;
				if($value){
					//$values[] = 'TRUE';
					$set[] = $key . ' = 1';
					
				}else{
					//$values[] = 'FALSE';
					$set[] = $key . ' = 0';
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
				
		}elseif( $key == 'is_bundle'){
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

$set = implode (', ', $set);
//$set_text = implode (', ', $set_text);

$response = array();

if (!$promotionid || !$set)
{
	$response['message'] = 'No data changed!';
	$response['success'] = false;
	$response['promotionid'] = $promotionid;
}
else
{
	
	$sql = 'UPDATE promo_promotion SET '.$set.' WHERE id = ' . $promotionid;
	/*print_r($sql);
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
