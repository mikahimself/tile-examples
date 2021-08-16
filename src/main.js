import { MapData } from './mapdata.js';
import DrawGame from './DrawGame.js';

var ctx;
var drawGame;
var currentSecond = 0;
var framesLastSecond = 0;
var frameCount = 0;

window.onload = function() {
    ctx = document.getElementById('gameCanvas').getContext('2d');
    requestAnimationFrame(loop);
    drawGame = new DrawGame(ctx, 15, 15, 32, 32, MapData);
    ctx.font = 'bold 12pt sans-serif'
}

function update() {
    calculateFramerate()
}

function draw() {
    drawGame.drawAll(MapData, framesLastSecond)
}

function loop() {
    update()
    draw()
    window.requestAnimationFrame(loop)
}

function calculateFramerate() {
    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else {
        frameCount++;
    }
}