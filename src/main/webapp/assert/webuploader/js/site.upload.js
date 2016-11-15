var $ = jQuery,
// $list = ,
    $btn = $('#ctlBtn'),
    state = 'pending'; //上传状态
window.fileList = []; //获取要上传的文件列表数组
var uploader = WebUploader.create({
    // swf文件路径
    swf: '../assert/webuploader/Uploader.swf',
    // 文件接收服务端。
    server: '../getExcel.do',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#picker',
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false,
    // chunked: true,
    multiple: false,
    formData: {"target": $("#picker").attr("data")},
    accept: {
        title: 'excel',
        extensions: 'xlsx'
    }

});

//当有文件被添加进队列的时候
uploader.on('fileQueued', function (file) {

    console.log(file.id + '--' + file.name);
    fileList.push(file); //将要上传的文件加入fileList数组
    $("#siteUpload").text(file.name);
    $('#thelist').text("等待上传... ...");

});

//文件上传过程中创建进度条实时显示。
uploader.on('uploadProgress', function (file, percentage) {
    var $li = $("#bar"),
        $percent = $li.find('.progress .progress-bar');
    // 避免重复创建
    if (!$percent.length) {
        $percent = $('<div class="progress progress-striped active">' +
            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
            '</div>' +
            '</div>').appendTo($li).find('.progress-bar');
    }
    $li.find('p.state').text('上传中');
    $percent.css('width', percentage * 100 + '%');
    $percent.attr('uploadProgress', percentage);
});


uploader.on('uploadAccept', function (file, response) {
    if (response.code == 200) { //上传处理完成
        var array = response.desc.split(',');
        var desc = '总共上传数据' + array[0] + '条,成功' + array[1] + '条、失败' + array[2] + '条。\n失败数据id/行数' + array[3]
            + '\n失败原因：数据已存在或数据格式有误！';
        sweetAlert({
            title: "上传成功",
            text: desc,
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            closeOnConfirm: false
        }, function () {
            swal('导入数据', "数据导入操作成功完成！\n请等待服务器响应... ...", "success");
            setTimeout('$("#bar").find(".progress").fadeOut();', 1000);
            setTimeout('window.location.reload();', 1500);
        });
        return true;

    } else {
        if (response.code == 500) {
            sweetAlert({
                title: "上传失败！",
                text: response.desc + '\n失败原因：表结构存在错误',
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }, function () {
                swal('导入失败', "数据导入操作失败！\n请等待服务器响应... ...", "success");
                setTimeout('$("#bar").find(".progress").fadeOut();', 2000);
                setTimeout('window.location.reload();', 2500);
            });

            return false;
        }
    }
    return false;
});

//文件上传完成
uploader.on('uploadComplete', function () {
    //上传完成隐藏进度条 并刷新页面
    // setTimeout('$("#bar").find(".progress").fadeOut();', 3000);
    // setTimeout('window.location.reload();', 4000);
});
//文件上传成功
uploader.on('uploadSuccess', function () {

    $("#bar").find('.progress-bar').text('上传完成...等待服务器响应');
});
//文件上传失败
uploader.on('uploadError', function () {
    $("#bar").find('.progress-bar').text('上传出错...等待服务器响应');
});
//文件上传各个部分监听
uploader.on('all', function (type) {
    if (type === 'startUpload') {
        state = 'uploading';
    } else if (type === 'stopUpload') {
        state = 'paused';
    } else if (type === 'uploadFinished') {
        state = 'done';
    }
});
//按钮添加监听事件
$btn.on('click', function () {
    if (state === 'uploading') {
        uploader.stop();
    } else {
        uploader.upload();
    }
});

