<?php

include('../../../inc/function/session.php');
include('../../../inc/function/connect.php');

$email = $_POST['email'];
$tl_path = $_POST['tl_path'];

$sql = "SELECT tm.m_password FROM
        tb_member tm ,
        tb_type_lms tl
        WHERE tl.tl_id = tm.tl_id AND tl.tl_path = '$tl_path' AND tm.m_email = '$email'";
$query = DbQuery($sql,null);
$row   = json_decode($query, true);
if($row['dataCount'] > 0){

  $arr['mail'] = $email;
  $arr['m_password'] = $row['data'][0]['m_password'];

  if(mailsenda($arr) == 200){
    header('Content-Type: application/json');
    exit( json_encode( array( 'status' => 'success' , 'message' => 'success') ) );
  }else{
    header('Content-Type: application/json');
    exit( json_encode( array( 'status' => 'danger' , 'message' => 'Mail is not match') ) );
  }
}else{
  header('Content-Type: application/json');
  exit( json_encode( array( 'status' => 'danger' , 'message' => 'fail') ) );
}



function mailsenda($arr){

  $sql = "SELECT * FROM mail_sent";
  $query = DbQuery($sql,null);
  $row   = json_decode($query, true);

  date_default_timezone_set('Asia/Bangkok');
  require '../../../admin/PHPMailer/PHPMailerAutoload.php';
  //
  $title = 'LMS Forgotpassword';

  $strmail = '<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
      '.$arr['m_password'].'
      </body>
    </html>
    ';

  //
  $mail             = new PHPMailer(true);
  $mail->isSMTP();
  $mail->CharSet    = "utf-8";
  $mail->Host       = $row['data'][0]['mail_host'];
  $mail->Port       = $row['data'][0]['mail_port'];
  $mail->SMTPSecure = $row['data'][0]['mail_SMTPSecure'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $row['data'][0]['mail_Username'];
  $mail->Password   = $row['data'][0]['mail_Password'];
  $mail->SetFrom($row['data'][0]['mail_Username'], $title);
  $mail->addAddress($arr['mail'], 'ToEmail');
  $mail->IsHTML(true);

  $mail->Subject = $title;
  $mail->Body    = $strmail;
  if($mail->send()) { return 200; } else { return 404; }
}



?>
