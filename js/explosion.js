const PARTICLE_SPEED = 55;

class Explosion {
    constructor(x, y) {
        this.particles = []
        this.x = x;
        this.y = y;
        this.numParticles = 30;
        this.timer = 0;
        this.status = 1;
    }

    init() {
        for (var i=0;i<this.numParticles;i++) {
            this.particles[i] = {x:this.x, y:this.y, dx: Math.random()-0.5, dy: Math.random()-0.5, status: 1};
        }
    }

    update() {
        this.move();
        this.draw();
        
    }

    move() {
        for (var i=0;i<this.particles.length;i++) {
            if (this.particles[i].status) {
                this.particles[i].x += this.particles[i].dx * PARTICLE_SPEED;
                this.particles[i].y += this.particles[i].dy * PARTICLE_SPEED;
            }
        }
    }

    draw() {
        ctx.fillStyle = "red";
        for (var i of this.particles) {
            if (i.status) {
                ctx.fillRect(i.x, i.y, 5, 5);
                if (checkOffScreen(i)) i.status = 0;
            }
        }
    }
}