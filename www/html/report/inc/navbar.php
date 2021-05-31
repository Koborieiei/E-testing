  <!-- Navbar -->
  <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav">
	<!-- SideNav slide-out button -->
	<div class="float-left">
	  <a href="#" data-activates="slide-out" class="button-collapse black-text"><i class="fas fa-bars"></i></a>
	</div>
	<!-- Breadcrumb-->
	<div class="breadcrumb-dn mr-auto">
	  <p>Report | Edbot</p>
	</div>
	<ul class="nav navbar-nav nav-flex-icons ml-auto">
	  
	 <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user"></i> <?PHP echo $arr_pro['firstname']." ".$arr_pro['lastname']?>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-indigo"
              aria-labelledby="navbarDropdownMenuLink-333">
              <a class="dropdown-item" href="#">แก้ไขข้อมูลส่วนตัว</a>
              <a class="dropdown-item" href="https://educo.in.th/logout.php">ออกจากระบบ</a>
            </div>
          </li>
	</ul>
  </nav>
  <!-- /.Navbar -->