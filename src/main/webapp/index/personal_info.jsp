<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <title>个人主页</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen"/>
    <link rel="stylesheet" href="./index/css/bootstrap.min.css">
    <link rel="stylesheet" href="./index/css/font-awesome.min.css">
    <link rel="stylesheet" href="./assert/sweetAlert/sweetalert.css">
    <link rel="stylesheet" href="./index/css/site.index.modal.css">
    <link rel="stylesheet" href="./index/css/site.personal_info.css">
</head>
<body>
<div class="headWall">
    <div class="un"></div>
    <div class="myHeadImg">
        <img src="./assert/images/1.jpg">
    </div>
    <span class="title">hello  </span><span class="name">${account.user_name}</span><a class="moveRight"
                                                                                       href="/loginOut.htm">退出登录</a>
    <div class="tip"> 欢迎访问实验预习系统！</div>

    <div class="punch" onclick="">Info</div>
</div>
<div class="row adjust">
    <div class="col-lg-1"></div>
    <div class="col-lg-5">
        <span class="title md">account info!</span>
        <br><br>

        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">账号</span>
            <p class="form-control noBorder inputFont" aria-describedby="basic-addon1">${account.account_id}</p>
        </div>
        <br>
        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">原始密码</span>
            <input type="password" class="form-control noBorder inputFont" aria-describedby="basic-addon1"
                   value="########" id="origin">
        </div>
        <br>
        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">修改密码</span>
            <input type="password" class="form-control noBorder inputFont" aria-describedby="basic-addon1"
                   value="########" id="change">
        </div>
        <br>
        <div class="length">
            <button class="btn btn-danger center" onclick="submitChange()">修改密码</button>
        </div>
    </div>
    <div class="col-lg-5">
        <span class="title md"> personal info!</span>
        <br><br>
        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">姓名</span>
            <p class="form-control noBorder inputFont" aria-describedby="basic-addon1">${account.user_name}</p>
        </div>
        <br>

        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">邮箱</span>
            <input type="text" class="form-control noBorder inputFont" aria-describedby="basic-addon1"
                   value="${account.email}" id="email">
        </div>
        <br>
        <div class="input-group length">
            <span class="input-group-addon noBorder inputFont">手机</span>
            <input type="text" class="form-control noBorder inputFont" aria-describedby="basic-addon1"
                   value="${account.cellphone}" id="cellphone">
        </div>
        <br>
        <div class="length">
            <button class="btn btn-info center" onclick="submitInfo()">修改信息</button>
        </div>
        <div class="col-lg-1">
        </div>
    </div>
</div>

<input type="hidden" id="perEmail" value="${account.email}">
<input type="hidden" id="perCellphone" value="${account.cellphone}">

<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./index/js/site.personal_info.js"></script>
</body>
</html>