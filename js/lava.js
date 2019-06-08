const LAVA_COLORS = [
    "rgb(219, 107, 107)",
    "rgb(237, 92, 92)"
];

class LavaParticle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 3;
        this.color = LAVA_COLORS[Math.floor(Math.random()*LAVA_COLORS.length)];
        this.status = true;
        this.time = Math.random()*60;
        this.speed = Math.random();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.time--;
        this.y -= this.speed;
        if (this.time<=0) {
            this.status = false;
        }
    }

    update() {
        if (this.status) {
            this.move();
            this.draw();
        }
    }
}

class Lava {
    constructor(x, y, startTime) {
        this.x = x;
        this.y = y;
        this.width = 23;
        this.height = 25;
        this.timer = 0;
        this.speed = Math.random() * 0.1;

        this.color = LAVA_COLORS[Math.floor(Math.random()*LAVA_COLORS.length)];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.timer++;
        if (this.timer<60) {
            this.y += this.speed;
        } else {
            this.timer = 0;
            this.speed = -this.speed;
            if (Math.random()>0.5) {
                var lp = new LavaParticle(this.x + Math.random()*this.width, this.y);
                lavaPartArr.push(lp);
            }
        }
    }

    collisions() {
        if (collide({x:player.x, y:player.y+player.height}, this)||collide(this, player)) {
            player.die();
        }
    }

    update() {
        this.collisions();
        this.move();
        this.draw();
    }
}