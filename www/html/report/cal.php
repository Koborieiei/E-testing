<?PHP
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
/*Connect Database*/
include ("dbconfig/!db_config.php");
include ("dbconfig/!sql_command.php");	
include ("dbconfig/!const.php");
db_connect();
session_start();

/*REDIRECT HTTPS*/
if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}

$mid = $_SESSION['member_ws']['m_id'];

$fname = $_REQUEST['fname'];
$lname = $_REQUEST['lname'];
$gender = $_REQUEST['gender'];
$old = $_REQUEST['old'];
$tel = $_REQUEST['tel'];
$email = $_REQUEST['email'];
$line = $_REQUEST['line'];
$fa = $_REQUEST['fa'];
$work = $_REQUEST['work'];

$product1 = $_REQUEST['product1'];
$product2 = $_REQUEST['product2'];
$product3 = $_REQUEST['product3'];
$product4 = $_REQUEST['product4'];
$product5 = $_REQUEST['product5'];
$product6 = $_REQUEST['product6'];
$product7 = $_REQUEST['product7'];
$product8 = $_REQUEST['product8'];
$product9 = $_REQUEST['product9'];
$product10 = $_REQUEST['product10'];

$product = array($product1,$product2,$product3,$product4,$product5,$product6,$product7,$product8,$product9,$product10);

$service1 = $_REQUEST['service1'];
$service2 = $_REQUEST['service2'];
$service3 = $_REQUEST['service3'];
$service4 = $_REQUEST['service4'];
$service5 = $_REQUEST['service5'];
$service6 = $_REQUEST['service6'];
$service7 = $_REQUEST['service7'];
$service8 = $_REQUEST['service8'];

$service = array($service1,$service2,$service3,$service4,$service5,$service6,$service7,$service8);

$duration = $_REQUEST['duration'];

if ($type2 != "") {
	$type2 = $_REQUEST['type2'];
	$type = $type2;
}else{
	$type = $_REQUEST['type'];
}



$worker = $_REQUEST['worker'];
$worker2 = $_REQUEST['worker2'];
$amount = $_REQUEST['amount'];

$d2_1 = $_REQUEST['2-1'];
$d2_2 = $_REQUEST['2-2'];
$d2_3 = $_REQUEST['2-3'];
$d2_4 = $_REQUEST['2-4'];
$d2_5 = $_REQUEST['2-5'];
$d2_6 = $_REQUEST['2-6'];
$d2_7 = $_REQUEST['2-7'];
$sum01 = $d2_1+$d2_2+$d2_3+$d2_4+$d2_5+$d2_6+$d2_7;

$d3_1 = $_REQUEST['3-1'];
$d3_2 = $_REQUEST['3-2'];
$d3_3 = $_REQUEST['3-3'];
$d3_4 = $_REQUEST['3-4'];
$d3_5 = $_REQUEST['3-5'];
$d3_6 = $_REQUEST['3-6'];
$d3_7 = $_REQUEST['3-7'];
$d3_8 = $_REQUEST['3-8'];
$d3_9 = $_REQUEST['3-9'];
$d3_10 = $_REQUEST['3-10'];
$sum02 = $d3_1+$d3_2+$d3_3+$d3_4+$d3_5+$d3_6+$d3_7+$d3_8+$d3_9+$d3_10;

$d4_1 = $_REQUEST['4-1'];
$d4_2 = $_REQUEST['4-2'];
$d4_3 = $_REQUEST['4-3'];
$d4_4 = $_REQUEST['4-4'];
$d4_5 = $_REQUEST['4-5'];
$d4_6 = $_REQUEST['4-6'];
$sum03 = $d4_1+$d4_2+$d4_3+$d4_4+$d4_5+$d4_6;


$d5_1 = $_REQUEST['5-1'];
$d5_2 = $_REQUEST['5-2'];
$d5_3 = $_REQUEST['5-3'];
$d5_4 = $_REQUEST['5-4'];
$d5_5 = $_REQUEST['5-5'];
$d5_6 = $_REQUEST['5-6'];
$sum04 = $d5_1+$d5_2+$d5_3+$d5_4+$d5_5+$d5_6;

$sumtotal = $sum01+$sum02+$sum03+$sum04;

$strproduct = implode(" ",$product);
$strservice = implode(" ",$service);

$sql_add = "INSERT INTO survey
						(fname,
						lname,
						gender,
						old,
						tel,
						email,
						line,
						fa,
						work,
						product,
						service,
						duration,
						type,
						worker,
						worker2,
						amount,
						t2_1,
						t2_2,
						t2_3,
						t2_4,
						t2_5,
						t2_6,
						t2_7,
						t3_1,
						t3_2,
						t3_3,
						t3_4,
						t3_5,
						t3_6,
						t3_7,
						t3_8,
						t3_9,
						t3_10,
						t4_1,
						t4_2,
						t4_3,
						t4_4,
						t4_5,
						t4_6,
						t5_1,
						t5_2,
						t5_3,
						t5_4,
						t5_5,
						t5_6,
						deleted
						)

						VALUES

						('$fname',
						'$lname',
						'$gender',
						'$old',
						'$tel',
						'$email',
						'$line',
						'$fa',
						'$work',
						'$strproduct',
						'$strservice',
						'$duration',
						'$type',
						'$worker',
						'$worker2',
						'$amount',
						'$d2_1',
						'$d2_2',
						'$d2_3',
						'$d2_4',
						'$d2_5',
						'$d2_6',
						'$d2_7',
						'$d3_1',
						'$d3_2',
						'$d3_3',
						'$d3_4',
						'$d3_5',
						'$d3_6',
						'$d3_7',
						'$d3_8',
						'$d3_9',
						'$d3_10',
						'$d4_1',
						'$d4_2',
						'$d4_3',
						'$d4_4',
						'$d4_5',
						'$d4_6',
						'$d5_1',
						'$d5_2',
						'$d5_3',
						'$d5_4',
						'$d5_5',
						'$d5_6',
						'0'
						)";

						$qr_add = db_query($sql_add);
	
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
	<link rel="stylesheet" href="css/style.css">
	<!--PROFILE-->
	<meta name='author' content='Phitak Khuenak' />	
	<!--KEYWORD-->
	<meta name="keywords" content="" />
	<!--DES-->
	<meta name="description" content="" />
	
	<script src="administrator/ckeditor/ckeditor.js"></script>
	
	 <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer"></script>
	<!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="mdbcss/css/bootstrap.min.css">
  <!-- Material Design Bootstrap -->
  <link rel="stylesheet" href="mdbcss/css/mdb.min.css">
	
</head>
<body>
	
<?PHP
	if ($sumtotal >= 0 && $sumtotal <= 29) {
?>
		<div class="container p-3">
			<div class="row">
				<div class="col-md-12">
							
					<?PHP $color = "danger-color-dark" ?>
					<!-- Card -->
					<div class="card card-cascade" style="width: 32rem">

						<!-- Card image -->
						<div class="view view-cascade gradient-card-header <?PHP echo $color ?> ">

							<!-- Title -->
							<h2 class="card-header-title mb-3"><?PHP echo $sumtotal ?> คะแนน</h2>
							<!-- Subtitle -->
							
							<p class="card-header-subtitle mb-0">“ต้องปรับปรุงเร่งด่วน”</p>

						</div>

						<!-- Card content -->
						<div class="card-body card-body-cascade text-center">
								
							<h6>
							<!-- Text -->
							<p align="center">ผลการดำเนินงานในภาพรวมด้านหน้าที่งานทางธุรกิจ <br> (Business Function)</p>
							<p align="center">ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์<strong>“ต้องปรับปรุงเร่งด่วน”</strong> ท่านอาจไม่ประสบความสำเร็จในการประกอบกิจการ หากความสามารถในด้านนี้ของท่านยังไม่ได้รับการพัฒนาให้สูงกว่านี้สามารถศึกษา ประเด็นที่ต้องปรับปรุงเร่งด่วน และประเด็นที่แนะนำให้ปรับปรุง เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สามารถอยู่รอดได้</p>
							</h6>
							<hr>

							
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalPoll-1">คลิกเพื่ออ่านรายละเอียดรายด้าน</button>

						</div>

					</div>
					<!-- Card -->
					
					
					
				</div>
			</div>
		</div>
						
<?PHP
	}else if ($sumtotal >= 30 && $sumtotal <= 87) {
	?>
		<div class="container p-3">
			<div class="row">
				<div class="col-md-12">
						
					<?PHP $color = "warning-color-dark" ?>
					<!-- Card -->
					<div class="card card-cascade" style="width: 32rem">

						<!-- Card image -->
						<div class="view view-cascade gradient-card-header <?PHP echo $color ?> ">

							<!-- Title -->
							<h2 class="card-header-title mb-3"><?PHP echo $sumtotal ?> คะแนน</h2>
							<!-- Subtitle -->
							
							<p class="card-header-subtitle mb-0">“ค่อนข้างดี”</p>

						</div>

						<!-- Card content -->
						<div class="card-body card-body-cascade text-center">
								
							<h6>
							<!-- Text -->
							<p align="center">ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ <strong>“ค่อนข้างดี”</strong> แต่ยังควรจะพัฒนาความสามารถหรือศักยภาพในด้านนี้ให้โดดเด่นกว่านี้ สามารถศึกษาประเด็นที่แนะนำให้ปรับปรุง เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สอดคล้องกับสถานะทางธุรกิจขององค์กรได้อย่างสมบูรณ์</p>
							</h6>
							<hr>

							
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalPoll-1">คลิกเพื่ออ่านรายละเอียดรายด้าน</button>

						</div>

					</div>
					<!-- Card -->
					
					
					
				</div>
			</div>
		</div>
	
	<?PHP
	}else{
	?>
	
		<div class="container p-3">
			<div class="row">
				<div class="col-md-12">
							
					<?PHP $color = "success-color-dark" ?>
					<!-- Card -->
					<div class="card card-cascade" style="width: 32rem">

						<!-- Card image -->
						<div class="view view-cascade gradient-card-header <?PHP echo $color ?>">

							<!-- Title -->
							<h2 class="card-header-title mb-3"><?PHP echo $sumtotal ?> คะแนน</h2>
							<!-- Subtitle -->
							
							<p class="card-header-subtitle mb-0">“คุณสมบัติที่โดดเด่น”</p>

						</div>

						<!-- Card content -->
						<div class="card-body card-body-cascade text-center">
								
							<h6>
							<!-- Text -->
							<p align="center">ความสามารถในการดำเนินกิจการของท่านมี <strong>“คุณสมบัติที่โดดเด่น”</strong> ท่านมีโอกาสที่จะประสบความสำเร็จสูง สามารถศึกษาประเด็นที่ควรพัฒนาเพิ่มเติม เพื่อนำไปพัฒนาธุรกิจและดำเนินการได้อย่างต่อเนื่อง เพื่อสร้างการเติบโต สร้างความได้เปรียบในการแข่งขันให้ยั่งยืน</p>
							</h6>
							<hr>

							
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalPoll-1">คลิกเพื่ออ่านรายละเอียดรายด้าน</button>

						</div>

					</div>
					<!-- Card -->
					
					
					
				</div>
			</div>
		</div>
	<?PHP
	}
?>
	
	
	


<!-- Modal: modalPoll -->
<div class="modal fade right" id="modalPoll-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">
    <div class="modal-content">
      <!--Header-->
      <div class="modal-header <?PHP echo $color ?>">
        <p class="heading lead">ค่าคะแนนสำหรับการวัดหน้าที่งานทางธุรกิจ (Business Function) รายด้าน 
        </p>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="white-text">×</span>
        </button>
      </div>

      <!--Body-->
      <div class="modal-body">
        <div class="text-center">
          <i class="far fa-file-alt fa-4x mb-3 animated rotateIn"></i>
          <p>
            <strong>ด้านการบริหารจัดการ</strong>
          </p>
					<p>
						คะแนนที่ได้ คือ <h1><?PHP echo $sum01 ?></h1>
					</p>
          <p>
						<?PHP
						if ($sum01 >= 0 && $sum01 <= 7) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ต้องปรับปรุง” ท่านอาจไม่ประสบความสำเร็จในการประกอบกิจการ หากความสามารถในด้านนี้ของท่านยังไม่ได้รับการพัฒนาให้สูงกว่านี้ สามารถศึกษา ‘ข้อที่ต้องปรับปรุงเร่งด่วน’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สามารถอยู่รอดได้
						<?PHP
						}else if ($sum01 >= 8 && $sum01 <= 21) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ค่อนข้างดี” แต่ยังควรจะพัฒนาความสามารถหรือศักยภาพในด้านนี้ให้โดดเด่นกว่านี้ สามารถศึกษา ‘ข้อแนะนำให้ปรับปรุง’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สอดคล้องกับสถานะทางธุรกิจขององค์กรได้อย่างสมบูรณ์
						<?PHP
						}else{
						?>
						ความสามารถในการดำเนินกิจการของท่านมี “คุณสมบัติที่โดดเด่น” ท่านมีโอกาสที่จะประสบความสำเร็จสูง สามารถนำ ‘ข้อแนะนำเพิ่มเติม’ คือ ควรมีการทบทวนและปรับปรุงแผนการดำเนินในด้านต่างๆ และการนำไปปฏิบัติอย่างต่อเนื่อง เพื่อให้ตัวชี้วัดผลการดำเนินการสามารถบรรลุตามเป้าหมายที่กำหนดครอบคลุมทุกกระบวนการที่สำคัญ เพื่อสร้างการเติบโต สร้างความได้เปรียบในการแข่งขันให้ยั่งยืน
						<?PHP
						}
						?>
          </p>
        </div>
				
				<hr>
			
				<div class="text-center">
          <p>
            <strong>ด้านการตลาด</strong>
          </p>
					<p>
						คะแนนที่ได้ คือ <h1><?PHP echo $sum02 ?></h1>
					</p>
          <p>
						<?PHP
						if ($sum02 >= 0 && $sum02 <= 10) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ต้องปรับปรุง” ท่านอาจไม่ประสบความสำเร็จในการประกอบกิจการ หากความสามารถในด้านนี้ของท่านยังไม่ได้รับการพัฒนาให้สูงกว่านี้ สามารถศึกษา ‘ข้อที่ต้องปรับปรุงเร่งด่วน’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สามารถอยู่รอดได้
						<?PHP
						}else if ($sum02 >= 11 && $sum02 <= 30) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ค่อนข้างดี” แต่ยังควรจะพัฒนาความสามารถหรือศักยภาพในด้านนี้ให้โดดเด่นกว่านี้ สามารถศึกษา ‘ข้อแนะนำให้ปรับปรุง’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สอดคล้องกับสถานะทางธุรกิจขององค์กรได้อย่างสมบูรณ์
						<?PHP
						}else{
						?>
						ความสามารถในการดำเนินกิจการของท่านมี “คุณสมบัติที่โดดเด่น” ท่านมีโอกาสที่จะประสบความสำเร็จสูง สามารถนำ ‘ข้อแนะนำเพิ่มเติม’ คือ ควรมีการทบทวนและปรับปรุงแผนการดำเนินในด้านต่างๆ และการนำไปปฏิบัติอย่างต่อเนื่อง เพื่อให้ตัวชี้วัดผลการดำเนินการสามารถบรรลุตามเป้าหมายที่กำหนดครอบคลุมทุกกระบวนการที่สำคัญ เพื่อสร้างการเติบโต สร้างความได้เปรียบในการแข่งขันให้ยั่งยืน
						<?PHP
						}
						?>
          </p>
        </div>

        <hr>
			
				<div class="text-center">
          <p>
            <strong>ด้านกระบวนการดำเนินธุรกิจ</strong>
          </p>
					<p>
						คะแนนที่ได้ คือ <h1><?PHP echo $sum03 ?></h1>
					</p>
          <p>
						<?PHP
						if ($sum03 >= 0 && $sum03 <= 6) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ต้องปรับปรุง” ท่านอาจไม่ประสบความสำเร็จในการประกอบกิจการ หากความสามารถในด้านนี้ของท่านยังไม่ได้รับการพัฒนาให้สูงกว่านี้ สามารถศึกษา ‘ข้อที่ต้องปรับปรุงเร่งด่วน’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สามารถอยู่รอดได้
						<?PHP
						}else if ($sum03 >= 7 && $sum03 <= 18) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ค่อนข้างดี” แต่ยังควรจะพัฒนาความสามารถหรือศักยภาพในด้านนี้ให้โดดเด่นกว่านี้ สามารถศึกษา ‘ข้อแนะนำให้ปรับปรุง’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สอดคล้องกับสถานะทางธุรกิจขององค์กรได้อย่างสมบูรณ์
						<?PHP
						}else{
						?>
						ความสามารถในการดำเนินกิจการของท่านมี “คุณสมบัติที่โดดเด่น” ท่านมีโอกาสที่จะประสบความสำเร็จสูง สามารถนำ ‘ข้อแนะนำเพิ่มเติม’ คือ ควรมีการทบทวนและปรับปรุงแผนการดำเนินในด้านต่างๆ และการนำไปปฏิบัติอย่างต่อเนื่อง เพื่อให้ตัวชี้วัดผลการดำเนินการสามารถบรรลุตามเป้าหมายที่กำหนดครอบคลุมทุกกระบวนการที่สำคัญ เพื่อสร้างการเติบโต สร้างความได้เปรียบในการแข่งขันให้ยั่งยืน
						<?PHP
						}
						?>
          </p>
        </div>
				
				<hr>
			
				<div class="text-center">
          <p>
            <strong>ด้านการเงิน</strong>
          </p>
					<p>
						คะแนนที่ได้ คือ <h1><?PHP echo $sum04 ?></h1>
					</p>
          <p>
						<?PHP
						if ($sum04 >= 0 && $sum04 <= 6) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ต้องปรับปรุง” ท่านอาจไม่ประสบความสำเร็จในการประกอบกิจการ หากความสามารถในด้านนี้ของท่านยังไม่ได้รับการพัฒนาให้สูงกว่านี้ สามารถศึกษา ‘ข้อที่ต้องปรับปรุงเร่งด่วน’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สามารถอยู่รอดได้
						<?PHP
						}else if ($sum04 >= 7 && $sum04 <= 18) {
						?>
						ความสามารถในการดำเนินกิจการของท่านอยู่ในเกณฑ์ “ค่อนข้างดี” แต่ยังควรจะพัฒนาความสามารถหรือศักยภาพในด้านนี้ให้โดดเด่นกว่านี้ สามารถศึกษา ‘ข้อแนะนำให้ปรับปรุง’ เพื่อปรับปรุงและพัฒนาการประกอบธุรกิจให้สอดคล้องกับสถานะทางธุรกิจขององค์กรได้อย่างสมบูรณ์
						<?PHP
						}else{
						?>
						ความสามารถในการดำเนินกิจการของท่านมี “คุณสมบัติที่โดดเด่น” ท่านมีโอกาสที่จะประสบความสำเร็จสูง สามารถนำ ‘ข้อแนะนำเพิ่มเติม’ คือ ควรมีการทบทวนและปรับปรุงแผนการดำเนินในด้านต่างๆ และการนำไปปฏิบัติอย่างต่อเนื่อง เพื่อให้ตัวชี้วัดผลการดำเนินการสามารถบรรลุตามเป้าหมายที่กำหนดครอบคลุมทุกกระบวนการที่สำคัญ เพื่อสร้างการเติบโต สร้างความได้เปรียบในการแข่งขันให้ยั่งยืน
						<?PHP
						}
						?>
          </p>
        </div>
	
	
    </div>
  </div>
</div>
<!-- Modal: modalPoll -->

<!-- jQuery -->
<script type="text/javascript" src="mdbcss/js/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="mdbcss/js/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="mdbcss/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="mdbcss/js/mdb.min.js"></script>
</body>
</html>