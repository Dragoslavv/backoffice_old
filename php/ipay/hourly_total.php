<?php

require_once("../../lib/php/common2.php");




$where =" WHERE true ";

$day = date('Y-m-d');


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


$where .= "AND stat_date = '$day' ";

$query = "SELECT
	SUM (CASE
	WHEN state = 'AKTIVACIJA' THEN counter
	ELSE 0
	END)
	AS \"AKTIVACIJA\",
	SUM (CASE
	WHEN state = 'REGISTRACIJA' THEN counter
	ELSE 0
	END)
	AS \"REGISTRACIJA\",
	SUM (CASE
	WHEN STATE = 'INTERESOVANJE' THEN counter
	ELSE 0
	END)
	AS \"INTERESOVANJE\"
	
FROM vs_ipay_activation_stat
	$where
";

$DB->query($query);

$result = array();


while($obj = $DB->fetch_object())
{

	$arr[] = $obj;
}


$response = array('data' => $arr);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
