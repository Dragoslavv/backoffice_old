<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_HOST = "188.120.127.246";
$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_PORT	= "5432";

$DB = new pgsql();*/


$table_name = $_REQUEST['table_name'];
$id = $_REQUEST['promotionid'];
$groupid = $_REQUEST['groupid'];
$lang = $_REQUEST['language'];
$field_name = $_REQUEST['field_name'];
$field_value = $_REQUEST['field_value'];

if($id!=''){
	if ($lang != '') {
		$where = "  WHERE promotion_id = $id AND lang = '$lang'";
	}else{

	$where = " WHERE id = $id"; 
	}
	
}
if($groupid!=''){
	if ($lang != '') {
		$where = "  WHERE group_id = $groupid AND lang = '$lang'";
	}else{

	$where = " WHERE id = $groupid"; 
	}
}


$query = " UPDATE $table_name SET $field_name = '$field_value' $where ";

//print_r($query);

$DB->query($query);

if ($DB->affected_rows() > 0)
{
	$response['success'] = true;
	$response['message'] = 'Json data changed!';
}
else
{
	$response['message'] = 'No text data changed!';
	$response['success'] = false;
	$response['sql'] = $sql;
}
$DB->close();
echo json_encode($response);
