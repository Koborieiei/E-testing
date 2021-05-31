<?php
ini_set('display_errors', 1);

include('../../../inc/function/session.php');
include('../../../inc/function/connect.php');
include('../../../inc/function/mainFunc.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header(
  'Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin'
);

$m_ids = empty($_SESSION['member_ws']['m_id']) ? 0 : $_SESSION['member_ws']['m_id'];
// $m_ids = 189 ;
$service = @$_POST['service'];
$timeend = date("Y-m-d H:i:s", time());
$ObArr = [];


function _score($totalanswer)
{


  $totalsc = 0;
  $correct = 0;
  foreach ($totalanswer as $value) {
    $totalsc = $totalsc + $value['totalquestion'];

    foreach ($value['answers'] as $answervalue) {
      $correctid = base64_decode($answervalue['correct_answerid']);
      $answer = $answervalue['choiceid'];

      if ($correctid == $answer) {
        $correct = $correct + 1;
      }
    }
  }

  // $percent = _scorepercent($correct,$totalsc);

  return array("total" => $totalsc, "point" => $correct);
}

function _scorepercent($rawscore, $total)
{

  if ($rawscore == 0) {
    return 0;
  } else {
    $percent = round(($rawscore / $total) * 100.00, 1);
  }


  return $percent;
}


// skill score  
function _skillscore($totalanswer)
{


  $skills = '';
  $obskills = [];
  $skilllist = [];
  foreach ($totalanswer as $value) {
    $skill = $value['category'];
    $skills = $skills . $value['category'] . ",";
    $totalsc = $value['totalquestion'];
    $correct = 0;

    // process คำนวน

    foreach ($value['answers'] as $answervalue) {
      $correctid = base64_decode($answervalue['correct_answerid']);
      $answer = $answervalue['choiceid'];

      if ($correctid == $answer) {
        $correct = $correct + 1;
      }
      // $totalsc=$totalsc+1;
    }

    $percentskill =  _scorepercent($correct, $totalsc);

    $resultlist = array("skill_id" => $skill, "point" => $correct, "total" => $totalsc, "percent" => $percentskill);

    array_push($skilllist, $resultlist);
  }
  $skills = $skills . "0";
  // query skill
  $sql = "SELECT tb_skill.hs_id,tb_skill.hs_name FROM tb_skill  WHERE hs_id IN($skills)";
  $query = DbQuery($sql, null);
  $json  = json_decode($query, true);
  // echo $json['errorInfo'][2];

  $result_skill = [];
  foreach ($json['data'] as $key => $value) {
    $flag = $value['hs_id'];
    // print_r($rowc);
    $resources = array_filter($skilllist, function ($var) use ($flag) {
      return ($var['skill_id'] == $flag);
    });

    array_push($result_skill, ...$resources);
    $result_skill[$key]['skillname'] = $value['hs_name'];
  }



  return $result_skill;
}


if ($service == "submitresult") {
  $id_attemp = @$_POST['testingid'];
  $items = json_decode(@$_POST['items'], true);

  // querytime
  $sql = "SELECT * FROM et_attemp WHERE m_id = '$m_ids' AND id = $id_attemp";
  $query = DbQuery($sql, null);
  $json  = json_decode($query, true);
  $row   = $json['data'][0];
  $timetotal = $row['timetotal'];


  $dteStart = new DateTime($row['timestart']);
  $dteEnd   = new DateTime($timeend);
  $dteDiff  = $dteStart->diff($dteEnd);
  $hours   = $dteDiff->format('%h');
  $minutes = $dteDiff->format('%i');
  $second = $dteDiff->format('%s');
  $timeused = ($hours * 60 + $minutes) * 60 + $second;
  // echo  'Diff. in minutes is: '.$timeused;

  if ($timetotal == null) {
    // pretest
    $timeleft = "null";
  } else {
    $timeleft = $timetotal - $timeused;

    if ($timeleft < 0) {
      $timeleft = 0;
    }
  }



  // count point
  $result = _score($items);

  $point = $result['point'];
  $totalpoint = $result['total'];

  $skillpoint = _skillscore($items);

  $sqlinsert = "";
  foreach ($skillpoint as $value) {
    $sqlinsert = $sqlinsert . "INSERT INTO `et_skill_result` (`m_id`, `attemp_id`, `skill_id`, `percent`, `time`) VALUES ($m_ids,$id_attemp, " . $value['skill_id'] . "," . $value['percent'] . ",CURRENT_TIMESTAMP);";
  }

  $query = DbQuery($sqlinsert, null);



  $sql = "UPDATE et_attemp SET is_done = 1 ,timeused = $timeused ,timeleft = $timeleft ,timeend = CURRENT_TIMESTAMP ,score = $point  ,totalscore = $totalpoint ,timeupdate = CURRENT_TIMESTAMP  WHERE id = '$id_attemp' ";
  $query = DbQuery($sql, null);
  $row  = json_decode($query, true);

  $ObArr['check'] = $row['errorInfo'][2];
  // $ObArr['sql'] = $sql;

  $ObArr['status'] = 0;
  $ObArr['message'] = 'success';
  $ObArr['result'] = ['timeleft' => $timeleft, 'timeused' => $timeused, 'total' => $totalpoint, 'point' => $point, 'standard' => 60];
  $ObArr['skill'] = $skillpoint;
  // Add existed timelimit here
  $ObArr['timelimitleft'] = getUserAttempTimeLimit($m_ids, $skillpoint[0]['skill_id']);
  $ObArr['testingid'] = $id_attemp;

  exit(json_encode($ObArr, JSON_UNESCAPED_UNICODE));
} else {
  $ObArr['status'] = 500;
  $ObArr['message'] = 'danger';
  exit(json_encode($ObArr, JSON_UNESCAPED_UNICODE));
}

// echo json_encode([
//   'status' => 0,
//   'result' => [
//     'hours' => 1,
//     'minutes' => 30,
//     'point' => null,
//     'standard' => 60,
//   ],
//   'skills' => [
//     [
//       'id' => 1,
//       'skillname' => 'Financial',
//       'points' => 30,
//       'standard' => 60,
//     ],
//     [
//       'id' => 1,
//       'skillname' => 'Financial',
//       'points' => 30,
//       'standard' => 60,
//     ],
//   ],
// ]);

exit(json_encode(array("status" => "500", "message" => 'danger'), JSON_UNESCAPED_UNICODE));


function getUserAttempTimeLimit($userId, $skillid)
{
  // $query = "SELECT  * FROM et_attemp   WHERE is_done = 1 AND m_id = $m_ids  ";
  $query = "SELECT * FROM et_attemp AS a LEFT JOIN tb_skill AS b  ON a.skill_id = b.hs_id LEFT JOIN et_config as c ON a.skill_id = c.skill_id WHERE a.is_done = 1 AND a.type=2 AND c.type_id = 2 AND a.m_id = $userId AND a.skill_id = $skillid GROUP BY a.id ";
  $queryData = json_decode(DbQuery($query, null), true);

  $configTimelimit = $queryData['dataCount'] == 0 ? 2 : $queryData['data'][0]['timelimit'];
  $timeLimitRemaining =   $configTimelimit - $queryData['dataCount'] < 0 ? 'null' : $configTimelimit - $queryData['dataCount'];
  return $timeLimitRemaining;
}
