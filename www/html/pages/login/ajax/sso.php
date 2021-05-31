<?php

include('../../../inc/function/session.php');
include('../../../inc/function/connect.php');
include('../../../inc/function/simple_html_dom.php');
include('../../../inc/function/mainFunc.php');

$user = strtolower(@$_POST['user']);
$pass = @$_POST['pass'];
$type = @$_POST['type'];
$type_login = @$_POST['type_login']=='sso'?"sso":"";
$redri = "../../pages/home";

if(empty($user) || empty($pass) || empty($type) || empty($type_login)){
  header('Content-Type: application/json');
  exit( json_encode( array( 'status' => 'danger' , 'message' => 'fail' , 'data' => array()) ) );
}

$sql   = "SELECT * FROM tb_type_lms WHERE tl_id = '$type'";
$query = DbQuery($sql,null);
$json  = json_decode($query, true);
$count = $json['dataCount'];
$row   = $json['data'][0];
if($count == 1){

  $tl_id      = $row['tl_id'];
  $tl_url     = $row['tl_url'];
  $tl_wstoken = $row['tl_wstoken'];

}else{
  $status = 'danger';
  $message = 'fail';
  header('Content-Type: application/json');
  exit( json_encode( array( 'status' => $status , 'message' => $message , 'data' => $array) ) );
}

$array = array();
// query DB ->
$postFields = array(
  "username" => $user,
  "password" => $pass
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $tl_url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
curl_setopt($ch, CURLOPT_COOKIEJAR, "cookie.txt");
$response = curl_exec($ch);
curl_close($ch);

// $html = new simple_html_dom();
// $html->load($response);

// $arr = $html->find('//*[@id="navbarSupportedContent"]/nav/ul/li[1]/a');
$json = json_decode($response,true);
if($json['status'] != 'fail'){
  // INSERT & UPDATE TABLE
  $status  = 'success';
  $message = 'success';
  $wstoken = $tl_wstoken;

  $data = array(
    "wsfunction"=>"core_user_get_users_by_field",
    "field"=>"username",
    "values[0]"=>$user
  );
  if($array = service($wstoken , $data)[0]){

    $sql   = "SELECT * FROM tb_member WHERE m_username = '$user' AND m_password = '$pass' AND tl_id = '$tl_id' LIMIT 0,1";
    $query = DbQuery($sql,null);
    $json  = json_decode($query, true);
    $count = $json['dataCount'];

    if($count == 1){
      $row   = $json['data'][0];
      $id    = $row['m_id'];
      $sql = "UPDATE tb_member SET
                m_username    = '$user',
                m_password    = '$pass',
                m_fname       = '{$array['firstname']}',
                m_lname       = '{$array['lastname']}',
                m_email       = '{$array['email']}',
                m_image       = '{$array['profileimageurl']}',
                m_ids         = '{$array['id']}',
                m_date_update = now(),
                tl_id         = '$tl_id'
              WHERE  m_id     = '{$row['m_id']}';
              INSERT INTO tb_log_login(m_id,tl_id,ll_message) VALUES ('{$row['m_id']}','$tl_id','LOGIN');
              ";

              // INSERT INTO tb_log_login(m_id,tl_id) VALUES ('$row['m_id']','$tl_id');

    }else{

      $sql = "INSERT INTO
        tb_member(m_username, m_password, m_fname, m_lname, m_email, m_image, tl_id, m_ids, rule_id)
        VALUES ('$user','$pass','{$array['firstname']}','{$array['lastname']}','{$array['email']}','{$array['profileimageurl']}','$tl_id','{$array['id']}',0);";

    }

  }else{
    $status = 'danger';
    $message = 'service fail';
  }

  $query      = DbQuery($sql,null);
  $row        = json_decode($query, true);
  if(intval($row['errorInfo'][0]) != 0){
    $status = 'danger';
    $message = 'fail insert';
  }else{

    if($count == 0){
      $id = $row['id'];
      $sql = "INSERT INTO tb_log_login(m_id,tl_id,ll_message) VALUES ('$id','$tl_id','CREATE USER');";
      DbQuery($sql,null);
    }


    $sql   = "SELECT * FROM tb_member tm , tb_type_lms ttl WHERE tm.tl_id = ttl.tl_id AND tm.m_id = '$id'";
    $query = DbQuery($sql,null);
    $json  = json_decode($query, true);
    $_SESSION['member_ws'] = $json['data'][0];
    $_SESSION['member_ws']['wstoken'] = $tl_wstoken;
    // $redri = $json['data'][0]['rule_id']==-1?"admin_page":"home";
  }

}else{
  $status = 'danger';
  $message = 'fail login';
}

if($status == 'success' && $type_login == 'sso'){
  header( "location: https://edbot.com/backbone/pages/home/" );
  exit(0);
}else{
  header('Content-Type: application/json');
  exit( json_encode( array( 'status' => 'danger' , 'message' => 'fail') ) );
}



?>
