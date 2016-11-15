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
    <title>后台管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="./assert/images/head.png" media="screen" />
    <link href="./manage/css/bootstrap.min.css" rel="stylesheet">
    <link href="./manage/css/font-awesome.min.css" rel="stylesheet">
    <link href="./manage/css/ionicons.min.css" rel="stylesheet">
    <link href="./manage/css/simplify.min.css" rel="stylesheet">
    <link href="./manage/css/site.index.css" rel="stylesheet">
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


                <a class="brand">
                    <i class="fa fa-database"></i><span class="brand-name">系统管理</span>
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
                                            <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i><span class="m-left-xs">退出登录</span>
                                        </a>
                                    </li>
                                    <!--用户名点击后填充位置-->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <%--<ul class="nav-notification">--%>
                        <%--<li>--%>
                            <%--<a href="#" data-toggle="dropdown"><i class="fa fa-envelope fa-lg"></i></a>--%>
                            <%--<span class="badge badge-purple bounceIn animation-delay5 active">2</span>--%>
                            <%--<ul class="dropdown-menu message pull-right">--%>
                                <%--<!--信封弹出时位置-->--%>
                                <%--<li><a>You have 4 new unread messages</a></li>--%>
                                <%--<li>--%>
                                    <%--<a class="clearfix" href="#">--%>
                                        <%--<img src="./manage/images/profile/profile2.jpg" alt="User Avatar">--%>
                                        <%--<div class="detail">--%>
                                            <%--<strong>John Doe</strong>--%>
                                            <%--<p class="no-margin">--%>
                                                <%--Lorem ipsum dolor sit amet...--%>
                                            <%--</p>--%>
                                            <%--<small class="text-muted"><i class="fa fa-check text-success"></i> 27m ago--%>
                                            <%--</small>--%>
                                        <%--</div>--%>
                                    <%--</a>--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>

                        <%--<li class="chat-notification">--%>
                            <%--<a href="#" class="sidebarRight-toggle"><i class="fa fa-comments fa-lg"></i></a>--%>
                            <%--<span class="badge badge-danger bounceIn">1</span>--%>

                            <%--<div class="chat-alert">--%>
                                <%--Hello, Are you there?--%>
                            <%--</div>--%>
                        <%--</li>--%>
                    <%--</ul>--%>
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

                    <li class="openable bg-palette3">
                        <a href="#">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-user fa-lg"></i></span>
										<span class="text m-left-sm">信息管理</span>
										<span class="submenu-icon"></span>
									</span>
									<span class="menu-content-hover block">
										信息
									</span>
                        </a>
                        <ul class="submenu">
                            <li class="openable">
                                <a href="">
                                    <span class="submenu-label">学生信息</span>
                                </a>
                                <ul class="submenu third-level">
                                    <li><a href="./manage/importStudentInfo.html" target="myFrame"><span class="submenu-label">导入学生信息</span></a></li>
                                    <li><a href="./manage/editStuInfo.html" target="myFrame"><span class="submenu-label">修改学生信息</span></a></li>
                                </ul>
                            </li>
                            <li class="openable">
                                <a href="">
                                    <span class="submenu-label">教师信息</span>
                                </a>
                                <ul class="submenu third-level">
                                    <li><a href="./manage/importTeachersInfo.html" target="myFrame"><span class="submenu-label">导入教师信息</span></a></li>
                                    <li><a href="./manage/editTeacherInfo.html" target="myFrame"><span class="submenu-label">修改教师信息</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="openable bg-palette4">
                        <a href="#">
									<span class="menu-content block">
										<span class="menu-icon"><i class="block fa fa-key fa-lg"></i></span>
										<span class="text m-left-sm">课程管理</span>
										<span class="submenu-icon"></span>
									</span>
									<span class="menu-content-hover block">
										课程
									</span>
                        </a>
                        <ul class="submenu">
                            <li><a href="./manage/createCourse.html" target="myFrame"><span class="submenu-label">创建新的课程</span></a></li>
                            <li><a href="./manage/editCourseInfo.html" target="myFrame"><span class="submenu-label">编辑课程内容</span></a></li>
                        </ul>
                    </li>

                </ul>
            </div>

        </div><!-- sidebar-inner -->
    </aside>

    <div class="main-container">
        <div class="padding-md">
            <iframe class="myFrame" name="myFrame" src="./manage/createCourse.html"></iframe>
        </div><!-- ./padding-md -->
    </div><!-- /main-container -->
</div><!-- /wrapper -->

<a href="#" class="scroll-to-top hidden-print"><i class="fa fa-chevron-up fa-lg"></i></a>

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->

<script src="./manage/js/jquery-2.2.3.min.js"></script>
<script src="./manage/js/bootstrap.min.js"></script>
<script src='./manage/js/blank/jquery.slimscroll.min.js'></script>
<script src='./manage/js/blank/jquery.popupoverlay.min.js'></script>
<script src='./manage/js/blank/modernizr.min.js'></script>
<script src="./manage/js/simplify/simplify.js"></script>
<script src="./manage/js/site.index.js"></script>
</body>
</html>
