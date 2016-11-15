var list;
var chapterList;

var index;
var grade = -1;
var info;
var report;
window.onload = function () {
    createChart();
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



function createChart() {
    var dataArea = $("#dataArea");
    var chartList = eval('(' + $("#chart").text() + ')');
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
