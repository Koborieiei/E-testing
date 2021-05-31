<?php
include("../../inc/function/session.php");
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <?php include("../../inc/css-header.php"); ?>
  <?php
  $title = 'EDBOT';
  if (isset($_GET['tl_path'])) {
    $sql   = "SELECT tl_name,tl_img_bg,tl_img_bg_top,tl_img_bg_btn FROM tb_type_lms WHERE tl_path = '{$_GET['tl_path']}'";
    $query = DbQuery($sql, null);
    $rows  = json_decode($query, true);
    if ($rows['dataCount'] > 0) {
      $img = $rows['data'][0]['tl_img_bg'];
      $title = $rows['data'][0]['tl_name'];
    }
  } else {
    $img = 'login-bb.jpg';
  }
  ?>
  <title><?= $title ?></title>

  <link rel="stylesheet" href="../../pages/login/css/login.css?v=<?= rand() ?>">
</head>

<body class="bg-gradient-primary">

  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-6 ">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-12">
                <div class="p-5" style="z-index: 1;
                  position: relative;">

                  <form class="user" action="../../pages/login/ajax/AED.php" id="formEmpty" data-smk-icon="glyphicon-remove-sign" novalidate>
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" name="user" data-smk-msg="character not uppercase A-Z" class="form-control form-control-user text-lowercase" required>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" name="pass" class="form-control form-control-user" placeholder="" required>
                    </div>

                    <input type="hidden" name="type" value="1">

                    <div class="mt-5">
                      <button type="submit" class="btn btn-facebook btn-user btn-block">Login</button>

                    </div>

                  </form>
                  <hr>
                  <div class="alert alert-info">
                    <p>
                      <b>Example User</b>
                    </p>

                    <p style="margin:0;">Username : usertest_1</p>
                    <p style="margin:0;">Password : .Usertest_1$</p>
                  </div>
                </div>

                <img width="100%;" src="../../image/<?= $rows['data'][0]['tl_img_bg_btn'] ?>" style="position: absolute;
                bottom: -2px;
                right: 0px;">
              </div>

              <!-- Modal -->
              <!-- <form action="../../pages/login/ajax/AEDEmail.php" method="post"> -->
              <form id="formEmail" data-smk-icon="glyphicon-remove-sign" novalidate>
                <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Forgotpassword</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">

                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" name="email" class="form-control" required>
                          <input type="hidden" name="tl_path" value="<?= $_GET['tl_path'] ?>" class="form-control" required>
                        </div>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Get Password</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>

    </div>

  </div>




  <?php include("../../inc/js-footer.php"); ?>
  <script src="../../pages/login/js/login.js?v=<?= rand() ?>"></script>
</body>

</html>