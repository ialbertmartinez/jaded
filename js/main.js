// window.onload = function(){
const game = document.getElementById("game");
const evader = document.getElementById("evader");
const start = document.getElementById("start");
const heightOfImpact = 360;  // height of game - (evaderHeight + jadeHeight)
// let mFrameId = window.requestAnimationFrame(makeJade);
var gameInterval = null;
// start.addEventListener('click', startGame);
    
function makeJade(x) {
    var top = 0;
    const jade = document.createElement('div');
    let jFrameId = window.requestAnimationFrame(moveJade);

    jade.className = "jade";
    jade.style.left = `${x}px`;
    jade.style.top = 0;
    game.appendChild(jade);
    
    function moveJade(){
        console.log(`1 ${jade.style.top} | ${top}`);
        jade.style.top = `${top}px`; 
        console.log(`2 ${jade.style.top} | ${top}`);

        if(top === 360) {
            if(!checkImpact(jade)) {
                console.log("Evaded Jade");
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
    console.log("Player is now jaded!");
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
    gameInterval = setInterval(function() {
        makeJade(randomNumber())
    }, 5000);
}

