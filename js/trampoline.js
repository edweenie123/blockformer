class Trampoline {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.jumpPower = 20;
        this.width = tileSize;
        this.height = tileSize+5;

        this.moveSpeed = 0.1;
        this.timer = 0;
    }

    draw() {
        ctx.fillStyle = "rgb(168, 114, 148)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.timer++;
        if (this.timer<30) {
            this.y -= this.moveSpeed;
        } else {
            this.timer = 0;
            this.moveSpeed *= -1;
        }
    }

    update() {
        this.move();
        this.draw();
    }
}