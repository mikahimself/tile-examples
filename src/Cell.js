export default class Cell {
    constructor(x, y, type) {
        this.x = x || 0;
        this.y = y || 0;
        this.neighbors = [];
        this.f = 0;
        this.g = 0; // cost of path from start node to n
        this.h = 0; // heuristic that estimates the cost of cheapest path from n to the goal
        this.previous = undefined;
        this.type = type || 0;
        this.wall = this.type == 1;
        this.cellCost = [1, Infinity, 8, 1, 1.5, 0.25]
        this.cost = this.cellCost[this.type] || 1;
    }
    
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }

    // Checks equality with other Cells
    equals(other) {
        return other.x == this.x && other.y == this.y;
    }

    getSimpleNeighbors(grid) {
        var cols = 15; //grid[0].length;
        var rows = 15; //grid.length;
        this.neighbors = [];
        this.previous = undefined;
//        ((y * this.mapSize.x) + x)
  //      let arrayPos = gridX + (gridY * this.mapSize.x);

        
        if (this.x + 1 <= cols - 1) {
            this.neighbors.push(grid[this.x + 1 + (this.y * 15)]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.x - 1 + (this.y * 15)]);
        }
        if (this.y + 1 <= rows - 1) {
            this.neighbors.push(grid[this.x + ((this.y + 1) * 15)]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.x + ((this.y - 1) * 15)]);
        }
    }

    getNeighbors(grid) {
        var cols = grid[0].length;
        var rows = grid.length;
        this.neighbors = [];
        this.previous = undefined;
        
        if (this.x + 1 <= cols - 1) {
            this.neighbors.push(grid[this.y][this.x + 1]);
            if (this.y + 1 <= rows - 1) {
                this.neighbors.push(grid[this.y + 1][x + 1])
            }
            if (this.y > 0) {
                this.neighbors.push(grid[this.y - 1][x + 1])
            }
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.y][this.x - 1]);
            if (this.y + 1 <= rows - 1) {
                this.neighbors.push(grid[this.y + 1][x - 1])
            }
            if (this.y > 0) {
                this.neighbors.push(grid[this.y - 1][x - 1])
            }
        }
        if (this.y + 1 <= rows - 1) {
            this.neighbors.push(grid[this.y + 1][this.x]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.y - 1][this.x]);
        }
    }

    matchLocation(otherX, otherY) {
        return this.x == otherX && this.y == otherY;
    }

    getCoords() {
        return `X: ${this.x}, y: ${this.y}`;
    }
}