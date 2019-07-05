<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$regNumber = $_GET['regNumber'];
$inputStore = $_GET['inputStore'];
$newStore = $_GET['newStore'];
$storeSta = $_GET['storeSta'];
$optName = $_GET['optName'];

$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "INSERT INTO store (regNumber, store, storeSta, optName) VALUES ('$regNumber', '$inputStore', '$storeSta', '$optName')";
            $sql2 = "UPDATE productDetail SET store = '$newStore' WHERE regNumber ='$regNumber'";
            $result = mysqli_query($con, $sql1);
            $result1 = mysqli_query($con, $sql2);
            $result1 = mysqli_fetch_assoc($result1);
            $result1 = json_encode($result1);
        }
    } else {
        die(mysqli_error());
    }

?>