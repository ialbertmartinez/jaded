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
// TODO: move line 18 into checkImpact() body
const heightOfImpact = 360;  // height of game - (evaderHeight + jadeHeight)
// let mFrameId = window.requestAnimationFrame(makeJade);
var gameInterval;
let dir = 0;
let jFrameId = "";
let eFrameId = "";
let jadeFrameId = "";
let evaderPosX = 0;
let jadePoints = 0;                                                         
let jades = [];

// for testing purposes
let gameWidth = 400;
let status = "";
let acceleration = 4;
let fallSpeed = 0;
    
/*
function makeJade(x) {
    console.log("makeJade(x)");
    const jade = document.createElement('div');
    // let dropRate = 9.8 / 60;
    var lastFrame, timer, deltaT, now;
    var jadeTop = 0;
    let jFrameId = window.requestAnimationFrame(moveJade);
    let fallingSpeed = 0;

    jade.classList.add("jade");
    jade.style.left = `${x}px`;
    jade.style.top = jadeTop + "px";
    game.appendChild(jade);
    lastFrame = +new Date;

    function moveJade(){
        console.log("moveJade(x)");
        now = +new Date;
        deltaT = now - lastFrame;
        jadeTop = parseInt(jade.style.top); // needed to locate where jade is
        top = `${jadeTop + fallingSpeed}px`; // needed to know where jade will be next
        console.log(`1 top = ${top}\njadeTop: ${jadeTop}`);

        // while jade is visible on gameboard
        if(jadeTop === heightOfImpact){
            if(checkImpact(jade)) {
                jadePoints += 1; // increment points by 1
                points.textContent = `${jadePoints}`; // update the user 
                console.log("Evaded Jade");
            }
            else {
                // clearInterval(gameInterval);
                // window.cancelAnimationFrame(jFrameId);
                gameOver();
                return;
                }
            }
            jade.style.top = `${top}px`;
            fallingSpeed += acceleration;
            // jadeTop += ((dropRate * deltaT) /  60);
            lastFrame = now;
            ; // rate jade falls per second     
            jFrameId = window.requestAnimationFrame(moveJade);  
        } 
        else {
            window.cancelAnimationFrame(jFrameId);
            jade.remove(jade); 
            console.log("Jade Removed");
        }
    }
    */

    /* function moveJade(){
        jade.style.top = `${top}px`; 
        let jTop = parseInt(jade.style.top);
        
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
        
    } 
    window.requestAnimationFrame(moveJade);
    jades.push(jade);
    return jade;
}
*/
    // makeJade(randomNumber());

// create the element and all its fix-in's
const createJade = x => {
    const jade = document.createElement('div');
    jade.classList.add("jade");
    jade.style.top = 0 + 'px';
    jade.style.left = x + 'px';
    game.appendChild(jade); // add it to the game
    let counter = 0;
    // set all necessary details for the falling animation
    const top = parseInt(jade.style.top) + fallSpeed; // the property used to animate jade
    const jHeight = 20;
    const fallRate = 1/60; // 4px / sec || browser renders @ 60fps => 4px/60fps
    const gameHeight = 400; // the space utilized for the animation
    fallSpeed = 0; // will accelerate with every execution

    // kick off the actual movement part of jade animation 
    function animateJade() {
        let newTop = parseInt(top) + acceleration; // the property used to animate jade
        const topPx = `${newTop}px`; // top of jade with accrued speed
        // fallSpeed += acceleration;
        // if(nTop > gameHeight - jHeight) {
        //     // window.cancelAnimationFrame(jadeFrameId);
        //     jade.remove(jade); // remove jade node from dom tree
        //     console.log("Jade Removed");
        // }

        function moveJade(){
            if(newTop >= 0) { console.log("" + counter + " > 0")}; // 1
            if(newTop === heightOfImpact) { console.log("" + counter + " === heightOfImpact")};
            if(newTop > heightOfImpact) { console.log(" " + counter + "> heightOfImpact")};
            if(newTop > gameHeight) { console.log("" + counter + " > gameHeight")};
        }
            moveJade()
            if(top === 360){
                
               if(!checkImpact(jade)){ // 2
                    clearInterval(gameInterval);
                    gameOver();
                    console.log("" + counter + " ope!!!!! ?????");
                    // return;
                }
                else {
                    jadePoints += 1;
                    points.textContent = `${jadePoints}`;
                    console.log("" + counter + " evaded Jade");
                }
            } else 
            if (counter >= 103) {
                window.cancelAnimationFrame(jadeFrameId);
                jade.remove(jade);
                console.log("" + counter + " made it to the bottom!");
            }
            counter += 1;
        jade.style.top = topPx; // update jade css top prop
        fallSpeed += fallRate; // speed increases w/ each execution
        console.log(`jade.style.top = ${jade.style.top}\ttopPx = ${topPx}`)
        jadeFrameId = requestAnimationFrame(animateJade);
    }
        // jade.style.top = newTop; // assign it the new position w/ added mopvement
        // fallSpeed += fallRate; // speed increases w/ each execution due to gravity
        // jadeFrameId = window.requestAnimationFrame(animateJade);

       
            // if(!(nTop >= (gameHeight - jHeight))) {

            // } else 
            // if(nTop === 360 && !checkImpact(jade)) {
            //     jadePoints += 1;
            //     points.textContent = `${jadePoints}`;
            // }

        // if(!checkImpact(jade)) {
            
        // }
        // else {
        //     clearInterval(gameInterval);
        //     gameOver();
        //     return;
        // }
        
        // if jade falls outside of game boundaries
        // if(parseInt(newTop) >= gameHeight - jHeight) {
        //     window.cancelAnimationFrame(jFrameId);
        //     jade.remove(jade); // remove jade node from dom tree
        //     console.log("Jade Removed");
        // }

        // if still within the game's view
        animateJade();
    jadeFrameId = requestAnimationFrame(animateJade);
    jades.push(jade);
    return jade;
}



// function determines if jade hit evader 
function checkImpact(jade) {
    const jadeTop = parseInt(jade.style.top);
    if(jadeTop === 360) {
        const evaderLeftEdge = parseInt(evader.style.left);
        const evaderRightEdge = evaderLeftEdge + 40;
        const jadeLeftEdge = parseInt(jade.style.left);
        const jadeRightEdge = jadeLeftEdge + 20;
        
        if(jadeLeftEdge < evaderLeftEdge && jadeRightEdge > evaderLeftEdge || // evader's left side is hit
        jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
        jadeLeftEdge < evaderRightEdge && jadeRightEdge > evaderRightEdge) { // evader's right side is hit
            return true;
        }
        return false;
    }
}

function gameOver(){        
    let finalScoreText = getFinalScore();
    clearInterval(gameInterval);
    for(let j of jades) { j.remove(j);}
    window.cancelAnimationFrame(jFrameId);
    window.cancelAnimationFrame(eFrameId);
    window.removeEventListener("keydown" ,evaderDirectionHandler);
    // getFinalScore();
    initRetry();
    alert(finalScoreText);
    console.log("-- Game is over --");
    // return;
}

function resetGame() {
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
    evaderPosX = 0;
    jades.forEach(jade => jade.remove(jade));
    jades = [];
}

function getFinalScore() {
    let isPlural = (jadePoints === 1) ? "point" : "points";
    return (`GAME OVER. You're now jaded!\nYou scored ${jadePoints} ${isPlural}\nTap or click to Try again!`);
}


function initRetry(){
    let startText = document.getElementById("start-text");
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
    evader.style.display = "none";
    scoreboard.style.display = "none";
    start.addEventListener("click", startGame);
    startText.textContent = "TRY AGAIN";
    start.style.display = "block";
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
    const gameWidth = 400;
    if (dir === 2 && (evaderPosX - 4) > 0) {
        evaderPosX -= 4;
        evader.style.left = `${evaderPosX}px`; // left prop. is used in calc if jade hit evader
        eFrameId = window.requestAnimationFrame(moveEvader);
    } else
        if (dir === 1 && (evaderPosX + 4) < (gameWidth - 40)) {
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
    return Math.floor(Math.random() * (gameWidth - 20) + 1);
}

function startGame(){
    resetGame();
    start.style.display = "none";
    evader.style.display = "block";
    scoreboard.style.display = "block"; 
    
    window.addEventListener('keydown', evaderDirectionHandler);
    window.addEventListener("keyup", stopEvader);
    window.removeEventListener("click", startGame);

    gameInterval = setInterval(function() {
       createJade(randomNumber());
    }, 9000);
}

start.addEventListener("click", startGame);

/*  each level can change: 
        - rate that jade is made (how often a new jade pops up on screen)
        - the speed that jade moves at
        - the width of the available space to move left 
        and right (obviously decreasing width and/or height 😈)
*/