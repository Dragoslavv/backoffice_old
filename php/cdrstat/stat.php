<?php

require_once("../../lib/php/common2.php");

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND brand = '$brand_access' " : " WHERE true ";


$day = date('Y-m-d');
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

//$call_type = $DB->escape($_REQUEST['call_type']);

$where .= "  AND day = '$day'";

if ($accountcode_name != '' && $accountcode_name != 'ALL') $where .= " AND call_type = '$accountcode_name' ";
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
if ($route) $where .= " AND route = '$route' ";
/* {display: 'app2tel', value:"('13','15','17')\"},
                    {display: 'tel2app', value:"('5','7','9')"},
                    {display: 'sim2tel', value:"('14','16','18')"},
                    {display: 'tel2sim', value:"('6','8','10')"}*/

/*$query = "SELECT
	hour,
	sum(billsec) billsec,
	sum(answered) \"ANSWERED\",
	sum(busy) \"BUSY\",
	sum(no_answer) \"NO ANSWER\",
	sum(failed) \"FAILED\",
	sum(congestion) \"CONGESTION\"
FROM
(SELECT
	hour,
	CASE
	WHEN disposition = 'answered' THEN billsec
	ELSE 0
	END
	AS billsec,
	CASE
	WHEN disposition = 'answered' THEN counter
	ELSE 0
	END
	AS answered,
	CASE
	WHEN disposition = 'busy' THEN counter
	ELSE 0
	END
	AS busy,
	CASE
	WHEN disposition = 'NO ANSWER' THEN counter
	ELSE 0
	END
	AS no_answer,
	CASE
	WHEN disposition = 'FAILED' THEN counter
	ELSE 0
	END
	AS failed,
	CASE
	WHEN disposition = 'CONGESTION' THEN counter
	ELSE 0
	END
	AS congestion
FROM vs_stat
	$where) AS tmp
GROUP BY hour";*/
$query = "SELECT
	hour,
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
GROUP BY hour ORDER BY hour";

$DB->query($query);

//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	$obj->billmin = round($obj->billmin,2);
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $query;
$DB->close();
echo json_encode($response);
