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
$id = $_REQUEST['id'];
	
$sql_detail = "SELECT * FROM survey WHERE id = '$id'";
$qr_detail = db_query($sql_detail);
$arr_detail = db_fetch_array($qr_detail);
	
?>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<table class="table table-striped" style="width: 80%">
				<tbody>
					<tr>
						<td>ชื่อ-นามสกุล</td>
						<td><?PHP echo $arr_detail['fname']." ".$arr_detail['lname'] ?></td>
					</tr>
					<tr>
						<td>เพศ</td>
						<td><?PHP echo $arr_detail['gender'] ?></td>
					</tr>
					<tr>
						<td>อายุ</td>
						<td><?PHP echo $arr_detail['old'] ?></td>
					</tr>
					<tr>
						<td>เบอร์โทรศัพท์</td>
						<td><?PHP echo $arr_detail['tel'] ?></td>
					</tr>
					<tr>
						<td>อีเมล์</td>
						<td><?PHP echo $arr_detail['email'] ?></td>
					</tr>
					<tr>
						<td>Line ID</td>
						<td><?PHP echo $arr_detail['line'] ?></td>
					</tr>
					<tr>
						<td>Facebook</td>
						<td><?PHP echo $arr_detail['fa'] ?></td>
					</tr>
					<tr>
						<td>ชื่อบริษัท</td>
						<td><?PHP echo $arr_detail['work'] ?></td>
					</tr>
					<tr>
						<td>ประเภทสินค้า </td>
						<td><?PHP echo $arr_detail['product'] ?></td>
					</tr>
					<tr>
						<td>ประเภทบริการ</td>
						<td><?PHP echo $arr_detail['service'] ?></td>
					</tr>
					<tr>
						<td>ระยะเวลาการดำเนินกิจการ</td>
						<td><?PHP echo $arr_detail['duration'] ?></td>
					</tr>
					<tr>
						<td>รูปแบบธุรกิจ</td>
						<td><?PHP echo $arr_detail['type'] ?></td>
					</tr>
					<tr>
						<td>จำนวนแรงงาน (พนักงาน) ในธุรกิจ (เฉพาะภาคผลิต)</td>
						<td><?PHP echo $arr_detail['worker'] ?></td>
					</tr>
					<tr>
						<td>จำนวนแรงงาน (พนักงาน) ในธุรกิจ (เฉพาะภาคการค้าและบริการ)</td>
						<td><?PHP echo $arr_detail['worker2'] ?></td>
					</tr>
					<tr>
						<td>ยอดขายต่อปี</td>
						<td><?PHP echo $arr_detail['amount'] ?></td>
					</tr>
				</tbody>
			</table>
			
			
			<table class="table table-striped">
				<tbody>
					<tr><td colspan="2" class="bg-default">ประเด็นคำถามด้านการบริหารจัดการ</td></tr>
					<tr>
						<td>1.	มีแผนธุรกิจ/แผนกลยุทธ์ เป้าหมายทางธุรกิจ ระยะสั้น – ระยะยาว ที่ชัดเจน และดำเนินงานตามแนวทางหรือกลยุทธ์ที่กำหนดไว้</td>
						<td><?PHP echo $arr_detail['fname']." ".$arr_detail['t2_1'] ?></td>
					</tr>
					<tr>
						<td>2.	มีการติดตามผลการดำเนินงานขององค์กรและสถานการณ์ภายนอก เพื่อนำมาปรับแผนธุรกิจให้สอดคล้องกับสภาพแวดล้อมทางธุรกิจอยู่เสมอ</td>
						<td><?PHP echo $arr_detail['t2_2'] ?></td>
					</tr>
					<tr>
						<td>3.	มีบุคลากรที่มีคุณสมบัติและคุณลักษณะสอดคล้องกับงานที่ได้รับมอบหมาย และมีผลการปฏิบัติงานตามที่ท่านคาดหวัง</td>
						<td><?PHP echo $arr_detail['t2_3'] ?></td>
					</tr>
					<tr>
						<td>4.	มีจำนวนบุคลากรสอดคล้องกับปริมาณงาน โดยไม่มีปัญหาขาดแคลนบุคลากรกะทันหัน</td>
						<td><?PHP echo $arr_detail['t2_4'] ?></td>
					</tr>
					<tr>
						<td>5.	มีแนวทางในการจูงใจพนักงาน เช่น มีการให้รางวัลและยกย่องชมเชย เพื่อให้เกิดการปรับปรุงงาน เกิดผลการดำเนินงานที่ดี</td>
						<td><?PHP echo $arr_detail['t2_5'] ?></td>
					</tr>
					<tr>
						<td>6.	มีการคาดการณ์ วิเคราะห์ถึงความเสี่ยงในการดำเนินธุรกิจ และวางแผนการดำเนินงานเพื่อรับมือความเสี่ยงต่างๆ ที่อาจเกิดขึ้นในอนาคต</td>
						<td><?PHP echo $arr_detail['t2_6'] ?></td>
					</tr>
					<tr>
						<td>7.	มีการแสวงหาโอกาสในการขยายหรือพัฒนาธุรกิจใหม่ที่สอดคล้องกับสถานการณ์ตลาดและความสามารถขององค์กรของท่าน</td>
						<td><?PHP echo $arr_detail['t2_7'] ?></td>
					</tr>
					
					<tr><td colspan="2" class="bg-default">ประเด็นคำถามด้านการตลาด</td></tr>
					<tr>
						<td>1.	มีการวิจัยตลาดและพฤติกรรมการซื้อของกลุ่มลูกค้าเป้าหมายอย่างต่อเนื่อง เพื่อสามารถตอบสนองความต้องการของลูกค้าอย่างถูกต้อง</td>
						<td><?PHP echo $arr_detail['t3_1'] ?></td>
					</tr>
					<tr>
						<td>2.	มีการกำหนดกลุ่มลูกค้าเป้าหมายที่ชัดเจน และได้กำหนดตำแหน่งทางการตลาด (Positioning) และวางแผนการตลาดที่สอดคล้องกัน</td>
						<td><?PHP echo $arr_detail['t3_2'] ?></td>
					</tr>
					<tr>
						<td>3.	ตราสินค้า/แบรนด์ของท่านเป็นที่รู้จักของลูกค้ากลุ่มเป้าหมาย และมีความโดดเด่นเมื่อเปรียบเทียบกับคู่แข่ง</td>
						<td><?PHP echo $arr_detail['t3_3'] ?></td>
					</tr>
					<tr>
						<td>4.	มีการตั้งเป้ายอดขาย และวางแผนกระตุ้นยอดขายให้เป็นไปตามที่คาดหวัง</td>
						<td><?PHP echo $arr_detail['t3_4'] ?></td>
					</tr>
					<tr>
						<td>5.	มีกระบวนการส่งเสริมการขายและประชาสัมพันธ์ (Promotion) ที่ได้รับผลตอบรับจากลูกค้าเป็นอย่างดี</td>
						<td><?PHP echo $arr_detail['t3_5'] ?></td>
					</tr>
					<tr>
						<td>6.	มีช่องทางและวิธีการจัดจำหน่ายสินค้า/บริการ ที่ครอบคลุมและเข้าถึงกลุ่มลูกค้าเป้าหมาย</td>
						<td><?PHP echo $arr_detail['t3_6'] ?></td>
					</tr>
					<tr>
						<td>7.	มีการตั้งราคาสินค้า/บริการ ที่สอดคล้องกับคุณค่าที่ส่งมอบ และดึงดูดให้เกิดการซื้อ เพื่อสร้างกำไรให้แก่ธุรกิจ</td>
						<td><?PHP echo $arr_detail['t3_7'] ?></td>
					</tr>
					<tr>
						<td>8.	มีการปรับปรุงคุณภาพของสินค้า/บริการ เพื่อตอบสนองต่อการเปลี่ยนแปลงของพฤติกรรมของกลุ่มลูกค้าเป้าหมายอย่างสม่ำเสมอ</td>
						<td><?PHP echo $arr_detail['t3_8'] ?></td>
					</tr>
					<tr>
						<td>9.	มีการสร้างความสัมพันธ์ที่ดีกับลูกค้า เช่น การจัดกิจกรรมสัมพันธ์ร่วมกับลูกค้า การบริการหลังการขาย หรือการให้สิทธิประโยชน์ต่างๆ เป็นต้น เพื่อมีการซื้อซ้ำ บอกต่อ และมีความพึงพอใจต่อสินค้าและบริการ</td>
						<td><?PHP echo $arr_detail['t3_9'] ?></td>
					</tr>
					<tr>
						<td>10.	มีวิธีการประเมินและตอบสนองความพึงพอใจและไม่พอใจของลูกค้าอย่างชัดเจน เช่น มีช่องทางการสื่อสาร/รับข้อมูลจากลูกค้า และระบบการจัดการข้อร้องเรียน เพื่อให้ได้ลูกค้าใหม่และรักษาลูกค้าเก่า</td>
						<td><?PHP echo $arr_detail['t3_10'] ?></td>
					</tr>
					
					
					<tr><td colspan="2" class="bg-default">ประเด็นคำถามด้านกระบวนการดำเนินธุรกิจ</td></tr>
					<tr>
						<td>1.	มีการวางแผนและควบคุมการผลิต/การบริการ โดยพิจารณาข้อมูลต่างๆ เช่น ข้อมูลการผลิต/บริการ ประสิทธิภาพ เพื่อส่งมอบได้ตรงตามเวลา</td>
						<td><?PHP echo $arr_detail['t4_1'] ?></td>
					</tr>
					<tr>
						<td>2.	มีขั้นตอนการปฏิบัติงานของกระบวนการผลิต/การบริการตั้งแต่ ‘การจัดหาวัตถุดิบ’ ไปจนถึง ‘การผลิต/บริการ’ และ ‘จัดส่งสินค้า’ เพื่อการบริหารโลจิสติกส์และจัดการห่วงโซ่อุปทานอย่างเป็นระบบ </td>
						<td><?PHP echo $arr_detail['t4_2'] ?></td>
					</tr>
					<tr>
						<td>3.	มีการปรับปรุงกระบวนการผลิต/การบริการอย่างต่อเนื่อง เช่น การลดลงของอัตราของเสีย/ความผิดพลาดในการบริการ การเพิ่มขึ้นของประสิทธิภาพการผลิต/บริการ ความเร็วในการส่งมอบสินค้า/บริการ อัตราการคืนสินค้าลดลงจากลูกค้า เป็นต้น รวมถึงการนำเทคโนโลยีมาใช้ในการบริหารจัดการ เพื่อให้สามารถดำเนินงานได้อย่างสะดวกและรวดเร็ว และลดต้นทุนในการทำงาน</td>
						<td><?PHP echo $arr_detail['t4_3'] ?></td>
					</tr>
					<tr>
						<td>4.	มีระบบการตรวจสอบและควบคุมคุณภาพ (Quality Control: QC) ของสินค้าและบริการ เพื่อทำให้สินค้า/บริการที่วางขายในตลาดมีคุณภาพตรงตามมาตรฐานที่กำหนด</td>
						<td><?PHP echo $arr_detail['t4_4'] ?></td>
					</tr>
					<tr>
						<td>5.	มีการกำหนดแนวทางเพื่อให้ระบบงานและสถานที่ทำงานมีการเตรียมพร้อมต่อภาวะฉุกเฉินที่ส่งผลต่อกระบวนการผลิต/บริการ เช่น อัตราการเสียของเครื่องจักร การเกิดอุบัติเหตุ การสอบถามพนักงานถึงความสะดวกในการทำงาน การดูแลรักษาสถานที่ทำงาน เครื่องมือ อุปกรณ์ต่างๆ เพื่อให้มีความพร้อมใช้งาน</td>
						<td><?PHP echo $arr_detail['t4_5'] ?></td>
					</tr>
					<tr>
						<td>6.	สามารถผลิตสินค้าและบริการได้เพียงพอต่อความต้องการของตลาด แม้ในช่วงที่ตลาดมีความต้องการสูงกว่าปกติ</td>
						<td><?PHP echo $arr_detail['t4_6'] ?></td>
					</tr>
					
					
					<tr><td colspan="2" class="bg-default">ประเด็นคำถามด้านการเงิน</td></tr>
					<tr>
						<td>1.	จัดทำข้อมูลงบการเงินที่ถูกต้องตามหลักการทางบัญชี และสามารถนำงบการเงินมาวิเคราะห์เพื่อวางแผนธุรกิจได้อย่างเหมาะสม</td>
						<td><?PHP echo $arr_detail['t5_1'] ?></td>
					</tr>
					<tr>
						<td>2.	มีความสามารถจัดหาเงินทุน/สินเชื่อในจำนวนที่ต้องการ เพื่อนำมาใช้จ่ายหรือลงทุนได้ทันตามแผนธุรกิจที่วางไว้</td>
						<td><?PHP echo $arr_detail['t5_2'] ?></td>
					</tr>
					<tr>
						<td>3.	มีการคาดการณ์ปริมาณเงินสดในอนาคตได้แม่นยำ ทำให้มีสภาพคล่องทางการเงิน มีเงินสดเพียงพอในการทำธุรกรรมอย่างสม่ำเสมอ</td>
						<td><?PHP echo $arr_detail['t5_3'] ?></td>
					</tr>
					<tr>
						<td>4.	มีความสามารถในการจ่ายหนี้ และเรียกเก็บเงินจากลูกหนี้ได้ตรงตามกำหนด</td>
						<td><?PHP echo $arr_detail['t5_4'] ?></td>
					</tr>
					<tr>
						<td>5.	มีการตั้งงบประมาณรายจ่าย และสามารถบริหารรายจ่ายให้ไม่เกินงบที่กำหนด</td>
						<td><?PHP echo $arr_detail['t5_5'] ?></td>
					</tr>
					<tr>
						<td>6.	มีการประเมินผลลัพธ์การลงทุนและการตัดสินใจลงทุน โดยระบุสัดส่วนเงินที่จะลงทุนในสินทรัพย์หรือหลักทรัพย์แต่ละประเภทอย่างชัดเจน</td>
						<td><?PHP echo $arr_detail['t5_6'] ?></td>
					</tr>
				</tbody>
			</table>
			
		</div>	
	</div>	
</div>


	
	
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
