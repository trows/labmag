var course_id;
var class_list = new Array();
var chapterList = eval('({})');
var list = eval('({})');
window.onload = function () {
    initPage();
};

function theClick(element) {
    var index = $(element).attr('index');
    $("#index").val(index);
    // console.log($(element).attr('index'));
    // console.log(JSON.stringify(chapterList));
    // console.log(JSON.stringify(list));
    // console.log(JSON.parse(list[index]).sex +'+++++++++++');
    if(JSON.parse(list[index]).sex == 0){
        swal('error','该学生未进行测试','error');
        return;
    }
    $("#chapterList").val(JSON.stringify(chapterList));
    $("#list").val(JSON.stringify(list));
    $("#getForm").submit();
}

function initPage() {
    course_id = $("#course_name", window.parent.document).attr('data');
    // console.log(course_id);
    var class_nameList = $("#classSub", window.parent.document).find('span');
    var length = class_nameList.length;
    for (var i = 0; i < length; i++) {
        class_list[i] = $.trim($(class_nameList[i]).text());
    }
    setHourList();
    setClassList();
    var nowClass = $("#course_class", window.parent.document).text();
    if (nowClass.length != 0) {
        $("#class_name").html(nowClass + '<span class="caret"></span>');
    }
}

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

function setClassList() {
    var ul = $("#class_name").next();
    var length = class_list.length;
    for (var i = 0; i < length; i++) {
        var htm = '<li><a onclick="setClass(this)">' + class_list[i] + '</a></li>';
        $(ul).append(htm);
    }
}

function setHourList() {
    chapterList = eval('(' + $("#chapter_list", window.parent.document).val() + ')');
    var hour = $("#hour").next();
    var length = Object.keys(chapterList).length;
    for (var i = 0; i < length; i++) {
        var htm = '<li><a onclick="setHour(this)">课时' + (i + 1) + '</a></li>';
        $(hour).append(htm);
    }
    // console.log(JSON.stringify(chapterList)+'+++++++++++')
}

function setClass(element) {
    var class_name = $(element).text();
    $("#class_name").html(class_name + '<span class="caret"></span>');
    $("#course_class", window.parent.document).text(class_name);
    // console.log($.trim($("#class_name").text()));
}

function setHour(element) {
    if ($.trim($("#class_name").text()) != '选择班级') {
        var hourText = $(element).text();
        $("#hour").html(hourText + '<span class="caret"></span>');
        var hourInt = hourText.substring(2, 3);
        $.post(
            '../getHourStudent.do',
            {
                class_name: $("#class_name").text(),
                course_id: course_id,
                hour: hourInt,
                type: 'exam'
            },
            function (data, status) {
                if (check(data, status)) {
                    initTable(data);
                } else {
                    swal('error', '查询失败,请检查网络连接是否良好，并刷新页面重试', 'error')
                }
            }
        );
    } else {
        swal('error', '请先选择班级', 'error');
    }
}

function initTable(data) {
    var stuInfo = eval('(' + data + ')');

    var table = $("table:first");
    table.empty();

    var tableTitle = '<tr state=tl>' +
        '<th class="tableTitle">班内序号</th>' +
        '<th class="tableTitle">学号</th>' +
        '<th class="tableTitle">姓名</th>' +
        '<th class="tableTitle">实验名称</th>' +
        '<th class="tableTitle">测试状态</th>' +
        '</tr>';

    $(table).append(tableTitle);

    var length = stuInfo.length;
    for (var i = 0; i < length; i++) {
        var state;
        switch (parseInt(stuInfo[i].sex)) {
            case 0 :
                state = '未提交';
                break;
            case 1:
                state = '未批改';
                break;
            case 2:
                state = '已批改';
        }
        var tr = '<tr onclick=theClick(this) index = ' + i + ' state = \'' + state + '\'data = \'' + JSON.stringify(stuInfo[i]) + '\'>' +
            '<th>' + stuInfo[i].serial_number + '</th>' +
            '<th>' + stuInfo[i].account_id + '</th>' +
            '<th>' + stuInfo[i].user_name + '</th>' +
            '<th>' + (stuInfo[i].level == 0 ? '未选择' : chapterList[stuInfo[i].level]) + '</th>' +
            '<th>' + state + '</th>' +
            '</tr>';
        list[i] = JSON.stringify(stuInfo[i]);
        $(table).append(tr);
    }
}

function setFlag(element) {
    if (($.trim($("#class_name").text()) == '选择班级') || $.trim($("#hour").text()) == '选择课时') {
        swal('warning', '请先选课班级和课时！', 'warning');
        return;
    }
    var state = $(element).text();
    var table = $("table:first");

    if (state == '全部') {
        $(table).find('tr').each(function (index, element) {
            $(element).attr('index', index);
            list[index] = $(element).attr('data');
            $(element).show(500);
        });
        $("#flag").html(state + '<span class="caret"></span>');
        return;
    }

    $(table).find('tr').each(function (index, element) {
        var temp = $(this).attr('state');
        if (temp == state && temp != 'tl') {
            $(element).attr('index', index);
            list[index] = $(element).attr('data');
            $(element).show(500);
        } else if (temp != 'tl') {
            $(element).attr('index', -1);
            $(element).hide(500);
        }
    });

    $("#flag").html(state + '<span class="caret"></span>');
}
    
