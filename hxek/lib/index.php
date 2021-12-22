<?php
// 引入mysql文件
include('mysql.php');
// 获取访问的方法
$fn = $_GET['fn'];
// add()  get() 
$fn();
// 添加数据的方法
function add(){
   // echo 222;
    $name = $_GET['name'];
    $password = $_GET['password'];
  
 
  
  $sql = "insert into hxek values(null,'$name','$password')";

  $res = query($sql);
  echo $res;
}


// 获取数据的方法
function get(){
  // 规定每一页数据长度
 

  $sql = "select * from hxek ";
  
  $res = select($sql);
  print_r(json_encode($res));
}

?>