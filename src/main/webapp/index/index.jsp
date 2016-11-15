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
    <title>电子工程学院实验预习系统</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen" />
    <link href="./index/css/bootstrap.min.css" rel="stylesheet">
    <link href="./index/css/font-awesome.min.css" rel="stylesheet">
    <link href="./index/css/site.index.css" rel="stylesheet">
    <link href="./assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./index/css/site.index.modal.css" rel="stylesheet">

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
        </div>
        <div class="navbar-collapse collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li class="hidden-sm hidden-md"><a href="./index/index.jsp">首页</a></li>
                <li><a href="./myCourse.htm" target="_blank" >我的课程</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="./myInfo.htm">${user_name}</a></li>

            </ul>
        </div>
    </div>
</div>

<div class="jumbotron masthead">
    <div class="container">
        <h1>电子工程学院</h1>
        <h2>实验预习、考核、管理自动化系统</h2>
        <p class="masthead-button-links">
            <button type="button" class="btn btn-lg btn-primary btn-shadow btn-lg" data-toggle="modal" data-target="#myModal">
               登陆
            </button>
        </p>
        <!-- Button trigger modal -->

        <ul class="masthead-links">
            <li>
                <a data-toggle="modal" data-target="#myModal2" role="button">忘记密码</a>
            </li>
        </ul>
    </div>
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
                                <h3>Login to our site</h3>
                                <p>Enter your username and password to log on:</p>
                            </div>
                            <div class="form-top-right">
                                <i class="fa fa-power-off" onclick="$('#myModal').modal('hide')"></i>
                            </div>
                        </div>
                        <div class="form-bottom">
                            <form role="form" action="./loginCheck.htm" method="post" class="login-form">
                                <div class="form-group">
                                    <label class="sr-only" for="form-username">Username</label>
                                    <input type="text" name="form-username" placeholder="用户名..." class="form-username form-control" id="form-username">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="form-password">Password</label>
                                    <input type="password" name="form-password" placeholder="密码..." class="form-password form-control" id="form-password">
                                </div>
                                <button type="submit" class="btn inBtn">登陆</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</div>

<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="top-content">
        <div class="inner-bg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 form-box">

                        <div class="form-top">

                            <div class="form-top-left">
                                <!--<span class="glyphicon glyphicon-off" aria-hidden="true"></span>-->
                                <!--<br><br>-->
                                <h3>找回密码</h3>
                                <p>请输入您的账号和密保邮箱:</p>
                            </div>
                            <div class="form-top-right">
                                <i class="fa fa-power-off" onclick="$('#myModal2').modal('hide')"></i>
                            </div>
                        </div>
                        <div class="form-bottom">
                            <form role="form" method="post" class="login-form">
                                <div class="form-group">
                                    <label class="sr-only" for="form-username">Username</label>
                                    <input type="text" name="form-username" placeholder="账户" class="form-username form-control" id="account_id">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="form-password">Password</label>
                                    <input type="text" name="form-password" placeholder="邮箱" class="form-password form-control" id="email">
                                </div>
                                <button type="button" class="btn inBtn" id="forgotPassword" onclick="forgot()">确认找回密码</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</div>


<!--================================-->
<div class="bc-social">
    <div class="container">
        <ul class="bc-social-buttons">
            <li class="social-qq">
                <span class="glyphicon glyphicon-education" aria-hidden="true"></span>
                 西安邮电大学电子工程学院
            </li>

            <li class="social-weibo">
                <span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                <a href="http://weibo.com/bootcss" title="Bootstrap中文网官方微博" target="_blank" > 技术支持：@计算机应用技术实验室</a>
            </li>
        </ul>
    </div>
</div>


<input type="hidden" id="return_code" value="${param.return_code}">

<script src="./index/js/jquery-2.2.3.min.js"></script>
<script src="./index/js/bootstrap.min.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./index/js/site.index.js"></script>

</body>
</html>