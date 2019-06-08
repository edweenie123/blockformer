// special update function for game development (credit: http://www.somethinghitme.com/2013/04/16/creating-a-canvas-platformer-tutorial-part-tw/)

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas, ctx;

var isRunning = true, isPaused = false;

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

ctx.canvas.height = 700;
ctx.canvas.width = 1100;

processMap(maps[currentMap]);
spawnPlayer();


var totalDeaths = 0;

function update() {
    if (isRunning) {
        
        // clear canvas
        ctx.clearRect(0,0,canvas.width, canvas.height); 

        // update all objects
        for(var i of collisionObjArr) i.update();
        for (var l of lavaArr) l.update();
        for (var lp of lavaPartArr) lp.update();

        for (var v of trampolineArr) v.update();
        drawMap(maps[currentMap]);
        for (var f of floatPlatformArr) f.update();
        
        for (var t of turretArr) t.update();
        for (var b of turretBulletArr) b.update();
        for (var e of explosionArr) e.update();
        if (exitDoor != null) exitDoor.update();
        player.update();
    
    } else if (isPaused) {
        if (keys[80]) { // user presses 'p'
            unpause()
        } else if (keys[77]) { // user presses 'm'
            changeMap(0);
        }
    }
    requestAnimationFrame(update);
}

window.addEventListener("load", function(){
    update();
});