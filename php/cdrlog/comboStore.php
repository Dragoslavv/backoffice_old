<?php

require_once("../common2.php");

$database = $DB->escape($_REQUEST["database"]);

if ($database != '') $DB->select($database);

$table = $DB->escape($_REQUEST["table"]);
$valueField = $DB->escape($_REQUEST["valueField"]);
$displayField = stripslashes($DB->escape($_REQUEST["displayField"]));
$orderField = (isset($_REQUEST["orderField"]) && $_REQUEST["orderField"]!='')?$DB->escape($_REQUEST["orderField"]):$valueField;
$sort = (isset($_REQUEST["sort"]) && $_REQUEST["sort"]!='')?$DB->escape($_REQUEST["sort"]):'';

$queryFilter = (isset($_REQUEST["queryFilter"]) && $_REQUEST["queryFilter"]!='')?$DB->escape($_REQUEST["queryFilter"]):'';

if ($queryFilter != '') $where = " WHERE $queryFilter ";
else $where = '';

$query = " SELECT DISTINCT $valueField AS value, $displayField AS display FROM `$table` $where ORDER BY $orderField $sort ";

$DB->query($query);

$arr = array();

if (isset($_REQUEST["beforeFields"]) && $_REQUEST['beforeFields'] != '')
{
  $beforeFields = $DB->escape($_REQUEST["beforeFields"]);
  $beforeFields = explode('|', $beforeFields);
  foreach ($beforeFields as $field)
  {
    $valdis = explode(':', $field);
    $display = $valdis[0];
    if (isset($valdis[1]))
    {
      $value = $valdis[1];
    }
    else
    {
      $value = $valdis[0];
    }
    $arr[] = array
    (
      'value' => $value,
      'display' => $display
    );
  }
}
