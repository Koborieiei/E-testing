<!-- Bootstrap core JavaScript-->
<script src="../../vendor/jquery/jquery.min.js?v=<?=rand()?>"></script>
<script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js?v=<?=rand()?>"></script>

<!-- Core plugin JavaScript-->
<script src="../../vendor/jquery-easing/jquery.easing.min.js?v=<?=rand()?>"></script>

<!-- Custom scripts for all pages-->
<script src="../../js/sb-admin-2.min.js?v=<?=rand()?>"></script>

<!-- Page level plugins -->
<!-- <script src="../../vendor/chart.js/Chart.min.js"></script> -->

<!-- Page level custom scripts -->
<!-- <script src="../../js/demo/chart-area-demo.js"></script>
<script src="../../js/demo/chart-pie-demo.js"></script> -->
<script src="../../js/smoke.js?v=<?=rand()?>"></script>
<script src="../../js/main.js?v=<?=rand()?>"></script>

<!-- mainFunc -->
<!-- <script src="../../dist/js/mainFunc.js"></script> -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
  <i class="fas fa-angle-up"></i>
</a>

<div id='loading' class="bg-loading none">
  <div class="loading">
    <img class="" src="../../img/loading.gif" alt="">
  </div>
</div>

<script type="text/javascript">

function logout(){
  $.smkConfirm({
    text:'คุณต้องการออกจากระบบ',
    accept:'ยืนยัน',
    cancel:'ยกเลิก'
  },function(res){
    // Code here
    if (res) {
      window.location='../../login/<?=$_SESSION['member_ws']['tl_path']?>/';
    }
  });
}

</script>
