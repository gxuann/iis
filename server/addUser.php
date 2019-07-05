<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$name = $_GET['name'];
$num = $_GET['num'];
$admin = $_GET['admin'];

if($admin == 'true') {
    $adminSta = 1;
}elseif($admin == 'false') {
    $adminSta = 0;
}
$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "INSERT INTO userList VALUES ('$name','$num','$adminSta')";
            $sql2= "SELECT * FROM userList WHERE num='$num'";
            $result1 = mysqli_query($con, $sql1);
            $result = mysqli_query($con, $sql2);
            $result = mysqli_fetch_assoc($result);
            $result = json_encode($result);
            echo $result;
        }
    } else {
        die(mysqli_error());
    }

?>