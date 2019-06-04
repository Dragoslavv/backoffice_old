<?php

require_once("../../lib/php/common2.php");

$ids = array();

foreach ($_REQUEST['ids'] as $id)
{
	$id = $DB->escape($id);
	$ids[] = $id;
}

if (!$ids)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

$ids = implode (', ', $ids);

$where = ' WHERE 1 ';

$where .= " AND user_id IN ($ids) ";

$sql = "SELECT SQL_CALC_FOUND_ROWS order_log_dev.*, CONCAT(operators.firstname, ' ',operators.lastname) as operator
		FROM order_log_dev LEFT JOIN operators
		ON order_log_dev.operator_id = operators.id $where";

$DB->query($sql);
$total = $DB->found_rows();

$arr = array();

while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}

$response = array('data' => $arr, 'total' => $total);
//$response['sql'] = $sql;
$DB->close();
echo json_encode($response);
