class Circle {
    constructor(x, y, color) {
        this.x = x, this.y = y;
        this.color = color;
        this.r = 4;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!isCircleColliding(this) && isWithinEdge(this)) {
            this.r += 0.1;
        }

    }

}

// for colliding
const isCircleColliding = (circle) => {
    for (let i = 0; i < circleList.length; i++) {
        if (circleList[i] != circle && dist(circle, circleList[i]) <= circle.r + circleList[i].r) {
            return true;
        }
    }
    return false;
}

const isWithinEdge = (c) => {
    return (c.x + c.r < W && c.x - c.r > 0 && c.y + c.r < H && c.y - c.r > 0);
}
const dist = (a, b) => {
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}