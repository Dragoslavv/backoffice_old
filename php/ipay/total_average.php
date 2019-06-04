<?php

require_once("../../lib/php/common2.php");



//$brand_access = $_SESSION['USERDATA']["brand"];

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

//$call_type = $DB->escape($_REQUEST['call_type']);

// $call_type = 'app2app';

$where .= " AND stat_date >= '$startday' AND stat_date <= '$endday'  ";


/*$query = "  SELECT 	DATE_FORMAT(day,'%m-%d') day,
					SUM(CASE WHEN disposition = 'ANSWERED' THEN counter ELSE 0 END) ANSWERED,
					SUM(CASE WHEN disposition = 'BUSY' THEN counter ELSE 0 END) BUSY,
					SUM(CASE WHEN disposition = 'NO ANSWER' THEN counter ELSE 0 END) 'NO ANSWER',
					SUM(CASE WHEN disposition = 'FAILED' THEN counter ELSE 0 END) 'FAILED'
            FROM stat
            WHERE day >= '$startday' AND day <= '$endday' GROUP BY `day`";*/

$query = "SELECT
	SUM (CASE
	WHEN transaction_type = 'isplata' THEN amount
	ELSE 0
	END) AS \"isplata\", SUM(CASE
	WHEN transaction_type = 'isplata' THEN counter
	ELSE 0
	END)
	AS \"isplata_brojac\",
	SUM (CASE
	WHEN transaction_type = 'uplata'  THEN amount
	ELSE 0
	END) AS \"uplata\",SUM(CASE
	WHEN transaction_type = 'uplata' THEN counter
	ELSE 0
	END)
	AS \"uplata_brojac\",
	SUM (CASE
	WHEN transaction_type = 'uplata_globaltel' THEN amount
	ELSE 0
	END) AS \"uplata_globaltel\", SUM(CASE
	WHEN transaction_type = 'uplata_globaltel' THEN counter
	ELSE 0
	END)
	AS \"uplata_globaltel_brojac\"
	
FROM vs_ipay_transaction_stat
	$where";

$DB->query($query);

$arr = array();



while($obj = $DB->fetch_object())
{
	if ($obj->uplata_brojac!=0){ $obj->uplata =  round($obj->uplata/($obj->uplata_brojac),2);}
	if ($obj->isplata_brojac!=0) {$obj->isplata =  round($obj->isplata/($obj->isplata_brojac),2);}
	if ($obj->uplata_globaltel_brojac!=0) {$obj->uplata_globaltel =  round($obj->uplata_globaltel/($obj->uplata_globaltel_brojac),2);}
	$arr[] = $obj;
}

//$result = array_values ($result);

$response = array('data' => $arr);
$response['sql'] = preg_replace('/\s\s+/', ' ', $query);
$DB->close();
echo json_encode($response);
