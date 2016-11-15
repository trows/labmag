var pubIndex = 1;
var pubCourse_name = $("#spTitle").text();
var pubCourse_id = $("#spTitle").attr("data");


window.onload = function () {
    setNextIndex();
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

function getModal(div) {
    var state = $(div).attr("state");
    var course_hour = $(div).find('span').eq(0).text();
    var course_name = $.trim($(div).find('span').eq(1).text());
    var chapter_id = $(div).attr("data");
    $(".hModalText").eq(0).text(course_hour);
    $(".hModalText").eq(1).text(course_name);
    var testBtn = document.getElementById("testBtn");
    var subBtn = document.getElementById("subBtn");

    $(testBtn).bind('click', function () {
        window.location.href = './' + chapter_id + '/exam.htm';
    });
    $(subBtn).bind('click', function () {
        window.location.href = './' + chapter_id + '/report.htm';
    });
    if (state == 0) {
        $.post(
            "./getHourState.do",
            {chapter_id: chapter_id},
            function (data, status) {
                if (check(data, status)) {
                    $(div).attr("state", data);
                    state = data;
                    switch (parseInt(state)) {
                        case 100:
                            testBtn.innerHTML = '查看试卷';
                            testBtn.style.background = "#4AAF51";
                            subBtn.innerHTML = '查看报告';
                            subBtn.style.background = "#4AAF51";
                            break;
                        case 201:
                            testBtn.innerHTML = '查看试卷';
                            testBtn.style.background = "#4AAF51";
                            subBtn.innerHTML = '提交报告';
                            subBtn.style.background = "#de995e";
                            break;
                        case 202:
                            testBtn.innerHTML = '开始测试';
                            testBtn.style.background = "#de995e";
                            subBtn.innerHTML = '查看报告';
                            subBtn.style.background = "#4AAF51";
                            break;
                        case 200:
                            testBtn.innerHTML = '开始测试';
                            testBtn.style.background = "#de995e";
                            subBtn.innerHTML = '提交报告';
                            subBtn.style.background = "#de995e";
                    }
                }
            }
        );
    }

    switch (parseInt(state)) {
        case 100:
            testBtn.innerHTML = '查看试卷';
            testBtn.style.background = "#4AAF51";
            subBtn.innerHTML = '查看报告';
            subBtn.style.background = "#4AAF51";
            break;
        case 201:
            testBtn.innerHTML = '查看试卷';
            testBtn.style.background = "#4AAF51";
            subBtn.innerHTML = '提交报告';
            subBtn.style.background = "#de995e";
            break;
        case 202:
            testBtn.innerHTML = '开始测试';
            testBtn.style.background = "#de995e";
            subBtn.innerHTML = '查看报告';
            subBtn.style.background = "#4AAF51";
            break;
        case 200:
            testBtn.innerHTML = '开始测试';
            testBtn.style.background = "#de995e";
            subBtn.innerHTML = '提交报告';
            subBtn.style.background = "#de995e";
    }

    if (course_hour == "未指定课时：") {
        sweetAlert({
            title: course_name + "将作为你在该课程的第" + pubIndex + "次实验",
            text: "课时选定后将无法修改，\n错误的课时顺序将会影响到你的考核成绩，\n是否确认选择?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: true
        }, function () {

            $.post(
                "./setChapterHour.do",
                {
                    course_id: pubCourse_id,
                    course_name: pubCourse_name,
                    chapter_id: chapter_id,
                    hour: pubIndex
                },
                function (data, status) {
                    if (check(data, status) && data == 1) {
                        $(div).find('span').eq(0).text("第" + pubIndex + "次实验：");
                        pubIndex++;
                        $('#myModal').modal('show');
                    }
                }
            )
        });
    } else {
        $('#myModal').modal('show');
    }
}

function setNextIndex() {
    var divHourList = $(".divHour");
    var length = divHourList.length;
    // console.log(length);
    for (var i = 0; i < length; i++) {
        if ($.trim($(divHourList[i]).find('span').eq(0).text()) != "未指定课时：") {
            pubIndex++;
            // console.log(pubIndex);
        }
    }
}



