<?php

require_once("../../lib/php/common2.php");

$where = " WHERE true ";

$startday=date('Y-m-d', strtotime("-30 days"));
//$startday = date('Y-m-01');
$endday = date('Y-m-d');
$brandStat = '';
/*$direction = '';
$route = '';*/

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
//$where .= "AND direction NOT ILIKE 'NA%'";


$query = "SELECT SUM (CASE WHEN type = 'real' THEN counter ELSE 0 END) AS \"real\", SUM (CASE WHEN type = 'special' THEN counter ELSE 0 END) AS \"special\", SUM (CASE WHEN type = 'virtual' THEN counter ELSE 0 END) AS \"virtual\", SUM (CASE WHEN type = 'virtual' THEN price_output ELSE 0 END) AS \"virtual_price\",SUM (CASE WHEN type = 'special' THEN price_output ELSE 0 END) AS \"special_price\" FROM vs_numbers_stat $where ";

$DB->query($query);

$result = array();

while($obj = $DB->fetch_object())
{
	$obj->special_price =  round($obj->special_price, 2).' RSD';
	$obj->virtual_price =  round($obj->virtual_price, 2).' RSD';
	$result[$obj->dan] = $obj;
}

//print_r ($result);
$result = array_values ($result);

$response = array('data' => $result);
//$response['sql'] = preg_replace('/\s\s+/', ' ', $query);

echo json_encode($response);
