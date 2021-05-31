<?php

use function PHPSTORM_META\type;

include '../../../inc/function/session.php';
include '../../../inc/function/connect.php';
include '../../../inc/function/mainFunc.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header(
  'Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin'
);

$m_ids = $_SESSION['member_ws']['m_id'];
// $m_ids = empty($_SESSION['member_ws']['m_id']) ? 0 : $_SESSION['member_ws']['m_id'];
$skill_id = @$_POST['skill_id'];
$service = @$_POST['service'];



if (empty($service)) {
  $ObArr = [];
  $ObArr['status'] = 500;
  $ObArr['message'] = 'error service';
} else {
  // have service
  if ($service == 1) {
    //pretest

    //check con
    $sql = "SELECT * FROM et_attemp WHERE m_id = '$m_ids' AND is_done = 0 AND type = 1 ";
    $query = DbQuery($sql, null);
    $json = json_decode($query, true);
    $row = $json['data'][0];
    // print_r($row);

    if (empty($row) && getUserAttemp(1)['dataCount'] < 1) {
      // not con
      // pretest

      echo getUserAttemp(1)['dataCount'];

      $sql = "SELECT * FROM tb_member WHERE m_id = '$m_ids'";
      $query = DbQuery($sql, null);
      $json = json_decode($query, true);
      $row = $json['data'][0];

      $hard_skill = $row['hard_skill'];
      $soft_skill = $row['soft_skill'];
      // echo '$hard_skill';

      $hard_skill = empty($hard_skill) ? 0 : $hard_skill;
      $soft_skill = empty($soft_skill) ? 0 : $soft_skill;
      $skill = $hard_skill . "," . $soft_skill;

      //check config
      $sqlconfig = "SELECT * FROM et_config WHERE skill_id IN ($skill) AND type_id = 1 ";
      $queryconfig = DbQuery($sqlconfig, null);
      $jsonconfig = json_decode($queryconfig, true);
      $rowconfig = $json['data'][0];

      // enroll attemp
      $attempquery = "INSERT INTO et_attemp(m_id, type,skill_id,timestart,recent)
        VALUES ('$m_ids',1,'$skill',CURRENT_TIMESTAMP,1)";
      $query = DbQuery($attempquery, null);
      $row = json_decode($query, true);
      $id_attemp = $row['id'];

      //ประกาศอาเรย์
      $ObArr = [];
      $ObArr['status'] = 0;
      $ObArr['message'] = 'success';
      $ObArr['testinginfo'] = [
        'id' => $id_attemp,
        'type' => 'pre-test',
        'timeleft' => null,
        'recentquestion' => 1,
      ];

      // query questions
      $sqlquestion = '';
      $n = 1;
      foreach ($jsonconfig['data'] as $value) {
        if ($n != 1) {
          $sqlquestion = $sqlquestion . "UNION ALL ";
        }
        $sqlquestion = $sqlquestion . "(SELECT et_question.id AS id_question,et_question.* FROM et_question WHERE `skill_id` = " . $value['skill_id'] . " AND deleted_at IS NULL AND hidden != 1 LIMIT " . $value['n_question'] . ") ";

        $n++;
      }

      $sqlquestion = $sqlquestion . "order by RAND()";

      // echo $sqlquestion;

      $questionqry = "SELECT et_question.id AS id_question,et_question.* FROM et_question WHERE skill_id IN($skill) AND deleted_at IS NULL AND hidden != 1 order by RAND()";
      $questionqry = $sqlquestion;
      $query = DbQuery($questionqry, null);
      $row = json_decode($query, true);

      $uuid = '';
      if ($row['dataCount'] > 0) {
        foreach ($row['data'] as $value) {
          $uuid = $uuid . "'" . $value['uuid'] . "'" . ',';
        }
      } else {
        echo 'none quustion data';
      }
      $uuid = $uuid . '0';

      $ch = "SELECT * FROM et_question_choice WHERE question IN($uuid) ";
      $query = DbQuery($ch, null);
      $rowc = json_decode($query, true);

      $c_text = '';
      if ($rowc['dataCount'] > 0) {
        foreach ($rowc['data'] as $value) {
          $c_text = $c_text . $value['c_text'] . ',';
        }
      } else {
        echo 'none data';
      }

      $results = [];
      $n = 1;
      if ($row['dataCount'] > 0) {
        foreach ($row['data'] as $value) {
          $flag = $value['uuid'];
          // print_r($rowc);
          $resources = array_filter($rowc['data'], function ($var) use ($flag) {
            return ($var['question'] == $flag);
          });
          $answers = [];
          // check shuffle
          if ($value['shuffle'] == 1) {
            shuffle($resources);
          }

          // answers
          $correct_answerid = null;
          foreach ($resources as $value1) {
            $id_encode = base64_encode($value1['id']);
            $answer = [
              'id' => $value1['id'],
              'statment' => $value1['c_text'],
            ];

            if (intval($value1['fraction']) == 1) {
              $correct_answerid = $id_encode;
            }

            array_push($answers, $answer);
          }

          $result = [
            'index' => $n,
            'category' => $value['skill_id'],
            'type' => $value['q_type'],
            'question_id' => $value['id_question'],
            'question' => $value['q_text'],
            'correct_answerid' => $correct_answerid,
            'answers' => $answers,
            'answeredid' => null,
            'answeredat' => null,
            'marked' => false,
          ];
          array_push($results, $result);

          $n += 1;
        }
        // end loop

        storelogs($m_ids, $id_attemp, $results);
      }

      $ObArr['results'] = $results;
    } else if (getUserAttemp(1)['dataCount'] < 1) {
      $recent = $row['recent'];
      // con
      // con pre test
      $id_attemp = $row['id'];
      // หาข้อสอบ
      $attempquery = "SELECT `a`.`id` AS `id_log`, `b`.*,`a`.* FROM `et_answer_logs` AS `a` , `et_question` AS `b` WHERE `a`.`id_q` = `b`.`id` AND `a`.`id_attemp` = $id_attemp AND `b`.`deleted_at` IS NULL";
      $query = DbQuery($attempquery, null);
      $row = json_decode($query, true);
      $data = $json['data'][0];
      //ประกาศอาเรย์
      $ObArr = [];
      $ObArr['status'] = 0;
      $ObArr['message'] = 'success';
      $ObArr['testinginfo'] = [
        'id' => $id_attemp,
        'type' => 'pre-test con',
        'timeleft' => null,
        'recentquestion' => $recent,
      ];

      // หาช้อย

      $uuid = '';
      if ($row['dataCount'] > 0) {
        foreach ($row['data'] as $value) {
          $uuid = $uuid . "'" . $value['uuid'] . "'" . ',';
        }
      }
      $uuid = $uuid . '0';

      $ch = "SELECT * FROM et_question_choice WHERE question IN($uuid)";
      $query = DbQuery($ch, null);
      $rowc = json_decode($query, true);

      // map array
      $results = [];
      $n = 1;
      if ($row['dataCount'] > 0) {

        foreach ($row['data'] as $value) {

          $flag = $value['uuid'];
          // print_r($rowc);
          $resources = array_filter($rowc['data'], function ($var) use ($flag) {
            return ($var['question'] == $flag);
          });
          $answers = [];

          if ($value['shuffle'] == 1) {
            shuffle($resources);
          }

          // answers
          $correct_answerid = null;
          foreach ($resources as $value1) {
            $id_encode = base64_encode($value1['id']);
            $answer = [
              'id' => $value1['id'],
              'statment' => $value1['c_text'],
            ];

            if (intval($value1['fraction']) == 1) {
              $correct_answerid = $id_encode;
            }

            array_push($answers, $answer);
          }

          $result = [
            'index' => $n,
            'category' => $value['skill_id'],
            'type' => $value['q_type'],
            'question_id' => $value['id_q'],
            'question' => $value['q_text'],
            'correct_answerid' => $correct_answerid,
            'answers' => $answers,
            'answeredid' => $value['id_ch'],
            'answeredat' => $value['timeans'],
            'marked' => $value['is_mark'],
          ];
          array_push($results, $result);
          $n += 1;
        }
        // end loop

      }

      $ObArr['results'] = $results;
    }
  } elseif ($service == 2) {
    //posttest

    if (!isset($skill_id)) {
      // it dont have skill
      $ObArr = [];
      $ObArr['status'] = 500;
      $ObArr['message'] = 'error skill empty';
    } else {

      // have skill sent
      //check con
      $sql = "SELECT * FROM et_attemp WHERE m_id = '$m_ids' AND is_done = 0 AND type = 2 AND skill_id = $skill_id ";
      $query = DbQuery($sql, null);
      $json = json_decode($query, true);
      $row = $json['data'][0];

      // Wait for config
      if (empty($row)) {
        // not con

        //check config
        $sqlconfig = "SELECT * FROM et_config WHERE skill_id = $skill_id AND type_id = 2 ";
        $queryconfig = DbQuery($sqlconfig, null);
        $jsonconfig = json_decode($queryconfig, true);
        $rowconfig = $jsonconfig['data'][0];
        $timeleft = $rowconfig['timeduration'];
        $timeLimit = $rowconfig['timelimit'];

        if ($timeLimit <= getUserAttemp(2, $skill_id)['dataCount'] && !is_null($timeLimit)) {
          exit(json_encode(['status' => 204, 'message' => 'Test is limited'], JSON_UNESCAPED_UNICODE));
        }

        // enroll attemp
        $attempquery = "INSERT INTO et_attemp(m_id, type,skill_id,timetotal,timestart,recent)
              VALUES ('$m_ids',2,'$skill_id',$timeleft,CURRENT_TIMESTAMP,1)";
        $query = DbQuery($attempquery, null);
        $row = json_decode($query, true);
        $id_attemp = $row['id'];

        //ประกาศอาเรย์
        $ObArr = [];
        $ObArr['status'] = 0;
        $ObArr['message'] = 'success';
        $ObArr['testinginfo'] = [
          'id' => $id_attemp,
          'skill_id' => $skill_id,
          //2 = postest
          'type' => 'post-test',
          'timeleft' => $timeleft,
          'recentquestion' => 1,
        ];

        // query question
        $questionqry = "SELECT et_question.id AS id_question , et_question.* FROM et_question WHERE skill_id = $skill_id AND deleted_at IS NULL AND hidden != 1 LIMIT " . $rowconfig['n_question'] . "";
        $query = DbQuery($questionqry, null);
        $row = json_decode($query, true);

        $uuid = '';
        if ($row['dataCount'] > 0) {
          foreach ($row['data'] as $value) {
            $uuid = $uuid . "'" . $value['uuid'] . "'" . ',';
          }
        }
        $uuid = $uuid . '0';

        // query choice
        $ch = "SELECT * FROM et_question_choice WHERE question IN($uuid)";
        $query = DbQuery($ch, null);
        $rowc = json_decode($query, true);

        $c_text = '';
        if ($rowc['dataCount'] > 0) {
          foreach ($rowc['data'] as $value) {
            $c_text = $c_text . $value['c_text'] . ',';
          }
        } else {
          echo 'none question data';
        }

        // map q and c

        $results = [];
        $n = 1;
        if ($row['dataCount'] > 0) {

          foreach ($row['data'] as $value) {

            $flag = $value['uuid'];
            // print_r($rowc);
            $resources = array_filter($rowc['data'], function ($var) use ($flag) {
              return ($var['question'] == $flag);
            });
            $answers = [];

            // check shuffle
            if ($value['shuffle'] == 1) {
              shuffle($resources);
            }

            // answers list
            $correct_answerid = null;
            foreach ($resources as $value1) {
              $id_encode = base64_encode($value1['id']);
              $answer = [
                'id' => $value1['id'],
                'statment' => $value1['c_text'],
              ];

              if (intval($value1['fraction']) == 1) {
                $correct_answerid = $id_encode;
              }

              // echo intval($value1['fraction']);
              array_push($answers, $answer);
            }

            $result = [
              'index' => $n,
              'category' => $value['skill_id'],
              'type' => $value['q_type'],
              'question_id' => $value['id_question'],
              'question' => $value['q_text'],
              'correct_answerid' => $correct_answerid,
              'answers' => $answers,
              'answeredid' => null,
              'answeredat' => null,
              'marked' => false,
            ];
            array_push($results, $result);
            $n += 1;
          }
          // end loop

          $check = storelogs($m_ids, $id_attemp, $results);
        }

        $ObArr['results'] = $results;
        // $ObArr['check'] =  $check['errorInfo'][2];

      } else {
        // continue
        $recent = $row['recent'];

        // Fig bug when it has no data at the first time.
        $timeleft = $row['timeleft'];
        $timestart = $row['timestart'];
        $timetotal = $row['timetotal'];
        $id_attemp = $row['id'];
        // หาข้อสอบ
        $attempquery = "SELECT  a.id as id_log , b.*, a.*  FROM et_answer_logs AS a , et_question AS b WHERE a.id_q = b.id AND a.id_attemp = '$id_attemp' ";
        $query = DbQuery($attempquery, null);
        $row = json_decode($query, true);

        $timeleft = checktime($timestart, $timetotal);
        // endcheck
        //ประกาศอาเรย์
        $ObArr = [];
        $ObArr['status'] = 0;
        $ObArr['message'] = 'success';
        $ObArr['testinginfo'] = [
          'id' => $id_attemp,
          // 'skill_id' => $skill_id,
          //2 = postest
          'type' => 'post-test con',
          'timeleft' => $timeleft,
          'recentquestion' => $recent,
        ];

        // หาโจทย์และช้อย

        $uuid = '';
        if ($row['dataCount'] > 0) {
          foreach ($row['data'] as $value) {
            $uuid = $uuid . "'" . $value['uuid'] . "'" . ',';
          }
        }
        $uuid = $uuid . '0';
        // echo $uuid ;

        $ch = "SELECT * FROM et_question_choice WHERE question IN($uuid)";
        $query = DbQuery($ch, null);
        $rowc = json_decode($query, true);

        $results = [];
        $n = 1;
        if ($row['dataCount'] > 0) {

          foreach ($row['data'] as $value) {

            $flag = $value['uuid'];
            // print_r($rowc);
            $resources = array_filter($rowc['data'], function ($var) use ($flag) {
              return ($var['question'] == $flag);
            });
            $answers = [];

            if ($value['shuffle'] == 1) {
              shuffle($resources);
            }

            // answers
            $correct_answerid = null;
            foreach ($resources as $value1) {
              $id_encode = base64_encode($value1['id']);
              $answer = [
                'id' => $value1['id'],
                'statment' => $value1['c_text'],
              ];

              if (intval($value1['fraction']) == 1) {
                $correct_answerid = $id_encode;
              }

              // echo intval($value1['fraction']);
              array_push($answers, $answer);
            }

            $result = [
              'index' => $n,
              'category' => $value['skill_id'],
              'type' => $value['q_type'],
              'question_id' => $value['id_q'],
              'question' => $value['q_text'],
              'correct_answerid' => $correct_answerid,
              'answers' => $answers,
              'answeredid' => $value['id_ch'],
              'answeredat' => $value['timeans'],
              'marked' => $value['is_mark'],
            ];
            array_push($results, $result);
            $n += 1;
          }
          // end loop

        }

        $ObArr['results'] = $results;
      }
    }
  } else {
    //another
    // no service
    $ObArr = [];
    $ObArr['status'] = 500;
    $ObArr['message'] = 'error service';
  }
}
if (is_null($ObArr)) {
  exit(json_encode(['status' => 204, 'message' => 'Test is limited'], JSON_UNESCAPED_UNICODE));
}
exit(json_encode($ObArr, JSON_UNESCAPED_UNICODE));

function checktime($tstart, $ttotal)
{
  //  check timeleft

  $timedatenow = date("Y-m-d H:i:s", time());
  $dteStart = new DateTime($tstart);
  $dteEnd = new DateTime($timedatenow);
  $dteDiff = $dteStart->diff($dteEnd);
  $hours = $dteDiff->format('%h');
  $minutes = $dteDiff->format('%i');
  $second = $dteDiff->format('%s');
  $timeused = ($hours * 60 + $minutes) * 60 + $second;

  $timecheck = $ttotal - $timeused;

  if ($timeused > $ttotal) {
    return 0;
  } else {
    return $timecheck;
  }
}

function storelogs($m_id, $id_attemp, $resultanws)
{
  $sql = '';
  foreach ($resultanws as $value) {

    $sql = $sql . " INSERT INTO et_answer_logs(m_id, indexno, id_attemp, id_q) VALUES ($m_id,$value[index],$id_attemp,$value[question_id]);";
  }
  $query = DbQuery($sql, null);
  $row = json_decode($query, true);

  return $row;
}

function getUserAttemp($type, $skillId = 'null')
{
  global $m_ids;
  $whereSkillId = $skillId == 'null' ? '' : 'a.skill_id = ' . $skillId . ' AND';
  $query = "SELECT  * FROM et_attemp AS a LEFT JOIN tb_skill AS b  ON a.skill_id = b.hs_id WHERE $whereSkillId a.type = $type AND a.is_done = 1 AND a.m_id = $m_ids  ";
  $querys = DbQuery($query, null);
  $dataSet = json_decode($querys, true);
  return $dataSet['dataCount'] == 0 ? 0 : $dataSet;
}
