<?php

require_once("../../lib/php/common2.php");



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
	$sort = 'ORDER BY dan ';
}


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


if ($startday == '')
{
	$startday = date('Y-m-d', strtotime("-30 days"));
}
else
{
	$startday = str_replace('T', ' ', $startday);
}


if ($endday == '')
{
	$endday = date('Y-m-d');
}
else
{
	$endday = str_replace('T', ' ', $endday);
}



if ($end == true){

	$where .= " AND dan >='$startday' AND dan <= '$endday'  ";
	
}else{

	$where .= " AND dan ='$endday'  ";
}


//if ($code != '' && $code != 'ALL') $where.=" AND code = '$code' ";

$query = "SELECT totalsum, name from (SELECT  ROUND(sum(payment_sum)/-100000.00) as totalsum, name from b_transaction_stat s left join b_billing_profile b on s.transaction_type_id = b.id $where  and transaction_type_id in ('6','7','8','9', '23','37', '32') group by transaction_type_id , name
union
SELECT  ROUND(sum(payment_sum)/-100000.00) as totalsum, 'Total' from b_transaction_stat $where  and transaction_type_id in ('6','7','8','9', '23','37', '32')
union
SELECT  (ROUND(sum(payment_sum)/-100000.00) - (SELECT  ROUND(sum(payment_sum)/100000.00)  from b_transaction_stat $where  and transaction_type_id =36)) as totalsum, 'Telekom' from b_transaction_stat $where  and transaction_type_id in ('6','7','8','9', '23','37', '32')  ) tmp order by totalsum  ";

$DB->query($query);

$arr = array();


while($obj = $DB->fetch_object())
{
	
	$arr[] = $obj;
}




$response = array('data' => $arr);
$response['sql'] = $query;
$DB->close();
echo json_encode($response);
