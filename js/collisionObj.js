class CollisionObj {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = tileSize;
        this.height = tileSize;
        this.type = type;
    }

    collision() {
        if (fullCollide(player, this)) {
            if (this.type == "credits") showCredits();
            else if (this.type == "levelSelect") showLevelSelector();
            playerCanMove = false;
        }
    }

    update() {
        this.collision();
    }
}