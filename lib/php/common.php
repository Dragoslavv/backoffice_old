<?php

error_reporting(E_WARNING);

$dir = __DIR__;
require_once("$dir/../../config/config.php");
require_once("$dir/pgsql.class.php");

date_default_timezone_set('Europe/Belgrade');

class FileSessionHandler
{
    private $savePath;

    function open($savePath, $sessionName)
    {
        $this->savePath = $savePath;
        if (!is_dir($this->savePath)) {
            mkdir($this->savePath, 0777);
        }

        return true;
    }

    function close()
    {
        return true;
    }

    function read($id)
    {
        return (string)@file_get_contents("$this->savePath/sess_$id");
    }

    function write($id, $data)
    {
        return file_put_contents("$this->savePath/sess_$id", $data) === false ? false : true;
    }

    function destroy($id)
    {
        $file = "$this->savePath/sess_$id";
        if (file_exists($file)) {
            unlink($file);
        }

        return true;
    }

    function gc($maxlifetime)
    {
        foreach (glob("$this->savePath/sess_*") as $file) {
            if (filemtime($file) + $maxlifetime < time() && file_exists($file)) {
                unlink($file);
            }
        }

        return true;
    }
}


$handler = new FileSessionHandler();
session_set_save_handler(
    array($handler, 'open'),
    array($handler, 'close'),
    array($handler, 'read'),
    array($handler, 'write'),
    array($handler, 'destroy'),
    array($handler, 'gc')
    );

//// the following prevents unexpected effects when using objects as save handlers
register_shutdown_function('session_write_close');

session_name($session_name);
session_start();

try {
	$DB = new pgsql();
	

} catch (PostgresException $e) {
	echo $e->getMessage();
	exit;
}

function isJson($string)
{
	return (is_object(json_decode($string)));
}

function checkSession()
{
	if (!isset($_SESSION['USER_ID']))
	{
		return false;
	}

	$last_access = time();

	if ($last_access - $_SESSION['LAST_ACCESS'] >=  60 * 60)
	{
		return false;
	} 
	
	$_SESSION['LAST_ACCESS'] = $last_access;
	return true;
}

function login($username, $password)
{
	clearSession();
	global $DB;
	$username = $DB->escape($username);
	$password = $DB->escape($password);
	$sql = "SELECT id, role, username, password, firstname, lastname, email, phone, brand
  			FROM vs_operators
			WHERE username = '$username'
			AND password = md5('$password') ";
	$row = $DB->afetcha($sql);
	if ($row['role'])
	{
		$_SESSION['USER_ID'] = $row["id"];
		$_SESSION['LAST_ACCESS'] = time();
		$_SESSION['USERDATA']["username"] = $row["username"];
		$_SESSION['USERDATA']["password"] = $row["password"];
		$_SESSION['USERDATA']["firstname"] = $row["firstname"];
		$_SESSION['USERDATA']["lastname"] = $row["lastname"];
		$_SESSION['USERDATA']["email"] = $row["email"];
		$_SESSION['USERDATA']["phone_number"] = $row["phone"];
		$_SESSION['USERDATA']["role"] = $row["role"];
		$_SESSION['USERDATA']["brand"] = $row["brand"];
	}
	    
	return (isset($_SESSION['USER_ID']));
}

function logout()
{
	clearSession();
	setcookie(session_name(),'',0,'/');
	return true;
}

function clearSession()
{
	session_unset();
    session_destroy();
    $_SESSION = array();
    session_write_close();
    session_start();
    session_regenerate_id(true);
    return true;
}
