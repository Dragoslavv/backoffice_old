<?php

require_once('common.php');

//clearSession();

if(!checkSession())
{
	echo'AUTH!';
	exit;
}
