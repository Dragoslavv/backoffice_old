<?php

require_once("../../lib/php/common2.php");

error_reporting(0);

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

$where = ' WHERE TRUE  AND t.billing_profile_id IN (4,6,7,8,9,19,22,23, 27, 28, 29, 32, 36)';

$where .= " AND t.account_id = '$billing_id' ";

if ($name != '' && $name != 'ALL') $where.=" AND p.name = '$name' ";
//if ($brand != '') $where.=" AND brand = '$brand' ";

/*$sql = "SELECT *, p.id, p.name, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at , to_char(expires_at, 'YYYY-MM-DD HH24:MI:SS') as expires_at, ROUND(committed/-100000.00,2) as committed, ROUND(amount/-100000.00,2) as amount FROM b_transaction t JOIN b_transaction_detail d ON d.transaction_id = t.id JOIN b_transaction_result r ON r.id = d.result JOIN b_billing_profile p ON p.id = t.billing_profile_id $where ORDER BY to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') DESC";
*/

/*$sql ="SELECT t.id as paymentid, account_id, ROUND(t.committed/-100000.00,3) as committed , t.brand, t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, d.meta_data, p.name, r.result_name FROM b_transaction t JOIN b_transaction_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result   $where GROUP BY t.id, d.meta_data,p.name, r.result_name order by t.id DESC";
*/
$sql ="SELECT t.id as paymentid, account_id, t.committed as committed ,  t.billing_profile_id, to_char(min(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as start , to_char(max(d.created_at), 'YYYY-MM-DD HH24:MI:SS') as end, max(d.meta_data) as meta_data, max(p.name) as name, max(r.result_name) as result_name FROM b_transactions t JOIN b_transactions_detail d ON d.transaction_id = t.id JOIN b_billing_profile p ON t.billing_profile_id = p.id JOIN b_transaction_result r ON r.id = d.result   $where GROUP BY t.id order by t.id DESC OFFSET $offset LIMIT $limit";




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

$response = array('data' => $arr);
//$response['sql'] = $sql;
$response['total'] = $total;
$DB->close();
echo json_encode($response);
