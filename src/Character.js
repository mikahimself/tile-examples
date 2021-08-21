import Vector2D from './Vector2D';

class Character {
    constructor(map, size, speed, startPos) {
        this.map = map
        this.direction = new Vector2D();
        this.previousDirection = new Vector2D(0, 0);
        this.velocity = new Vector2D();
        this.speed = speed;
        this.position = new Vector2D();
        this.targetDirection = new Vector2D();
        this.targetPosition = new Vector2D();
        this.dimensions = new Vector2D(size, size);
        this.offset = (map.tileSize.x - this.dimensions.x) / 2
        this.isMoving = false;
        this.keys = {
            37: false,
            38: false,
            39: false,
            40: false
        };
        document.addEventListener("keydown", this.keyPressed.bind(this));
        document.addEventListener("keyup", this.keyReleased.bind(this));
        this.placeAt(startPos);
    }

    placeAt(newPosition) {
        this.position.x = newPosition.x * this.map.tileSize.x + this.offset;
        this.position.y = newPosition.y * this.map.tileSize.y + this.offset;
    };

    processMovement(t) {
        this.previousDirection = this.direction;
        this.direction = new Vector2D(0, 0)

        if (this.keys[37]) {
            this.direction.x += -1;
        }
        else if (this.keys[39]) {
            this.direction.x += 1;
        }
        else if (this.keys[38]) {
            this.direction.y += -1;
        }
        else if (this.keys[40]) {
            this.direction.y += 1;
        }

        if (!this.isMoving && !this.direction.equals(new Vector2D)) {
            this.targetDirection = this.direction;
            if (this.map.isCellVacant(this.position, this.targetDirection, this)) {
                this.targetPosition = this.map.updateChildPosition(this);
                this.isMoving = true;
            }
        } else if (this.isMoving) {
            this.velocity = this.targetDirection.multiplyBy(this.speed);
            var distanceToTarget = new Vector2D(
                                    Math.abs(this.targetPosition.x - this.position.x),
                                    Math.abs(this.targetPosition.y - this.position.y));
            if (Math.abs(this.velocity.x) > distanceToTarget.x) {
                this.velocity.x = distanceToTarget.x * this.targetDirection.x;
                this.isMoving = false;
            }
            if (Math.abs(this.velocity.y) > distanceToTarget.y) {
                this.velocity.y = distanceToTarget.y * this.targetDirection.y;
                this.isMoving = false;
            }
            this.move(this.velocity);
        }
    }

    move(velocity) {
        this.position = this.position.add(velocity);
    }

    keyPressed(event) {
        this.keys[event.keyCode] = true;
    }

    keyReleased(event) {
        this.keys[event.keyCode] = false;
    }

    draw(ctx) {
        ctx.fillStyle = "#333333"
        ctx.fillRect(this.position.x, 
                     this.position.y,
                     this.dimensions.x,
                     this.dimensions.y);
    }
}

export default Character;