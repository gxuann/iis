<?php
$dbName = 'iis';
$dbPwd = 'ENV_VALUE';

$regNumber = $_GET['regNumber'];

$con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql2 = "SELECT COUNT(regNumber) AS regNumber FROM productDetail WHERE regNumber='$regNumber'";
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