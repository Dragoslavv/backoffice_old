<?php

require_once("../../lib/php/common2.php");

class Row
{
	var $day;
	var $ANSWERED;
	var $BUSY;
	var $NOANSWER;
	var $FAILED;
	var $CONGESTION;

	function Row($day)
	{
		$this->day = $day;
		$this->billmin=0;
		$this->ANSWERED = 0;
		$this->BUSY = 0;
		$this->NOANSWER = 0;
		$this->FAILED = 0;
		$this->CONGESTION = 0;
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

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

$startday = date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');
$accountcode_name = '';
$route = '';

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


$where .= " AND day >= '$startday' AND day <= '$endday'  ";

if ($accountcode_name != ''&& $accountcode_name != 'ALL') $where .= " AND call_type = '$accountcode_name' ";
if ($route) $where .= " AND route = '$route' ";
if ($type != ''&& $type != 'ALL') {
	switch ($type) {
	    case 'tel2app':
	        $where .= " AND call_type in ('5','7','9') ";
	        break;
	    case 'app2tel':
	        $where .= " AND call_type in ('13','15','17') ";
	        break;
	    case 'sim2tel':
	         $where .= " AND call_type in ('14','16','18') ";
	        break;
	    case 'tel2sim':
	         $where .= " AND call_type in ('6','8','10') ";
	        break;
         case 'tvlive':
	         $where .= " AND brand = 'tvlive' ";
	        break;
	    case 'allip-3d':
	         $where .= " AND brand = 'allip-3d' ";
	        break;
    }
}
if ($in_type != ''&& $in_type != 'ALL') {
	switch ($in_type) {
	    case 'inbound':
	        $where .= " AND call_type in ('5','6', '7','8','9','10') ";
	        break;
	    case 'outbound':
	        $where .= " AND call_type in ('13','15','17', '14','16','18', '21', '22', '31', '33') ";
	        break;
        case 'out_international':
	        $where .= " AND call_type in ('19', '20') ";
	        break;
	    case 'in_international':
	        $where .= " AND call_type in ('11','12') ";
	        break;
	    
    }
}

$query = "SELECT
	to_char(day, 'MM-DD') AS day,
	SUM (CASE
	WHEN disposition = 'ANSWERED' THEN CAST(billsec AS FLOAT)/60
	ELSE 0
	END)
	AS billmin,
	SUM (CASE
	WHEN disposition = 'ANSWERED' THEN counter
	ELSE 0
	END)
	AS \"ANSWERED\",
	SUM (CASE
	WHEN disposition = 'BUSY' THEN counter
	ELSE 0
	END)
	AS \"BUSY\",
	SUM (CASE
	WHEN disposition = 'NO ANSWER' THEN counter
	ELSE 0
	END)
	AS \"NO_ANSWER\",
	SUM (CASE
	WHEN disposition = 'FAILED' THEN counter
	ELSE 0
	END)
	AS \"FAILED\",
	SUM (CASE
	WHEN disposition = 'CONGESTION' THEN counter
	ELSE 0
	END)
	AS \"CONGESTION\"
FROM vs_stat
	$where and call_type <> ''
GROUP BY day";

$DB->query($query);

$result = array();

foreach (dateRange($startday, $endday) as $date )
{
	$result[$date] = new Row($date);
};

while($obj = $DB->fetch_object())
{
	$obj->billmin = (int)($obj->billmin);
	$result[$obj->day] = $obj;
}

$result = array_values ($result);

$response = array('data' => $result);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
