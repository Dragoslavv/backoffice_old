<?php

require_once("../../lib/php/common2.php");

/*$PGSQL_USER = "postgres";
$PGSQL_PASS = "";
$PGSQL_DB	= "vsim_bo";
$PGSQL_HOST = "95.216.75.251";
$PGSQL_PORT	= "5432";

$DB = new pgsql();
*/
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
$type = '';
$brand = '';
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

$brand_access = $_SESSION['USERDATA']["brand"];

$where = $brand_access != 'Virtual SIM' ? " WHERE true AND t.brand = '$brand_access' " : " WHERE true ";

	$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);



$where .= " AND created_at >= '$log_start' AND created_at <= '$log_end' ";

//$where = " WHERE TRUE AND d.created_at::date = '$created_at' ";

/*if ($type == '10' or $type == '4' or $type == '24' or $type == '12' or $type == '3' or $type == '14' )
{
	$where .= "AND t.billing_profile_id = '$type' ";
}
else*/if ($type == '') 
{
	$where .= "AND t.billing_profile_id IN (6,7,8,9,19,32,23) ";
}
else
{
	//$where .= "AND t.billing_profile_id IN (6,7,8,9,19) ";

	if ($type != ''){

		if ($type == 333){

			$where .= "AND t.billing_profile_id  = '33' AND committed[1] > 0 ";
		}elseif($type == 33){

        $where .= "AND t.billing_profile_id  = '$type' AND committed[1] = 0 ";

		}else{

			$where .= "AND t.billing_profile_id  = '$type'";
		}

	} 
}

if ($brand)
{
	$where .= " AND t.brand = '$brand' ";
}
//NOT IN (1,2,3,4,5,10,11,12, 13, 14) 

/*$query = "SELECT row_to_json(r) as json from 
(select t.id, t.account_id, ROUND(t.committed/-100000.00,3) as committed, t.brand, t.billing_profile_id, p.name, array_agg(d.*) as detail from b_transaction t join b_transaction_detail d on t.id=d.transaction_id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where  group by t.id, p.name $sort OFFSET $offset LIMIT $limit) r";*/

$query = " SELECT t.id as paymentid, account_id, array_to_json(t.committed) as committed, t.brand, t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, d.meta_data, p.name FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where GROUP BY t.id, d.meta_data,p.name $sort OFFSET $offset LIMIT $limit";
//nice!! select tmp2.*, x.id, x.price from (SELECT count(committed) as counter, committed[1] as committed, name from (SELECT  committed, t.brand,  p.name, t.id FROM b_transaction t JOIN b_transaction_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id where   created_at >= '2017-09-26 00:00:00' AND created_at <= '2017-09-28 23:59:59' and t.billing_profile_id = 33 and committed[1]>1000 group by  t.brand,  p.name,t.id) as tmp group by name, committed) as tmp2 join promo_promotion x on x.price = tmp2.committed 

//$query = " SELECT *, \"count\" (*) OVER () AS total FROM vs_cdr $where ";

$total = $DB->sfetch(" SELECT count(distinct t.id) FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id $where ");



/*if ($sort!="") $query .= " ORDER BY `$sort` $dir ";

$query .= " LIMIT $start, $limit ";*/

$DB->query($query);

$arr = array();
while($obj = $DB->fetch_object())
{
	 $committed = json_decode($obj->committed);
	
	$obj->cash = $committed[0]/(-100000);
	$obj->data = $committed[1]/(-1000000).' MB';
	$obj->voice = $committed[2];
	$obj->sms = $committed[3];
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
