<?php
/*--------------db_connect()----------------*/
	function db_connect(){
		global $db_type, $db_username, $db_pwd, $db_name, $db_host, $db_link, $db_cursor;
		if ($db_type == MY_SQL){
			if (@$db_link = mysqli_connect($db_host, $db_username, $db_pwd)){
				if (@!mysqli_select_db($db_link, $db_name)){
					echo "Can't Select DB<BR>";
					echo "<B>MySQL Said : </B>" . db_error();
					exit;
				}//if (@!mysql_select_db($db_name, $db_link)){
				mysqli_set_charset($db_link,"utf8");

			}//if (@$db_link = mysql_connect($db_host, $db_username, $db_pwd)){
			else{			
				echo "Can't Connect DB ! JA<BR>";
				echo "<B>MySQL Said : </B>" . db_error();
				exit;				
			}//else
			return true;
		}//($db_type == MY_SQL){
		else{
				echo "db_link = $db_link<BR>";
				echo "Can't Connect DB !<BR>";
				echo "<B>Sybase Said : </B>" . db_error();
				exit;				
		}//else
			return true;		
	}
/*---------------db_close()-----------------*/
	function db_close(){
		global $db_link, $db_cursor, $db_type;
		if ($db_type == MY_SQL){
			return mysqli_close($db_link);
		}
		return false;
	}

/*---------------db_query()----------------*/	
	function db_query($query){
		global $db_type, $db_cursor, $db_link, $stmt_num_rows;
		if ($db_type == MY_SQL){
//			if($re = mysqli_query($query, $db_link)){
			if($re = mysqli_query($db_link, $query)){
				mysqli_set_charset($db_link,"utf8");
				/*mysqli_query("set name 'utf8'");
				mysqli_query("SET character_set_results=utf8");
				mysqli_query("SET character_set_client=utf8");
				mysqli_query("SET character_set_connection=utf8");*/
			
					return $re;
			}
		}
		return false;
	}

/*-----------------db_num_rows()-------------------*/
	function db_num_rows($result){
		global $db_cursor, $db_link, $db_type, $stmt_num_rows;
		if ($db_type == MY_SQL){
			return mysqli_num_rows($result);
		}
		return 0;
	}
/*----------------db_affected_rows()-----------------*/
	function db_affected_rows($result){
		global $db_cursor, $db_link, $db_type;		
		if ($db_type == MY_SQL){
			return mysqli_affected_rows();
		}
		return 0;	
	}	
/*------------------db_fetch_row()-------------------*/
	function db_fetch_row($result){
		global $db_type, $db_cursor, $db_link;
		if ($db_type == MY_SQL){
			return mysqli_fetch_row($result);
		}
		return false;
	}

/*--------------convert_cap()----------------*/	
	function convert_cap($input_array){
		$new_array = array();
		while (list ($key, $val) = each($input_array)) {
//	    echo "$key => $val<br>";		 
		 $new_key = strtolower($key);
		 $new_array["$new_key"] = $val;
		}
		return $new_array;
	}
/*--------------trim_array()--------------*/	
	function trim_array($input_array){
		$new_array = array();
		while (list ($key, $val) = each($input_array)) {
//	    echo "$key => $val<br>";		 
		 $new_key = strtolower($key);
		 $new_array["$key"] = trim($val);
		}
		return $new_array;	
	}
/*-----------------db_fetch_array()------------------*/	
	function db_fetch_array($result){
		global $db_type, $db_cursor, $db_link;
		if ($db_type == MY_SQL){
			return mysqli_fetch_array($result);
		}
		return false;
	}	
/*-----------------db_data_seek()-----------------*/	
	function db_data_seek($result, $row_number){
		global $db_type, $db_cursor, $db_link;
		if ($db_type == MY_SQL){
			return mysqli_data_seek($result, $row_number);
		}
		return false;
	}	
	
/*-----------------db_insert_id()------------------*/
	function db_insert_id(){
		global $db_type, $db_cursor, $db_link;
		if ($db_type == MY_SQL){
			return mysqli_insert_id($db_link);
		}
		return false;
	}		
	
/*----------------db_error()-----------------*/	
	function db_error(){
		global $db_type,$db_link;// $db_cusor, 
		if ($db_type == MY_SQL){
			return mysqli_error($db_link);
		}
		return false;
	}
/*-----------db_free_memory()--------------*/
	function db_free_memory ($result) {
		global $db_type;
	   if ($db_type == MY_SQL) {
		  return mysqli_free_result($result);
		}
		return false;
	}

/*******Additional Function, Don't use in this time********/	
	function DBaux_show_array($array, $sep = "\n"){ 
        while(list($k,$v) = each($array)){ 
                echo "Key $k has value $v $sep"; 
        } 
	} 	
		
	// Concatenating strings is different for MySQL and SQL Server 
	function DBconcat($words){ 
        global $DBms; 
        if ($DBms == 'mssql') 
                return preg_replace('/ /', ' + ', $words); 
        else 
                return 'Concat(' . preg_replace('/ /', ', ', $words) . ')'; 
	}	
?>
