class DrawGame {
    constructor(ctx) {
        this.ctx = ctx
    }

    drawFramerate(framesLastSecond) {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(`FPS: ${framesLastSecond}`, 16, 22);
    }
}

export default DrawGame;