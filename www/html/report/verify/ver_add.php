<?PHP
/*Connect Database*/
include ("../dbconfig/!db_config.php");
include ("../dbconfig/!sql_command.php");	
include ("../dbconfig/!const.php");
db_connect();
session_start();

$ipaddress = $_REQUEST['ipaddress'];

	$sql_add = "INSERT INTO historyusers
						(ip,
						accept
						)

						VALUES

						('$ipaddress',
						'1'
						)";

						$qr_add = db_query($sql_add);
	
	header("refresh: 0; url=../index.php");
	?>
		<div align="center" class='loader'></div>
	<?PHP
		ob_end_flush();
	?>