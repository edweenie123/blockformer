// adjust margin of HTML elements so that it aligns with canvas position

var htmlElements = document.getElementsByClassName("canvasElem");
var gameInfo = document.getElementById("info");

var margin = (document.body.clientWidth - 1100)/2;
gameInfo.style.marginLeft = margin;

for (var e of htmlElements) {
    e.style.left = margin;
}

// get HTML elements
var closeCredits = document.getElementById("closeCredits");
var closeLevelSelect = document.getElementById("closeLevelSelect");
var pauseBtn = document.getElementById("pauseBtn");

function startGame() {
    document.getElementById("myCanvas").style.display = "block";
    document.getElementById("titleScreen").style.display = "none";
    isRunning = true;
}

function showCredits() {
    document.getElementById("creditsPage").style.display = "block";
}

closeCredits.onclick = function() {
    document.getElementById("creditsPage").style.display = "none";
    playerCanMove = true;
}

function showLevelSelector() {
    document.getElementById("levelSelectPage").style.display = "block";
}

closeLevelSelect.onclick = function() {
    document.getElementById("levelSelectPage").style.display = "none";
    playerCanMove = true;
}

pauseBtn.onclick = function() {
    document.getElementById("pauseScreen").style.display = "block";
    isRunning = false;
    isPaused = true;
}

function unpause() {
    document.getElementById("pauseScreen").style.display = "none";
    isRunning = true;
    isPaused = false;
}


function displayWinScreen() {
    document.getElementById("winScreen").style.display = "block";
    isRunning = false;
}

function updateUI() {
    document.getElementById("deathsText").innerHTML = "Deaths: "+ totalDeaths;
}