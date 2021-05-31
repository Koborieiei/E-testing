<?php

include('../../../inc/function/session.php');
include('../../../inc/function/connect.php');
include('../../../inc/function/simple_html_dom.php');
include('../../../inc/function/mainFunc.php');

$user = strtolower($_POST['user']);
$pass = $_POST['pass'];
$type = $_POST['type'];
$redri = "../../pages/newetesting";



$sql   = "SELECT * FROM tb_member tm WHERE tm.m_id = 1 AND tm.m_username = '$user' AND tm.m_password = '$pass'";
$query = DbQuery($sql, null);
$json  = json_decode($query, true);
$_SESSION['member_ws'] = $json['data'][0];


if ($json['dataCount'] > 0) {
  $status = 'success';
  $message = 'success';
} else {
  $status = 'danger';
  $message = 'Not found password';
}
// $_SESSION['member_ws']['wstoken'] = $tl_wstoken;
// $redri = $json['data'][0]['rule_id']==-1?"admin_page":"home";



// }else{

// }

header('Content-Type: application/json');
exit(json_encode(array('status' => $status, 'message' => $message, 'returnURI' => $redri)));
