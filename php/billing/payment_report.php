<?php

require_once("../../lib/php/common2.php");
require_once dirname(__FILE__) . "/../../lib/php/PHPExcel-develop/Classes/PHPExcel.php";

function hheader()
{
  header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  header('Cache-Control: max-age=0');
  // If you're serving to IE 9, then the following may be needed
  header('Cache-Control: max-age=1');
  // If you're serving to IE over SSL, then the following may be needed
  header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
  header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
  header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
  header ('Pragma: public'); // HTTP/1.0
}

function doExit()
{
  hheader();
  header("Content-Disposition: attachment; filename=\"-\"");
  exit;
}

$log_start = date('Y-m-d 00:00:00');
$log_end = date('Y-m-d 23:59:59');

foreach ($_POST as $key => $value)
{
  ${$DB->escape($key)} = $DB->escape($value);
}
$where = " WHERE true ";


$where .= " AND dan >= '$log_start' AND dan <= '$log_end' ";

$sql = "SELECT to_char(dan, 'MM-DD') AS \"Dan\", 

  SUM (CASE WHEN transaction_type_id = '6' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"GooglePlay\",
  SUM (CASE WHEN transaction_type_id = '7' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"iTunes\",
  SUM (CASE WHEN transaction_type_id = '23' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"Terminali\",
  SUM (CASE WHEN transaction_type_id = '32' THEN ROUND(payment_sum/-100000.00) ELSE 0 END) AS \"Kreditne kartice\"
  
    
    FROM b_transaction_stat $where GROUP BY dan ORDER BY dan ";

$DB->query($sql);

$num_fields = $DB->num_fields();

$time=strtotime($log_start);
$date = date("F Y", $time);
$title = $date;

$objPHPExcel = new PHPExcel();

$objPHPExcel->setActiveSheetIndex(0);

$objPHPExcel->getActiveSheet()->setTitle($title);

$headers = array();

for ($i = 0; $i < $num_fields; $i++)
{
  $headers[] = $DB->field_name($i);
}

$content = array();
$content[] = array($title);
$content[] = array();
$content[] = array();
$content[] = $headers;

$ukupno = array('Ukupno:','0','0','0','0');

while($row = $DB->fetch_row())
{
  $content[] = $row;
  foreach($row as $index => $element)
  {
      if($index > 0)
      {
          $ukupno[$index] = (string)((int)$ukupno[$index] + (int)$element);
      }
  }
}


$content[] = $ukupno;

//print_r($content);

$objPHPExcel
  ->getActiveSheet()
    ->fromArray
      (
          $content,
          NULL,
          'A1'
      );

foreach (range('A', $objPHPExcel->getActiveSheet()->getHighestDataColumn()) as $col)
{
    $objPHPExcel
      ->getActiveSheet()
        ->getColumnDimension($col)
        ->setAutoSize(true);
}


$temp = tempnam(sys_get_temp_dir(), '');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save($temp);

hheader();
header("Content-Disposition: attachment; filename=\"Uplate_izveštaj_$date.xlsx\"");

readfile($temp);
fclose($temp);

