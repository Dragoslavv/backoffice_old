<?php

require_once("../../lib/php/common2.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];


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

if (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '')
{
	$sort = array();
	$ar = json_decode($_REQUEST['sort']);
	foreach ($ar as $ob)
	{
		$property = $DB->escape($ob->property);
		$direction = $DB->escape($ob->direction);
		$sort[] = " `$property` $direction ";
	}
	$sort = implode (', ', $sort);
}
else
{
	$sort = '';
}

$where = " WHERE true ";

if ($log_start == '')
{
	$log_start = date('Y-m-d 00:00:00');
}
else
{
	$log_start = str_replace('T', ' ', $log_start);
}

if ($log_end == '')
{
	$log_end = date('Y-m-d 23:59:59');
}
else
{
	$log_end = str_replace('T', ' ', $log_end);
}


$where .= " AND trans.start_datetime >= '$log_start' AND  trans.start_datetime <='$log_end' ";

if ($user_id != '') $where.=" AND trans.user_id = '$user_id' ";
if ($state != '') $where.=" AND trans.state = '$state' ";
if ($transfer_type != '') $where.=" AND trans.transfer_type = '$transfer_type' ";


//$query = " SELECT  * FROM vs_pay_pink_aik $where order by id OFFSET $offset LIMIT $limit";

$query = "SELECT trans.id, trans.user_id, trans.amount, emony.purpose_of_transaction, trans.currency, trans.state, trans.transfer_type, tp.type, trans.response_transfer_id, trans.start_datetime, emony.debit_account, emony.core_transactionid, vauch.state_description from vs_ipaywallet_transfers trans LEFT JOIN vs_ipaywallet_transfers_create_emony emony on trans.id = emony.transfer_id  LEFT JOIN vs_ipaywallet_transfers_emony_voucher vauch on vauch.emony_id = emony.id left join  vs_ipaywallet_transfers_type tp on trans.transfer_type = tp.id  $where order by trans.start_datetime OFFSET $offset LIMIT $limit ";

$total = $DB->sfetch("SELECT count(*) FROM vs_ipaywallet_transfers trans $where  ");

/*if ($sort!="") $query .= " ORDER BY $sort ";

$query .= " LIMIT $start, $limit ";
*/
$DB->query($query);

$arr = array();

while($obj = $DB->fetch_object())
{

	$obj->amount = round($obj->amount);
	$arr[] = $obj;
}

$response = array('data' => $arr);
$response['query'] = $query;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
