<?php

require_once("../../lib/php/common2.php");

class Row
{
	var $day;
	var $REGISTRATED;
	var $ACTIVATED;
	var $INTERESTED;
	

	function Row($day)
	{
		$this->day = $day;
		
		$this->REGISTRATED = 0;
		$this->ACTIVATED = 0;
		$this->INTERESTED = 0;
		
	}
}

function dateRange( $first, $last, $step = '+1 day', $format = 'm-d' ) {

	$dates = array();
	$current = strtotime( $first );
	$last = strtotime( $last );

	while( $current <= $last ) {

		$dates[] = date( $format, $current );
		$current = strtotime( $step, $current );
	}

	return $dates;
}


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
	to_char(stat_date, 'MM-DD') AS day,
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
GROUP BY day";

$DB->query($query);

$result = array();

foreach (dateRange($startday, $endday) as $date )
{
	$result[$date] = new Row($date);
};

while($obj = $DB->fetch_object())
{
	//$obj->billmin = (int)($obj->billmin);
	$result[$obj->day] = $obj;
}

$result = array_values ($result);

$response = array('data' => $result);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
