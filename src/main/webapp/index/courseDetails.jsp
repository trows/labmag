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
    <title>课程章节</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen"/>
    <link href="./index/css/bootstrap.min.css" rel="stylesheet">
    <link href="./index/css/font-awesome.min.css" rel="stylesheet">
    <link href="./index/css/site.base.css" rel="stylesheet">
    <link href="../assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./index/css/site.courseDetails.css" rel="stylesheet">
    <link href="./index/css/site.courseDetail.modal.css" rel="stylesheet">
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
                <li><a href="./myCourse.htm" target="_blank">我的课程</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="./myInfo.htm">${user_name}</a></li>
            </ul>
        </div>
    </div>
</div>

<div id="divMain">
    <div id="divHead">
        <div id="DivHead1">
            <div>
                <div id="divImg">
                    <img src="..\assert\images\course//${course.course_id}.png">
                </div>
                <div id="divTitle">
                    <span id="spTitle" data="${course.course_id}">${course.course_name}</span>
                    <br><br>
                    <ul>
                        <li>授课教师：${teacher_name}</li>
                        <li>
                            课程介绍：${course.course_desc}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="divRow">
        <div class="col-lg-9">
            <div id="mainLeft">
                <!--目录-->
                <div id="divDir">
                    <span class="spDir">目录（未指定课时的实验请先选定实验实际课时再进行操作）</span>
                </div>

                <div id="divHourMain">
                    <c:forEach var="chapter" items="${chapterList}">
                        <div class="divHour" onclick="getModal(this)" state="0" data="${chapter.chapter_id}">
                            <c:choose>
                                <c:when test="${chapter.create_time == null}">
                                    <span class="spHourTitle">未指定课时：</span>
                                </c:when>
                                <c:otherwise>
                                    <span class="spHourTitle">第${chapter.create_time}次实验：</span>
                                </c:otherwise>
                            </c:choose>
                            <span class="spHourContent">${chapter.chapter_name}</span>
                            <span class="glyphicon glyphicon-check icon" aria-hidden="true"></span>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div id="mainRight">
                <span class="spRight"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;&nbsp;预习资料下载</span>

                <hr>
                <div>
                    <a href="#">
                        <div class="downInfo">
                            <span class="spHourContent">实验一.doc</span>
                            <i class="fa fa-download icon" aria-hidden="true"></i>
                        </div>
                    </a>
                    <a href="#">
                        <div class="downInfo">
                            <span class="spHourContent">教学视频.rar</span>
                            <i class="fa fa-download icon" aria-hidden="true"></i>
                        </div>
                    </a>
                    <a href="#">
                        <div class="downInfo">
                            <span class="spHourContent">参考资料.zip</span>
                            <i class="fa fa-download icon" aria-hidden="true"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>


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

<!--=========模态框内容==========-->

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="top-content">
        <div class="inner-bg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 form-box">

                        <div class="form-top">

                            <div class="form-top-left">
                                <!--<span class="glyphicon glyphicon-off" aria-hidden="true"></span>-->
                                <!--<br><br>-->
                                <h3 class="hModalText">---</h3>
                                <!--<p id="pModalText">&#45;&#45;&#45;&#45;</p>-->
                                <h3 class="hModalText">---</h3>
                            </div>
                            <div class="form-top-right">
                                <i class="fa fa-power-off" onclick="$('#myModal').modal('hide')"></i>
                            </div>
                        </div>
                        <div class="form-bottom">
                            <form role="form" action="" method="post" class="login-form">
                                <button type="button" class="btn inBtn" id="testBtn">开始测试</button>
                                <br><br><br>
                                <button type="button" class="btn inBtn" id="subBtn">提交报告</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</div>

<input type="hidden" id="course_id" value="${course_id}">
<!--================================-->
<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="../assert/sweetAlert/sweetalert.min.js"></script>
<script src="./index/js/site.courseDetail.js"></script>
</body>
</html>