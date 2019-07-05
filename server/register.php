<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$name = $_GET['name'];
$num = $_GET['num'];
$openID = $_GET['openID'];

$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "UPDATE user SET name='$name', num='$num' WHERE openID='$openID'";
            $result = mysqli_query($con, $sql1);
            echo $result;
        }
    } else {
        die(mysqli_error());
    }
?>