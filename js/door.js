class Door {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
    }

    draw() {
        ctx.fillStyle = "orange"
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collisions() {
        if (fullCollide(player, this)||fullCollide(this, player)) {
            displayWinScreen();
        }
    }

    update() {
        this.collisions();
        this.draw();
    }
}