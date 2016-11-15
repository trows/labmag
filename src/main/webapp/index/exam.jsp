<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <title>我的测试</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen" />
    <link href="./index/css/bootstrap.min.css" rel="stylesheet">
    <link href="./index/css/font-awesome.min.css" rel="stylesheet">
    <link href="./index/css/site.base.css" rel="stylesheet">
    <link href="./index/css/site.exam.css" rel="stylesheet">
    <link href="./assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./index/css/editor/wangEditor.min.css" rel="stylesheet">
    <link href="./assert/icheck/css/icheck/flat/aero.css" rel="stylesheet">
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
                <li class="hidden-sm hidden-md"><a href="index.jsp" target="_blank">首页</a></li>
                <li><a href="myCourse.jsp" target="_blank">我的课程</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="./myInfo.htm">${user_name}</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="paper">
    <div class="testArea">
        <div class="paperTitle">
            ${chapter.chapter_name}
        </div>
        <span id="spDesc">本次考试总分${chapter.score}分，共${questionList.size()}题</span>
        <hr class="dashes"/>

        <c:forEach items="${questionList}" var="question" varStatus="index">
            <c:choose>
                <c:when test="${question.type == 1}">
                    <div class="question">
                        <span class="spCon" data="${question.question_id}" type = "${question.type}">第${index.count}题、${question.subject}（&nbsp;&nbsp;&nbsp;）</span>
                        <br>
                        <c:forEach items="${fn:split(question.options, '##')}" var="option">
                            <div class="answerC" onclick="siteCheckBox(this)"><input type="radio" name="${question.question_id}" value="${option}">&nbsp;&nbsp;${option}<br>
                            </div>
                        </c:forEach>
                    </div>
                    <hr>
                </c:when>
                <c:when test="${question.type == 2}">
                    <div class="question">
                        <span class="spCon" data="${question.question_id}" type = "${question.type}">第${index.count}题、${question.subject}</span>
                        <div class="input-group">
                            <span class="input-group-addon">答：</span>
                            <input type="text" class="form-control" placeholder="填空题、请在此区域内作答" aria-describedby="basic-addon1" onblur="getBlanks(this)">
                        </div>
                    </div>
                    <hr>
                </c:when>
                <c:when test="${question.type == 3}">
                    <div class="question">
                        <span class="spCon" data="${question.question_id}" type = "${question.type}">第${index.count}题、${question.subject}</span>
                        <div class="answerT" placeholder="简答题、请在此区域内作答" onclick="getEditor(this)"></div>
                        <!--<<div id="div1"></div>-->
                    </div>
                    <hr>
                </c:when>
            </c:choose>
        </c:forEach>
        <div class="sub">
            <button id="myButton" class="btn btn-primary" autocomplete="off">
                提交
            </button>
        </div>
    </div>
</div>


<div class="divFooter">
    <footer class="footer ">

        <hr>
        <div class="row footer-bottom">
            <ul class="list-inline text-center">
                <li><span class="glyphicon glyphicon-education" aria-hidden="true"></span>
                    <a href="http://www.miibeian.gov.cn/" target="_blank">
                        西安邮电大学电子工程学院</a>
                </li>
                <li><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                    <a href="http://weibo.com/bootcss" title="Bootstrap中文网官方微博" target="_blank">
                        技术支持：@计算机应用技术实验室</a>
                </li>
            </ul>
        </div>
    </footer>
</div>

<!--模态框-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

    <div id="ctrEditor">
        <div class="panel panel-default">
            <div class="panel-heading">简答题、请在下方作答

                <i class="fa fa-power-off fa-2x spIco" onclick="closeModal()"></i>
            </div>
            <div class="panel-body">
                <div id="editor"></div>
            </div>
        </div>


    </div>
</div>

<input id ="chapter_id" type="hidden" value="${chapter.chapter_id}">
<!--=============-->
<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="./assert/icheck/js/icheck.min.js"></script>
<script src="./index/js/editor/wangEditor.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./index/js/site.exam.js"></script>
</body>
</html>