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
    <meta charset="utf-8">
    <title>后台管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen" />
    <link href="./manage/css/bootstrap.min.css" rel="stylesheet">
    <link href="./manage/css/font-awesome.min.css" rel="stylesheet">
    <link href="./manage/css/ionicons.min.css" rel="stylesheet">
    <link href="./manage/css/simplify.min.css" rel="stylesheet">
    <link href="./assert/sweetAlert/sweetalert.css" rel="stylesheet">
    <link href="./manage/css/site.index.css" rel="stylesheet">
    <link href="./manage/css/site.blank.css" rel="stylesheet">
</head>

<body class="overflow-hidden">
<div class="wrapper preload">
    <div class="sidebar-right">
        <!--右边滑出来的内容-->
    </div><!-- sidebar-right -->
    <header class="top-nav">
        <div class="top-nav-inner">
            <div class="nav-header">
                <button type="button" class="navbar-toggle pull-left sidebar-toggle" id="sidebarToggleSM">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>


                <a href="./myCourse.htm" class="brand"
                   data-toggle="tooltip" data-placement="bottom"
                   title="重新选择课程">
                    <i class="fa fa-database"></i>
                    <span id="course_name" class="brand-name"  data="${course_id}">
                    ${course_name}
                         <c:if test="${course_name == null}">
                         您还未选择课程
                         </c:if>
                        &nbsp;&nbsp;
                        <span id="course_class"></span>
                    </span>
                </a>
            </div>
            <div class="nav-container">
                <button type="button" class="navbar-toggle pull-left sidebar-toggle" id="sidebarToggleLG">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="pull-right m-right-sm">
                    <div class="user-block hidden-xs">
                        <a href="#" id="userToggle" data-toggle="dropdown">
                            <img src="./manage/images/headImg/1.jpg" alt=""
                                 class="img-circle inline-block user-profile-pic">
                            <div class="user-detail inline-block">
                                ${user_name}
                                <i class="fa fa-angle-down"></i>
                            </div>
                        </a>
                        <div class="panel border dropdown-menu user-panel">
                            <div class="panel-body paddingTB-sm">
                                <ul>
                                    <li>
                                        <a href="./myInfo.htm">
                                            <i class="fa fa-edit fa-lg"></i><span class="m-left-xs">修改信息</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="./loginOut.htm">
                                            <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i><span
                                                class="m-left-xs">退出登录</span>
                                        </a>
                                    </li>
                                    <!--用户名点击后填充位置-->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--<ul class="nav-notification">-->
                    <!--<li>-->
                    <!--<a href="#" data-toggle="dropdown"><i class="fa fa-envelope fa-lg"></i></a>-->
                    <!--<span class="badge badge-purple bounceIn animation-delay5 active">2</span>-->
                    <!--<ul class="dropdown-menu message pull-right">-->
                    <!--&lt;!&ndash;信封弹出时位置&ndash;&gt;-->
                    <!--<li><a>You have 4 new unread messages</a></li>-->
                    <!--<li>-->
                    <!--<a class="clearfix" href="#">-->
                    <!--<img src="images/profile/profile2.jpg" alt="User Avatar">-->
                    <!--<div class="detail">-->
                    <!--<strong>John Doe</strong>-->
                    <!--<p class="no-margin">-->
                    <!--Lorem ipsum dolor sit amet...-->
                    <!--</p>-->
                    <!--<small class="text-muted"><i class="fa fa-check text-success"></i> 27m ago-->
                    <!--</small>-->
                    <!--</div>-->
                    <!--</a>-->
                    <!--</li>-->
                    <!--</ul>-->
                    <!--</li>-->

                    <!--<li class="chat-notification">-->
                    <!--<a href="#" class="sidebarRight-toggle"><i class="fa fa-comments fa-lg"></i></a>-->
                    <!--<span class="badge badge-danger bounceIn">1</span>-->

                    <!--<div class="chat-alert">-->
                    <!--Hello, Are you there?-->
                    <!--</div>-->
                    <!--</li>-->
                    <!--</ul>-->
                </div>
            </div>
        </div><!-- ./top-nav-inner -->
    </header>


    <aside class="sidebar-menu fixed">
        <div class="sidebar-inner scrollable-sidebar">
            <div class="main-menu">
                <ul class="accordion">
                    <li class="menu-header">
                        Main Menu
                    </li>
                    <li class="openable bg-palette4">
                        <a href="#">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-key fa-lg"></i></span>
										<span class="text m-left-sm">选择班级</span>
										<span class="submenu-icon"></span>
									</span>
									<span class="menu-content-hover block">
										班级
									</span>
                        </a>
                        <ul class="submenu" id="classSub">
                            <c:forEach items="${course_class}" var="class_name">
                                <li class="myClass"><a onclick="setCourseClass(this)"><span class="submenu-label">${class_name.class_name}</span></a></li>
                            </c:forEach>
                            <c:if test="${course_class== null || course_class.size()==0}">
                                <li class="myClass"><a onclick="noClassTip()"><span class="submenu-label">该课程未绑定班级</span></a></li>
                            </c:if>
                        </ul>
                    </li>
                    <li class="bg-palette1 myClass">
                        <a onclick="correctExam()">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-pencil-square-o fa-lg"></i></span>
										<span class="text m-left-sm">批改实验预习测验</span>
									</span>
									<span class="menu-content-hover block">
										测验
									</span>
                        </a>
                    </li>
                    <li class="bg-palette3 myClass">
                        <a onclick="correctReport()">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-desktop fa-lg"></i></span>
										<span class="text m-left-sm">批改实验报告</span>
									</span>
									<span class="menu-content-hover block">
										报告
									</span>
                        </a>
                    </li>
                    <li class="bg-palette2">
                        <a href="./manage/myCourse.html" target="myFrame">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-book fa-lg"></i></span>
										<span class="text m-left-sm">我的课程</span>
									</span>
									<span class="menu-content-hover block">
										课程
									</span>
                        </a>
                    </li>

                </ul>
            </div>

        </div><!-- sidebar-inner -->
    </aside>

    <div class="main-container">
        <div class="padding-md">
            <iframe class="myFrame" name="myFrame" src="./manage/myCourse.html"></iframe>
        </div><!-- ./padding-md -->
    </div><!-- /main-container -->
</div><!-- /wrapper -->

<a href="#" class="scroll-to-top hidden-print"><i class="fa fa-chevron-up fa-lg"></i></a>


<input type="hidden" id="chapter_list" value="">
<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->

<script src="./manage/js/jquery-2.2.3.min.js"></script>
<script src="./manage/js/bootstrap.min.js"></script>
<script src='./manage/js/blank/jquery.slimscroll.min.js'></script>
<script src='./manage/js/blank/jquery.popupoverlay.min.js'></script>
<script src='./manage/js/blank/modernizr.min.js'></script>
<script src="./manage/js/simplify/simplify.js"></script>
<script src="./assert/sweetAlert/sweetalert.min.js"></script>
<script src="./manage/js/site.blank.js"></script>
</body>
</html>
