var check = false;

function alterTable(num) {
    //console.log(!isNaN(num)+'  '+num.split('.').length);
    if (isNaN(num) || num.split('.').length > 1) {
        sweetAlert("只能输入整数！", "课时数量", "error");
        check = false;
        return;
    }
    var size = parseInt(num);
    if (size == 0 || num.length == 0) {
        sweetAlert("课时数量最小为1！", "课时数量", "error");
        check = false;
        return
    } else {
        if (size > 100) {
            check = false;
            sweetAlert("课时数量过多,系统判定为非法操作，详情请联系管理员！", "课时数量", "error");
            return;
        }
    }


    check = true;
    //console.log('size-'+size);
    var trs = document.getElementsByTagName('tr');
    var nowSize = trs.length - 1;
    //console.log('trs-'+nowSize);
    if (nowSize == size) return;
    var table = trs[0].parentNode;
    var htm = '<th><input type="text" class="innerInput" ></th>' +
        '<th><input type="text" class="innerInput" onblur="checkInputNum(this)" onclick=changeColor(this)></th>' +
        '<th><input type="text" class="innerInput" onblur="checkInputNum(this)" onclick=changeColor(this)></th>';
    if (size > nowSize) {
        for (var i = 0; i < size - nowSize; i++) {
            var tr = document.createElement('tr');
            tr.innerHTML = htm;
            table.appendChild(tr);
        }
    } else {
        for (var j = 0; j < nowSize - size; j++) {
            table.removeChild(trs[1]);
        }
    }

}

function checkInputNum(node) {

    var value = node.value;



    if (value.length == 0) return;
    var array = value.split(';');
    if (array.length != 3) {
        node.style.color = '#FA0C12';
        check = false;
        return
    }

    for (var i = 0; i < 3; i++) {
        //console.log(isNaN(array[i]));
        if (isNaN(array[i])) {
            node.style.color = '#FA0C12';
            check = false;
            return
        }
    }
    node.style.color = '#333333';
    check = true;
}

function changeColor(node) {
    node.style.color = '#333333';
}

function analyseNum(value) {
    if(value.length == 0) return false;
    var array = value.split(';');
    if (array.length != 3) return false;
    for (var i = 0; i < 3; i++) {
        if (isNaN(array[i])) return false;
    }
    return true;
}

function createCourse() {

    //输入校验
    var inputPanel = $(".form-control");
    var course_name = inputPanel[0].value;
    var course_num = inputPanel[1].value;
    var course_desc = inputPanel[2].value;


    if (course_name == '' || course_num == '' || isNaN(course_num) || course_desc == '') {
        sweetAlert("error", "课程输入有误！", "error");
        return;
    }

    //获取章节table
    var chapterInfo = "";
    var trList = $("table:first").find("tr");
    var length = trList.length;
    for(var i = 1; i<length;i++){
        var inputList = $(trList[i]).find("input");
        if( (inputList[0].value.length == 0) || !analyseNum(inputList[1].value) || !analyseNum(inputList[2].value)){
            sweetAlert("error", '章节内容输入有误！第'+i+'行', "error");
            return;
        }else {
             chapterInfo+='{\"chapter_name\":\"' + inputList[0].value + '\",\"amount\":\"' + inputList[1].value + '\",\"score\":\"' + inputList[2].value + '\"}';
            if(i!=length-1) chapterInfo+=','
        }
    }
    var course = '{\"course_name\":\"' + course_name + '\",\"course_num\":\"' + course_num + '\",\"course_desc\":\"' + course_desc + '\"}';

    chapterInfo = '['+chapterInfo+']';
    console.log(course);
    console.log(chapterInfo);

    $.post('../createCourse.do',
    {
        courseInfo:course,
        chaptersInfo:chapterInfo
    },
        function (data, status) {
            console.log(data);
            console.log('----------------');
            console.log(status);
            if (data == "logout") {
                sweetAlert("logout", "由于长时间未操作，系统已自动退出，请刷新页面重新登陆！", "error");
                return false;
            }
            if(data == 'success'){
                sweetAlert("成功","课程添加成功！","success");
            }else {
                sweetAlert("失败","课程添加失败！\n系统可能遇到了一些问题，请及时向开发人员反馈。\n联系邮箱：wspeng0@163.com","error");
            }
        }
    )



}