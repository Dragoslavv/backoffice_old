<?php

class mysql
{
	var $link = 0;
	var $debug = 0;
	var $result = 0;
	var $last_array = 0;
	var $db;

	function mysql()
	{
		$this->connect();
	}	
	
	function connect($username="UNSET", $password="", $host="localhost", $db="")
	{
		if ($username == "UNSET")
		{
			$username = $GLOBALS["MYSQL_USER"];
			$password = $GLOBALS["MYSQL_PASS"];
			$host	= $GLOBALS["MYSQL_HOST"];
			$db	= $GLOBALS["MYSQL_DB"];
		}
		$this->link = mysqli_connect($host, $username, $password, $db);
		if(!mysqli_connect_errno($this->link))
		{
		 	$this->db = $db;
	    	$this->query("SET NAMES 'utf8' COLLATE 'utf8_general_ci'");
		}
		else
		{
			if($this->debug)
			{
				echo mysqli_connect_error(); 
			}
		}
	}

	function select($db)
	{
		if($this->link)
		{
			mysqli_select_db($this->link, $db);
			return 1;
		}
		else
		{
			return 0;
		}
	}	
	
	function close()
	{
		mysqli_close($this->link);
	}

	function error()
	{
		return mysqli_error($this->link);
	}

	function errno()
	{
		return mysqli_errno($this->link);
	}
	
	function free()
	{
		mysqli_free_result($this->result);
	}
		  
	function query($sql, $db="")
	{
		if ($db) $this->select($db);
    	$this->result = mysqli_query($this->link, $sql);
		if ($db) $this->select($this->db);
		return $this->result;
	}	
	
	function nquery($sql, $db="")
	{
		if ($db) $this->select($db);
    	$result = mysqli_query($this->link, $sql);
		if ($db) $this->select($this->db);
		return $result;
	}	
	
	function found_rows()
	{
		$sql = 'SELECT FOUND_ROWS()';	
		$rows =  mysqli_query($this->link, $sql);
		$rows = mysqli_fetch_array($rows);
		$rows = $rows[0];
		return $rows;
	}	
	
	function fetch_fields()
	{
		return mysqli_fetch_fields($this->result);
	}
	   
	function num_fields()
	{
		return mysqli_num_fields($this->result);
	}
	   
	function field_name($i)
	{
	  $finfo = mysqli_fetch_field_direct($this->result, $i);
		return $finfo->name;
	}  
		
	function sfetch($sql, $db="")
	{
		if ($db) $this->select($db);
		$this->result = mysqli_query($this->link, $sql);
		if ($this->result !== false)
		{
			$temp = mysqli_fetch_row($this->result);
			$this->free();
			if ($db) $this->select($this->db);
			return $temp[0];
		}
		if ($db) $this->select($this->db);
		return "";
	}	
	
	function afetch($sql, $db="")
	{
		if ($db) $this->select($db);
		$this->result = mysqli_query($this->link, $sql);
		$temp = mysqli_fetch_row($this->result);
		$this->free();
		if ($db) $this->select($this->db);
		return $temp;
	}

	function afetcha($sql, $db="")
	{
		if ($db) $this->select($db);
		$this->result = mysqli_query($this->link, $sql);
		$temp = mysqli_fetch_array($this->result);
		$this->free();
		if ($db) $this->select($this->db);
		return $temp;
	}
	
	function fetch_array()
	{
		$this->last_array = mysqli_fetch_array($this->result);
		return $this->last_array;
	}
	
	function fetch_assoc()
	{
		$this->last_array = mysqli_fetch_assoc($this->result);
		return $this->last_array;
	}
	
	function fetch_object()
	{
		$this->last_array = mysqli_fetch_object($this->result);
		return $this->last_array;
	}
	
	function fetch_row()
	{
		$this->last_array = mysqli_fetch_row($this->result);
		return $this->last_array;
	}
					  
	function row($row_id)
	{
		return $this->last_array[$row_id];	
	}
	
	function all_row()
	{
		return $this->last_array;	
	}

	function num_rows()
	{
		return mysqli_num_rows($this->result);
	}
	
	function insert_id()
	{
		return mysqli_insert_id($this->link);
	}

	function affected_rows()
	{
		return mysqli_affected_rows($this->link);
	}

	function escape($esc)
	{
		return mysqli_real_escape_string($this->link, $esc);
	}
}
