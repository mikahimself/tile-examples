export default class MapGrid {
    constructor(mapData, mapSize, tileSize) {
        this.mapData = mapData;
        this.mapSize = mapSize;
        this.tileSize = tileSize;
        this.tileSizeHalf = this.tileSize.divideBy(2);
    }

    isCellVacant(pos, direction) {
        console.log(direction.x * this.tileSize.x);
        let gridX = Math.floor((pos.x + (direction.x * 16 + 2)) / this.tileSize.x);
        let gridY = Math.floor((pos.y + (direction.y * 16 + 2)) / this.tileSize.y);
        console.log(`Player located at ${gridX}, ${gridY}`)
        let mapPos = gridX + (gridY * this.mapSize.x);
        let mapItem = this.mapData[mapPos];
        if (mapItem == 0) {
            return true;
        }
        return false;

    }

    updateChildPosition() {

    }

    draw(ctx) {
        for (let y = 0; y < this.mapSize.y; y++) {
            for (let x = 0; x < this.mapSize.x; x++) {
                switch(this.mapData[((y * this.mapSize.x) + x)]){
                    case 0:
                        if ((x + y) % 2 != 0 ) {
                            ctx.fillStyle = "rgb(238, 238, 238)";
                        } else {
                            ctx.fillStyle = "rgb(230, 230, 230)";
                        }
                        
                        break;
                    case 1:
                        ctx.fillStyle = "#888888";
                        break;
                    case 2:
                        ctx.fillStyle = "#999999";
                        break;
                }
                ctx.fillRect(x * this.tileSize.x, y * this.tileSize.y, this.tileSize.x, this.tileSize.y);
            }
        }
    }
}