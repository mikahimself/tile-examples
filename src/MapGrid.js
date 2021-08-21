import Vector2D from "./Vector2D";

export default class MapGrid {
    constructor(mapData, mapSize, tileSize) {
        this.mapData = mapData;
        this.mapSize = mapSize;
        this.tileSize = tileSize;
        this.tileSizeHalf = this.tileSize.divideBy(2);
    }

    isCellVacant(pos, direction, child) {
        let gridX;
        let gridY;

        if (direction.x > 0) {
            gridX = Math.floor((pos.x + direction.x + child.dimensions.x + child.offset) / this.tileSize.x);
        } else {
            gridX = Math.floor((pos.x + direction.x - child.offset) / this.tileSize.x);
        }
        if (direction.y > 0) {
            gridY = Math.floor((pos.y + (direction.y + child.dimensions.y + child.offset)) / this.tileSize.y);    
        } else {
            gridY = Math.floor((pos.y + (direction.y - child.offset)) / this.tileSize.y);
        }

        let arrayPos = gridX + (gridY * this.mapSize.x);
        let mapItem = this.mapData[arrayPos];
        return mapItem == 0 ? true : false;
    }

    updateChildPosition(child) {
        var gridPos = this.worldToMap(child.position);
        var newPos = gridPos.add(child.direction)
        var newPosWorld = new Vector2D((newPos.x * this.tileSize.x) + child.offset, (newPos.y * this.tileSize.y) + child.offset);

        return newPosWorld;
    }

    worldToMap(position) {
        return new Vector2D(Math.floor(position.x / this.tileSize.x), Math.floor(position.y / this.tileSize.y));
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