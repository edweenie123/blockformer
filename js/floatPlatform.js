class FloatPlatform {
    constructor(x, y) {
        this.initY = y;
        this.x = x;
        this.y = y;
        this.width = tileSize;
        this.height = tileSize/2;

        this.timer = 0;
        this.respawnTime = 100;
        this.fallDelay = 3;

        this.gravity = 0.2;
        this.velY = 0;
        this.touched = false;
        // this.status = true;
    }

    draw() {
        ctx.fillStyle = "rgb(51, 51, 51)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (this.touched) {
            this.timer++;
            
            if (this.timer>this.fallDelay) {
                this.velY += this.gravity;
                this.y += this.velY;
            }
            

            if (this.timer > this.respawnTime) {
                this.timer = 0;
                this.touched = false;
                this.y = this.initY;
                this.velY = 0;
            }
            // if (checkOffScreen(this)) this.status = false; 
        }
    }

    update() {
        this.move();
        this.draw();
    }
}