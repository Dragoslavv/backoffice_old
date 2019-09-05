<?php

require_once("../../lib/php/common2.php");

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";


$startday=date('Y-m-d H:m:s', strtotime("-30 days"));
$endday = date('Y-m-d H:m:s');
$brandStat = '';

if (isset($_REQUEST['startday']) !=''){
	$startday=$_REQUEST['startday'];
}
if (isset($_REQUEST['endday']) !=''){
	$endday=$_REQUEST['endday'];
	$endday=date('Y-m-d 23:59:59', strtotime($endday));
}
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


$where .= " AND created >= '$startday' AND created <= '$endday' ";
if ($brandStat) $where .= " AND brand = '$brandStat' ";

$query = "SELECT to_char(created, 'MM-DD') AS dani,
	SUM (CASE WHEN 	\"originatorId\" = 1 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"Certus\",
	SUM (CASE WHEN 	\"originatorId\" = 2 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"Datecs\",
	SUM (CASE WHEN 	\"originatorId\" = 3 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"Štampa\",
	SUM (CASE WHEN 	\"originatorId\" = 4 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"Futura\",
	SUM (CASE WHEN 	\"originatorId\" = 5 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"DTM\",
	SUM (CASE WHEN 	\"originatorId\" = 6 THEN ROUND(\"MoneyAmount\"/100000.00) ELSE 0 END) AS \"Posta\"
	


FROM b_topup_transactions
	$where
GROUP BY dani ORDER BY dani";

$DB->query($query);


$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['query'] = $query;
$DB->close();
echo json_encode($response);
