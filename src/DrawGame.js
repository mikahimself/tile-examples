class DrawGame {
    constructor(ctx, mapH, mapW, tileH, tileW, mapData) {
        this.ctx = ctx
        this.mapData = mapData
        this.mapH = mapH | 15;
        this.mapW = mapW | 15;
        this.tileH = tileH | 32;
        this.tileW = tileW | 32;
    }

    drawGrid(mapData) {
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                switch(mapData[((y * this.mapW) + x)]){
                    case 0:
                        if ((x + y) % 2 != 0 ) {
                            this.ctx.fillStyle = "rgb(238, 238, 238)";
                        } else {
                            this.ctx.fillStyle = "rgb(230, 230, 230)";
                        }
                        
                        break;
                    case 1:
                        this.ctx.fillStyle = "#888888";
                        break;
                    case 2:
                        this.ctx.fillStyle = "#999999";
                        break;
                }
                this.ctx.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
            }
        }
    }

    drawFramerate(framesLastSecond) {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(`FPS: ${framesLastSecond}`, 16, 22);
    }

    drawAll(mapData, framesLastSecond) {
        if (this.ctx === null) { return; }
        this.drawGrid(mapData);
        this.drawFramerate(framesLastSecond);
    }
}

export default DrawGame;