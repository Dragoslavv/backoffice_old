<?php

require_once("../../lib/php/common2.php");


$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
$brand = '';

if (isset($_REQUEST['filter']) && $_REQUEST['filter'] != '')
{
	$filter = json_decode($_REQUEST['filter']);
	foreach ($filter as $f)
	{
		$property = $DB->escape($f->property);
		$value = $DB->escape($f->value);
		$$property = $value;
	}
}
$brand_access = $_SESSION['USERDATA']["brand"];

$where = " WHERE true ";

$log_start = str_replace('T', ' ', $log_start);

$log_end = str_replace('T', ' ', $log_end);


$where .= " AND activation_time >= '$log_start' AND activation_time <= '$log_end'  and status = 1 and activation_time is not null ";


$counter = $DB->sfetch("SELECT COUNT(msisdn) as counter from mb_sim $where ");


$response['counter'] = $counter;


echo json_encode($response);
