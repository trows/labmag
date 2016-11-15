var list;
var chapterList;
var question_list;
var answer;
var index;
var grade = -1;
var info;

//bug可以重复修改一张试卷

window.onload = function () {
    bindCheck();
    bindTooltip();
    initPage();
};

function bindCheck() {
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red',
        disabledClass: 'iradio'
    });
    $('input').iCheck('disable');
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
//绑定tooltip
function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
}

function correct(button) {
    var tag = button.getAttribute('tag');
    var parent = button.parentNode.parentNode.parentNode;
    var correct = parent.getElementsByClassName('correct')[0];
    var i = correct.getElementsByTagName('i')[0];
    if (i != null) {
        correct.removeChild(i);
    }
    switch (parseInt(tag)) {
        case 1:
            var I = document.createElement('i');
            I.setAttribute('class', 'fa fa-check fa-2x');
            $(parent).attr('adjust','true');
            correct.appendChild(I);
            break;
        case 0:
            var I = document.createElement('i');
            I.setAttribute('class', 'fa fa-times fa-2x');
            $(parent).attr('adjust','false');
            correct.appendChild(I);
            break;
        case 2:
            var I = document.createElement('i');
            I.setAttribute('class', 'fa fa-minus fa-2x');
            $(parent).attr('adjust','part');
            correct.appendChild(I);
            break;
    }
}

function initPage() {
    $("#mainDiv").empty();
    $(".mainTitle").eq(0).text('');
    $(".mainTitle").eq(1).text('');
    $(".mainTitle").eq(2).text('');
    var listStr = $("#list").text();
    var cpStr = $("#chapterList").text();
    index = $('#index').text();
    // console.log(cpStr);
    // console.log(index);
    list = JSON.parse(listStr);
    chapterList = JSON.parse(cpStr);
    //预留到底判断
    // console.log(index);
    if(Object.keys(list).length <= index){
        swal('success','本课时最后一张试卷已经批改完毕','success');
        setTimeout('window.location.href="/manage/correctExam.html"',1000);
        return;
    }
    info = eval('(' + list[index] + ')');
    if(info.sex == 0){
        $('#index').text(parseInt(index)+1);
        initPage();
    }else {
        $(".mainTitle").eq(0).text('班级：' + info.class_name);
        $(".mainTitle").eq(1).text('姓名：' + info.user_name);
        $(".mainTitle").eq(2).text('序号：' + info.serial_number);
        $(".examTitle:first").text(chapterList[info.level]);
        //开头设置完毕
        createPaper(info);
    }
}

function createPaper(info) {
    $.post(
        './getExistPaper.do',
        {
            chapter_id: info.level,
            account_id: info.account_id
        },
        function (data, status) {
            if (check(data, status)) {
                question_list = JSON.parse(data.split("####")[0]);
                answer = JSON.parse(data.split("####")[1]);
                grade = parseInt(data.split("####")[2]);

                if(grade!=-1){
                    var st = ' <span class="mainTitle">得分：<span class="grade">'+grade+'</span></span>';
                    $("#paperTitle").append(st);
                }


                var length = question_list.length;
                var paper = $("#mainDiv");
                var chooseLength = 0;
                var chooseTrue = 0;
                //<i'class="fa fa-check fa-2x"></i>
                for (var i = 0; i < length; i++) {
                    var htm = '';

                    switch (parseInt(question_list[i].type)) {
                        case 1:
                            chooseLength++;
                            var optionList = question_list[i].options.split('##');
                            var options = '';
                            var checkLog = '<i class="fa fa-times fa-2x"></i>';
                            var checked = '';
                            var adjust = 'false';
                            if (answer[question_list[i].question_id] == question_list[i].answer) {
                                adjust = 'true';
                                checkLog = '<i class="fa fa-check fa-2x"></i>';
                                chooseTrue++;
                            }
                            for (var j = 0; j < optionList.length; j++) {

                                if (optionList[j] == answer[question_list[i].question_id]) {
                                    checked = 'checked';
                                }
                                options += '<div class="answerC"><input type="radio" name="' + question_list[i].question_id + '" ' + checked + '>&nbsp;&nbsp;' + optionList[j] + '<br></div>';
                                checked = '';
                            }

                            htm = '<div class="question" data = ' + question_list[i].question_id + ' adjust = ' + adjust + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '（&nbsp;&nbsp;&nbsp;）</span><span class="correct">' + checkLog + '</span>' +
                                '<br>' +
                                options +
                                '<div class="answerBlanks">正确答案：' + question_list[i].answer + '</div>' +
                                '</div>' +
                                '<hr>';
                            break;
                        case 2:
                            htm = '<div class="question" data = ' + question_list[i].question_id + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '</span><span class="correct"></span>' +
                                '<div class="answerBlanks">答：' + answer[question_list[i].question_id] + '</div>' +
                                '<div class="btn-group btn-group-justified shortBlanks" role="group" aria-label="...">' +
                                '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top"' +
                                'title="对" onclick=correct(this) tag="1"><i class="fa fa-check"></i></button>' +
                                '</div>' +
                                '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top"' +
                                'title="错" onclick=correct(this) tag="0"><i class="fa fa-times"></i></button>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<hr>';
                            break;
                        case 3:
                            htm = '<div class="question" data = ' + question_list[i].question_id + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '</span><span class="correct"></span>' +
                                '<div class="answerT">答：' + answer[question_list[i].question_id] + ' </div>' +
                                '<div class="btn-group btn-group-justified blanks" role="group" aria-label="...">' +
                                '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top"' +
                                'title="对" onclick=correct(this) tag="1"><i class="fa fa-check"></i></button>' +
                                '</div>' +
                                '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top"' +
                                'title="错" onclick=correct(this) tag="0"><i class="fa fa-times"></i></button>' +
                                '</div>' +
                                '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top"' +
                                'title="半对" onclick=correct(this) tag="2"><i class="fa fa-minus"></i></button>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<hr>';
                    }
                    $(paper).append(htm);
                    bindCheck();
                }
                var html = '<div id="gradeTip"><span class="spCo tip" id="grade">本次测试填空题共' + chooseLength + '题，答对' + chooseTrue + '题</span></div>' +
                    '<hr class="dashes"/>';
                $(paper).append(html)

            }
        }
    )
}

function setGrade(element) {
    var parent = element.parentNode.parentNode;
    var str = $(parent).find('input:first').val();
    if(isNaN(str) || str.length==0) {
        swal('error','请输入数字','error');
        return;
    }
    var inner_grade = parseInt(str);
    if(inner_grade<0 || inner_grade>100){
        swal('error','分数范围应该在0-100之间','error');
        return;
    }

    var adjust = eval('({})');
    $(".question").each(function () {
        adjust[$(this).attr('data')] = $(this).attr('adjust');
    });
    // console.log(adjust.length);
    // console.log(JSON.stringify(adjust));

    $.post(
        './setGrade.do',
        {
            account_id:info.account_id,
            chapter_id:info.level,
            grade:inner_grade,
            adjust:JSON.stringify(adjust)
        },
        function (data,status) {
            if(check(data,status) && data == 1){
                $('#index').text(parseInt(index)+1);
                initPage();
            }
        }
    );

}