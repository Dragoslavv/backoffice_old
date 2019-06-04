<?php

require_once("../../lib/php/common2.php");

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

$billing_id = $DB->escape($_REQUEST['billing_id']);
$name_exit = $DB->escape($_REQUEST['name_exit']);


if (!$billing_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
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

if ($name_exit == 'exit' ) {

	exit;
}

$where = ' WHERE TRUE  AND t.billing_profile_id IN (4,6,7,8,9,19,22,23, 27, 28, 29, 32, 36)';

$where .= " AND t.account_id = '$billing_id' ";

if ($name != '' && $name != 'ALL') $where.=" AND p.name = '$name' ";

$sql ="SELECT t.id as paymentid, account_id, array_to_json(t.committed)  as committed ,  t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, max(d.meta_data) as meta_data, max(p.name) as name, max(r.result_name) as result_name FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result   $where GROUP BY t.id order by t.id DESC OFFSET $offset LIMIT $limit";

$total = $DB->sfetch("SELECT count(distinct t.id) FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result  $where  ");


$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
	$committed = json_decode($obj->committed);
	
	$obj->cash = $committed[0]/(-100000);
	$obj->data = $committed[1];
	$obj->voice = $committed[2];
	$obj->sms = $committed[3];
    $arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $sql;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
