<?php

require_once("../../lib/php/common2.php");



class Row
{
	var $dan;
	var $GooglePlay;
	var $iTunes;
	var $PayPal;
	var $PayPalWeb;
	var $TopUp;
	var $gui;
	var $AIK_Banka;
	var $Bazaar;


	function Row($dan)
	{
		$this->dan = $dan;
		$this->GooglePlay = 0;
		$this->iTunes = 0;
		$this->PayPal = 0;
		$this->PayPalWeb = 0;
		$this->AIK_Banka = 0;
		$this->TopUp = 0;
		$this->gui = 0;
		$this->Bazaar = 0;

	}
}

/*function dateRange( $first, $last, $step = '+1 	dan', $format = 'm-d' ) {

	$dates = array();
	$current = strtotime( $first );
	$last = strtotime( $last );

	while( $current <= $last ) {

		$dates[] = date( $format, $current );
		$current = strtotime( $step, $current );
	}

	return $dates;
}*/

//$expired = $DB->escape($_REQUEST["expired"]);

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";

$startday=date('Y-m-d', strtotime("-30 days"));
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
//if ($brandStat) $where .= " AND brand = '$brandStat' ";



$query = "SELECT to_char(dan, 'MM-DD') AS dani, 

	SUM (CASE WHEN transaction_type_id = '6' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"GooglePlay\",
	SUM (CASE WHEN transaction_type_id = '7' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"iTunes\",
	SUM (CASE WHEN transaction_type_id = '8' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPal\",
	SUM (CASE WHEN transaction_type_id = '9' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPalWeb\",
	SUM (CASE WHEN transaction_type_id = '23' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"TopUp\",
	SUM (CASE WHEN transaction_type_id = '4' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"gui\",
	SUM (CASE WHEN transaction_type_id = '32' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"PayPinkAik\"
	
		
		FROM b_transaction_stat $where GROUP BY dan ORDER BY dan";

$DB->query($query);


$result = array();

//$dates=dateRange($startday, $endday);

/*foreach ($dates as $date )
{
	//$result[$date] = new Row($date);
	continue;
};
*/
/*$response= array($query);
echo json_encode($response);*/

while($obj = $DB->fetch_object())
{
	$result[$obj->dani] = $obj;
}

$result = array_values ($result);

$response = array('data' => $result);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
