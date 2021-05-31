<?php
date_default_timezone_set("Asia/Bangkok");

function DbConnect()
{
    $db = "mysql:host=db;dbname=myDb"; //onesittichok.co.th:3306
    $user = "user";
    $pass = "test"; // 4O2SeIOa // Pass$1234
    $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
    try {
        return new PDO($db, $user, $pass, $options);
    } catch (Exception $e) {
        return $e->getMessage();
    }
}

function DbQuery($sql, $ParamData)
{
    try {
        $obj = DbConnect();
        // print_r(DbConnect());
        $stm = $obj->prepare($sql);
        if ($ParamData != null) {
            for ($x = 1; $x <= count($ParamData); $x++) {
                $stm->bindParam($x, $ParamData[$x - 1]);
            }
        }
        $stm->execute();
        $arr = $stm->errorInfo();
        $id = $obj->lastInsertId();
        $num = 0;
        while ($row = $stm->fetch(PDO::FETCH_ASSOC)) {
            $data['data'][] = $row;
            $num++;
        }
        $data['errorInfo'] = $arr;
        $data['dataCount'] = $num;
        $data['id'] = $id;

        if (isset($data)) {
            if ($num == 0) {
                $data['data'] = "";
            }
            $data['status'] = 'success';
            return json_encode($data);
        } else {
            $data['status'] = 'Fail';
            $data['data'] = "";
            return json_encode($data);
        }
    } catch (Exception $e) {
        $data['dataCount'] = 0;
        $data['status'] = 'Fail';
        $data['data'] = "";
        return json_encode($data);
        $e->getTraceAsString();
    }
}

function DBInsertPOST($arr, $taleName)
{
    unset($arr['button']);
    $arrKey = array();
    $arrValue = array();
    foreach ($arr as $key => $value) {
        $arrKey[] = $key;
        $arrValue[] = "'" . $value . "'";
    }
    $strKey = implode(",", $arrKey);
    $strValue = implode(",", $arrValue);
    $data = "INSERT INTO $taleName ($strKey) VALUES ($strValue);";
    return $data;
}

function DBUpdatePOST($arr, $taleName, $pk)
{
    unset($arr['button']);
    $arrUpdate = array();
    foreach ($arr as $key => $value) {
        if ($key == $pk) {
            $where = "WHERE $key = '$value'";
        } else {
            $arrUpdate[] = "$key = '$value'";
        }
    }
    $strUpdate = implode(",", $arrUpdate);
    $data = "UPDATE $taleName SET $strUpdate $where;";
    return $data;
}
