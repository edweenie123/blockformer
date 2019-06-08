const TURRET_LENGTH = 20;

class TurretBullet {
    constructor(x, y, ang) {
        this.x = x;
        this.y = y;
        this.status = true;
        this.width = 5;
        this.height = 5;
        this.speed = 10;
        this.ang = ang;

        // make bullet spawn in turret barrel
        this.x += Math.cos(this.ang) * (TURRET_LENGTH-this.width-this.speed);
        this.y += Math.sin(this.ang) * (TURRET_LENGTH-this.width-this.speed);
    }
    move() {
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;
    }

    collisions() {
        for (var w of wallsArr) { // check if bullet collides with wall
            if (fullCollide(this, w)) {
                this.status = false;
            }
        }

        if (fullCollide(this, player)) { // check if bullet collides with player
            player.die();
            this.status = false;
        }
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
    }
    update() {
        if (this.status) {
            this.collisions();
            this.move();
            this.draw();
        }
    }
}

class Turret {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bodySize = tileSize-5;
        this.gunWidth = TURRET_LENGTH;
        this.gunHeight = 6;
        this.ang = 0;

        this.timer = 0;
        this.shootDelay = 30;
    }

    shoot() {
        var bx = this.x + this.bodySize/2;
        var b = new TurretBullet(this.x, this.y, this.ang);
        turretBulletArr.push(b);
    }

    move() {
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        this.ang = Math.atan2(dy, dx);

        this.timer++;

        if (this.timer > this.shootDelay) {
            this.shoot();
            this.timer = 0;
        }
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.bodySize, this.bodySize);

        ctx.save();
        
        ctx.fillStyle = "grey"
        ctx.translate(this.x+this.bodySize/2, this.y+this.bodySize/2);
        ctx.rotate(this.ang);
        ctx.fillRect(0, -this.gunHeight/2, this.gunWidth, this.gunHeight);
        ctx.restore();
    }

    update() {
        this.move();
        this.draw();
    }
}