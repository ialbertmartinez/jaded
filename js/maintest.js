/*
code inspired and base idea from RockDodger game by FlatIron/Learn Co
I learned while attending Learn Co./FlatIron's Software Engineering Bootcamp:
https://github.com/learn-co-students/javascript-rock-dodger-bootcamp-prep-000

This is a great place to learn to code. Curriculum is comprehensive and the instructors are knowledgeable. 
Projects are challenging and do help you apply what you learned in the course.

*/
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
    const jade = document.createElement('div');
    let jFrameId = window.requestAnimationFrame(moveJade);
    var top = 0;

    jade.className = "jade";
    jade.style.left = `${x}px`;
    jade.style.top = 0;
    game.appendChild(jade);
    
    function moveJade(){
        jade.style.top = `${top}px`; 
        let jTop = propToInt(jade.style.top);
        
        if(jTop >= 0) { 
            // jade.remove(jade); 
            // console.log("Jade Removed");}
            if(jTop === 360) {
                if(!checkImpact(jade)) {
                    console.log("Evaded Jade");
                    jadePoints += 1; // increment points by 1
                    points.textContent = `${jadePoints}`; // update the user 
                }
                else {
                    gameOver();
                    return;
                }
            } 
            top += dropRate;
            jFrameId = window.requestAnimationFrame(moveJade);
            
            if(top >= 400) {
                window.cancelAnimationFrame(jFrameId);
                jade.remove(jade); 
                console.log("Jade Removed");
            }

                
        }
        
    }
    /* function moveJade(){
        jade.style.top = `${top}px`; 
        let jTop = propToInt(jade.style.top);
        
        if(jTop > 400) { jade.remove(jade); console.log("Jade Removed");}
        if(jTop === 360) {
            if(!checkImpact(jade)) {
                console.log("Evaded Jade");
                jadePoints += 1; // increment points by 1
                points.textContent = `${jadePoints}`; // update the user 
            }
            else {
                gameOver();
                return;
            }
        } 
        top += dropRate;
        window.requestAnimationFrame(moveJade);
        if(top >= 400) {
            window.cancelAnimationFrame(jFrameId);
            
        }
        
    } */
        window.requestAnimationFrame(moveJade);

    jades.push(jade);
    return jade;
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
    let finalScore = getFinalScore();
    clearInterval(gameInterval);
    removeJades();

    window.cancelAnimationFrame(jFrameId);
    window.cancelAnimationFrame(eFrameId);
    window.removeEventListener("keydown" ,evaderDirectionHandler);
    // getFinalScore();
    initRetry();
    alert(finalScore);
    console.log("-- Game is over --");
    // return;
}

function getFinalScore(){
    let jPoints = jadePoints;
    let results = (jPoints === 1) ? "point" : "points";
    let finalInfo = `GAME OVER. Hit by jade!\nYou scored ${jPoints} ${results}\nPlay again!`;
    return finalInfo;
}

function initRetry(){
    let startText = document.getElementById("start-text");
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
    start.addEventListener("click", startGame);
    startText.textContent = "TRY AGAIN"
    start.style.display = "block";
    evader.style.display = "none";
    scoreboard.style.display = "none";
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
// function extracts int value from css prop containing 'px' suffix
function propToInt(p){
    return parseInt(p.split('px')[0]) || 0;
}
// clear jade elements from the DOM
function removeJades(){
    for(let j of jades) {
        j.remove(j);
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