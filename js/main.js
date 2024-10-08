// window.onload = function(){
const game = document.getElementById("game");
const evader = document.getElementById("evader");
const start = document.getElementById("start");
const scoreboard = document.getElementById('scoreboard');
const points = document.getElementById("points");
const info = document.getElementById("info");
const heightOfImpact = 360;  // height of game - (evaderHeight + jadeHeight)
// let mFrameId = window.requestAnimationFrame(makeJade);
let gameInterval = null;
let dir = 0;
let jFrameId = "";
let eFrameId = "";
let evaderPosX = 0;
let jadePoints = 0; 
let jades = [];

// for testing purposes
let dropRate = 4; // 1 - 10 \ 10 = MAX speed
let makeRate = 800;
let gameWidth = 400;
let status = "";

// function gameOptions(dRate, mRate=1000, gWidth=400){
//      dropRate = 0;

//      makeRate = 1000;
//           gameWidth = 400;
//     }

// start.addEventListener('click', startGame);
    
function makeJade(x) {
    var top = 0;
    const jade = document.createElement('div');
    // let jFrameId = window.requestAnimationFrame(moveJade);
    jFrameId = window.requestAnimationFrame(moveJade);

    jade.className = "jade";
    jade.style.left = `${x}px`;
    jade.style.top = 0;
    game.appendChild(jade);
    
    function moveJade(){
        jade.style.top = `${top}px`; 

        if(top === 360) {
            if(!checkImpact(jade)) {
                console.log("Evaded Jade");
                jadePoints += 1; // increment points by 1
                points.textContent = `${jadePoints}`; // update the user 
                // setLevel();
                // add point check to increase difficulty after certain number of points have accrued
            }
            else {
                window.cancelAnimationFrame(jFrameId);
                gameOver();
                return;
            }
        } else
        if(top === 400) {
            window.cancelAnimationFrame(jFrameId);

        }
        top += dropRate;
        jFrameId = window.requestAnimationFrame(moveJade);
    }
    jades.push(jade);
    return jade;
}
    // makeJade(randomNumber());


// function determines if jade hit evader 
function checkImpact(jade){
    const jadeTop = parseInt(jade.style.top);
    
    if(jadeTop === heightOfImpact) {
        const evaderLeftEdge = parseInt(evader.style.left);
        const evaderRightEdge = evaderLeftEdge + 40;
        const jadeLeftEdge = parseInt(jade.style.left);
        const jadeRightEdge = jadeLeftEdge + 20;
        
        if(jadeLeftEdge < evaderLeftEdge && jadeRightEdge > evaderLeftEdge || // evader's left side is hit
        jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
        jadeLeftEdge < evaderRightEdge && jadeRightEdge > evaderRightEdge) { // evader's right side is hit
            return true;
        }
    }
}

// function setLevel(){
    
//     let p = jadePoints;
//     if(p >= 1 && p < 10) {
//         dropRate = 4; // 1 - 10 \ 10 = MAX speed
//         makeRate = 800;
//         gameWidth = 400;
//         status = "";

//     }
//     if(p >= 10) { 
//         dropRate += 2;
//         info.textContent = `You play like a beginner.`
//     } 
//     else
//     if(p >= 20) { 
//         dropRate += 2;
//         makeRate -= 50;
//         info.textContent = `You play like an Amateur-ish.`
//     } else
//     if(p >= 30) {
//         dropRate += 3;
//         makeRate -= 100;
//         info.textContent = `🥱 You a'ight (aka you're alright 🙄)`;
//     }
//     return;
//     // when jadePoints hits a certain tier range
//     // increase jade drop rate (speed @ which jade falls down)
// }

function gameOver(){
    let startText = document.getElementById("start-text");
    
    clearInterval(gameInterval);
    window.cancelAnimationFrame(jFrameId);
    window.cancelAnimationFrame(eFrameId);
    removeJades();
    window.removeEventListener("keydown" ,evaderDirectionHandler);
    start.addEventListener("click", startGame);
    startText.textContent = "TRY AGAIN"
    start.style.display = "block";
    evader.style.display = "none";
    scoreboard.style.display = "none";
    alert(`Game Over. Hit by jade!\nYou scored ${displayFinalScore()}\nPlay again!`);
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
    console.log("-- Game is over --");
}

function displayFinalScore(){
    let results = "";

    if(jadePoints > 1) {results = `${jadePoints} points!`;}
    else if(jadePoints === 1) {results = "1 point.";}
    else {results = "No points.";}
    
    return results;
}

function evaderDirectionHandler(e) {
    const key = e.key;
	// console.log(`key: ${key}`);

	if (key === "ArrowRight") {
		dir = 1; // dir: 1 = right
		moveEvader();
	} else 
    if (key === "ArrowLeft") {
		dir = 2; // dir: 2 = left
		moveEvader();
	}
}

function moveEvader() {
	if (dir == 2 && (evaderPosX - 4) > 0) {
		evaderPosX -= 4;
		evader.style.left = `${evaderPosX}px`; // left prop. is used in calc if jade hit evader
		eFrameId = window.requestAnimationFrame(moveEvader);
	} else
		if (dir == 1 && (evaderPosX + 4) < (gameWidth - 40)) {
			evaderPosX += 4;
			evader.style.left = `${evaderPosX}px`;
			eFrameId = window.requestAnimationFrame(moveEvader);
		}
}

function stopEvader() {
	dir = 0;
	window.cancelAnimationFrame(eFrameId);
}

function randomNumber (){
    return Math.floor(Math.random() * (400 - 20) + 1);
}

// clear jade elements from the DOM
function removeJades(){
    for(let jade of jades) {
        jade.remove(jade);
    }
}

function startGame(){
    start.style.display = "none";
    evader.style.display = "block";
    scoreboard.style.display = "block"; 
    
    window.addEventListener('keydown', evaderDirectionHandler);
    window.addEventListener("keyup", stopEvader);
    window.removeEventListener("click", startGame);

    gameInterval = setInterval(function() {
        makeJade(randomNumber())
    }, 800);
}

start.addEventListener("click", startGame);

/*  each level can change: 
     - rate that jade is made (how often a new jade pops up on screen)
     - the speed that jade moves at
     - the width of the available space to move left 
       and right (obviously decreasing width and/or height 😈)
*/