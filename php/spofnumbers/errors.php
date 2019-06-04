<?php

require_once("../../lib/php/common2.php");

$start = (isset($_REQUEST['start']) && $_REQUEST['start']) ? $DB->escape($_REQUEST['start']) : 0;
$limit = (isset($_REQUEST['limit']) && $_REQUEST['limit']) ? $DB->escape($_REQUEST['limit']) : 25;

$where = " WHERE true";


if (isset($_REQUEST['filter']) && $_REQUEST['filter'] != '')
{
	$filter = json_decode($_REQUEST['filter']);
	foreach ($filter as $f)
	{
		$property = $DB->escape($f->property);
		$value = $DB->escape($f->value);
		if ($value != '') $where .= " AND $property = $value ";
	}
}

$sql = "SELECT * FROM vs_special_offer_numbers_errors $where OFFSET $start LIMIT $limit";

$total = $DB->sfetch(" SELECT count(*) FROM vs_special_offer_numbers_errors $where ");

$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
    $arr[] = $obj;
}

$response = array('data' => $arr, 'total' => $total);
$response['sql'] = $sql;
$DB->close();
echo json_encode($response);

