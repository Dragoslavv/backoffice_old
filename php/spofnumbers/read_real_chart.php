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

$type = $DB->escape($_REQUEST["type"]);

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

$startday=date('Y-m-d', strtotime("-30 days"));
//$startday = date('Y-m-01');
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


$where .= " AND dan >= '$startday' AND dan <= '$endday' ";
//$where .= "AND direction NOT ILIKE 'NA%'";
if ($brandStat) $where .= " AND brand = '$brandStat' ";
if ($type) $where .= " AND type ='$type' ";
//if ($expired) $where .= " AND expired ='$expired' ";



$query = "SELECT to_char(dan, 'MM-DD') AS dan, SUM(counter) as counter

			/*SUM (CASE WHEN expired = 'FALSE' THEN counter ELSE 0 END) AS \"ACTIVE\",
			SUM (CASE WHEN expired = 'TRUE' THEN counter ELSE 0 END) AS \"EXPIRED\"*/

		FROM vs_numbers_stat_old $where GROUP BY dan, type ORDER BY dan";

$DB->query($query);

$result = array();

/*foreach (dateRange($startday, $endday) as $date )
{
	$result[$date] = new Row($date);
};
*/
while($obj = $DB->fetch_object())
{
	//$obj->UNDELIVERED =  $obj->SENT-$obj->DELIVERED;
	$result[$obj->dan] = $obj;
}

//print_r ($result);
$result = array_values ($result);

$response = array('data' => $result);
//$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
