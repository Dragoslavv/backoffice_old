<?php

require_once("../../lib/php/common2.php");

$startday=date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');
$package_id = '';



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

//$call_type = $DB->escape($_REQUEST['call_type']);

$where = " WHERE true AND stat_date >= '$startday' AND stat_date <= '$endday' AND package_id not in (1,4) ";

if ($package_id != '' and $package_id != 'ALL') $where .= " AND package_id = '$package_id'  ";
if ($package_group_id != '' and $package_group_id != 'ALL') $where .= " AND package_group_id = '$package_group_id'  ";
if ($free_of_charge != '' and $free_of_charge != 'ALL') $where .= " AND free_of_charge = '$free_of_charge'  ";


if ($route) $where .= " AND route = '$route' ";

$query = "SELECT stat_date,SUM (CASE
	WHEN action in ( 1, 2) THEN counter
	ELSE 0 END)
	AS \"Total Activated\",
	SUM (CASE
	WHEN action = 1 THEN counter
	ELSE 0 END)
	AS \"Activation\",
	SUM (CASE
	WHEN action = 2 THEN counter
	ELSE 0
	END)
	AS \"Renew\",
	SUM (CASE
	WHEN action = 3 THEN counter
	ELSE 0
	END)
	AS \"Deactivation\"
	
FROM package_stat $where
	
GROUP BY stat_date ORDER BY stat_date";

$DB->query($query);

//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	//$obj->billmin = round($obj->billmin,2);
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $query;
$DB->close();
echo json_encode($response);
