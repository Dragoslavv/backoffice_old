<?php

require_once("../../lib/php/common2.php");

error_reporting(0);

$offset = ($_REQUEST["start"] == null)? 0 : $_REQUEST["start"];
$limit = ($_REQUEST["limit"] == null)? 25 : $_REQUEST["limit"];

$billing_id = $DB->escape($_REQUEST['billing_id']);
$name_exit = $DB->escape($_REQUEST['name_exit']);
$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');



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
if (!$billing_id)
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

if ($name_exit == 'exit' ) {

	exit;
}

function format_value(&$val)
{
	global $DB;
	$val = trim($val, '{}');
	$val = explode (',', $val);

	foreach ($val as $key => $value) {
		//{
		$account_name = $DB->sfetch("SELECT account_name FROM b_account_profile where id = $key");
		$divide_unit = $DB->sfetch("SELECT divide_unit FROM b_account_profile where id = $key");
		$unit = $DB->sfetch("SELECT unit FROM b_account_profile where id = $key");
		
		if($value!=0){
			$arr_billing[$key] = $key+1 . ". " . round($value/$divide_unit, 3)." ". $unit." ". $account_name ;
		}
			
	}
	/*print_r($arr_billing);
	exit;*/
	//return $arr_billing = implode("\n", $arr_billing);
	$val = implode("\n", $arr_billing);
};

$log_start = str_replace('T', ' ', $log_start);


$log_end = str_replace('T', ' ', $log_end);

$where = ' WHERE TRUE  AND t.billing_profile_id = 26';

$where .= " AND t.account_id = '$billing_id' ";

$where .= "  AND  d.created_at >= '$log_start' AND created_at <= '$log_end' ";

$sql ="SELECT t.id as paymentid, t.committed  as committed , t.committed  as committed2 ,  t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, max(d.meta_data) as meta_data, max(p.name) as name, max(r.result_name) as result_name FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result   $where GROUP BY t.id order by t.id DESC OFFSET $offset LIMIT $limit";


$DB->query($sql);

$arr = array();

while($obj = $DB->fetch_object())
{
	
    $arr[] = $obj;
}
foreach($arr as $key )
{
	
	format_value($key->committed);
    
}

$total = $DB->sfetch("SELECT count(distinct t.id) FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result  $where  ");
//$sql = "SELECT count(distinct t.id) FROM b_transaction t JOIN b_transaction_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result  $where  ";
/*print_r($sql);
exit;*/
$response = array('data' => $arr);
//$response['sql'] = $sql;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
