import { MapData } from './mapdata.js';
import DrawGame from './DrawGame.js';
import Character from './Character.js';

var ctx;
var drawGame;
var currentSecond = 0;
var framesLastSecond = 0;
var frameCount = 0;

var lastFrameTime = 0;

var player;

window.onload = function() {
    ctx = document.getElementById('gameCanvas').getContext('2d');
    player = new Character();
    requestAnimationFrame(loop);
    drawGame = new DrawGame(ctx, 15, 15, 32, 32, MapData);
    ctx.font = 'bold 12pt sans-serif'
}

function update() {
    calculateFramerate();
    player.processMovement();
}

function draw() {
    drawGame.drawAll(MapData, framesLastSecond)
    player.draw(ctx);
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