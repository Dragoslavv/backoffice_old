<?php

require_once("../../lib/php/common2.php");

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

$endday = date('Y-m-d');
$brandStat = '';


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


$where .= " AND dan = '$endday'";
if ($brandStat) $where .= " AND brand = '$brandStat' ";

$query = "SELECT sat,
	SUM (CASE WHEN transaction_type_id = '6' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"GooglePlay\",
	SUM (CASE WHEN transaction_type_id = '7' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"iTunes\",
	SUM (CASE WHEN transaction_type_id = '8' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPal\",
	SUM (CASE WHEN transaction_type_id = '9' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPalWeb\",
	SUM (CASE WHEN transaction_type_id = '23' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"TopUp\",
	SUM (CASE WHEN transaction_type_id = '4' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"gui\",
	SUM (CASE WHEN transaction_type_id = '32' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPinkAik\"
	


FROM b_transaction_stat
	$where
GROUP BY sat ORDER BY sat";

$DB->query($query);


$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}

$response = array('data' => $arr);
//$response['query'] = $query;
$DB->close();
echo json_encode($response);
