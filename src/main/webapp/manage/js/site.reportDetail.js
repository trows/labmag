var list;
var chapterList;

var index;
var grade = -1;
var info;
var report;
window.onload = function () {
    initPage();
    bindTooltip();
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

function initPage() {
    for (var i = 0; i < 3; i++) {       //清空页面数据
        $(".answerT").eq(i).html('');
        $(".mainTitle").eq(i).text('');
    }

    var listStr = $("#list").text();
    var cpStr = $("#chapterList").text();
    index = $('#index').text();
    // console.log(cpStr);
    // console.log(index);
    list = JSON.parse(listStr);
    chapterList = JSON.parse(cpStr);
    //预留到底判断
    // console.log(index);
    if (Object.keys(list).length <= index) {
        swal('success', '本课时最后份报告已经批改完毕', 'success');
        setTimeout('window.location.href="/manage/correctReport.html"', 1000);
        return;
    }
    info = eval('(' + list[index] + ')');
    if (info.sex == 0) {
        $('#index').text(parseInt(index) + 1);
        initPage();
    } else {
        var blank = $(".mainTitle");
        $(blank).eq(0).text('班级：' + info.class_name);
        $(blank).eq(1).text('姓名：' + info.user_name);
        $(blank).eq(2).text('序号：' + info.serial_number);
        console.log(chapterList[info.level]);
        $(".reportTitle:first").text(chapterList[info.level]);
        //开头设置完毕
        createPaper(info);
    }
}

function createPaper(info) {
    $.post(
        './getExistReport.do',
        {
            chapter_id: info.level,
            account_id: info.account_id
        },
        function (data, status) {
            if (check(data, status)) {
                report = JSON.parse(data);
                grade = parseInt(report.grade);

                if (grade != -1) {
                    var st = '<span class="mainTitle">得分：<span class="grade">' + grade + '</span></span>';
                    $("#paperTitle").append(st);
                }
                var blank = $(".answerT");
                $(blank).eq(0).html(report.study);
                $(blank).eq(1).html(report.advice);
                $(blank).eq(2).html(report.data);
                var dataArea = $("#dataArea");
                // console.log(report.chart);
                var chartList = eval('(' + report.chart + ')');
                // JSON.parse(report.chart);
                // console.log(chartList);
                // console.log('++++++++++++++');

                var length = chartList.length;
                // console.log(length);
                for (var i = 0; i < length; i++) {
                    console.log(i);
                    var htm = '<hr>' +
                        '<div class="panel-body myPanelBody">' +
                        '<span class="panelBodyTitle">' + chartList[i].chart_title + '</span><br>' +
                        '<span class="yAxis">单位：（<span class="showUnit">' + chartList[i].yUnit + '</span>）</span>' +
                        '<div class="area">' +
                        '<canvas class="myChart" width="900" height="500" id="chart' + i + '"></canvas>' +
                        '</div>' +
                        '<span class="xAxis">单位：（<span class="showUnit">' + chartList[i].xUnit + '</span>）</span>' +
                        '</div>';
                    $(dataArea).append(htm);
                    drawPicture(document.getElementById('chart' + i), chartList[i].data);
                }


            }
        }
    );
}

function drawPicture(element, myData) {
    // console.log(myData.split('####')[0].replace(/#%/g,'\"'));
    var data = '{' +
        'labels:' + myData.split('####')[0].replace(/#%/g, '\"') + ',' +
        'datasets: [' +
        '{' +
        'fillColor: "rgba(220,220,220,0.5)",' +
        'strokeColor: "rgba(220,220,220,1)",' +
        'pointColor: "rgba(220,220,220,1)",' +
        'pointStrokeColor: "#fff",' +
        'data:' + myData.split('####')[1] + '}]}';

    console.log(data);
    var ctx = element.getContext("2d");
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
    new Chart(ctx).Line(eval('(' + data + ')'), line);
    //构图完毕
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

    // console.log(adjust.length);
    // console.log(JSON.stringify(adjust));

    $.post(
        './setReportGrade.do',
        {
            account_id:info.account_id,
            chapter_id:info.level,
            grade:inner_grade
        },
        function (data,status) {
            if(check(data,status) && data == 1){
                $('#index').text(parseInt(index)+1);
                initPage();
            }
        }
    );

}
