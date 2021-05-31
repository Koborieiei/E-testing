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

	
<div class="container" align="center">
<div class="row">
	<div class="col-md-12" align="left">

			<!-- Purple Header -->
			<div class="edge-header deep-purple"></div>

			<!-- Main Container -->
			<div class="container free-bird">
				<div class="row">
					<div class="col-md-8 col-lg-6 mx-auto float-none white z-depth-1 py-2 px-2">

						<!--Naked Form-->
						<div class="card-body">
							<h2 class="h2-responsive" align="center"><strong><i class="fas  fa-lock fa-30x"></i>  SIGN IN</strong></h2>

							<!--Body-->
							<form name="frm" action="report.php" method="post">

								<div class="md-form">
									<i class="fas fa-user prefix"></i>
									<input name="username" type="text" id="form2" class="form-control">
									<label for="form2">Username</label>
								</div>
								<div class="md-form">
									<i class="fas fa-lock prefix"></i>
									<input name="passwd" type="password" id="form2" class="form-control">
									<label for="form2">Password</label>
								</div>
							

								<div class="text-xs-left">
									<button class="btn btn-primary">Sign in</button>
								</div>
							</form>
						</div>
						<!--Naked Form-->

					</div>
				</div>
			</div>
			<!-- /.Main Container -->
		
		
		
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
