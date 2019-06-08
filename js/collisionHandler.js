function collide(point, obj) { // checks if point is in obj
    if (point.x > obj.x && point.x < obj.x + obj.width && point.y > obj.y && point.y < obj.y + obj.height) {
        return true;
    } else {
        return false;
    }
}

function fullCollide(obj, obj1) {
    if (collide({x:obj.x,y:obj.y}, obj1)||
        collide({x:obj.x+obj.width,y:obj.y}, obj1)||
        collide({x:obj.x,y:obj.y+obj.height}, obj1)||
        collide({x:obj.x+obj.width,y:obj.y+obj.height}, obj1)) {
            return true;
    } else return false;
}

function checkOffScreen(obj) {  
    if (obj.x>canvas.width||obj.x<0||obj.y>canvas.height||obj.y<0) return true;
    else return false;
}