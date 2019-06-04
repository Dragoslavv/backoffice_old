<?php

require_once("../../lib/php/common2.php");


class Row
{
	var $dan;
	var $SPECIAL;
	var $TRIAL;
	var $VIRTUAL;
	var $REAL_NUMBER;
	var $PROCESCOM;


	function Row($dan)
	{
		$this->dan = $dan;
		$this->SPECIAL = 0;
		$this->TRIAL = 0;
		$this->VIRTUAL = 0;
		$this->REAL_NUMBER = 0;
		$this->PROCESCOM = 0;

	}
}

function dateRange( $first, $last, $step = '+1 	dan', $format = 'm-d' ) {

	$dates = array();
	$current = strtotime( $first );
	$last = strtotime( $last );

	while( $current <= $last ) {

		$dates[] = date( $format, $current );
		$current = strtotime( $step, $current );
	}

	return $dates;
}


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

//$call_type = $DB->escape($_REQUEST['call_type']);

// $call_type = 'app2app';

$where .= " AND dan >= '$startday' AND dan <= '$endday' ";
//$where .= "AND direction NOT ILIKE 'NA%'";


$query = "SELECT to_char(dan, 'MM-DD') AS dani,SUM (CASE WHEN type = 'real' THEN counter ELSE 0 END) AS \"REAL\", SUM (CASE WHEN type = 'special' THEN counter ELSE 0 END) AS \"SPECIAL\", SUM (CASE WHEN type = 'virtual' THEN counter ELSE 0 END) AS \"VIRTUAL\" FROM vs_numbers_stat $where
GROUP BY dan ORDER BY dan";

$DB->query($query);

$result = array();

while($obj = $DB->fetch_object())
{
	//$obj->UNDELIVERED =  $obj->SENT-$obj->DELIVERED;
	$result[$obj->dani] = $obj;
}

//print_r ($result);
$result = array_values ($result);

$response = array('data' => $result);
//$response['sql'] = preg_replace('/\s\s+/', ' ', $query);

echo json_encode($response);
