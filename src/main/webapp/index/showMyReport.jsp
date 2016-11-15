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
    <title>实验报告详情</title>
    <link href="./manage/css/bootstrap.min.css" rel="stylesheet">
    <link href="./manage/css/font-awesome.min.css" rel="stylesheet">
    <link href="./assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./manage/css/site.tableBase.css" rel="stylesheet">
    <link href="./manage/css/site.reportDetail.css" rel="stylesheet">
    <link href="./index/css/site.show.css" rel="stylesheet">
</head>
<body>
<div style="display: none" id="account_id">${account_id}</div>
<div style="display: none" id="chapter_id">${chapter.chapter_id}</div>
<div style="display: none" id="chart">${report.chart}</div>
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
    <div class="reportTitle toTop">
        ${chapter.chapter_name}
    </div>
    <div class="main">
        <div id="paperTitle">
            <span class="mainTitle">班级：${account.class_name}</span>
            <span class="mainTitle">姓名：${account.user_name}</span>
            <span class="mainTitle">序号：${account.serial_number}</span>
            <c:if test="${report.grade>-1}">
                <span class="mainTitle">得分：<span class="grade">${report.grade}</span></span>
            </c:if>
        </div>
        <hr class="dashes"/>
        <div id="mainDiv">
            <div class="question">
                <span class="spCon">一、实验心得</span>
                <div class="answerT">
                    ${report.study}
                </div>
            </div>
            <hr>
            <div class="question">
                <span class="spCon">二、实验建议</span>
                <div class="answerT">
                    ${report.advice}
                </div>
            </div>
            <hr>
            <div class="question">
                <span class="spCon">三、实验数据</span>
                <div class="answerT">
                    ${report.data}
                </div>
                <div id="dataArea">
                    <!--图表域-->
                </div>
            </div>
            <hr>
        </div>
    </div>
</div>
<script src="./manage/js/jquery-2.2.3.min.js"></script>
<script src="./manage/js/bootstrap.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./assert/Chart/Chart.min.js"></script>
<script src="./index/js/site.showMyReport.js"></script>
</body>
</html>