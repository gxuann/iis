<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$noticeText = $_GET['noticeText'];

$con = mysqli_connect('localhost', $dbName, $dbPwd);
if ($con) {
    if (mysqli_select_db($con, $dbName)) {
        $sql1 = "UPDATE noticeInfo SET noticeText='$noticeText' WHERE id=1";
        $sql2= "SELECT * FROM noticeInfo WHERE id=1";
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