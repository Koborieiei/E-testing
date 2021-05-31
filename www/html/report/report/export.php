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


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>E-Business Health Check</title>

	<!--PROFILE-->
	<meta name='author' content='Phitak Khuenak' />	
	<!--KEYWORD-->
	<meta name="keywords" content="" />
	<!--DES-->
	<meta name="description" content="" />
	
</head>
<body>
	
<?PHP
$sql_detail = "SELECT * FROM survey WHERE deleted = '0'";
$qr_detail = db_query($sql_detail);
$num_detail = db_num_rows($qr_detail);

/*Excel*/
header("Content-Type: application/vnd.ms-excel"); // ประเภทของไฟล์
header('Content-Disposition: attachment; filename="export.xls"'); //กำหนดชื่อไฟล์
header("Content-Type: application/force-download"); // กำหนดให้ถ้าเปิดหน้านี้ให้ดาวน์โหลดไฟล์
header("Content-Type: application/octet-stream"); 
header("Content-Type: application/download"); // กำหนดให้ถ้าเปิดหน้านี้ให้ดาวน์โหลดไฟล์
header("Content-Transfer-Encoding: binary"); 
header("Content-Length: ".filesize("export.xls"));   

@readfile($filename); 
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
	</div>
</body>
</html>
