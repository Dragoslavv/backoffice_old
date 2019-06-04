<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$id = $DB->escape($_REQUEST['id']);
$promotion_id = $DB->escape($_REQUEST['promotion_id']);


if ($id == '' or $promotion_id == '' )
{
	echo '{success:false}';
	exit;
}

$lang = $DB->sfetch("SELECT lang FROM promo_text WHERE id = $id ");

$count = $DB->sfetch("SELECT count(*) FROM promo_text WHERE promotion_id = $promotion_id AND lang = '$lang' ");

if ($count > 0)
{
	$response['message'] = 'Promotion with that ID and Language alredy exists!';
	$response['success'] = false;
	/*echo json_encode($response);
	exit;*/
}
else 
{
	$sql = "INSERT INTO  promo_text (promotion_id, name, description, activate_msg, deactivate_msg, renew_msg, lang, params_lang, notifications, depleted_msg) SELECT $promotion_id, name, description, activate_msg, deactivate_msg, renew_msg, lang, params_lang, notifications, depleted_msg FROM promo_text WHERE id = $id ";

	$DB->query($sql);

	$response = array();


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
