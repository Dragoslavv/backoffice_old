<?php

require_once("../../lib/php/common2.php");

$number = '';
$email = '';
$user_id = '';
$brand = '';
$billing_id='';

$brand_access = 'globaltel';

$where = " WHERE true  ";

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

if ($number=='exit')
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}

if (!$number && !$email && !$user_id && !$billing_id && $key=='value' )
{
	$response = array('data' => array());
	echo json_encode($response);
	exit;
}



if ($number)
	{
		
		$where .= " AND u.id = (SELECT user_id FROM vs_numbers WHERE number = $number ) ";
	}


if ($email)
{
	$where .= " AND u.email ilike '%$email%' ";
}


if ($user_id)
{
	$where .= " AND u.id = '$user_id' ";
}

if ($billing_id)
{
	$where .= " AND u.billing_id = '$billing_id' ";
}

$sql = $query = "SELECT u.id user_id, u.email, u.created, u.active, t.desc as user_type, first_name::text || ' ' || last_name::text AS name, b.id billing_id, u.brand, b.balances, b.reservations FROM vs_users u JOIN b_user b ON u.billing_id = b.id left join vs_users_type t on u.user_type = t.user_type  $where  LIMIT 1";

$DB->query($sql);

$arr = array();

function format_value(&$val)
{
	$val = trim($val, '{}');
	$val = explode (',', $val);
	foreach ($val as $key => $value) {
		if($key==0)
		{
			$val[$key] = $key+1 . ".\t" . $value/100000;
		}elseif($key==1 or $key==4 or $key==5 or $key==6 or $key==7 or $key==8 or $key==9 or $key==10)
		{
			$val[$key] = $key+1 . ".\t" . round($value/1000000000,5) ."\tGB";
		}
		else{
			
		$val[$key] = $key+1 . ".\t" . $value;
		}
	}
	$val = implode("\n", $val);
};

while($obj = $DB->fetch_object())
{

	format_value($obj->balances);
	format_value($obj->reservations);
    $arr[] = $obj;
}

$response = array('data' => $arr);
$response['sql'] = $query;
$DB->close();

echo json_encode($response);
