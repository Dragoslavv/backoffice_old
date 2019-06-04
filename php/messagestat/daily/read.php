<?php

require_once("../../../lib/php/common2.php");

class Row
{
	var $day;
	var $DELIVERED;
	var $UNDELIVERED;

	function Row($day)
	{
		$this->day = $day;
		$this->DELIVERED = 0;
		$this->UNDELIVERED = 0;

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

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND b.name = '$brand_access' " : " WHERE true ";


$startday = date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');
$brand = '';
//$direction = '';
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

//$call_type = $DB->escape($_REQUEST['call_type']);

// $call_type = 'app2app';

$where .= " AND day >= '$startday' AND day <= '$endday' ";
//$where .= "AND direction NOT ILIKE 'NA%'";
if ($brand != '' && $brand != 'ALL') $where .= " AND m.brand = '$brand' ";
if ($type != '' && $type != 'ALL') 
{
	switch ($type) {
    case "0":
        $where .= " AND type = 0 ";
        break;
    case "1":
        $where .= " AND type in ('1', '100') ";
        break; 
  }
}
if ($direction != '' && $direction != 'ALL')
{
    switch ($direction) {
    case "APP":
        $where .= " AND state in ('201', '301', '401', '-201', '-301','-401') ";
        break;
    case "SMS":
        $where .= " AND state in ('202', '302', '402','-202', '-302','-402') ";
        break;
    case "WEB":
        $where .= " AND state in ('203', '303', '403','-203', '-303','-403') ";
        break;
    
}
	
}

/*$query = "  SELECT 	DATE_FORMAT(day,'%m-%d') day,
					SUM(CASE WHEN disposition = 'ANSWERED' THEN counter ELSE 0 END) ANSWERED,
					SUM(CASE WHEN disposition = 'BUSY' THEN counter ELSE 0 END) BUSY,
					SUM(CASE WHEN disposition = 'NO ANSWER' THEN counter ELSE 0 END) 'NO ANSWER',
					SUM(CASE WHEN disposition = 'FAILED' THEN counter ELSE 0 END) 'FAILED'
            FROM stat
            WHERE day >= '$startday' AND day <= '$endday' GROUP BY `day`";*/

$query = "SELECT to_char(day, 'MM-DD') AS day,SUM (CASE WHEN state in ('401','402', '403') THEN counter ELSE 0 END) AS \"DELIVERED\",
	SUM (CASE WHEN state  in ('-301', '-302', '-303')  THEN counter ELSE 0 END)
	AS \"UNSUCCESSFULLY SENT\",
	SUM (CASE WHEN state  in ('-401','-402', '-403')  THEN counter ELSE 0 END)
	AS \"UNSUCCESSFULLY DELIVERED\",
SUM (CASE WHEN state  in ('201','202', '203')  THEN counter ELSE 0 END)
	AS \"RECEIVED\",
SUM (CASE WHEN state  in ('301','302', '303')  THEN counter ELSE 0 END)
	AS \"SENT\"
FROM msg_stat m JOIN vs_brand b on m.brand =b.id
	$where 
GROUP BY day ORDER BY day";

$DB->query($query);

$result = array();

foreach (dateRange($startday, $endday) as $date )
{
	$result[$date] = new Row($date);
};

while($obj = $DB->fetch_object())
{
	//$obj->UNDELIVERED =  $obj->SENT-$obj->DELIVERED;
	$result[$obj->day] = $obj;
}

$result = array_values ($result);

$response = array('data' => $result);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);

echo json_encode($response);
