<?php

require_once("../../lib/php/common2.php");


$startday=date('Y-m-d', strtotime("-30 days"));
$endday = date('Y-m-d');
$package_id = '';



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

$where = " WHERE true AND stat_date >= '$startday' AND stat_date <= '$endday' AND package_id not in (1,4)";

if ($package_id != '' and $package_id != 'ALL') $where .= " AND package_id = '$package_id'  ";
if ($package_group_id != '' and $package_group_id != 'ALL') $where .= " AND package_group_id = '$package_group_id'  ";
if ($free_of_charge != '' and $free_of_charge != 'ALL') $where .= " AND free_of_charge = '$free_of_charge'  ";


if ($route) $where .= " AND route = '$route' ";

$query = "SELECT sum(counter) as brojac, p.name, g.name as group from package_stat s left join promo_text p on s.package_id = p.promotion_id left join promo_group_text g on s.package_group_id = g.group_id  $where and action in (1, 2) and p.lang = 'sr' and g.lang = 'sr' group by p.name,  g.name order by brojac desc ";

/*$total = $DB->sfetch(" SELECT count(*) FROM package_stat s left join promo_text p on s.package_id = p.promotion_id $where  and action in (1, 2)  and lang = 'sr'  group by name");*/
$DB->query($query);



//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	//$obj->billmin = round($obj->billmin,2);
	$arr[] = $obj;
}
$response = array();
$response['data'] = $arr;
$response['sql'] = $query;
//$response['total'] = $total;
$DB->close();
echo json_encode($response);
