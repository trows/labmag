window.onload = function () {
    if($("#return_code").val() == 300){
        swal('提示','请您先登陆系统','warning');
        return;
    }

    if ($("#return_code").val() == 301){
        swal('error','用户不存在或密码错误','error');
    }
}

function forgot(){
    var account_id = $("#account_id").val();
    if(account_id.length == 0){
        swal('error','账户不能为空','error');
        return;
    }
    var email = $("#email").val();
    if(account_id.length == 0){
        swal('error','邮箱不能为空','error');
        return;
    }
    swal('success','已经向您的邮箱发送了密保验证\n请及时查收','success');
}