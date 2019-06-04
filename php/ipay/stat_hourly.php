<?php

require_once("../../lib/php/common2.php");

$brand_access = $_SESSION['USERDATA']["brand"];

$where = " WHERE true ";


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

//$call_type = $DB->escape($_REQUEST['call_type']);

$where .= "  AND stat_date = '$day'";




$query = "SELECT
	stat_hour as hour,
	SUM (CASE
	WHEN state = 'AKTIVACIJA' THEN counter
	ELSE 0
	END)
	AS \"ACTIVATED\",
	SUM (CASE
	WHEN state = 'REGISTRACIJA' THEN counter
	ELSE 0
	END)
	AS \"REGISTRATED\",
	SUM (CASE
	WHEN STATE = 'INTERESOVANJE' THEN counter
	ELSE 0
	END)
	AS \"INTERESTED\"
FROM vs_ipay_activation_stat
	$where
GROUP BY stat_hour ORDER BY stat_hour";

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
