<?php

class PostgresException extends Exception {
    function __construct($msg) { parent::__construct($msg); }
}

class pgsql
{
	var $link = 0;
	var $debug = 0;
	var $result = 0;
	var $last_array = 0;
	var $db;

	function pgsql()
	{
		$this->connect();
	}

	function connect($username="UNSET", $password="", $host="localhost", $db="")
	{
		if ($username == "UNSET")
		{
			$username = $GLOBALS["PGSQL_USER"];
			$password = $GLOBALS["PGSQL_PASS"];
			$host	= $GLOBALS["PGSQL_HOST"];
			$db	= $GLOBALS["PGSQL_DB"];
			$port	= $GLOBALS["PGSQL_PORT"];
		}
		$conn_string = "host=$host port=$port dbname=$db user=$username password=$password options='--client_encoding=UTF8'";
		$this->link = @pg_connect($conn_string);
		if ($this->link === FALSE && $this->debug) {

            throw(new PostgresException("Can't connect to database server."));
        }
		else
		{
		 	$this->db = $db;
		}
	}

	function close()
	{
		pg_close($this->link);
	}

	function error()
	{
		return pg_last_error($this->link);
	}

	function free()
	{
		if ($this->result) pg_free_result($this->result);
	}

	function query($sql)
	{
		/*SELECT id, "count" (*) OVER () AS cnt FROM objects WHERE id > 2 OFFSET 50 LIMIT 5*/
    	$this->result = pg_query($this->link, $sql);
		return $this->result;
	}

	function nquery($sql)
	{
    	$result = pg_query($this->link, $sql);
		return $result;
	}

	function num_fields()
	{
		return pg_num_fields($this->result);
	}

	function field_name($i)
	{
	  	return pg_field_name($this->result, $i);
	}

	function sfetch($sql)
	{
		$this->result = pg_query($this->link, $sql);
		if ($this->result !== false)
		{
			$temp = pg_fetch_row($this->result);
			$this->free();
			return $temp[0];
		}
		return "";
	}

	function afetch($sql)
	{
		$this->result = pg_query($this->link, $sql);
		$temp = pg_fetch_row($this->result);
		$this->free();
		return $temp;
	}

	function afetcha($sql)
	{
		$this->result = pg_query($this->link, $sql);
		$temp = pg_fetch_array($this->result);
		$this->free();
		return $temp;
	}

	function fetch_array()
	{
		$this->last_array = pg_fetch_array($this->link, $this->result);
		return $this->last_array;
	}

	function fetch_assoc()
	{
		$this->last_array = pg_fetch_assoc($this->result);
		return $this->last_array;
	}

	function fetch_object()
	{
		$this->last_array = pg_fetch_object($this->result);
		return $this->last_array;
	}

	function fetch_row()
	{
		$this->last_array = pg_fetch_row($this->result);
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
		return pg_num_rows($this->result);
	}

	function insert_id()
	{
		$insert_query = pg_query("SELECT lastval();");
		$insert_row = pg_fetch_row($insert_query);
		$insert_id = $insert_row[0];
		return $insert_id;
	}

	function affected_rows()
	{
		return pg_affected_rows($this->result);
	}

	function escape($esc)
	{
		return pg_escape_string($this->link, $esc);
	}
}
