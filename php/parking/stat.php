<?php

require_once("../../lib/php/common2.php");


$where = " WHERE true ";


$startday=date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');
$zone = '';



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


$where .= " AND dan >= '$startday' AND dan <= '$endday' ";


if ($zone != '' and $zone != 'ALL') $where .= " AND zone = '$zone' ";



$query = "SELECT dan, SUM(counter) as COUNTER, SUM(service_price) AS TOTAL FROM vs_parking_stat $where GROUP BY dan ORDER BY dan";

$DB->query($query);

//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	//$obj->billmin = round($obj->billmin,2);
	$arr[] = $obj;
}

$response = array('data' => $arr);
//$response['sql'] = $query;
$DB->close();
echo json_encode($response);
