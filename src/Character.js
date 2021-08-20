import Vector2D from './Vector2D';

class Character {
    constructor(map) {
        this.map = map
        this.offset = 4;
        this.direction = new Vector2D(0, 0);
        this.previousDirection = new Vector2D(0, 0);
        this.velocity = new Vector2D(0, 0);
        this.speed = 3;
        this.position = new Vector2D(0, 0);
        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = new Vector2D(24, 24);
        this.dimensionsHalf = new Vector2D()
        this.delayMove = 700;
        this.keys = {
            37: false,
            38: false,
            39: false,
            40: false
        };
        document.addEventListener("keydown", this.keyPressed.bind(this));
        document.addEventListener("keyup", this.keyReleased.bind(this));
        this.placeAt(1, 1);
    }

    placeAt(x, y) {
        this.position.x = x * this.map.tileSize.x + this.map.tileSizeHalf.x;
        this.position.y = y * this.map.tileSize.y + this.map.tileSizeHalf.x;
        console.log(this.position)
    };

    processMovement(t) {
        this.previousDirection = this.direction;
        this.direction = new Vector2D(0, 0)

        if (this.keys[37]) {
            this.direction.x += -1;
        }
        if (this.keys[39]) {
            this.direction.x += 1;
        }
        if (this.keys[38]) {
            this.direction.y += -1;
        }
        if (this.keys[40]) {
            this.direction.y += 1;
        }
        // this.previousDirection = this.direction;

        this.normalizeDirection();
        this.velocity = this.direction.multiplyBy(this.speed);
        if (this.map.isCellVacant(this.position, this.previousDirection)) {
            this.position.add(this.velocity);
        }
    }

    normalizeDirection() {
        var magnitude = Math.sqrt((Math.abs(this.direction.x) + Math.abs(this.direction.y)));

        if (this.direction.x != 0 && this.direction.y != 0) {
            this.direction.x = this.direction.x / magnitude;
            this.direction.y = this.direction.y / magnitude;
        }
    }

    keyPressed(event) {
        this.keys[event.keyCode] = true;
    }

    keyReleased(event) {
        this.keys[event.keyCode] = false;
    }

    draw(ctx) {
        ctx.fillStyle = "#333333"
        ctx.fillRect(this.position.x - this.map.tileSizeHalf.x + this.offset, 
                     this.position.y - this.map.tileSizeHalf.y + this.offset,
                     this.dimensions.x,
                     this.dimensions.y);
    }
}

export default Character;