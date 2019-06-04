<?php

require_once("../../lib/php/common.php");

$record = json_decode($_POST['record']);

$set = array();

foreach ($record as $key => $value)
{
	$key = $DB->escape($key);
	$value = $DB->escape($value);
	$$key = $value;
}

$response = array();

if (!$id || !in_array($status, array(-1,1)))
{
	$response['message'] = 'Wrong data!';
	$response['success'] = false;
}
else
{
	if ($status == 1)
	{
		$DB->query("BEGIN");
		$sql = "UPDATE `autorenewlog` SET `status` = '$status' WHERE `id` = '$id' AND status = 0 ";
		$DB->query($sql);
		if ($DB->affected_rows() > 0)
		{
			$operator_id = $_SESSION['USER_ID'];
			$sql = "INSERT INTO `order_log_dev` (`user_id`, `billing_id`, `number`, `type`, `operator_id`, `credit`) SELECT `user_id`, `billing_id`, `number`, 'autorenew', '$operator_id', `amount` FROM autorenewlog WHERE id = '$id' ";
			$DB->query($sql);
			if ($DB->affected_rows() > 0)
			{
				$DB->query("COMMIT");
				$response['success'] = true;
			}
			else
			{
				$DB->query("ROLLBACK");
				$response['success'] = false;
			}
		}
		else
		{
			$DB->query("ROLLBACK");
			$response['success'] = false;
		}
	}
	elseif ($status == -1)
	{
		$DB->query("BEGIN");
		// change status
		$sql = "UPDATE `autorenewlog` SET `status` = '$status' WHERE `id` = '$id' AND status = 0 ";
		$DB->query($sql);
		if ($DB->affected_rows() > 0)
		{
			// refund
			list($billing_id, $number, $amount) = $DB->afetcha("SELECT billing_id, `number`, amount FROM autorenewlog WHERE id = '$id'");
			$sql = "UPDATE billing SET credit = credit + $amount WHERE id = '$billing_id' ";
			$DB->query($sql);
			if ($DB->affected_rows() > 0)
			{
				// send message
				$message = "VirtualSim in-app purchase you have tried has failed. You have been refunded $amount$. We are very sorry for the inconvenience.";
				$formattedDate = date("m/d/Y H:i:s A");
				$received_at = date("Y-m-d H:i:s");
				$hash = "vsim_maintenance" + $number + $message + $formattedDate;
				$sql = "INSERT INTO `messages` (`id`, `from`, `to`, `text`, `app_id`, `hash`, `received_at`) VALUES (NULL, 0, '$number', '$message', 0, SHA2('$hash', 256), '$received_at') ON DUPLICATE KEY UPDATE `resend` = resend+1;";
				$DB->query($sql);
				if ($DB->affected_rows() > 0)
				{
					$DB->query("COMMIT");
					$response['success'] = true;
				}
				else
				{
					$DB->query("ROLLBACK");
					$response['success'] = false;
				}
			}
			else
			{
				$DB->query("ROLLBACK");
				$response['success'] = false;
			}
		}
		else
		{
			$DB->query("ROLLBACK");
			$response['success'] = false;
		}
	}
}

echo json_encode($response);
