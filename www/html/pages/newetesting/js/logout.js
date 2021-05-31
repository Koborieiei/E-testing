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