export default class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    divideBy(divisor) {
        return new this.constructor(this.x / divisor, this.y / divisor);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    multiplyBy(multiplier) {
        return new this.constructor(this.x * multiplier, this.y * multiplier);
    }
}