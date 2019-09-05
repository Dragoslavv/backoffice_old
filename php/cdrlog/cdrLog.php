<?php

error_reporting(0);

require_once("../../ussdlib/common2.lib.php");
require_once("../../ussdlib/mysql2.php");

$start = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$count = ($_REQUEST["limit"] == null)? 30 : $_REQUEST["limit"];
$sort = ($_REQUEST["sort"] == null)? "" : $_REQUEST["sort"];
$dir = ($_REQUEST["dir"] == "DESC")? "DESC" : "";

$where = " `call_a` != '' AND `call_b` != '' ";

if($_REQUEST["call_a"] != '') {

    $call_a = trim($DB2->escape($_REQUEST["call_a"]));
    $where .= " AND `call_a` = '+$call_a' " ;
}

if($_REQUEST["call_b"] != '') {

    $call_b = trim($DB2->escape($_REQUEST["call_b"]));
    $where .= " AND `call_b` = '+$call_b' " ;
}

if($_REQUEST["dst"] != '' && $_REQUEST["dst"] != 'ALL') {

    $dst = trim($DB2->escape($_REQUEST["dst"]));
    $where .= " AND `dst` = '$dst' " ;
}

if($_REQUEST["dcontext"] != '' && $_REQUEST["dcontext"] != 'ALL') {

    $dcontext = trim($DB2->escape($_REQUEST["dcontext"]));
    $where .= " AND `dcontext` = '$dcontext' " ;
}

if($_REQUEST["lastapp"] != '' && $_REQUEST["lastapp"] != 'ALL') {

    $lastapp = trim($DB2->escape($_REQUEST["lastapp"]));
    $where .= " AND `lastapp` = '$lastapp' " ;
}

if($_REQUEST["disposition"] != '' && $_REQUEST["disposition"] != 'ALL') {

    $disposition = trim($DB2->escape($_REQUEST["disposition"]));
    $where .= " AND `disposition` = '$disposition' " ;
}

if($_REQUEST["start_date"] != '') {

    $start_date = trim($DB->escape($_REQUEST["start_date"]));
    $where .= " AND calldate >= '" . date('Y-m-d H:i:s',strtotime($start_date)) . "' ";
}
else
{
    $where .= " AND calldate >= '" . date('Y-m-01 00:00:00') . "' ";
}

if($_REQUEST["end_date"] != '') {

    $end_date = trim($DB->escape($_REQUEST["end_date"]));
    $where .= " AND calldate <= '" . date('Y-m-d H:i:s',strtotime($end_date)) . "' ";
}
else
{
    $where .= " AND calldate <= '" . date('Y-m-d 23:59:59') . "' ";
}

$query = "SELECT SQL_CALC_FOUND_ROWS `id`, `call_a`, `call_b`, `calldate`, `dst`, `dcontext`,   `lastapp`, `duration`, `billsec`, `disposition`, `answer`, `end` FROM cdr WHERE ".$where;

//$query .= " GROUP BY row_id ";

if ($sort != "") {

	$query .= " ORDER BY $sort $dir ";

}

$query .= " LIMIT ".$start.",".$count;

$DB2->query($query);

$total = $DB2->found_rows();

$arr = array();

while($obj = $DB2->fetch_object()) {
	$arr[] = $obj;

}

echo $query;
echo '{"total":"'.$total.'","data":'.json_encode($arr).'}';

