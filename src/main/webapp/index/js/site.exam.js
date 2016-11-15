var Editor;
var inputArea;
var answerJson;
var answerSerial = '';


window.onload = function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-aero',
        radioClass: 'iradio_flat-aero'
    });
    initAnswer();
    submit();
}

function siteCheckBox(div) {
    var input = $(div).find('input:first');
    $(input).iCheck('check');
    answerJson[$(input).attr('name')] = $.trim($(input).val());
    // console.log(JSON.stringify(answerJson));
}

function getEditor(element) {
    var editor = new wangEditor('editor');
    Editor = editor;
    inputArea = element;
    editor.create();
    editor.$txt.html(element.innerHTML);
    $('#myModal').modal({backdrop: 'static', keyboard: true});
    //$('#myModal').modal('show');

}

function closeModal() {
    $('#myModal').modal('hide');
}

$('#myModal').on('hidden.bs.modal', function () {
    var text = Editor.$txt.html();
    inputArea.innerHTML  = text;
    Editor.destroy();
    answerJson[$(inputArea).prev().attr('data')] = text;
    // console.log(JSON.stringify(answerJson));
});


function initAnswer() {
    var answer = '';
    $(".spCon").each(function (index, element) {
        answerSerial += $(element).attr('data')+',';
        answer+='\"'+$(element).attr('data')+'\":\"\",'
    });
    answer = answer.substr(0,answer.length-1);
    answerSerial = answerSerial.substr(0,answerSerial.length-1);
    answer = '{'+answer+'}';
    answerJson = eval ("(" + answer + ")");
}

function getBlanks(element){
    var parent = element.parentNode.parentNode;
    answerJson[$(parent).find('span:first').attr('data')] = $(element).val();
    // console.log(JSON.stringify(answerJson));
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

function submit() {
 $("#myButton").bind('click',function () {

     for(var key in answerJson){
         if(answerJson[key] == ""){
             swal('error','你还有题目没有作答！','error');
             return;
         }
     }
     
     $.post(
         './submitPaper.do',
         {
             chapter_id:$("#chapter_id").val(),
             question_list:answerSerial,
             answer:JSON.stringify(answerJson)
         },
         function (data, status) {
             if(check(data,status) && data == 1){
                 swal('success','试卷已成功提交','success');
                 setTimeout('window.history.go(-1)',1500);
             }else {
                 swal('error','提交出错，请稍后重试','error');
             }
         }
     );
     
     

 });
}

