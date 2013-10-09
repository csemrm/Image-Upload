<?php

$data = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $userid = $_POST['userid'];
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["image"]["name"]);
    $extension = end($temp);
    if ((($_FILES["image"]["type"] == "image/gif") || ($_FILES["image"]["type"] == "image/jpeg") || ($_FILES["image"]["type"] == "image/jpg") || ($_FILES["image"]["type"] == "image/pjpeg") || ($_FILES["image"]["type"] == "image/x-png") || ($_FILES["image"]["type"] == "image/png")) && in_array($extension, $allowedExts)) {
        if ($_FILES["image"]["error"] > 0) {
            $data['error_code'] = $_FILES["image"]["error"];
        } else {
            $data['name'] = $_FILES["image"]["name"];
            $data['type'] = $_FILES["image"]["type"];
            $data['size'] = $_FILES["image"]["size"];
            $data['tmp_name'] = $_FILES["image"]["tmp_name"];

            $image_name = uniqid() . $_FILES["image"]["name"];
            move_uploaded_file($_FILES["image"]["tmp_name"], "upload/" . $image_name);
            $data['new_name'] = $image_name;
            
            
            
        }
    } else {
        $data['file'] = 'Invalid file';
    }
}

echo json_encode($data);