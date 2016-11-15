function submitChange(){
    var origin = $("#origin").val();
    if(origin.length == 0){
        swal('error','原始密码不能为空','error');
        return;
    }
    var change = $('#change').val();
    if(change.length == 0){
        swal('error','修改的密码不能为空','error');
        return;
    }

    if(origin == change){
        swal('error','原始密码和新密码不能相同','error');
        return;
    }

    $.post(
        'changePassword.do',
        {
            origin:origin,
            change:change
        },
        function (data,status) {
            if(check(data,status)){
                if(data == 1){
                    swal('success','密码修改成功','success');
                }else {
                    swal('error','密码修改失败','error');
                }
            }
        }
    );
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

function submitInfo() {
    var email = $.trim($('#email').val());
    var cellphone = $.trim($('#cellphone').val());
    var perEmail = $('#perEmail').val();
    var perCellphone = $('#perCellphone').val();

    if(email.length == 0){
        swal('error','邮箱不能为空','error');
        return;
    }
    if(cellphone.length == 0){
        swal('error','手机号不能为空','error');
        return;
    }

    if(email == perEmail && cellphone == perCellphone){
        swal('warning','您未修改任何内容','warning');
        return;
    }

    $.post(
      'changeAccountInfo.do',
        {
            email:email,
            cellphone:cellphone
        },
        function (data,status) {
            if(check(data,status)){
                if(data == 1){
                    swal('success','信息修改成功','success');
                    
                }else {
                    swal('error','信息修改失败','error');
                }
            }
        }
    );

}