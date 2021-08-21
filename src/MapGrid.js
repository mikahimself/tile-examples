import Vector2D from "./Vector2D";

export default class MapGrid {
    constructor(mapData, mapSize, tileSize) {
        this.mapData = mapData;
        this.mapSize = mapSize;
        this.tileSize = tileSize;
        this.tileSizeHalf = this.tileSize.divideBy(2);
    }

    isCellVacant(pos, direction) {
        // console.log(pos);
        let gridX;
        let gridY;
        // let gridX = Math.floor((pos.x + (direction.x * 16 + 2)) / this.tileSize.x);
        if (direction.x > 0) {
            gridX = Math.floor((pos.x + direction.x + 24 + 3) / this.tileSize.x);
        } else {
            gridX = Math.floor((pos.x + direction.x - 4) / this.tileSize.x);
        }
        if (direction.y > 0) {
            gridY = Math.floor((pos.y + (direction.y + 24 + 3)) / this.tileSize.y);    
        } else {
            gridY = Math.floor((pos.y + (direction.y - 4)) / this.tileSize.y);
        }


        // console.log(`Target located at ${gridX}, ${gridY}`)
        let mapPos = gridX + (gridY * this.mapSize.x);
        let mapItem = this.mapData[mapPos];
        return mapItem == 0 ? true : false;
        

    }

    getGridPosition

    updateChildPosition(child) {
        var gridPos = new Vector2D(Math.floor(child.position.x / this.tileSize.x), Math.floor(child.position.y / this.tileSize.y))
        // console.log("Grid position: ", gridPos, " direction ", child.direction)
        var newPos = gridPos.add(child.direction)
        // console.log("new grid pos", newPos)
        child.placeAt(newPos.x, newPos.y)
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