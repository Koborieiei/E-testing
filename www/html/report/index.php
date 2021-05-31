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
<body class="fixed-sn navy-blue-skin">

<?PHP
$m_ids   = $_SESSION['member_ws']['m_ids'];
$m_id = $_SESSION['member_ws']['m_id'];
$tl_id = $_SESSION['member_ws']['tl_id'];

if ($m_id != "") {
	$sql_member = "SELECT * FROM tb_member WHERE m_id = $m_id";
	$qr_member = db_query($sql_member);
	
?>
<div class="container pb-5">
	<div class="row">
		<div class="col-md-12">
			<?PHP
				// SIDEBAR
				include ("inc/sidenav.php");
				// TOP MENU BAR
				include ("inc/navbar.php");
			?>
		</div>
	</div>
</div>

<?PHP 
// $idcat = $arr[$i]['id'];
$idcat = 27;
// connect api for get course in this category
/// SETUP - NEED TO BE CHANGED
$token = '77179f3a8df4eeebf76563d5268e3c0f';
$domainname = 'http://ednext.in.th/lms';
$functionname = 'core_course_get_courses_by_field';

// REST RETURNED VALUES FORMAT
$restformat = 'json'; //Also possible in Moodle 2.2 and later: 'json'
					//Setting it to 'json' will fail all calls on earlier Moodle version

// PARAMETERS - NEED TO BE CHANGED IF YOU CALL A DIFFERENT FUNCTION
$data1 = 'category';

$params = "&field=".$data1."&value=".$idcat;

/// REST CALL
$serverurl = $domainname . '/webservice/rest/server.php'. '?wstoken=' . $token . '&wsfunction='.$functionname;

require_once('./curl.php');
$curl = new curl;
//if rest format == 'xml', then we do not add the param for backward compatibility with Moodle < 2.2
$restformat = ($restformat == 'json')?'&moodlewsrestformat=' . $restformat:'';
$resp = $curl->post($serverurl . $restformat, $params);
// print_r($serverurl . $restformat. $params);
//print_r($resp);

// convert json to array
$arrcourse = json_decode($resp,true);

$allincourse = count($arrcourse['courses']);
?>

<div class="container pt-5">
	<div class="row">
		<div class="col-md-12">
			<h4>Inter Rubber</h4>
		</div>
	</div>
	<div class="row">
		<!-- #1 -->
		<div class="col-md-3">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title"><?PHP echo $arrcourse['courses'][0]['fullname'] ?></h5>
					<p class="card-text">
					Some quick example text to build on the card title and make up the bulk of the
					card's content.
					</p>
					<button type="button" class="btn btn-primary">Button</button>
				</div>
			</div>
		</div>
		<!-- #2 -->
		<div class="col-md-3">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">
					Some quick example text to build on the card title and make up the bulk of the
					card's content.
					</p>
					<button type="button" class="btn btn-primary">Button</button>
				</div>
			</div>
		</div>
		<!-- #3 -->
		<div class="col-md-3">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">
					Some quick example text to build on the card title and make up the bulk of the
					card's content.
					</p>
					<button type="button" class="btn btn-primary">Button</button>
				</div>
			</div>
		</div>
		<!-- #4 -->
		<div class="col-md-3">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">
					Some quick example text to build on the card title and make up the bulk of the
					card's content.
					</p>
					<button type="button" class="btn btn-primary">Button</button>
				</div>
			</div>
		</div>
	</div>
</div>


<?PHP
}else{
	echo "Not Login";
}
?>

<!-- jQuery -->
<script type="text/javascript" src="mdbcss/js/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="mdbcss/js/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="mdbcss/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="mdbcss/js/mdb.min.js"></script>
	
</script>
</body>
</html>
