<?php

require_once("../../../lib/php/common2.php");

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND b.name = '$brand_access' " : " WHERE true ";

$day = date('Y-m-d');
$brand = '';
$direction = '';
//$route = '';

if (isset($_REQUEST['filter']) && $_REQUEST['filter'] != '')
{
	$filter = json_decode($_REQUEST['filter']);
	foreach ($filter as $f)
	{
		$property = $DB->escape($f->property);
		$value = $DB->escape($f->value);
		$$property = $value;
	}
};

//$direction = $DB->escape($_REQUEST['direction']);

//$where .= "AND direction NOT ILIKE 'NA%'";

$where .= " AND day = '$day'";
if ($brand!= '' && $direction != 'ALL') $where .= " AND m.brand = '$brand' ";

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
//if ($route) $where .= " AND route = '$route' ";
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


$query = "SELECT hour,SUM (CASE WHEN state in ('401','402', '403') THEN counter ELSE 0 END) AS \"DELIVERED\",
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
GROUP BY hour ORDER BY hour";

$DB->query($query);

//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
   $obj->UNDELIVERED =  $obj->SENT-$obj->DELIVERED;
	$arr[] = $obj;
}

$response = array('data' => $arr);
//$response['query'] = $query;

echo json_encode($response);
