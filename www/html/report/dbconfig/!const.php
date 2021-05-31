<?php
	define ("ADMIN",1);					//Admin role
	define ("SUPER",2);	//Superuser role
	define ("MEMBER",3);			//Member role
	define ("MALE","m");
	define ("FEMALE","f");
	/*--------------DBMS---------------*/	
	define("MY_SQL", "MYSQL"); 
/*----------------------------status-----------------------------------*/	
	define("ENABLE", 0);				//Default value, studying
	define("DISABLE", 1);
	define("DROP", 2);
	define("WAIT", 3);
	define("COMPLETE", 4);
	define("SHOW_ALL", 5);
	define("STUDY_FAIL", 6);

/*---------------------Date Style---------------------*/
	define("DEFAULT_STYLE", 0);
	define("DMY_STYLE", 1);
	define("YMD_STYLE", 2);
	define("MY_STYLE", 3);
	define("SECOND_FULL_STYLE", 1);
/*---------------------Picture---------------------*/
	define("NO_PIC","no_pic.gif");
/*--------------------Pagging---------------------*/
	define("ONE_PAGE", 20);  // Show detail at one page
	define("BASE_YEAR",2000); // Use in calendar
	define("TOP_YEAR",2030); //Use in calendar
	define("BASE_YEARB",1900); // Use in birthday	
	define("TOP_YEARB",2002); //Use in birthday
/*-----------------yes/no-----------------*/
	define("NO", 0);
	define("YES", 1);
/*---------------browser----------------*/	
	define("NN", 0);
	define("IE", 1);
	define("OP", 2);
/*------------ Date --------------*/
	define("NUM_YEAR", 5);
/*---------------TRUE/FALSE----------------*/	
	define("TRUE",1);
	define("FALSE",0);
/*---------------SHOW/HIDE----------------*/	
	define("SHOW",1);
	define("HIDE",0);	
/*---------------UploadPath----------------*/	
	define("NEWS", "images/news/");
	define("CONTACT", "images/contactus/");

	define("IMG","images/");
	//$data = $_SERVER['HTTP_HOST']."/fbec/ebook_app/";//SERVER UTCC
	$data = $_SERVER['HTTP_HOST']."/ebook_app/";//LOCAL
	define("BASEPATH",$data);
	$rpath = $_SERVER['DOCUMENT_ROOT']."/ebook_app/";
	define("REALPATH", $rpath);

	define ("SPLIT_FIELD","|");
	define ("NEW_LINE","|\r\n");
	define("MAXUPLOAD",10240000);	// 10 MB
?>