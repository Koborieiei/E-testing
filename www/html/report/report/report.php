<?PHP
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
/*Connect Database*/
include ("../dbconfig/!db_config.php");
include ("../dbconfig/!sql_command.php");	
include ("../dbconfig/!const.php");
db_connect();
session_start();

$username = $_REQUEST['username'];
$passwd = $_REQUEST['passwd'];

$user1 = array("admin","123456789");

/*REDIRECT HTTPS*/
if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}

/*GET IP*/
function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

$ipaddress = get_client_ip();

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>E-Business Health Check</title>
	
	<link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

	<!--ICON-->
	<!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
	<!--My CSS-->
	<link rel="stylesheet" href="../css/style.css">
	<!--PROFILE-->
	<meta name='author' content='Phitak Khuenak' />	
	<!--KEYWORD-->
	<meta name="keywords" content="" />
	<!--DES-->
	<meta name="description" content="" />
	
	
	 <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer"></script>
	<!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="../mdbcss/css/bootstrap.min.css">
  <!-- Material Design Bootstrap -->
  <link rel="stylesheet" href="../mdbcss/css/mdb.min.css">
	
</head>
<body>
<?PHP
if ($username != "" && $passwd != "") {
if ($username == $user1[0] && $passwd == $user1[1]) {
	
$sql_detail = "SELECT * FROM survey WHERE deleted = '0'";
$qr_detail = db_query($sql_detail);
$num_detail = db_num_rows($qr_detail);
	
?>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-hover">
					<thead>
						<tr align="center">
							<th>วันที่</th>
							<th>ชื่อ-นามสกุล</th>
							<th colspan="4">คะแนนรายด้าน<br> บริหาร/การตลาด/ดำเนินธุรกิจ/การเงิน</th>
							<th>รวม</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<?PHP
						if ($num_detail != 0) {
							for ($i=0;$i<$num_detail;$i++) {
							$arr_content = db_fetch_array($qr_detail);
						?>
						<tr>
							<td><?PHP echo $arr_content['date_create'] ?></td>
							<td><?PHP echo $arr_content['fname']." ".$arr_content["lname"] ?></td>
							<td>
								<?PHP 
									echo $sum01 = $arr_content["t2_1"]+$arr_content["t2_2"]+$arr_content["t2_3"]+$arr_content["t2_4"]+$arr_content["t2_5"]+$arr_content["t2_6"]+$arr_content["t2_7"];
								?>
							</td>
							<td>
								<?PHP 
									echo $sum02 = $arr_content["t3_1"]+$arr_content["t3_2"]+$arr_content["t3_3"]+$arr_content["t3_4"]+$arr_content["t3_5"]+$arr_content["t3_6"]+$arr_content["t3_7"]+$arr_content["t3_8"]+$arr_content["t3_9"]+$arr_content["t3_10"];
								?>
							</td>
							<td>
								<?PHP 
									echo $sum03 = $arr_content["t4_1"]+$arr_content["t4_2"]+$arr_content["t4_3"]+$arr_content["t4_4"]+$arr_content["t4_5"]+$arr_content["t4_6"];
								?>
							</td>
							<td>
								<?PHP 
										echo $sum04 = $arr_content["t5_1"]+$arr_content["t5_2"]+$arr_content["t5_3"]+$arr_content["t5_4"]+$arr_content["t5_5"]+$arr_content["t5_6"];
								?>
							</td>
							<td>
								<?PHP
								echo $sum01+$sum02+$sum03+$sum04;
								?>
							</td>
							<td>
								<a href="detail.php?id=<?PHP echo $arr_content['id'] ?>" target="_blank"><button class="btn btn-primary">ดูรายละเอียด</button></a>
							</td>
						</tr>
						<?PHP
							}
						}else{
						?>
							<tr>
								<td colspan="7" align="center">ยังไม่มีข้อมูล</td>
							</tr>
						<?PHP
						}
						?>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<a href="export.php" target="_blank"><button class="btn btn-success">Export to excel</button></a>
			</div>
		</div>
	</div>
<?PHP
}else{
	echo "<div><h4><center>กรุณาเข้าสู่ระบบอีกครั้ง</center></h4></div>";
}
}else{
	echo "<div><h4><center>กรุณาเข้าสู่ระบบ</center></h4></div>";
}
?>
	

	
	
<!-- jQuery -->
<script type="text/javascript" src="../mdbcss/js/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="../mdbcss/js/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="../mdbcss/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="../mdbcss/js/mdb.min.js"></script>
	
<script type="text/javascript">
	function closeWin() {
		myWindow.close();
	}	
</script>
</body>
</html>
