<?php
require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
	${$DB->escape($key)} = $DB->escape($value);
}


if ( !$user_id || !$user_type || $_SESSION['USERDATA']["role"]=='USER')
{
	$response['success'] = false;
	echo json_encode($response);
	exit;
}

$response = array();

if($user_type == 200){

	if ( !$users_plan )
		{
			$response['success'] = false;
			$response['message'] = "Plan is mandatory!";
			echo json_encode($response);
			exit;
		}


	$id = $DB->sfetch("SELECT count(*) from vs_users where id = $user_id ");
	if($id == 1){

		$sql_insert = "INSERT INTO  vs_users_plan (id, plan_package_id) values ($user_id, $users_plan) ";

		$DB->query($sql_insert);

		$sql = "UPDATE vs_users set user_type = 200 where id = $user_id  ";

		$DB->query($sql);
		$affected_rows = $DB->affected_rows();
		if ($affected_rows > 0)
		{

			$sql = "UPDATE vs_users set user_type = $user_type where id = $user_id  ";

			$DB->query($sql);
			$affected_rows = $DB->affected_rows();
			if ($affected_rows > 0)
			{
				$sql = "UPDATE b_user set user_type = 1 where id = $billing_id  ";
				$DB->query($sql);
				$affected_rows = $DB->affected_rows();
				if ($affected_rows > 0)
				{
					$response['success'] = true;
					$response['message'] = 'User with user_id: '.$user_id.' is postpaid.';
					echo json_encode($response);
					exit;

				}else{

					$response['success'] = false;
					$response['sql'] = $sql;
					echo json_encode($response);
					exit;
				}
			}else{

				$response['success'] = false;
				$response['sql'] = $sql;
				echo json_encode($response);
				exit;
			}
				
		}
		else
		{

			$response['success'] = false;
			$response['sql'] = $sql;
			echo json_encode($response);
			exit;
		}


			$DB->close();
			
	}else{

		$response['success'] = false;
		$response['message'] = "User with that user_id doesn't exists.";
		echo json_encode($response);
		exit;
	}
		
	
	
}elseif($user_type == 300 ){

	$id = $DB->sfetch("SELECT count(*) from vs_users where id = $user_id ");
	if($id == 1){

		$sql = "UPDATE vs_users set user_type = $user_type where id = $user_id  ";

		$DB->query($sql);
		$affected_rows = $DB->affected_rows();
		if ($affected_rows > 0)
		{
			$response['success'] = true;
			$response['message'] = 'User with user_id: '.$user_id.' is prepaid year subscriber.';
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
	}else{

		$response['success'] = false;
		$response['message'] = "User with that user_id doesn't exists.";
		echo json_encode($response);
		exit;
	}
}


