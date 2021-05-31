<?php

function service($wstoken , $data){
  $data['wstoken'] = $wstoken;
  $data['moodlewsrestformat'] = "json";

  $sql   = "SELECT * FROM tb_type_lms WHERE tl_wstoken = '$wstoken' OR tl_ex_wstoken = '$wstoken'";
  $query = DbQuery($sql,null);
  $json  = json_decode($query, true);
  $row   = $json['data'][0];

  $string = http_build_query($data);
  $ch = curl_init($row['tl_url_service']);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 30);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

  $response = curl_exec($ch);
  curl_close($ch);
  return json_decode($response,true);

}

?>
