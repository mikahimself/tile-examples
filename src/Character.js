import Vector2D from './Vector2D';
import AStar from "./AStar";
import Cell from './Cell';

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
        this.finalTargetPosition = new Vector2D();
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
        document.addEventListener("mouseup", this.setRoute.bind(this));
        this.placeAt(startPos);
        this.myRoute = []; // = this.map.route[0];
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

        if (this.myRoute.length > 0 && !this.isMoving) {
            this.setAstarMovementTarget();
        }

        if (!this.isMoving && !this.direction.equals(new Vector2D)) {
            this.targetDirection = this.direction;
            if (this.map.isCellVacant(this.position, this.targetDirection, this)) {
                this.targetPosition = this.map.updateChildPosition(this);
                this.isMoving = true;
            }
        } else if (this.isMoving) {
            this.handleMovementSetup();
            this.move(this.velocity);
        }
    }

    handleMovementSetup() {
        this.velocity = this.targetDirection.multiplyBy(this.speed);
        var distanceToTarget = new Vector2D(
                                Math.abs(this.targetPosition.x - this.position.x),
                                Math.abs(this.targetPosition.y - this.position.y));
        if (Math.abs(this.velocity.x) > distanceToTarget.x) {
            this.velocity.x = distanceToTarget.x * this.targetDirection.x;
            this.isMoving = false;
            if (this.myRoute.length > 0) {
                this.myRoute.pop();
            }
        }
        if (Math.abs(this.velocity.y) > distanceToTarget.y) {
            this.velocity.y = distanceToTarget.y * this.targetDirection.y;
            this.isMoving = false;
            if (this.myRoute.length > 0) {
                this.myRoute.pop();
            }
        }
    } 

    setAstarMovementTarget() {
        let len = this.myRoute.length - 1;
        let target = new Vector2D(this.myRoute[len].x, this.myRoute[len].y);

        this.targetPosition = new Vector2D((target.x * 32) + this.offset, (target.y * 32) + this.offset);
        this.isMoving = true;
        let mapPos = this.map.worldToMap(this.position);
        this.targetDirection = target.subtract(mapPos);
    }

    setRoute(event) {
        let target = this.map.worldToMap(new Vector2D(event.clientX - this.offset, event.clientY - this.offset))
        let arrayTarget = this.map.mapToArray(target);
        if (this.map.isCellBlocked(arrayTarget)) {
            return;
        }
        let current = this.map.worldToMap(this.position);
        let arrayCurrent = this.map.mapToArray(current);

        let route = this.map.findRoute(arrayCurrent, arrayTarget);

        if (route) {
            this.myRoute = route;
            this.finalTargetPosition = this.map.mapToWorld(new Vector2D(this.myRoute[0].x, this.myRoute[0].y))
            let lastVec = new Vector2D(this.myRoute[this.myRoute.length - 1].x, this.myRoute[this.myRoute.length - 1].y);
            if (lastVec.equals(current)) {
                this.myRoute.pop();
            }
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
        if (this.myRoute.length > 0) {
            ctx.fillStyle = "#222222"
            ctx.fillRect(this.finalTargetPosition.x + 8,
                         this.finalTargetPosition.y + 8,
                         16, 16);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(this.finalTargetPosition.x + 12,
                         this.finalTargetPosition.y + 12,
                         8, 8)
        }
        ctx.fillStyle = "#333333"
        ctx.fillRect(this.position.x,
                     this.position.y,
                     this.dimensions.x,
                     this.dimensions.y);
    }
}

export default Character;