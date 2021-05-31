<?php

include __DIR__ . '/../../../inc/function/session.php';
include __DIR__ . '/../../../inc/function/authen.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-testing | Testing</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <?php include '../../../inc/function/connect.php'; ?>

    <link rel="stylesheet" href="../css/sb-admin-2.min.css">
    <link href="../../../css/smoke.css?v=<?= rand() ?>" rel="stylesheet">
    <link rel="stylesheet" href="./dist/vendors.css">
    <link rel="stylesheet" href="./dist/main.css">


</head>
<style> 
    .none {
        display: none;
    }

    .active {
        display: block;
    }
</style>

<body id="page-top" class="sidebar-toggled">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- END SIDEBAR -->

        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">

                <!-- START TOPBAR -->

                <?php include  __DIR__ . '/../../../inc/topbar.php'; ?>


                <!-- End of TOPBAR -->
                <div id="app" class="container px-2">
                </div>
                <!-- END OF CONTENT -->
            </div>
            <!-- START FOOT -->

            <?php include __DIR__ . '/../../../inc/footer.php'; ?>

            <!-- END FOOT -->
        </div>
        <!-- END OF WARPER -->
    </div>


    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <div id="loading" class="bg-loading none">
        <div class="loading">
            <img class="" src="../../../img/loading.gif" alt="">
        </div>
    </div>

    <script src="./dist/vendors.js?v=<?= uniqid() ?>"></script>
    <script src="./dist/main.js?v=<?= uniqid() ?>"></script>
    <script src="../js/fontawesome.min.js"></script>
    <script src="../js/solid.js"></script>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery.easing.min.js"></script>
    <script src="../../../js/smoke.js?v=<?= rand() ?>"></script>

    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="../js/sb-admin-2.min.js"></script>


    <script>
        function logout() {
            $.smkConfirm({
                text: 'คุณต้องการออกจากระบบ',
                accept: 'ยืนยัน',
                cancel: 'ยกเลิก'
            }, function(res) {
                // Code here
                if (res) {
                    window.location = '../../../login/<?= $_SESSION['member_ws']['tl_path'] ?>/';
                }
            });
        }
    </script>

    <!-- Custom scripts for all pages-->
</body>

</html>