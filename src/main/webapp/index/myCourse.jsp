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
    <title>我的课程</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen" />
    <link href="./index/css/bootstrap.min.css" rel="stylesheet">
    <link href="./index/css/font-awesome.min.css" rel="stylesheet">
    <link href="./index/css/site.myCourse.css" rel="stylesheet">

</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!--<a class="navbar-brand hidden-sm" href="./Bootstrap中文网_files/Bootstrap中文网.html">Bootstrap中文网</a>-->
        </div>
        <div class="navbar-collapse collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li class="hidden-sm hidden-md"><a href="./index/index.jsp" target="_blank">首页</a></li>
                <li><a href="./myCourse.htm">我的课程</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="./myInfo.htm">${user_name}</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container projects min-height">

    <div class="projects-header page-header">
        <h2>已选择的课程</h2>
        <p>选择您需要操作的课程</p>
    </div>

    <div class="row">
        <c:choose>
            <c:when test="${level == 2}">
                <%--<form id="myForm" method="post" enctype="application/x-www-form-urlencoded">--%>
                    <%--<input type="hidden" class="course_id" name="course_id">--%>
                    <%--<input type="hidden" class="course_name" name="course_name">--%>
                <%--</form>--%>
                <a href="./manage/blank.jsp" target="_blank">
                    <div class="col-sm-6 col-md-4 col-lg-3 ">
                        <div class="thumbnail" style="height: 334px;">
                            <img class="lazy" src="./assert/images/course/entrance.png" width="300" height="150">
                            <div class="caption">
                                <h3>
                                    <span class="course_title">管理系统</span><br>
                                    <small>@教师入口</small>
                                </h3>
                                <p>
                                    不选择课程直接进入管理系统。。。
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
                <c:forEach items="${myCourseList}" var="myCourse">
                    <a href="./${myCourse.course_id}/blank.htm")>
                        <div class="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="thumbnail" style="height: 334px;">
                                <img class="lazy" src="..\assert\images\course//${myCourse.course_id}.png" width="300"
                                     height="150">
                                <div class="caption">
                                    <h3>
                                        <span class="course_title">${myCourse.course_name}</span><br>
                                        <small>课程编号：${myCourse.course_id}</small>
                                    </h3>
                                    <p>
                                        选择课程进入当前课程管理界面
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </c:forEach>
            </c:when>
            <c:when test="${level == 1}">
                <c:forEach items="${courseList}" var="myCourse">
                    <a href="./getCourseDetails.htm?course_id=${myCourse.course_id}&tn=${myCourse.create_time}">
                        <div class="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="thumbnail" style="height: 334px;">
                                <img class="lazy" src="..\assert\images\course//${myCourse.course_id}.png" width="300"
                                     height="150">
                                <div class="caption">
                                    <h3>
                                        <span class="course_title">${myCourse.course_name}</span><br>
                                        <small>授课教师：${myCourse.create_time}</small>
                                    </h3>
                                    <p>
                                            ${myCourse.course_desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </c:forEach>
            </c:when>
        </c:choose>


    </div>
</div><!-- /.container -->

<div id="divFooter">
    <footer class="footer ">

        <hr>
        <div class="row footer-bottom">
            <ul class="list-inline text-center">
                <li><span class="glyphicon glyphicon-education" aria-hidden="true"></span>
                    <a href="http://www.miibeian.gov.cn/" target="_blank">
                        西安邮电大学电子工程学院</a>
                </li>
                <li><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                    <a href="http://weibo.com/bootcss" title="Bootstrap中文网官方微博" target="_blank"> 技术支持：@计算机应用技术实验室</a>
                </li>
            </ul>
        </div>
    </footer>
</div>


<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="./index/js/site.chooseCourse.js"></script>
</body>
</html>