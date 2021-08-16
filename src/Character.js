class Character {
    constructor() {
        this.direction = [0, 0];
        this.velocity = [0, 0]
        this.speed = 3;
        this.posX = 48;
        this.posY = 48;
        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = [24, 24];
        this.position = [36, 36];
        this.delayMove = 700;
        this.keys = {
            37: false,
            38: false,
            39: false,
            40: false
        };
        document.addEventListener("keydown", this.keyPressed.bind(this))
        document.addEventListener("keyup", this.keyReleased.bind(this))
    }

    placeAt(x, y) {
        
    };

    processMovement(t) {
        this.direction = [0, 0]

        if (this.keys[37]) {
            this.direction[0] += -1;
        }
        if (this.keys[39]) {
            this.direction[0] += 1;
        }
        if (this.keys[38]) {
            this.direction[1] += -1;
        }
        if (this.keys[40]) {
            this.direction[1] += 1;
        }

        this.normalizeDirection();
        this.velocity[0] = this.speed * this.direction[0];
        this.velocity[1] = this.speed * this.direction[1];
        this.position[0] += this.velocity[0]
        this.position[1] += this.velocity[1]
    }

    normalizeDirection() {
        var magnitude = Math.sqrt((Math.abs(this.direction[0]) + Math.abs(this.direction[1])));
        
        if (this.direction[0] != 0 && this.direction[1] != 0) {
            this.direction[0] = this.direction[0] / magnitude;
            this.direction[1] = this.direction[1] / magnitude;
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
        ctx.fillRect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    }

}

export default Character;