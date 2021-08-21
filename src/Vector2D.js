export default class Vector2D {
    constructor(x, y) {
        this.x = x | 0;
        this.y = y | 0;
    }

    divideBy(divisor) {
        return new this.constructor(this.x / divisor, this.y / divisor);
    }

    add(vector) {
        return new this.constructor(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new this.constructor(this.x - vector.x, this.y - vector.y);
    }

    multiplyBy(multiplier) {
        return new this.constructor(this.x * multiplier, this.y * multiplier);
    }

    normalize() {
        var magnitude = Math.sqrt((Math.abs(this.x) + Math.abs(this.y)));
        if (this.x != 0 && this.y != 0) {
            this.x = this.x / magnitude;
            this.y = this.y / magnitude;
        }
    }

    equals(vector2) {
        return this.x == vector2.x && this.y == vector2.y;
    }
}