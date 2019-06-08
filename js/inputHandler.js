keys = []

document.addEventListener("keydown", kdHandler);
document.addEventListener("keyup", kuHandler);

function kdHandler(e) {
    keys[e.keyCode] = true;
}

function kuHandler(e) {
    keys[e.keyCode] = false;
}

