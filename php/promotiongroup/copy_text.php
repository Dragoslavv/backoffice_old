<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/

$id = $DB->escape($_REQUEST['id']);
$group_id = $DB->escape($_REQUEST['group_id']);

$response = array();

if ($id == '' or $group_id == '' )
{
	echo '{success:false}';
	exit;
}

$lang = $DB->sfetch("SELECT lang FROM promo_group_text WHERE id = $id ");

$count = $DB->sfetch("SELECT count(*) FROM promo_group_text WHERE group_id = $group_id AND lang = '$lang' ");
/*print_r($lang);
exit;*/
if ($count > 0)
{
	$response['message'] = 'Promotion with that ID and Language alredy exists!';
	$response['success'] = false;
	/*echo json_encode($response);
	exit;*/
}
else 
{
	$sql = "INSERT INTO  promo_group_text (group_id, name, description, lang, params_lang) SELECT $group_id, name, description, lang, params_lang FROM promo_group_text WHERE id = $id ";

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
