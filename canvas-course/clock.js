var WINDOW_WIDTH = 960;
var WINDOW_HEIGHT = 600;
var RADIUS = 7;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600*1000);

var curShowTimeSeconds = 0;

var balls = [];
var colors = ["#FFCC00", "#FFCC00", "#CC0033", "#990066", "#990066", "#009966", "#339999", "#669999", "#663366", "#CCCC00", "#99CC00", "#FF3399", "#99CC00", "#990033", "#999900", "#009966"];

window.onload = function () {

    WINDOW_WIDTH = document.documentElement.clientWidthie || document.body.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    }, 50)

}

function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() *60 + curTime.getSeconds();

    
    return ret ;

    // console.log("getCurShowTimeSeconds")
}

function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {

        if (parseInt(nextHours / 10) != parseInt(curHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(nextHours % 10) != parseInt(curHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

    console.log(balls.length)
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }

    }

    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
    // console.log("updateBalls")
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(aBall);
            }
        }
    }
    // console.log(balls)
}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    if (hours > 78) {
        alert("请配置未来三天以内的任意时间")
    } else {
        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
        renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
        renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
        renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
        renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
        renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
        renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
        renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
    }

    for (var i = 0; i < balls.length; i++) {
        if (balls[i]) {
            cxt.fillStyle = balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
            cxt.closePath();

            cxt.fill();
        }

    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#0e9fd8";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
