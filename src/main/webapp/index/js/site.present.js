window.onload = bindTooltip();

var Editor;
var data;
var advice;
var study;
var arrayIndex = 0;
var array = new Array();

//绑定tooltip
function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
}

//获得富文本编辑器
function getEditor(element) {
    var editor = new wangEditor('editor');
    Editor = editor;
    inputArea = element;
    editor.create();
    editor.$txt.html(element.innerHTML);
    $('#myModal').modal({backdrop: 'static', keyboard: true});
    //$('#myModal').modal('show');

}

//关闭模态框
function closeModal() {
    $('#myModal').modal('hide');
}
//关闭模态框时销毁富文本编辑器
$('#myModal').on('hidden.bs.modal', function () {
    var text = Editor.$txt.html();
    Editor.destroy();
    inputArea.innerHTML = text;

    switch (parseInt($(inputArea).attr('data'))) {
        case 0:
            study = text;
            break;
        case 1:
            advice = text;
            break;
        case 2:
            data = text;
    }

});

//创建一个图表域
function createDataArea() {
    var dataArea = document.getElementById("dataArea");
    var div = document.createElement('div');
    var htm = '<div class="panel panel-default">' +
        '<div class="panel-heading myPanelHeading">&nbsp;&nbsp;&nbsp;&nbsp;图表标题：<input type="text" class="inputTitle">' +
        '<i class="fa fa-times fa-3x spIco" data-toggle="tooltip" data-placement="right"' +
        'title="删除这个数据图表" onclick=delDateArea(this)></i><br><br>' +
        'x轴坐标数量：<select onchange=sChange(this)>' +
        '<option>3</option>' +
        '<option>4</option>' +
        '<option>5</option>' +
        '<option>6</option>' +
        '<option>7</option>' +
        '<option>8</option>' +
        '<option>9</option>' +
        '<option>10</option>' +
        '</select>' +
        'X轴单位：<input class="unit" type="text" placeholder="例：米/秒">' +
        'Y轴单位：<input class="unit" type="text" placeholder="例：N">' +
        '<br><br>' +
        '<table class="myTable">' +
        '<tr>' +
        '<th class="thTitle"> x轴坐标参数：</th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '</tr>' +
        '<tr>' +
        '<th class="thTitle"> 对应数值：</th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '<th class="inputTh"><input type="text" class="thInput"></th>' +
        '</tr>' +
        '<li class="fa fa-check fa-3x draw" data-toggle="tooltip" data-placement="right" title="绘制折线图" onclick="drawPicture(this)"></li>' +
        '</table>' +
        '<br>' +
        '</div>' +
        '<div class="panel-body myPanelBody">' +
        '<span class="panelBodyTitle"></span><br>' +
        '<span class="yAxis">单位：（<span class="showUnit">  </span>）</span>' +
        '<div class="area">' +
        //'<canvas class="myChart"></canvas>' +
        '</div>' +
        '<span class="xAxis">单位：（<span class="showUnit">  </span>）</span>' +
        '</div>' +
        '</div>';
    div.innerHTML = htm;
    dataArea.appendChild(div);
    bindTooltip();
}

//删除当前图表域
function delDateArea(node) {
    if (window.confirm("确认删除此图表？该图表所有数据将被清除！")) {
        var dataArea = document.getElementById("dataArea");
        var parent = node.parentNode.parentNode.parentNode;
        array[parseInt($(parent).attr('flag'))] = null;
        dataArea.removeChild(parent);
    }
}

//根据选择数量修改输入表格数量
function sChange(element) {
    var index = element.options[element.options.selectedIndex].value;
    var parent = element.parentNode;
    var trs = parent.getElementsByTagName('table')[0].getElementsByTagName('tr');
    var th0 = trs[0].getElementsByClassName('inputTh');
    var th1 = trs[1].getElementsByClassName('inputTh');
    var size = th0.length;
    for (var i = 0; i < size; i++) {
        trs[0].removeChild(th0[0]);
        trs[1].removeChild(th1[0]);
    }
    for (var j = 0; j < index; j++) {
        var thN0 = document.createElement("th");
        thN0.setAttribute('class', 'inputTh');
        thN0.innerHTML = '<input type="text" class="thInput">';
        var thN1 = document.createElement("th");
        thN1.setAttribute('class', 'inputTh');
        thN1.innerHTML = '<input type="text" class="thInput">';
        trs[0].appendChild(thN0);
        trs[1].appendChild(thN1);
    }
}
//检查表格输入域
function checkTable(table) {
    var trs = table.getElementsByTagName('tr');
    var inputs0 = trs[0].getElementsByClassName('thInput');
    var inputs1 = trs[1].getElementsByClassName('thInput');
    for (var i = 0; i < inputs0.length; i++) {
        if (inputs0[i].value.length == 0 || isNaN(inputs1[i].value) || inputs1[i].value.length == 0) {
            //console.log(inputs1[i].value+'---'+isNaN(inputs1[i].value));
            return false;
        }
    }
    return true;
}

//获取表格中的数据
function getTextTable(table) {
    if (checkTable(table)) {
        var trs = table.getElementsByTagName('tr');
        var inputs0 = trs[0].getElementsByClassName('thInput');
        var inputs1 = trs[1].getElementsByClassName('thInput');
        var size = inputs0.length;
        var lable = "";
        var datas = "";
        for (var i = 0; i < size; i++) {
            lable += '#%'+inputs0[i].value + '#%,';
            datas += inputs1[i].value + ',';
        }
        lable = '[' + lable.substring(0, lable.length - 1) + ']';
        datas = '[' + datas.substring(0, datas.length - 1) + ']';
        //console.log(lable);
        //console.log(datas);

        return lable+'####'+datas;
    }
    return false;
}

//绘制图表
function drawPicture(element) {
    var list = getTextTable(element.parentNode);
    // console.log(list.split('####')[0].replace(/#%/g,'\"'));
    var data = '{' +
        'labels:' + list.split('####')[0].replace(/#%/g,'\"') + ',' +
        'datasets: [' +
        '{' +
        'fillColor: "rgba(220,220,220,0.5)",' +
        'strokeColor: "rgba(220,220,220,1)",' +
        'pointColor: "rgba(220,220,220,1)",' +
        'pointStrokeColor: "#fff",' +
        'data:' + list.split('####')[1] + '}]}';
    if (data != false) {
        var parent = element.parentNode.parentNode.parentNode;
        var myChart = parent.getElementsByClassName('myChart')[0];
        var area = parent.getElementsByClassName('area')[0];
        if (myChart != null) {
            area.removeChild(area.getElementsByTagName('div')[0]);
        }
        var div = document.createElement('div');
        div.setAttribute('flag',arrayIndex+'');
        div.innerHTML = '<canvas class="myChart" width="700" height="400"></canvas>';
        area.appendChild(div);
        var ctx = parent.getElementsByClassName('myChart')[0].getContext("2d");
        //console.log(data);
        var line = {

            //Boolean - If we show the scale above the chart data
            scaleOverlay: false,

            //Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            //** Required if scaleOverride is true **
            //Number - The number of steps in a hard coded scale
            scaleSteps: null,
            //Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            //Number - The scale starting value
            scaleStartValue: null,

            //String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            //Number - Pixel width of the scale line
            scaleLineWidth: 1,

            //Boolean - Whether to show labels on the scale
            scaleShowLabels: false,

            //Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            //String - Scale label font declaration for the scale label
            scaleFontFamily: "'Arial'",

            //Number - Scale label font size in pixels
            scaleFontSize: 12,

            //String - Scale label font weight style
            scaleFontStyle: "normal",

            //String - Scale label font colour
            scaleFontColor: "#666",

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 3,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            //Boolean - Whether to animate the chart
            animation: true,

            //Number - Number of animation steps
            animationSteps: 60,

            //String - Animation easing effect
            animationEasing: "easeOutQuart",

            //Function - Fires when the animation is complete
            onAnimationComplete: null

        };
        new Chart(ctx).Line(eval('(' + data + ')'),line);
        //构图完毕
        var chart_title = parent.getElementsByClassName('inputTitle')[0].value;
        var xUnit = parent.getElementsByClassName('unit')[0].value;
        var yUnit = parent.getElementsByClassName('unit')[1].value;

        parent.getElementsByClassName('panelBodyTitle')[0].innerHTML = chart_title;
        parent.getElementsByClassName('showUnit')[0].innerHTML = yUnit;
        parent.getElementsByClassName('showUnit')[1].innerHTML = xUnit;

        array[arrayIndex] = '{\"chart_title\":\"' + chart_title + '\",\"xUnit\":\"' + xUnit + '\",\"yUnit\":\"' + yUnit + '\",\"data\":\"' + list + '\"}';

        arrayIndex++;


    } else {
        alert("输入出错！请检查数据表中是否有空值，“对应数值”项是否存在非数字");
    }
   
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
    var chartData = '';
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (array[i] != null) {
            chartData += array[i] + ',';
        }
    }
    chartData = '[' + chartData.substring(0, chartData.length - 1) + ']';

    console.log(study);
    console.log(advice);
    console.log(data);
    console.log(chartData);
    console.log($("#chapter_id").val());
    $.post(
        './setReport.do',
        {
            study: study,
            advice:advice,
            data:data,
            chart:chartData,
            chapter_id:$("#chapter_id").val()
        },
        function (data,status) {
            if(check(data,status) && data == 1){
                swal('success','实验报告已成功提交','success');
                setTimeout('window.history.go(-1)',1500);
            }else {
                swal('error','提交出错，请稍后重试','error');
            }
        }
    );
}


