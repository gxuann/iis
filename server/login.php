<?php
login();
function login(){
    $code = $_GET['code'];
    $nick = $_GET['nick'];
    $imgUrl = $_GET['avaurl'];
    $appID = 'ENV_VALUE';
    $appSecret = 'ENV_VALUE';
    $dbName = 'iis';
    $dbPwd = 'ENV_VALUE';
    $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appID . '&secret=' . $appSecret . '&js_code=' . $code . '&grant_type=authorization_code';
   
    $info = file_get_contents($url);
    $json = json_decode($info);
    $arr = get_object_vars($json);
    $openid = $arr['openid'];
    $session_key = $arr['session_key'];
    $con = mysqli_connect('localhost', $dbName, $dbPwd);
    if ($con) {
        if (mysqli_select_db($con, $dbName)) {
            $sql1 = "select * from user where openid = '$openid'";
            $result = mysqli_query($con, $sql1);
            $result = mysqli_fetch_assoc($result);
            if ($result!=null) {
                $result = json_encode($result);
                echo $result;
            }else {
                $sql = "insert into user (openID,nickName,imgUrl,session) values ('$openid','$nick','$imgUrl','$session_key')";
                if (mysqli_query($con, $sql)) {
                    $arr['nick'] = $nick;
                    $arr['imgUrl'] = $imgUrl;
                    $arr = json_encode($arr);
                    echo $arr;
                } else {
                    die('failed' . mysqli_error($con));
                }
            }
        }
    } else {
        die(mysqli_error());
    }
}
