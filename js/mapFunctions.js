
var currentMap = 0;

var playerSpawnX, playerSpawnY;
var exitDoor;

var tileSize = 20;
var wallsArr = [];
var floatPlatformArr = [];
var trampolineArr = [];
var turretArr = [];
var turretBulletArr = [];
var explosionArr = [];
var lavaArr = [];
var lavaPartArr = [];
var collisionObjArr = [];

function processMap(map) {
    for (var row=0;row<map.length;row++) {
        for (var col=0;col<map[row].length;col++) {
            var elem = map[row][col];
            if (elem=='#') {
                wallsArr.push({x : col * tileSize, y : row * tileSize, width : tileSize, height : tileSize});
            } else if (elem=='F') {
                var f = new FloatPlatform(col*tileSize, row*tileSize)
                floatPlatformArr.push(f);
                wallsArr.push(f)
            } else if (elem=='V') {
                var v = new Trampoline(col*tileSize, row*tileSize);
                trampolineArr.push(v);
                wallsArr.push(v);
            } else if (elem=='T') {
                var t = new Turret(col * tileSize, row * tileSize, player);
                turretArr.push(t);
            } else if (elem=='L') {
                var l = new Lava(col * tileSize, row * tileSize, player);
                lavaArr.push(l);
            } else if (elem=='S') {
                playerSpawnX = col*tileSize;
                playerSpawnY = row*tileSize;
            } else if (elem=='E') {
                exitDoor = new Door(col*tileSize, row*tileSize);
            } else if (elem=='C') {
                var c = new CollisionObj(col*tileSize, row*tileSize+tileSize, "credits");
                collisionObjArr.push(c);
            } else if (elem=='M') {
                var m = new CollisionObj(col*tileSize, row*tileSize+tileSize, "levelSelect");
                collisionObjArr.push(m)
            }
        }
    }
}

function drawMap(map) {
    for (var y=0;y<map.length;y++) {
        for (var x=0;x<map[y].length;x++) {
            if (map[y][x]=='#') {
                ctx.fillStyle = "rgb(51, 51, 51)";
                ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
            }
        }
    }
}

function changeMap(num) {
    document.getElementById("levelSelectPage").style.display = "none";
    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("gameUI").style.display = "block"
    document.getElementById("pauseScreen").style.display = "none";

    if (num==0) {
        document.getElementById("titleScreen").style.display = "block";
        document.getElementById("gameUI").style.display = "none";
    }
    
    totalDeaths = 0;
    updateUI();

    isRunning = true;
    playerCanMove = true;

    currentMap = num;
    wallsArr = [];
    turretArr = [];
    turretBulletArr = [];
    explosionArr = [];
    lavaArr = [];
    collisionObjArr = [];
    floatPlatformArr = [];
    trampolineArr = [];
    
    exitDoor = null;
    
    processMap(maps[num]);
    spawnPlayer(playerSpawnX, playerSpawnY);

    document.getElementById("myCanvas").style.display = "none";
    setTimeout(changeCanvas, 100);
}

function nextLevel() {
	if (currentMap == 9) changeMap(0)
	else changeMap(currentMap+1);
}

function changeCanvas() {
    document.getElementById("myCanvas").style.display = "block"
}
