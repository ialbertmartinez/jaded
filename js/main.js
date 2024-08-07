// window.onload = function(){
const game = document.getElementById("game");
const evader = document.getElementById("evader");
const start = document.getElementById("start");
const scoreboard = document.getElementById('scoreboard');
const points = document.getElementById("points");
const heightOfImpact = 360;  // height of game - (evaderHeight + jadeHeight)
// let mFrameId = window.requestAnimationFrame(makeJade);
let gameInterval = null;
let dir = 0;
let jFrameId, eFrameId = "";
let evaderPosX = 0;
let jadePoints = 0;


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
            }
            else {
                cancelAnimationFrame(jFrameId);
                gameOver();
                return;
            }
        }
        console.log(`3 ${jade.style.top} | ${top}`);
        top += 2;
        console.log(`4 ${jade.style.top} | ${top}`);
        jFrameId = window.requestAnimationFrame(moveJade);
    }
    // moveJade()
}
    // makeJade(randomNumber());


// function determines if jade hit evader 
function checkImpact(jade){
    const jadeTop = propToInt(jade.style.top);
    if(jadeTop === heightOfImpact) {
        const evaderLeftEdge = propToInt(evader.style.left);
        const evaderRightEdge = evaderLeftEdge + 40;
        const jadeLeftEdge = propToInt(jade.style.left);
        const jadeRightEdge = jadeLeftEdge + 20;
        
        if(jadeLeftEdge < evaderLeftEdge && jadeRightEdge > evaderLeftEdge || // evader's left side is hit
        jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
        jadeLeftEdge < evaderRightEdge && jadeRightEdge > evaderRightEdge) { // evader's right side is hit
            return true;
        }
    }
}

function gameOver(){
    clearInterval(gameInterval);
    window.removeEventListener("keydown" ,evaderDirectionHandler);
    cancelAnimationFrame(eFrameId);
	alert(`Game Over. Hit by jade!\nYou scored ${jadePoints} points\nPlay again!`);
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
	
}

function evaderDirectionHandler(e) {
    const key = e.key;
	console.log(`key: ${key}`);

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
    const gameWidth = 400;
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
	cancelAnimationFrame(eFrameId);
}

function randomNumber (){
    return Math.floor(Math.random() * (400 - 20) + 1);
}
// function extracts int value from css prop containing 'px' suffix
function propToInt(p){
    return parseInt(p.split('px')[0]) || 0;
}

function startGame(){
    start.style.display = "none";
    evader.style.display = "block";
    scoreboard.style.display = "block"; 
    
    window.addEventListener('keydown', evaderDirectionHandler);
    window.addEventListener("keyup", stopEvader);

    gameInterval = setInterval(function() {
        makeJade(randomNumber())
    }, 5000);
}

