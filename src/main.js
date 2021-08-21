import { MapData } from './mapdata.js';
import Vector2D from './Vector2D';
import DrawGame from './DrawGame.js';
import Character from './Character.js';
import MapGrid from './MapGrid.js';

var ctx;
var drawGame;
var currentSecond = 0;
var framesLastSecond = 0;
var frameCount = 0;
var mapSize = new Vector2D(15, 15);
var tileSize = new Vector2D(32, 32)

var player;
var map;

window.onload = function() {
    ctx = document.getElementById('gameCanvas').getContext('2d');
    map = new MapGrid(MapData, mapSize, tileSize)
    player = new Character(map, 20, 2, new Vector2D(1, 2));
    requestAnimationFrame(loop);
    drawGame = new DrawGame(ctx, mapSize, tileSize, MapData);
    ctx.font = 'bold 12pt sans-serif'
}

function update() {
    calculateFramerate();
    player.processMovement();
}

function draw() {
    map.draw(ctx);
    drawGame.drawFramerate(framesLastSecond)
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