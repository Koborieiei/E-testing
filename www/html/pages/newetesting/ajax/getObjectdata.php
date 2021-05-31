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
// $m_ids = 189;
// $service = @$_POST['service'];

// check session id
if ($m_ids == 0) {
    // dont have ss id

    exit(json_encode(array("status" => "500", "message" => "no session! you have to login"), JSON_UNESCAPED_UNICODE));
} else {
    // have session id

    $sql = "SELECT * FROM tb_member WHERE m_id = '$m_ids'";
    $query = DbQuery($sql, null);
    $json  = json_decode($query, true);
    $row   = $json['data'][0];

    $hard_skill = $row['hard_skill'];
    $soft_skill = $row['soft_skill'];
    // echo '$hard_skill';
    $hard_skill = empty($hard_skill) ? 0 : $hard_skill;
    $soft_skill = empty($soft_skill) ? 0 : $soft_skill;
    // $hardskills = "8,9,10";
    // $softskills = "13,7,1";

    $skills =  $hard_skill . "," . $soft_skill;

    if (($hard_skill == 0) && ($soft_skill == 0)) {
        // skill null
        exit(json_encode(array("status" => "500", "message" => "no skill! you have to select skill first"), JSON_UNESCAPED_UNICODE));
    } else {

        $userAttemp = getUserAttemp($m_ids);

        // query skill amd config
        $query = "SELECT * FROM et_config AS a INNER JOIN tb_skill as b on a.skill_id = b.hs_id WHERE a.skill_id IN ($skills)";
        // $query = "SELECT * FROM et_config WHERE id = 1 ";

        $querys = DbQuery($query, null);
        $row  = json_decode($querys, true);
        // $data  = $json['data'][0];



        // pretest
        $datalist = [];
        $dataitems = [];
        // Pretest History

        $pretestactive = 1;
        $choicenumberpre = 0;
        $obpost = [];
        foreach ($row['data'] as $value) {
            // $value['timelimit'] = 2;




            $arrayFillter = !empty($userAttemp) ? array_filter($userAttemp['data'], function ($v, $k) {
                global $value;
                return $v['is_done'] == 1 && $v['hs_id'] == $value['skill_id'] && $v['type'] == 2;
            }, ARRAY_FILTER_USE_BOTH) : $userAttemp;

            $arrayLength = count($arrayFillter);


            if ($value['type_id'] == 1) {
                $choicenumberpre +=  $value['n_question'];

                if ($value['is_active'] == 0) {
                    $pretestactive = 0;
                }

                $skilllist = [
                    'skillid' => $value['skill_id'],
                    'skillname' => $value['hs_name']
                ];
                array_push($datalist, $skilllist);

                // Check config timelimit
            } elseif ($value['type_id'] == 2 && ($value['timelimit'] > $arrayLength || is_null($value['timelimit']))) {

                if ($value['is_active'] == 1) {


                    $query = "SELECT * FROM et_upload_files  WHERE is_active = 1 AND skill_id =  $value[skill_id]";
                    // $query = "SELECT * FROM et_config WHERE id = 1 ";
                    $querys = DbQuery($query, null);

                    $row  = json_decode($querys, true);

                    $postlist = [
                        'testingtype' => 2,
                        'skills' => ['skillid' => $value['skill_id'], 'skillname' => $value['hs_name']],
                        'testname' => "Post-test",
                        'time' => $value['timeduration'],
                        'choicenumber' => $value['n_question'],
                        'img' => "../../image/upload/" . $row['data'][0]['f_url'],
                        'isdone' => 0
                    ];
                }
                array_push($obpost, $postlist);
            } else {

                $query = "SELECT * FROM et_upload_files  WHERE is_active = 1 AND skill_id =  $value[skill_id]";
                // $query = "SELECT * FROM et_config WHERE id = 1 ";
                $querys = DbQuery($query, null);

                $row  = json_decode($querys, true);

                $postlist = [
                    'testingtype' => 2,
                    'skills' => ['skillid' => $value['skill_id'], 'skillname' => $value['hs_name']],
                    'testname' => "Post-test",
                    'time' => $value['timeduration'],
                    'choicenumber' => $value['n_question'],
                    'img' => "../../image/upload/" . $row['data'][0]['f_url'],
                    'isdone' => 1
                ];
                array_push($obpost, $postlist);
            }

        }


        $pretestAttempArray = !empty($userAttemp) ? array_filter($userAttemp['data'], function ($v, $k) {
            return $v['is_done'] == 1 && $v['type'] == 1;
        }, ARRAY_FILTER_USE_BOTH) : $userAttemp;


        if ($pretestactive == 1 && count($pretestAttempArray) < 1) {

            echo $choicnumberpre;


            $query = "SELECT * FROM et_upload_files  WHERE is_active = 1 AND skill_id IS NULL AND type = 3";
            // $query = "SELECT * FROM et_config WHERE id = 1 ";
            $querys = DbQuery($query, null);

            $row  = json_decode($querys, true);

            $obpre = [
                'testingtype' => 1,
                'skills' => $datalist,
                'testname' => "Pre-test",
                'time' => null,
                'choicenumber' => $choicenumberpre,
                'img' => "../../image/upload/" . $row['data'][0]['f_url'],
                'isdone' => 0
            ];
            array_push($dataitems, $obpre);
        } else {

            $query = "SELECT * FROM et_upload_files  WHERE is_active = 1 AND skill_id IS NULL AND type = 3";
            // $query = "SELECT * FROM et_config WHERE id = 1 ";
            $querys = DbQuery($query, null);

            $row  = json_decode($querys, true);

            $obpre = [
                'testingtype' => 1,
                'skills' => $datalist,
                'testname' => "Pre-test",
                'time' => null,
                'choicenumber' => $choicenumberpre,
                'img' => "../../image/upload/" . $row['data'][0]['f_url'],
                'isdone' => 1
            ];
            array_push($dataitems, $obpre);
        }

        // posttest

        // Check if pretest is done
        // Type needs to revise to 1
        $query = "SELECT * FROM et_attemp WHERE type = 1 AND is_done = 1 AND m_id = $m_ids";
        // $query = "SELECT * FROM et_config WHERE id = 1 ";
        $querys = DbQuery($query, null);
        $row  = json_decode($querys, true);

        // if it have pre test then push post test on
        if ($row['dataCount'] > 0) {
            array_push($dataitems, ...$obpost);
        }



        $ObArr = [];
        $ObArr['status'] = 0;
        $ObArr['message'] = 'success';
        $ObArr['items'] = $dataitems;
        $ObArr['history'] =  history($datalist, $m_ids);
        $ObArr['existedtest'] =  checkcon($m_ids);
        $ObArr['checkerror'] = $row['errorInfo'][2];
        $ObArr['imgcover'] = getPhotoCoverUrl();

        exit(json_encode($ObArr, JSON_UNESCAPED_UNICODE));
    }
}






exit(json_encode(array("status" => "500", "message" => "danger"), JSON_UNESCAPED_UNICODE));



function history($dataPreskill, $m_ids)
{

    $n = 1;
    global $userAttemp;
    $hisOb = [];
    if ($userAttemp['dataCount'] > 0) {


        foreach ($userAttemp['data'] as $value) {
            // check type
            if ($value['type'] == 1) {
                $type = "Pre-Test";
                $skills = $dataPreskill;
            } elseif ($value['type'] == 2) {
                $type = "Post-Test";
                $skills = [
                    'id' => $value['hs_id'],
                    'skillname' => $value['hs_name']
                    // 'id'=>null,
                    // 'skillname'=>null
                ];
            }

            $hislist = [
                'testname' => "ทดสอบครั้งที่ $n",
                'id' => $value['id'],
                'type' => $type,
                'skills' => $skills,
                'choicenumber' => $value['totalscore'],
                'timestamp' => $value['timestart'],
                'timeused' => $value['timeused']
            ];
            array_push($hisOb, $hislist);
            $n++;
        }
    }

    return $hisOb;
}

function checkcon($m_id)
{
    // $query = "SELECT  * FROM et_attemp   WHERE is_done = 1 AND m_id = $m_ids  ";
    $query = "SELECT COUNT(*) - COUNT(`a`.`id_ch`) as 'Null' , COUNT(`a`.`id_ch`) AS 'notNull' ,`a`.* ,`b`.* FROM `et_answer_logs` AS `a` LEFT JOIN `et_attemp` AS `b` ON `a`.`id_attemp` = `b`.`id` WHERE `b`.is_done = 0 AND `b`.m_id = $m_id GROUP BY `a`.`id_attemp`";
    $querys = DbQuery($query, null);
    $row  = json_decode($querys, true);

    $n = 1;
    $obexited = [];
    if ($row['dataCount'] > 0) {



        foreach ($row['data'] as $value) {
            // query skill
            $skill_id = $value['skill_id'];
            $sqlskill = "SELECT * FROM tb_skill  WHERE hs_id IN ($skill_id) ";
            $queryskill = DbQuery($sqlskill, null);
            $rowskill  = json_decode($queryskill, true);

            $skills = [];
            foreach ($rowskill['data'] as $valueskill) {

                $skill = [
                    'skillid' => $valueskill['hs_id'],
                    'skillname' => $valueskill['hs_name']
                ];
                array_push($skills, $skill);
            }
            $q_num = $value['Null'] + $value['notNull'];
            $n_ans = $value['notNull'];
            $timeleft = checktime($value['timestart'], $value['timetotal']);

            // check type
            if ($value['type'] == 1) {
                $typename = "Pre-Test";
                $testingtype = 1;
                $timeleft = null;
            } elseif ($value['type'] == 2) {
                $typename = "Post-Test";
                $testingtype = 2;
            }

            $obexitedlist = [
                "testingid" => $value['id_attemp'],
                "timeleft" => $timeleft,
                "numberofanswers" => $n_ans,
                "testingtype" => $testingtype,
                "testname" => $typename,
                "questionnumber" => $q_num,
                "skills" => $skills
            ];

            array_push($obexited, $obexitedlist);
        }

        return   $obexited;
    } else {
        return   $obexited;
    }
}

function checktime($tstart, $ttotal)
{
    //  check timeleft 

    $timedatenow = date("Y-m-d H:i:s", time());
    $dteStart = new DateTime($tstart);
    $dteEnd   = new DateTime($timedatenow);
    $dteDiff  = $dteStart->diff($dteEnd);
    $hours   = $dteDiff->format('%h');
    $minutes = $dteDiff->format('%i');
    $second = $dteDiff->format('%s');
    $timeused = ($hours * 60 + $minutes) * 60 + $second;

    $timecheck = $ttotal - $timeused;

    if ($timeused > $ttotal) {
        return 0;
    } else {
        return   $timecheck;
    }
}


function getPhotoCoverUrl()
{
    $sqls = "SELECT f_url FROM et_upload_files WHERE is_active = 1 AND type = 1";
    $querys = DbQuery($sqls, null);
    $dataSet  = json_decode($querys, true)['data'][0];
    return  $dataSet == null ? 'etesting_cover_default.jpg' : $dataSet['f_url'];
}



function getUserAttemp($userid)
{
    // $query = "SELECT  * FROM et_attemp   WHERE is_done = 1 AND m_id = $m_ids  ";
    $query = "SELECT  * FROM et_attemp AS a LEFT JOIN tb_skill AS b  ON a.skill_id = b.hs_id WHERE a.is_done = 1 AND a.m_id = $userid  ";
    $querys = DbQuery($query, null);
    $dataSet = json_decode($querys, true);
    return $dataSet['dataCount'] == 0 ? [] : $dataSet;

    // $userAttemp = getUserAttemp($m_ids)['dataCount'] != 0 ? getUserAttemp($m_ids) : [];
}
