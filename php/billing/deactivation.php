<?php

require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}

$password_hash = $DB->sfetch("SELECT md5('$password')");

if ( !$password || !$user_id || $password_hash != $_SESSION['USERDATA']["password"])
{
	$response['success'] = false;
	echo json_encode($response);
	exit;
}


$response = array();

if ( $active == 't')

{

   $sql = "UPDATE vs_users SET active = FALSE WHERE id = '$user_id' ";

}
else 
{
	$sql = "UPDATE vs_users SET active = TRUE WHERE id = '$user_id' ";
}

$DB->query($sql);

$msisdn = $DB->sfetch(" SELECT \"number\"  FROM vs_numbers  WHERE user_id = $user_id and type in ('sim','app_sim') limit 1");
$count = $DB->sfetch(" SELECT count(*)  FROM mb_sim  WHERE msisdn = $msisdn ");

$test = " SELECT \"number\"  FROM vs_numbers  WHERE user_id = $user_id and type in ('sim','sim_app') limit 1";

if($count<1){

	$response['success'] = true;
	$response['sql'] = $test;
	echo json_encode($response);
	exit;
}



if ( $active == 't')

{

   $sql = "UPDATE mb_sim SET status = 2 WHERE msisdn = $msisdn ";

}
else 
{
	$sql = "UPDATE mb_sim SET status = 1 WHERE msisdn = $msisdn";
}

$DB->query($sql);


$affected_rows = $DB->affected_rows();

if ($affected_rows > 0)
		{
			$response['success'] = true;
			//$response['sql'] = $sql;
			//$response['id'] = $id;
			
		}
		else
		{
			//$response['message'] = 'Error!';
			$response['success'] = false;
			$response['sql'] = $sql;
		}


$DB->close();

echo json_encode($response);
