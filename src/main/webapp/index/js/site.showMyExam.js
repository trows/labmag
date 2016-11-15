//bug可以重复修改一张试卷

window.onload = function () {
    createPaper();
    bindTooltip();

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

function createPaper() {
    $.post(
        './getExistPaper.do',
        {
            chapter_id: $("#chapter_id").text(),
            account_id: $("#account_id").text()
        },
        function (data, status) {
            if (check(data, status)) {
                var question_list = JSON.parse(data.split("####")[0]);
                var answer = JSON.parse(data.split("####")[1]);
                var grade = parseInt(data.split("####")[2]);
                var adjust = eval('('+data.split("####")[3]+')');
                // console.log(JSON.stringify(adjust));
                if (grade != -1) {
                    var st = '<span class="mainTitle">得分：<span class="grade">' + grade + '</span></span>';
                    $("#paperTitle").append(st);
                }


                var length = question_list.length;
                var paper = $("#mainDiv");

                for (var i = 0; i < length; i++) {
                    var htm = '';
                    var checked = '';
                    var checkLog = '';
                    // console.log([question_list[i].question_id]);
                    // console.log(adjust[question_list[i].question_id]);
                    if(adjust[question_list[i].question_id] == 'true'){
                        checkLog = '<i class="fa fa-check fa-2x"></i>';
                    }else if(adjust[question_list[i].question_id] == 'false'){
                        checkLog = '<i class="fa fa-times fa-2x"></i>';
                    }else if(adjust[question_list[i].question_id] == 'part'){
                        checkLog = '<i class="fa fa-minus fa-2x"></i>'
                    }


                    switch (parseInt(question_list[i].type)) {
                        case 1:
                            var optionList = question_list[i].options.split('##');
                            var options = '';
                            var rightAnswer = '<hr>';

                            if (grade>-1) {
                                rightAnswer = '<div class="answerBlanks">正确答案：' + question_list[i].answer + '</div></div><hr>';
                            }
                            for (var j = 0; j < optionList.length; j++) {

                                if (optionList[j] == answer[question_list[i].question_id]) {
                                    checked = 'checked';
                                }
                                options += '<div class="answerC"><input type="radio" name="' + question_list[i].question_id + '" ' + checked + '>&nbsp;&nbsp;' + optionList[j] + '<br></div>';
                                checked = '';
                            }

                            htm = '<div class="question" data = ' + question_list[i].question_id + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '（&nbsp;&nbsp;&nbsp;）</span><span class="correct">' + checkLog + '</span>' +
                                '<br>' +
                                options + rightAnswer;

                            break;
                        case 2:
                            htm = '<div class="question" data = ' + question_list[i].question_id + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '</span><span class="correct">' + checkLog + '</span>' +
                                '<div class="answerBlanks">答：' + answer[question_list[i].question_id] + '</div>' +
                                '</div>' +
                                '<hr>';
                            break;
                        case 3:
                            htm = '<div class="question" data = ' + question_list[i].question_id + '>' +
                                '<span class="spCon">第' + (parseInt(i) + 1) + '题、' + question_list[i].subject + '</span><span class="correct">' + checkLog + '</span>' +
                                '<div class="answerT">答：' + answer[question_list[i].question_id] + ' </div>' +
                                '</div>' +
                                '<hr>';
                    }
                    $(paper).append(htm);
                    bindCheck();
                }

            }
        }
    );
}
