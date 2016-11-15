/**
 * Created by Throws_exception on 2016/5/18.
 */

window.onload = function(){
    var height = document.documentElement.clientHeight-80;
    document.getElementsByClassName('myFrame')[0].style.height = height+'px';
    bindTooltip();
    setHourList();
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

function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
}

function setCourseClass(element){
   $("#course_class").text($(element).find('span:first').text())
    setHourList();
}

function checkHasClass() {
    if (($("#classSub").find('li').length)>0 && ($("#classSub").find('span:first').text())!='该课程未绑定班级') {
        return true
    }else {
        return false;
    }
}

function noClassTip(){
    swal('warning','请先在“我的课程”中绑定授课班级','warning');
}

function correctExam() {
    if(checkHasClass()){
        window.open("/manage/correctExam.html","myFrame");
    }else {
        noClassTip();
    }
}

function correctReport(){
    if(checkHasClass()){
        window.open("/manage/correctReport.html","myFrame");
    }else {
        noClassTip();
    }
}

function setHourList() {
    var course_id = $("#course_name").attr('data');
    // console.log(course_id);
    var chapterList = eval('({})');
    if (course_id.length > 1) {
        $.post(
            '../getChaptersByCourseId.do',
            {course_id: course_id},
            function (data, status) {
                if (check(data, status) && data != '[]') {
                    var json = eval('(' + data + ')');
                    var length = json.length;
                   
                    for(var i = 0;i<length;i++){
                        chapterList[json[i].chapter_id] = json[i].chapter_name;
                    }
                    $("#chapter_list").val(JSON.stringify(chapterList));
                    // console.log(JSON.stringify(chapterList));
                }
            }
        );
    }
}