var playerCanMove = true;

class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        
        this.velX = 0;
        this.velY = 0;
        
        this.friction = 0.9;
        this.gravity = 0.4;
        this.isJumping = false;
        this.onGround = false;
        
        this.jumpPower = 10;
        this.onTrampoline = false;
        
        this.speed = 20;
        this.width = 13;
        this.height = 26;
        this.maxHealth = 100;
        this.health = this.maxHealth;
    }
    
    draw() {
        ctx.fillStyle = 'rgb(255, 73, 73)'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x, this.y, this.width, this.height); 
    }
    
    move() {
        if (playerCanMove) {
            if (keys[39] || keys[68]) { // right arrow or d
                if (this.velX < player.speed) this.velX++;
            }
            if (keys[37] || keys[65]){ // left arrow or a
                if (this.velX > -player.speed) this.velX--;
            }
            if (keys[38] || keys[87] || keys[32]) { // up arrow or w or space
                if (this.onGround) {
                    console.log("jump");
                    this.isJumping = true;
                    this.onGround = false;
                    this.velY = -this.jumpPower;
                }
            }            
        }

        this.onGround = false;
        this.velX *= this.friction; // apply friction (smooth motion)
        this.velY += this.gravity;

        
        this.collisions();
        this.velY = Math.min(this.velY, tileSize-5); // ensures that clipping doesn't occur
        
        if (this.onGround) {
            if (this.onTrampoline) {
                this.onTrampoline = false;
            } else {
                this.velY = 0;
            }
        }
        this.x += this.velX; // update x position
        this.y += this.velY; // update y position
        
    }
    
    collisions() {
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width; 

        if (this.y < 0) {
            this.velY = Math.abs(this.velY);
        }
        if (this.y >= ctx.canvas.height - player.height) {
            player.y = ctx.canvas.height - player.height;
            this.isJumping = false;
            this.onGround = true;
        }
        
        for (var wall of wallsArr) {
            var side = this.findCollisionSide(wall);
            
            if (side == "top") this.velY = 3;
            else if (side == "bottom") {
                this.onGround = true;
                this.isJumping = false;
            } else if (side == "right" || side == "left") {
                this.velX = 0;
            }
            
        }
    }

    /*
        core platformer collision checker - findCollisionSide(box)
            - works by checking side of the wall the player collides with
        
        code found on: http://www.somethinghitme.com/2013/04/16/creating-a-canvas-platformer-tutorial-part-tw/ 
    */ 
    findCollisionSide(box) {
        var difX = (this.x + this.width/2) - (box.x + box.width/2);
        var difY = (this.y + this.height/2) - (box.y + box.height/2);
        
        var hWidth = this.width/2 + box.width/2;
        var hHeight = this.height/2 + box.height/2;
        
        var offSetX = hWidth - Math.abs(difX);
        var offSetY = hHeight - Math.abs(difY);
        
        var colSide = null;
        if (Math.abs(difX) < hWidth && Math.abs(difY) < hHeight) {
            if (offSetX >= offSetY) {
                if (difY > 0) {
                    colSide = "top";
                    player.y += offSetY;
                } else {
                    colSide = "bottom";
                    player.y -= offSetY;
                    if (box.height == tileSize/2) {
                        box.touched = true;
                    }

                    if (box.jumpPower != null) {
                        // console.log(box.jumpPower)
                        this.onTrampoline = true;
                        this.velY = -box.jumpPower;
                    }
                }
            } else {
                if (difX > 0) {
                    colSide = "left";
                    player.x += offSetX;
                } else {
                    colSide = "right";
                    player.x -= offSetX;
                }
            }
        }
        return colSide;
    }
    
    die() {
        var e = new Explosion(this.x, this.y);
        explosionArr.push(e);
        e.init();
        spawnPlayer();

        if (currentMap!=0) totalDeaths++;
        updateUI();
    }

    update() {
        this.move();
        this.draw();
    }
}

var player;
function spawnPlayer() {
    player = new Player(playerSpawnX, playerSpawnY);
}
