<?php
// require_once __DIR__ . '/connect.php';

class UserGsbUtility
{

  public function __construct($userId, $userTypeId)
  {
    $this->userId = $userId;
    $this->userTypeId = $userTypeId;
  }

  public function checkUserGsbType()
  {
    return $this->userTypeId == 6;
  }

  public function checkUserAttemp()
  {
    try {
      $sql = "SELECT COUNT(id) as totalrow FROM et_attemp WHERE m_id = $this->userId ";
      $query = DbQuery($sql, null);


      if (!$query) {
        throw new Exception('Error');
      }

      $dataJson  = json_decode($query, true);
      $dataRow   = $dataJson['data'][0];


      return $dataRow;
    } catch (Exception $e) {
      echo json_encode(
        [
          "message" => $e->getMessage()
        ],
      );
    }
  }


  public function isUserHasAttemp()
  {
    return intval($this->checkUserAttemp()['totalrow']) > 0;
  }

  public function getUserSoftSkill()
  {
    try {
      $sql = "SELECT COUNT(id) as totalrow FROM et_attemp WHERE m_id = $this->userId ";
      $query = DbQuery($sql, null);


      if (!$query) {
        throw new Exception('Error');
      }

      $dataJson  = json_decode($query, true);
      $dataRow   = $dataJson['data'][0];


      return $dataRow;
    } catch (Exception $e) {
      echo json_encode(
        [
          "message" => $e->getMessage()
        ],
      );
    }
  }
}
