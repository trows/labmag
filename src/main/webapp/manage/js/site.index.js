window.onload = function(){
    var height = document.documentElement.clientHeight-80;
    document.getElementsByClassName('myFrame')[0].style.height = height+'px';
    bindTooltip();
}

function bindTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
}