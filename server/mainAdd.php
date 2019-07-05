<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';
$productName = $_GET['productName'];
$regNumber = $_GET['regNumber'];
$factoryName = $_GET['factoryName'];
$repoName = $_GET['repoName'];
$store = $_GET['store'];


$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "INSERT INTO productDetail VALUES ('$productName','$regNumber','$factoryName','$repoName','$store')";
            $sql2 = "SELECT COUNT(regNumber) AS regNumber FROM productDetail WHERE regNumber='$regNumber'";
            $result1 = mysqli_query($con, $sql1);
            $result = mysqli_query($con, $sql2);
            $results = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $results[] = $row;
            }
            echo json_encode($results);
        }
    } else {
        die(mysqli_error());
    }

?>