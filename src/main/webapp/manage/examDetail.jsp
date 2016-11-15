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
</head>
<body>
<div style="display: none" id="list">${list}</div>
<div style="display: none" id="chapterList">${chapterList}</div>
<div style="display: none" id="index">${index}</div>
<div class="examTitle">
</div>

<div class="main">
    <div id="paperTitle">
    <span class="mainTitle"></span>
    <span class="mainTitle"></span>
    <span class="mainTitle"></span>
    </div>
    <hr class="dashes"/>
    <div id="mainDiv">

    </div>

    <div id="submit">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="请填写分数">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" onclick="setGrade(this)">确认打分</button>
      </span>
        </div>
    </div>
</div>
<script src="./manage/js/jquery-2.2.3.min.js"></script>
<script src="./manage/js/bootstrap.min.js"></script>
<script src="./assert/icheck/js/icheck.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./manage/js/site.examDetail.js"></script>

</body>
</html>