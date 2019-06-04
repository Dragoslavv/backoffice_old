<?php

require_once("../../lib/php/common2.php");




$where =" WHERE true ";

$startday = date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');


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


$where .= " AND stat_date >= '$startday' AND stat_date <= '$endday'  ";

$query = "SELECT
	SUM (CASE
	WHEN transaction_type = 'isplata' THEN amount
	ELSE 0
	END)
	AS \"isplata\",
	SUM (CASE
	WHEN transaction_type = 'uplata' THEN amount
	ELSE 0
	END)
	AS \"uplata\",
	SUM (CASE
	WHEN transaction_type = 'uplata_globaltel' THEN amount
	ELSE 0
	END)
	AS \"uplata_globaltel\"
	
FROM vs_ipay_transaction_stat
	$where";

$DB->query($query);

$arr = array();



while($obj = $DB->fetch_object())
{

	$arr[] = $obj;
}

//$result = array_values ($result);

$response = array('data' => $arr);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
