window.onload = function () {

}

var pubTr;

// 填充模态框内容
function showModal(tr) {
    pubTr = tr;
    var jsonData = eval("(" + tr.getAttribute('data') + ")");
    var list = $("input");
    list[1].value = jsonData.account_id;
    list[2].value = jsonData.user_name;
    list[3].value = jsonData.sex ? '男' : '女';
    list[4].value = jsonData.email;
    list[5].value = jsonData.cellphone;
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}

// 修改单个用户信息
function edit() {
    var subData = eval("(" + pubTr.getAttribute('data') + ")");
    var perData = eval("(" + pubTr.getAttribute('data') + ")");
    // console.log(pubTr.getAttribute('data'));
    // console.log(JSON.stringify(perData));
    var list = $("input");
    var modify = "";

    if (list[2].value != perData.user_name) {
        modify += '姓名修改为:' + list[2].value + '\n';
        subData.user_name = list[2].value;
    }


    if (((list[3].value == '男') ? '1' : '0') != perData.sex) {
        modify += '性别修改为:' + list[3].value + '\n';
        subData.sex = (list[3].value == '男') ? 1 : 0;
    }
    if (list[4].value != perData.email) {
        modify += '邮箱修改为:' + list[4].value + '\n';
        subData.email = list[4].value;
    }
    if (list[5].value != perData.cellphone) {
        modify += '手机修改为:' + list[5].value;
        subData.cellphone = list[5].value;
    }

    if (JSON.stringify(perData) == JSON.stringify(subData)) {
        sweetAlert("未检测到修改", "系统未检测到存在修改的内容！", "warning");
        return;
    }


    sweetAlert({
        title: '确认提交此次修改？',
        text: modify,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确认修改",
        closeOnConfirm: true
    }, function () {
        $.post("../alertTeacherInfo.do",
            {json: JSON.stringify(subData)},
            function (data, status) {
                if (data != 0 && check(data, status)) {

                    var htm ='<th>' + subData.account_id + '</th>' +
                        '<th>' + subData.user_name + '</th>' ;
                        $(pubTr).empty();
                    $(pubTr).attr("data", JSON.stringify(subData));
                    $(pubTr).append(htm);
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
        setTimeout('sweetAlert("warning", "输入不能为空！", "warning")',100);
        return;
    }
    var target, type;
    // console.log(!isNaN(inputText.substr(-4))+'--'+inputText.substr(-4));
    if (isNaN(inputText)) {
        if(inputText == "*"){
            target = '../getAllTeacherInfo.do'
        }else {
            target = '../getTeacherByName.do';
            type = '姓名';
        }
    } else {
            target = '../getTeacherById.do';
            type = '工号';
    }
    $.post(target,
        {data: inputText},
        function (data, status) {
            if (check(data, status)) {
                if (data == "[]") {
                    sweetAlert('NOT FOUND', "未找到" + type + ' : ' + inputText + '\n相关的信息', "info");
                } else {
                    createTable(data);
                }
            }
        });
}

function createTable(data) {
    $("#tip").hide(1000);
    var table = $("table:first");
    table.empty();

    var title = '<tr><th class="tableTitle">工号</th>' +
        '<th class="tableTitle">姓名</th></tr>';
    table.append(title);
    var list = eval("(" + data + ")");
    var length = list.length;
    for (var i = 0; i < length; i++) {
        // console.log(list[i]);
        var tr = '<tr onclick=showModal(this) data = \'' + JSON.stringify(list[i]) + '\'>' +
            '<th>' + list[i].account_id + '</th>' +
            '<th>' + list[i].user_name + '</th>' +
            '</tr>';
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
        title: '确认删除账户：' + jsonData.user_name + '?',
        text: "您将删除与此账户相关的所有数据！请谨慎操作",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        closeOnConfirm: true
    }, function () {
        $.post("../delAccount.do",
            {account_id: jsonData.account_id},
            function (data, status) {
                if (data == "1" && check(data, status)) {
                    abandon();
                    $(pubTr).hide(1000);
                    setTimeout('pubTr.remove()', 1000);
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
    if (document.getElementsByTagName('tr').length < 2) {
        $("#myButton").empty();
        $("table:first").empty();
        $("#tip").show(1000);
    }
}

function resetPassword() {
    var jsonData = eval("(" + pubTr.getAttribute('data') + ")");
    sweetAlert({
        title: '确认重置' + jsonData.user_name + '的密码?',
        text: "密码将会被重置为默认密码，请重新登陆并及时修改密码",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "",
        closeOnConfirm: false
    }, function () {
        $.post("../resetPassword.do",
            {account_id: jsonData.account_id},
            function (data, status) {
                // console.log(data,status);
                if (data == "1" && check(data, status)) {
                    abandon();
                    swal("成功",
                        jsonData.user_name + '的密码已经重置成功！',
                        "success");
                } else {
                    sweetAlert("error", "密码修改失败", "error");
                }

            }
        );
    });
}