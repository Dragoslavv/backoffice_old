<?php

require_once("../../lib/php/common2.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

if (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '')
{
	$sort = array();
	$ar = json_decode($_REQUEST['sort']);
	foreach ($ar as $ob)
	{
		$property = $DB->escape($ob->property);
		$direction = $DB->escape($ob->direction);
		$sort[] = " $property $direction ";
	}
	$sort = implode (', ', $sort);
	$sort = " ORDER BY $sort ";
}
else
{
	$sort = ' ORDER BY t.id ';
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');
$cash_type = '';
$data_type = '';
//$created_at = date('Y-m-d');

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


$where = " WHERE true ";

	$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);



$where .= "  AND  m.status = 1 AND activation_time >= '$log_start' AND activation_time <= '$log_end' ";


	//$where .= "AND t.billing_profile_id IN (6,7,8,9,19) ";

if ($cash_type != ''){ 
	if($cash_type == '< 5000000')
	{ 
		$where .= "AND balances[1] $cash_type AND balances[1] > 0 ";
	}else
	{
		$where .= "AND balances[1] $cash_type "; 
	}
		
}

if ($data_type != ''){ 
	if($data_type == '<= 4000000000')
	{ 
		$where .= "AND balances[2] $data_type AND balances[2] > 10000000 ";
	}else
	{
		$where .= "AND balances[2] $data_type "; 
	}
		
}

if($msisdn !='')
	{ 
		$where .= "AND msisdn = $msisdn ";
	}

$query = "SELECT msisdn, u.id as user_id, b.id as account_id, balances[1]/100000 as cash, ROUND(balances[2]::numeric/1000000000, 3) as data, balances, activation_time, m.status from mb_sim m left join vs_numbers n on m.msisdn = n.number left join vs_users u on n.user_id = u.id left join b_user b on u.billing_id = b.id $where  order by m.activation_time OFFSET $offset LIMIT $limit";

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";

$total = $DB->sfetch(" SELECT count(msisdn) from mb_sim m left join vs_numbers n on m.msisdn = n.number left join vs_users u on n.user_id = u.id left join b_user b on u.billing_id = b.id $where  ");


$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	 //$balances = json_decode($obj->balances);

	$obj->activation_time = date('Y-m-d H:i:s', strtotime($obj->activation_time));
	$obj->data = $obj->data .' GB';
    $arr[] = $obj;
}

// print_r($arr);

// echo implode(",", $arr);

//$response = '{"total":' . $total . ',"data":[' . implode(",", $arr) . ']}';

$response = array();
$response['total'] = $total;
$response['query'] = $query;
$response['data'] = $arr;

//echo $response;
//echo (implode(",", $arr));
$DB->close();
echo json_encode($response);
