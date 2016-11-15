window.onload = function () {
    bindTooltip();
}

var pubTr;
var putCourse_num;
function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
}

// 填充模态框内容
function showModal(tr) {
    pubTr = tr;
    // console.log($(tr).attr("data")+'---jquery');
    // console.log(tr.getAttribute('data')+'-----js');
    var jsonData = eval("(" + tr.getAttribute('data') + ")");
    
    var list = $(".form-control");
    list[1].value = jsonData.course_name;
    list[2].value = jsonData.course_num;
    list[3].value = jsonData.course_desc;
    putCourse_num = list[2];
    $('#myModal').modal({backdrop: 'static', keyboard: true});
    $.post(
        '../getChaptersByCourseId.do',
        {course_id: jsonData.course_id},
        function (data, status) {
            if (check(data, status)) {
                createInnerTable(data);
                setTimeout('resetCourseNum();', 1000);       //同步完成后1秒开始校验
            }

        }
    );
}

function createInnerTable(data) {
    var chaptersList = eval("(" + data + ")");
    var table = $("table:last");
    var title = '<tr><th class="innerTableTitle">编号</th><th class="innerTableTitle">名称</th>' +
        '<th class="innerTableTitle">题目数量</th><th class="innerTableTitle">分数分配</th>' +
        '<th class="innerTableTitle">操作</th></tr>';
    table.empty();
    table.append(title);

    var length = chaptersList.length;

    for (var i = 0; i < length; i++) {
        var innerTr = '<tr>' +
            '<th>' + chaptersList[i].chapter_id + '</th>' +
            '<th class="innerTh"><input type="text" class="innerInput" placeholder="名称" value="' + chaptersList[i].chapter_name + '"></th>' +
            '<th class="innerTh"><input type="text" class="innerInput" placeholder="题目数量" value="' + chaptersList[i].amount + '"></th>' +
            '<th class="innerTh"><input type="text" class="innerInput" placeholder="分数分配" value="' + chaptersList[i].score + '"></th>' +
            '<th onclick="delChapter(this)" class="center"  data-toggle="tooltip" data-placement="right" title="删除此章节"><i class="fa fa-trash-o" aria-hidden="true"></i></th>' +
            '</tr>';
        table.append(innerTr);
    }
    bindTooltip();
}


function analyseNum(value) {
    if (value.length == 0) return false;
    var array = value.split(';');
    if (array.length != 3) return false;
    for (var i = 0; i < 3; i++) {
        if (isNaN(array[i])) return false;
    }
    return true;
}


// 修改单个课程信息
function edit() {
    var jsonData = eval("(" + pubTr.getAttribute('data') + ")");
    var list = $(".form-control");

    if (jsonData.course_id == '' || list[2].value == '' || list[3].value == '') {
        sweetAlert('error', '课程信息存在空值', 'error');
        return;
    }


    var chapterList = $("table:last").find("tr");

    var length = chapterList.length;

    var chapterInfo = '';

    for (var i = 1; i < length; i++) {
        var chapter_id = $(chapterList[i]).find("th:first").text();
        var chapter_name = $(chapterList[i]).find("input:first").val();
        var amount = $(chapterList[i]).find("input").eq(1).val();
        var score = $(chapterList[i]).find("input").eq(2).val();
        // console.log(chapter_id)
        // console.log(chapter_name)
        // console.log(analyseNum(amount))
        // console.log(analyseNum(score))
        if (chapter_id == '' || chapter_name == '' || !analyseNum(amount) || !analyseNum(score)) {
            sweetAlert('error', '章节信息输入错误，在第' + i + '行', 'error');
            return;
        }
        chapter_id = (chapter_id=="auto")?0:chapter_id;
        chapterInfo += '{\"chapter_id\":\"' + chapter_id + '\",\"chapter_name\":\"' + chapter_name + '\",\"amount\":\"' + amount + '\",\"score\":\"' + score + '\"}';
        if (i != length - 1) chapterInfo += ','
    }
    var course = '{\"course_id\":\"' + jsonData.course_id + '\",\"course_name\":\"' + list[1].value + '\",\"course_num\":\"' + list[2].value + '\",\"course_desc\":\"' + list[3].value + '\"}';
    var delData = $(pubTr).attr('delData');
    chapterInfo = '[' + chapterInfo + ']';

    // console.log("开始---");
    // console.log(chapterInfo);
    // console.log('结束');
    // console.log(delData);

    sweetAlert({
        title: '确认提交此次修改？',
        text: 'MODIFY',
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认修改",
        closeOnConfirm: true
    }, function () {
        $.post("../alertCourseInfo.do",
            {
                course: course,
                delData: delData,
                chapterInfo: chapterInfo
            },
            function (data, status) {
                if (check(data, status)) {

                    $(pubTr).attr({
                        "data": course,
                        "delData": ""
                    });
                    $(pubTr).find("th").eq(0).text(list[1].value);
                    $(pubTr).find("th").eq(2).text(list[2].value);

                    abandon();
                } else {
                    sweetAlert("error", "修改失败", "error");
                }

            }
        );
    });
}

//放弃修改
function abandon() {
    $('#myModal').modal('hide');
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
                }
            }
        });
}

function createTable(data) {
    $("#tip").hide(1000);
    var table = $("table:first");
    table.empty();

    var title = '<tr><th class="tableTitle">课程名称</th><th class="tableTitle">课程编号</th>' +
        '<th class="tableTitle">课时数量</th></tr>';
    table.append(title);
    var list = eval("(" + data + ")");
    var length = list.length;
    for (var i = 0; i < length; i++) {
        // console.log(list[i]);
        // console.log(JSON.stringify(list[i])+'-----bug')
        var tr = '<tr delData = "" onclick=showModal(this) data=\'' + JSON.stringify(list[i]) + '\'>' +
            '<th>' + list[i].course_name + '</th>' +
            '<th>' + list[i].course_id + '</th>' +
            '<th>' + list[i].course_num + '</th>' +
            '</tr>';
        // console.log(tr);
        table.append(tr);
    }
}

//键盘事件，按下回车发起搜索
$(document).keydown(function (event) {
    // console.log(event.keyCode)
    if (event.keyCode == 13) {
        aim();
    }
});

//删除单条数据
function delThis() {
    var jsonData = eval("(" + pubTr.getAttribute('data') + ")");
    sweetAlert({
        title: '确认删除课程：' + jsonData.course_name + '?',
        text: "您将删除与此课程相关的所有数据！请谨慎操作",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        closeOnConfirm: true
    }, function () {
        $.post("../delCourseById.do",
            {course_id: jsonData.course_id},
            function (data, status) {
                if (data == "1" && check(data, status)) {
                    abandon();
                    $(pubTr).hide(1000);
                    setTimeout("pubTr.remove()", 1000);
                    setTimeout("checkDataArea()",1100);
                } else {
                    sweetAlert("error", "删除失败", "error");
                }

            }
        );
    });
}
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

// 检测table是否存在数据
function checkDataArea() {
    var table = $("table:first");
    var trList =  $(table).find('tr');
    // console.log("----------");
    // console.log(trList.length);
    if ( trList.length< 2) {
        $(table).empty();
        $("#tip").show(1000);
    }
}

function plus() {
    var tr = '<tr><th>auto</th><th class="innerTh"><input type="text" class="innerInput" placeholder="名称"></th>' +
        '<th class="innerTh"><input type="text" class="innerInput" placeholder="题目数量">' +
        '<th class="innerTh"><input type="text" class="innerInput" placeholder="分数分配">' +
        '<th onclick="delChapter(this)" class="center"  data-toggle="tooltip" data-placement="right" title="删除此章节"><i class="fa fa-trash-o" aria-hidden="true"></i></th></tr>';
    $("table:last").append(tr);
    putCourse_num.value = parseInt(putCourse_num.value) + 1;
    bindTooltip();
}

function delChapter(th) {

    if (putCourse_num.value < 2) {
        sweetAlert("DISALLOW", "课程至少需要一章节实验", "error");
        return;
    }

    var tr = $(th).parent();
    var chapter_id = $(tr).find('th:first').text();
    if (chapter_id == "auto") {
        $(tr).remove();
        putCourse_num.value = parseInt(putCourse_num.value) - 1;
    } else {
        // sweetAlert({
        //     title: '确认删除实验：' + $(tr).find('input:first').val() + '?',
        //     text: "您将删除与此实验相关的所有数据！请谨慎操作",
        //     type: "warning",
        //     showCancelButton: true,
        //     cancelButtonText: "取消",
        //     confirmButtonColor: "#DD6B55",
        //     confirmButtonText: "删除",
        //     closeOnConfirm: true
        // }, function () {
        //     $.post("../delChapterById.do",
        //         {chapter_id: chapter_id},
        //         function (data, status) {
        //             if (data == "1" && check(data, status)) {
        //                 $(tr).remove();
        //                 putCourse_num.value = parseInt(putCourse_num.value) - 1;
        //             } else {
        //                 sweetAlert("error", "删除失败", "error");
        //             }
        //
        //         }
        //     );
        // });

        //以上强制删除功能废弃 改为一次提交

        $(pubTr).attr("delData", $(pubTr).attr("delData") + chapter_id + ',');
        $(tr).remove();
        putCourse_num.value = parseInt(putCourse_num.value) - 1;

    }
}

function abandonEdit() {
    // resetCourseNum();
    abandon();
}


//校验实际章节数量与显示课程数量
function resetCourseNum() {
    var jsonData = eval("(" + pubTr.getAttribute('data') + ")");

    var trList = $("table:last").find("tr");
    putCourse_num.value = trList.length - 1;

    // console.log(trList.length - 1);
    // console.log(putCourse_num.value);
    if (putCourse_num.value != jsonData.course_num) {

        $.post(
            '../alertCourseNum.do',
            {
                course_id: jsonData.course_id,
                course_num: putCourse_num.value
            },
            function (data, status) {
                if (data == 1 && check(data, status)) {
                    var th = $(pubTr).find("th").eq(2);
                    th.innerHTML = putCourse_num.value;
                    jsonData.course_num = putCourse_num.value;
                } else {
                    sweetAlert("error", "课程数量更新出错，可能导致课时数量异常，\n请重启编辑框，系统将尝试自动修复\n或及时联系开发人员", "error");
                }
            }
        );
    }
}
