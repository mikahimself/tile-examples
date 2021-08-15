import { MapData } from './mapdata.js'

var ctx;
var currentSecond = 0;
var framesLastSecond = 0;
var frameCount = 0;
var mapH = 15;
var mapW = 15;
var tileH = 32;
var tileW = 32;

window.onload = function() {
    ctx = document.getElementById('gameCanvas').getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = 'bold 12pt sans-serif'
}

function calculateFramerate() {
    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 0;
    } else {
        frameCount++;
    }
}

function drawGrid() {
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch(MapData[((y * mapW) + x)]){
                case 0:
                    ctx.fillStyle = "#eeeeee";
                    break;
                case 1:
                    ctx.fillStyle = "#999999";
                    break;
            }
            ctx.fillRect(x * tileW, y * tileH, tileW, tileH);
        }
    }
}

function drawFramerate() {
    ctx.fillStyle = "#000000";
    ctx.fillText(`FPS: ${framesLastSecond}`, 16, 22);
}

function drawGame() {
    if (ctx === null) { return; }

    calculateFramerate();
    drawGrid();
    drawFramerate();
    
    window.requestAnimationFrame(drawGame)
}