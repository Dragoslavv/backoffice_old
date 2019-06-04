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
	$sort = 'ORDER BY stat_hour ';
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


$where = " WHERE true";


if ($stat_date == '')
{
	$stat_date = date('Y-m-d');
}
else
{
	$stat_date = str_replace('T', ' ', $stat_date);
}

/*if ($log_end == '')
{
	$log_end = date('Y-m-d');
}
else
{
	$log_end = str_replace('T', ' ', $log_end);
}
*/
/*$start = (isset($_REQUEST["start"]) && $_REQUEST["start"])?$DB->escape($_REQUEST["start"]):0;
$limit = (isset($_REQUEST["limit"]) && $_REQUEST["limit"])?$DB->escape($_REQUEST["limit"]):20;
$sort = (isset($_REQUEST["sort"]) && $_REQUEST["sort"]!='')?$DB->escape($_REQUEST["sort"]):"";
$dir = (isset($_REQUEST["dir"]) && $_REQUEST["dir"] == "DESC")?"DESC":"";
*/
$where .= " AND stat_date ='$stat_date'  ";


//if ($stat_date != '' ) $where.=" AND stat_date = '$stat_date' ";

$query = " SELECT stat_hour, sum(counter) as counter FROM mb_sim_stat $where  GROUP BY stat_hour $sort ";
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
//$response['sql'] = $query;

echo json_encode($response);
