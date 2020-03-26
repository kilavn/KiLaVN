<?php
$servername = "remotemysql.com:3306";
$name = "4LYGt8GLt5";
$username = "hVObW5Z0wK";
$password = "4LYGt8GLt5";

$keychar = $_GET['Key'];

$ipchar = $_SERVER['REMOTE_ADDR'];

$conn = new mysqli($servername, $username, $password, $name);

     
if($conn->connect_error)
{
    echo 'SQL Connection failed!';
}
else
{
    
      $sql = "SELECT * FROM `whitelistbot` WHERE userkey = '$keychar' and IP = '$ipchar'";
      $result = mysqli_query($conn,$sql);
      
      $count = mysqli_num_rows($result);
      
      if($count == 1)
      {
          echo 'Whitelisted '.$ipchar;
      }
      else
      {
          echo $ipchar;
      }

}
?>
