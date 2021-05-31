<?php
ini_set('display_errors', 1);
  include('../../../../inc/function/session.php');
  include('../../../../inc/function/connect.php');
  include('../../../../inc/function/mainFunc.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header(
  'Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin'
);

// $m_ids    = $_SESSION['member_ws']['m_ids'];
$m_ids = empty($_SESSION['member_ws']['m_id'])?13:$_SESSION['member_ws']['m_id'];
$service = @$_POST['service'];
$ObArr = [];

if($service   ==  "updatetime"){
  $timeleft   = @$_POST['timeleft'];
  $testingid  = @$_POST['testingid'];
  $sql = "UPDATE et_attemp SET timeleft = $timeleft ,timeupdate= CURRENT_TIMESTAMP WHERE id = '$testingid' ";
  $query = DbQuery($sql,null);  
  $json  = json_decode($query,true);
  if(intval($json['errorInfo'][0]) == 0){
    exit(json_encode(array("status" => "0","message" => 'success',"service"=>$service)));
  }else{
    exit(json_encode(array("status" => "500","message" => $json['errorInfo'][2]),JSON_UNESCAPED_UNICODE));
  }

}elseif($service=="updateresult"){

  $testingid      =   @$_POST['testingid'];
  $recentquestion =   @$_POST['recentquestion'];
  $testingid      =   @$_POST['testingid']; 
  $timeduration   =   @$_POST['duration']; 
  $id_c   =   $_POST['choiceid'];
  $id_q   =   $_POST['questionid'];
  $sql    =   "UPDATE et_answer_logs SET id_ch=$id_c ,timeans= CURRENT_TIMESTAMP ,timeduration = $timeduration WHERE id_attemp = '$testingid' AND id_q =  $id_q ;
   UPDATE et_attemp SET timeupdate= CURRENT_TIMESTAMP ,	recent = $recentquestion WHERE id = '$testingid' ";
  $query  =   DbQuery($sql,null);  
  $json   =   json_decode($query,true);

  if(intval($json['errorInfo'][0]) == 0){
    exit(json_encode(array("status" => "0","message" => 'update result success ')));
  }else{
    exit(json_encode(array("status" => "500","message" => $json['errorInfo'][2]),JSON_UNESCAPED_UNICODE));
  }

}else{
  
  $ObArr['status'] = 500;
  $ObArr['message'] = 'error service';
  $ObArr['service'] = $service;
  exit(json_encode($ObArr,JSON_UNESCAPED_UNICODE));

}
 exit(json_encode(array("status" => "500","message" =>"danger"),JSON_UNESCAPED_UNICODE));

?>
