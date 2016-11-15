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
    <title>批改试卷</title>
    <link href="./manage/css/bootstrap.min.css" rel="stylesheet">
    <link href="./manage/css/font-awesome.min.css" rel="stylesheet">
    <link href="./manage/css/site.tableBase.css" rel="stylesheet">
    <link href="./manage/css/site.examDetail.css" rel="stylesheet">
    <link href="./assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./assert/icheck/css/icheck/flat/red.css" rel="stylesheet">
    <link href="./index/css/site.show.css" rel="stylesheet">
</head>
<body>
<div style="display: none" id="account_id">${account_id}</div>
<div style="display: none" id="chapter_id">${chapter.chapter_id}</div>
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li class="hidden-sm hidden-md"><a href="./index/index.jsp">首页</a></li>
                <li><a href="./myCourse.htm" target="_blank">我的课程</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="./myInfo.htm">${user_name}</a></li>

            </ul>
        </div>
    </div>
</div>
<div class="warp">
    <div class="examTitle toTop">
        ${chapter.chapter_name}
    </div>
    <div class="main">
        <div id="paperTitle">
            <span class="mainTitle">班级：${account.class_name}</span>
            <span class="mainTitle">姓名：${account.user_name}</span>
            <span class="mainTitle">序号：${account.serial_number}</span>
        </div>
        <hr class="dashes"/>
        <div id="mainDiv">

        </div>
    </div>
</div>
<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="./assert/icheck/js/icheck.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./index/js/site.showMyExam.js"></script>

</body>
</html>