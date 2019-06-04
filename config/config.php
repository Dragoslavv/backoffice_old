<?php

function getIPs($withV6 = false)
{
    preg_match_all('/inet'.($withV6 ? '6?' : '').' addr: ?([^ ]+)/', `ifconfig`, $ips);
    return $ips[1];
}

$PGSQL_USER = "vsim_user";
$PGSQL_PASS = "vsim_pass";
$PGSQL_DB	= "vsim_db";
$PGSQL_HOST = "10.245.208.6";
$PGSQL_PORT	= "9999";
$BILLING_IP = '10.245.208.11';
//home
/*$PGSQL_HOST = "localhost";
$PGSQL_PORT	= "5434";
*/



$ips = getIPs();
/*
print_r($ips);
exit;*/
/*$BILLING_IP = '10.245.208.11';
// ako postoji tunnel preko procescom PBX-a za rad van office-a
$PGSQL_HOST = preg_grep('/192.168.1./', $ips) ? "localhost" : "10.245.208.6";
$PGSQL_PORT = preg_grep('/192.168.1./', $ips) ? "5434" : "9999";*/

$session_name = "GLOBALTEL";
