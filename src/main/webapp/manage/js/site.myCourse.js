window.onload = function () {
    initPage();
    bindTooltip();
}


var pubTea_course_id;
//这是一个不重复数组
var my_course_list = new Array();
var searchCheck = false;
var class_list = new Array();

//判断数值是否组在于公共数组中
function isContain(array, value) {
    for (i in array) {
        if (value == array[i]) {
            return true
        }
    }
    return false;
}

//不重复数组的添加方法
function add(array, value) {
    if (!isContain(array, value)) {
        array[array.length] = value;
    }
}
//不重复数组的删除方法
function del(array, value) {
    console.log(array.length);
    console.log(value);
    for (i in array) {
        console.log(array[i]);
        if (value == array[i]) {
            array[i] = "";
        }
    }

    console.log(array.length)
}

//绑定tooltip
function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    })
}

function initPage() {
    $.post(
        "../getTeacher_relation.do",
        "",
        function (data, status) {
            if (check(data, status) && data != "error") {

                var json = eval("(" + data + ")");
                var length = json.length;
                for (var i = 0; i < length; i++) {
                    createCourseInfo(json[i], eval("(" + json[i].create_time + ")"));
                }
            }
        }
    );
}

function showAlert(tr) {

    if ($(tr).find("th").eq(3).text() == "已选") {
        swal("", "您已经选过此课程！", "warning");
        return;
    }

    var name = $(tr).find("th").eq(0).text();
    swal({
        title: name + '（' + $(tr).find("th").eq(2).text() + '课时）',
        text: "确认选择该课程?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认选课",
        cancelButtonText: "放弃选择",
        closeOnConfirm: false
    }, function () {
        $.post("../curricula_variable.do",
            {
                course_id: $(tr).find("th").eq(1).text(),
                course_name: name
            },
            function (data, status) {
                if (check(data, status) && data != "error") {
                    var info = data.split('##');
                    createCourseInfo(eval("(" + info[0] + ")"), eval("(" + info[1] + ")"));
                    $(tr).find("th").eq(3).text("已选");
                    swal(name, "您已成功选择该课程！", "success");
                    return;
                }
                swal(name, "选课失败！\n失败原因：网络问题，或是您已经选过此课程", "error");
            }
        );

    });
}

function createCourseInfo(course, chapterList) {


    var length = chapterList.length;
    var chapterInfo = "";
    for (var i = 0; i < length; i++) {
        chapterInfo += '<li>' + chapterList[i].chapter_name + ' / 编号' + chapterList[i].chapter_id + '</li>'
    }
    // console.log(chapterInfo);
    var htm = '<div class="col-sm-6 col-md-3">' +
        '<div class="thumbnail">' +
        '<a data-toggle="popover" data-html=true data-container="#myCourse" data-placement="auto right"' +
        'title="<ul>课时详情<ul>"' +
        'data-content="<ul>' +
        chapterInfo +
        '</ul>' +
        '">' +
        '<img src="../assert/images/course/' + course.course_id + '.png" alt="...">' +
        '<div class="caption">' +
        '<h3><strong>' + course.course_name + '</strong></h3>' +
        '<p><strong>课程编号：</strong><strong>' + course.course_id + '</strong></p>' +
        '</div>' +
        '</a>' +
        '<p>' +
        '<button class="btn btn-primary" role="button" onclick=getDetail(this) data=\'' + course.tea_course_id + '\'>班级选择</button>' +
        '<button class="btn btn-default" role="button" onclick=dropCourse(this) data=\'' + course.tea_course_id + '\'>退选课程</button>' +
        '</p>' +
        '</div>' +
        '</div>';
    $("#tip").hide(1000);
    $(".myCourseTitle").eq(0).text("课程列表");
    add(my_course_list, course.course_id);
    $(".row:first").append(htm);
    $('[data-toggle="popover"]').popover();
}

function dropCourse(button) {
    var name = button.parentNode.parentNode.getElementsByTagName('strong')[0].innerHTML;

    swal({
        title: name,
        text: "确认退选该课程?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认退选",
        cancelButtonText: "放弃退选",
        closeOnConfirm: false
    }, function () {

        $.post(
            '../dropCourse.do',
            {id: $(button).attr('data')},
            function (data, status) {
                if (check(data, status) && data == 1) {
                    var parent = button.parentNode.parentNode.parentNode;
                    del(my_course_list, button.parentNode.parentNode.getElementsByTagName('strong')[2].innerHTML);
                    $(parent).hide(1000);
                    setTimeout('$(parent).remove()', 1000);
                    swal(name, "您已成功退选该课程！", "success");
                } else {
                    swal(name, "退选失败！", "error");
                }
            }
        );

    });
}

function getDetail(button) {
    pubTea_course_id = $(button).attr("data");
    initInnerPage();
    showModal();
}

function showModal() {


    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
function abandon() {
    resetModal();
    $('#myModal').modal('hide');
}

//添加一个班级
function newClass() {

    var class_name = $(".drop").eq(0).text();
    var start_time = $(".drop").eq(1).text();
    var end_time = $(".drop").eq(2).text();
    // console.log();
    // console.log(class_name.substr(-4));
    // console.log(class_name+'--'+start_time+'--'+end_time);
    if (class_name=='未选择班级' || isNaN(class_name.substr(-4))) {
        swal("error", "未选择授课班级", "error");
        return;
    }

    if (start_time.length!=10) {
        swal("error", "未选择授课授课开始时间", "error");
        return;
    }

    if (end_time.length!=10) {
        swal("error", "未选择授课授课结束时间", "error");
        return;
    }

    swal({
        title: class_name,
        text: "确认选择该班级?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认绑定",
        cancelButtonText: "放弃绑定",
        closeOnConfirm: false
    }, function () {

        $.post(
            "../bindingClass.do",
            {data: '{\"class_name\":\"' + class_name + '\",\"tea_course_id\":\"' + pubTea_course_id + '\",\"start_time\":\"' + start_time + '\",\"end_time\":\"' + end_time + '\"}'},
            function (data, status) {
                if (check(data, status) && data == 1) {

                    var th = '<tr class="innerTr" data = \''+pubTea_course_id+'##'+class_name+'\'><th>'+class_name+'</th>' +
                        '<th>'+start_time+'   -   '+end_time+'</th>' +
                        '<th class="center"  onclick=unwrap(this)><i class="fa fa-trash-o" aria-hidden="true"></i></th></tr>';
                    var table = $("table").eq(1);
                    if($(table).find('tr').length == 0){
                        $("#tip2").hide(1000);
                        $(".myCourseTitle").eq(2).text("已选班级");
                        var tableTitle = '<tr><th class="innerTableTitle">班级</th><th class="innerTableTitle">实验开始时间</th>' +
                            '<th class="innerTableTitle">操作</th></tr>';
                        $(table).append(tableTitle);
                    }
                    $(table).append(th);
                    resetInput();
                    swal('成功', "您已成功选择班级！", "success");
                } else {
                    swal('error', '绑定班级失败', "error");
                }
            }
        );


    });
}

function search() {
    $("#showAllClass").hide(500);
    $("#searchDiv").show(1000);
    $("#searchDiv").css("display", "inline-block");
    searchCheck = true;
}

//搜索方法
function aim() {
    var inputText = $("input:first").val();
    if (inputText.length == 0) {
        setTimeout('sweetAlert("warning", "输入不能为空！", "warning")', 100);
        return;
    }
    var target, type;
    if (isNaN(inputText)) {
        if (inputText == "*") {
            target = '../getAllCourseInfo.do';
            type = '所有课程'
        } else {
            target = '../getCourseByName.do';
            inputText = '%' + inputText + '%';
            type = '名称';
        }
    } else {
        target = '../getCourseById.do';
        type = '课程编号';
    }
    $.post(target,
        {data: inputText},
        function (data, status) {
            if (check(data, status)) {
                if (data == "[]") {
                    sweetAlert('NOT FOUND', "未找到" + type + ' : ' + inputText + '\n相关的信息', "info");
                } else {
                    // console.log(data);
                    createTable(data);
                    $("#searchDiv").hide(500);
                    $("#showAllClass").show(1000);
                    searchCheck = false;
                    // $(".myCourseTitle").eq(1).scrollTop($(".myCourseTitle").eq(1).scrollTop());
                    // $("body").scrollTop(200);

                }
            }
        });
}

function createTable(data) {
    $(".myCourseTitle").eq(1).text("课程列表");
    var table = $("table:first");
    table.empty();

    var title = '<tr><th class="tableTitle">课程名称</th><th class="tableTitle">课程编号</th>' +
        '<th class="tableTitle">课时数量</th><th class="tableTitle">状态</th></tr>';
    table.append(title);
    var list = eval("(" + data + ")");
    var length = list.length;
    for (var i = 0; i < length; i++) {
        // console.log(list[i]);
        // console.log(JSON.stringify(list[i])+'-----bug')
        var tr = '<tr delData = "" onclick=showAlert(this)>' +
            '<th>' + list[i].course_name + '</th>' +
            '<th>' + list[i].course_id + '</th>' +
            '<th>' + list[i].course_num + '</th>' +
            '<th>' + (isContain(my_course_list, list[i].course_id) ? "已选" : "未选") + '</th>' +
            '</tr>';
        // console.log(tr);
        table.append(tr);
    }
}

//键盘事件，按下回车发起搜索
$(document).keydown(function (event) {
    // console.log(event.keyCode)
    if (event.keyCode == 13 && searchCheck) {
        aim();
        // console.log($(".myCourseTitle").eq(1).scrollTop());
    }
});

//请求返回校验
function check(data, status) {
    if (data == "logout") {
        sweetAlert("logout", "由于长时间未操作，系统已自动退出，请刷新页面重新登陆！", "error");
        return false;
    }
    if (status != "success") {
        sweetAlert("error", "系统出错，请刷新页面重试或联系开发人员", "error");
        return false;
    }
    return true;
}

function innerSearch() {
    var inputText = $("#innerSearch").val();
    if (inputText.length == 0) {
        setTimeout('sweetAlert("warning", "输入不能为空！", "warning")', 100);
        return;
    }
    if (!isNaN(inputText) || !isNaN(inputText.substr(-5, 1)) || isNaN(inputText.substr(-4))) {
        swal("error", "班级格式输入出错！", "error");
        return;
    }

    $.post("../getExistClass.do",
        {class_name: inputText},
        function (data, status) {
            if (check(data, status) && data == "success") {
                $(".drop:first").text(inputText);
            } else {
                swal("error", '班级：' + inputText + '不存在！', "error");
            }

        }
    )
}


function pickDate1(element) {
    $('#datetimepicker2').datetimepicker('remove');
    $('#datetimepicker1').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 3,
        minView: 2,
        linkField: "mirror_field1"//值反射域
    }).on("changeDate", function () {
        console.log()
        var date = $("#mirror_field1").val().substr(0, 10);
        $(element).text(date);
        $('#datetimepicker1').datetimepicker('remove');
    });
}

function pickDate2(element) {
    $('#datetimepicker1').datetimepicker('remove');
    $('#datetimepicker2').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 3,
        minView: 2,
        linkField: "mirror_field2"//值反射域
    }).on("changeDate", function () {
        console.log()
        var date = $("#mirror_field2").val().substr(0, 10);
        $(element).text(date);
        $('#datetimepicker2').datetimepicker('remove');
    });
}

function resetModal() {
    resetInput();
    $(".myCourseTitle").eq(2).text('');
    class_list = new Array();
    $("table").eq(1).empty();
    $("#tip2").show();
}
function resetInput() {
    $("#innerSearch").val('');
    $(".drop").eq(0).text('未选择班级');
    $(".drop").eq(1).text('授课开始时间');
    $(".drop").eq(2).text('授课结束时间');
}

function initInnerPage() {
    $.post(
        "../getBindClass.do",
        {tea_course_id : pubTea_course_id},
        function (data,status) {
            if(check(data,status) && data!='[]'){
                createInnerTable(data);
            }
        }
    );
}

function createInnerTable(data) {
    $("#tip2").hide(1000);
    $(".myCourseTitle").eq(2).text("已选班级");
    var tableTitle = '<tr><th class="innerTableTitle">班级</th><th class="innerTableTitle">实验开始时间</th>' +
        '<th class="innerTableTitle">操作</th></tr>';

    var table = $("table").eq(1);
    $(table).empty();
    $(table).append(tableTitle);
    var info = eval("(" + data + ")");
    var length = info.length;
    for(var i = 0 ;i<length;i++){
        var th = '<tr class="innerTr" data = \''+info[i].tea_course_id+'##'+info[i].class_name+'\'><th>'+info[i].class_name+'</th>' +
            '<th>'+info[i].start_time+'   -   '+info[i].end_time+'</th>' +
            '<th class="center" onclick="unwrap(this)"><i class="fa fa-trash-o" aria-hidden="true" ></i></th></tr>';
        $(table).append(th);
        add(class_list,info[i].class_name);
    }

}

function unwrap(th) {
    var tr = th.parentNode;
    var list = $(tr).attr('data').split('##');

    swal({
        title: list[1],
        text: '确认退选'+list[1]+'班?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认退选",
        cancelButtonText: "放弃退选",
        closeOnConfirm: true
    }, function () {
        $.post(
            '../unwarp.do',
            {tea_course_id:list[0],
            class_name:list[1]},
            function (data, status) {
                if(check(data,status) && data == 1){
                    $(tr).remove();
                    checkInnerTable();
                }else {
                    swal("error","退选课程失败！","error");
                }

            }
        )


    });

}

function checkInnerTable() {
    var table = $('table').eq(1);
    if($(table).find('tr').length == 1){
        $(table).empty();
        $(".myCourseTitle").eq(2).text("");
        $("#tip2").show(1000);
    }
}