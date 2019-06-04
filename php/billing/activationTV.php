<?php
require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}


if ( !$user_id || $_SESSION['USERDATA']["role"]=='USER')
{
	$response['success'] = false;
	echo json_encode($response);
	exit;
}

$position = strpos ($email,'@');
$msisdn = substr($email,0,$position);

$response = array();

if($checked == 'true'){

	$user_type = $DB->sfetch("SELECT user_type from vs_users where id = $user_id");

	if ( $user_type == 100 )
	{
		$sql = "UPDATE vs_users set user_type = 300 where id = $user_id  ";
		$DB->query($sql);

	}


	$active_check = $DB->sfetch("SELECT status from mb_sim where msisdn = $msisdn and activation_time is not null ");

	if($active_check == 1 ){

		$request = file_get_contents("http://10.245.208.5:9292/card_shop_subscribe?user_id=$user_id&promotion_id=$package_id&duration=$duration&is_free=true");

	}else{

		$msisdn_check = $DB->sfetch("SELECT msisdn from mb_sim where msisdn = $msisdn  ");
		if ( $msisdn_check != $msisdn )
		{
			$response['success'] = false;
			$response['message'] = "MSISDN is not sim number!";
			echo json_encode($response);
			exit;
		}

		if ( !$msisdn )
		{
			$response['success'] = false;
			echo json_encode($response);
			exit;
		}


		$id = $DB->sfetch("SELECT count(*) from subscriber_whitelist where msisdn = $msisdn and packet_id = $package_id ");

		if($id == 1){
			$response['success'] = false;
			$response['message'] = "Success! MSISDN with that package is already in subscriber whitelist.";
			echo json_encode($response);
			exit;
		}else{


			$iccid = $DB->sfetch("SELECT iccid from mb_sim where msisdn = $msisdn ");
			$iccid = trim($iccid);

			$sql = "INSERT INTO subscriber_whitelist (user_id, msisdn, iccid, packet_id, time_of_activation, number_of_mounts) values ($user_id, '$msisdn', '$iccid', $package_id, null, $duration)";

			$DB->query($sql);
			$affected_rows = $DB->affected_rows();
			if ($affected_rows > 0)
			{
				$response['success'] = true;
				$response['message'] = 'Success! User with msisdn: '.$msisdn.' is in subscribers whitelist.';
				echo json_encode($response);
				exit;

			}
			else
			{
				$response['success'] = false;
				$response['sql'] = $sql;
				echo json_encode($response);
				exit;
			}


			$DB->close();
		}
		
	}
	
}elseif($checked == 'false' or $checked == ''){


	$request = file_get_contents("http://10.245.208.5:9292/promotion_request?user_id=$user_id&promotion_id=$package_id&action=1&auto_renew=true&free_of_charge=true&comment=gui");
	
}

	$result = json_decode($request);


	if ($result->result == 'SUCCESS') {

		$response['success'] = true;
		$response['message'] = 'Package '.$package_id.' for user is activated';
		$response['text'] = $request;

	} else {

	    $response['success'] = false;
		$response['message'] = "Something went wrong";
		$response['text'] = $request;

	}

	echo json_encode($response);

