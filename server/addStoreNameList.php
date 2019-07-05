<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$storeName = $_GET['storeName'];

$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "INSERT INTO storeNameList (storeName) VALUES ('$storeName')";
            $sql2 = "SELECT COUNT(storeName) FROM storeNameList WHERE storeName='$storeName'";
            $result1 = mysqli_query($con, $sql1);
            $result = mysqli_query($con, $sql2);
            $result = mysqli_fetch_assoc($result);
            $result = json_encode($result);
        }
    } else {
        die(mysqli_error());
    }

?>