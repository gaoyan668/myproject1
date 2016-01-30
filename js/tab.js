var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
function start(e) {
    //往下滑
    this.startX = e.changedTouches[0].pageY;

}
function move(e) {

    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch - this.startX;
    var index = this.index;
    //判断照片的zIndex
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {//判断当前照片不等于当前的索引，让当前隐藏，上一张或下一张显示
            arguments[0].style.display = "none"
        }

        //arguments[0].firstElementChild.id="";

    });
    if (movePos > 0) {


        //过界判断
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        //移动距离判断
        var duration = -winH + movePos;
    } else if (movePos < 0) {
        this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + movePos;
    }
    //设置当前图片的缩放
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / winH * 1 / 2) + ")  translate(0," + movePos + "px)";

    oLis[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";

    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display = "block";//上一张下一张显示
}
function end(e) {
    if(this.flag){


    oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.prevSIndex].style.webkitTransition = "0.5s ease-out";
    oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function (e) {
        if (e.target.tagName == "LI") {
            this.style.webkitTransition = "";
        }

    }, false)
    }
}
