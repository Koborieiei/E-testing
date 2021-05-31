<?php
$USERIMG = isset($_SESSION['member'][0]['user_img'])?$_SESSION['member'][0]['user_img']:"";
?>
<header class="main-header" >

  <!-- Logo -->
  <a href="../home" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><img src="../../image/logo-mini.png"></span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg"><img src="../../image/hlogo.jpg" alt="THE HAY" class="logo-mm"></span>
  </a>

  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top" style="background:#13436b">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <!-- Navbar Right Menu -->
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <!-- Messages: style can be found in dropdown.less-->
        <li class="dropdown messages-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-envelope-o"></i>
            <span class="label label-success">4</span>
          </a>
          <ul class="dropdown-menu">
            <li class="header">You have 4 messages</li>
            <li>
              <!-- inner menu: contains the actual data -->
              <ul class="menu">
                <li><!-- start message -->
                  <a href="#">
                    <div class="pull-left">
                      <img src="<?= $USERIMG ?>" class="img-circle" alt="User Image">
                      <img src="<?= $USERIMG ?>" onerror="this.onerror='';this.src='images/user.png'" class="img-circle" alt="User Image">
                    </div>
                    <h4>
                      Support Team
                      <small><i class="fa fa-clock-o"></i> 5 mins</small>
                    </h4>
                    <p>Why not buy a new awesome theme?</p>
                  </a>
                </li>
                <!-- end message -->
                <li>
                  <a href="#">
                    <div class="pull-left">
                      <img src="../../dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                    </div>
                    <h4>
                      AdminLTE Design Team
                      <small><i class="fa fa-clock-o"></i> 2 hours</small>
                    </h4>
                    <p>Why not buy a new awesome theme?</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="pull-left">
                      <img src="../../dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                    </div>
                    <h4>
                      Developers
                      <small><i class="fa fa-clock-o"></i> Today</small>
                    </h4>
                    <p>Why not buy a new awesome theme?</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="pull-left">
                      <img src="../../dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                    </div>
                    <h4>
                      Sales Department
                      <small><i class="fa fa-clock-o"></i> Yesterday</small>
                    </h4>
                    <p>Why not buy a new awesome theme?</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="pull-left">
                      <img src="../../dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                    </div>
                    <h4>
                      Reviewers
                      <small><i class="fa fa-clock-o"></i> 2 days</small>
                    </h4>
                    <p>Why not buy a new awesome theme?</p>
                  </a>
                </li>
              </ul>
            </li>
            <li class="footer"><a href="#">See All Messages</a></li>
          </ul>
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="<?= $USERIMG ?>" onerror="this.onerror='';this.src='images/user.png'" class="user-image" alt="User Image">
            <span class="hidden-xs"><?=$NameTOP = ucwords($_SESSION['member'][0]['user_name'])?></span>
          </a>
          <ul class="dropdown-menu">
            <!-- User image -->
            <li class="user-header">
              <img src="<?= $USERIMG ?>" onerror="this.onerror='';this.src='images/user.png'" class="img-circle" alt="User Image">
              <p>
                <?=ucwords($_SESSION['member'][0]['user_name'].' '.$_SESSION['member'][0]['user_last'])?>
                <small>Member since <?=date("d M. Y",strtotime($_SESSION['member'][0]['user_since']))?></small>
              </p>
            </li>
            <!-- Menu Footer-->
            <li class="user-footer">
              <div class="pull-left">
                <a href="#" class="btn btn-default btn-flat">Profile</a>
              </div>
              <div class="pull-right">
                <a onclick="logout()" href="#" class="btn btn-default btn-flat">Sign out</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </nav>
</header>
