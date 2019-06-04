<?php

require_once("../../lib/php/common2.php");


//$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

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

/*$start = (isset($_REQUEST["start"]) && $_REQUEST["start"])?$DB->escape($_REQUEST["start"]):0;
$limit = (isset($_REQUEST["limit"]) && $_REQUEST["limit"])?$DB->escape($_REQUEST["limit"]):20;
$sort = (isset($_REQUEST["sort"]) && $_REQUEST["sort"]!='')?$DB->escape($_REQUEST["sort"]):"";
$dir = (isset($_REQUEST["dir"]) && $_REQUEST["dir"] == "DESC")?"DESC":"";
*/
$where .= " AND stat_date >='$startday' AND stat_date <= '$endday' ";


//if ($code != '' && $code != 'ALL') $where.=" AND code = '$code' ";

$query = " SELECT to_char(stat_date, 'MM-DD') AS dan, sum(total_data) as total_data, sum(average_data)*1000 as average_data, sum(average_only_data)*1000 as average_data_total	FROM vs_data_stat $where GROUP BY stat_date  order by stat_date ";
/*print_r($query);
exit;*/

/*if ($sort!="") $query .= " `$sort` ";

$query .= " LIMIT $offset, $limit ";
*/
$DB->query($query);

//$total = $DB->found_rows();

$arr = array();
while($obj = $DB->fetch_object())
{
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $query;
$DB->close();
echo json_encode($response);
