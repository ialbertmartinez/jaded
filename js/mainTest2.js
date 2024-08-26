/*
Inspired by the RockDodger game by FlatIron/Learn Co.
Learned while attending Learn Co./FlatIron's Software Engineering Bootcamp:
https://github.com/learn-co-students/javascript-rock-dodger-bootcamp-prep-000
*/

const game = document.getElementById("game");
const evader = document.getElementById("evader");
const start = document.getElementById("start");
const scoreboard = document.getElementById('scoreboard');
const points = document.getElementById("points");
const playerInfo = document.getElementById("player-info");

let gameInterval;
let direction = 0;
let evaderPosX = 0;
let jadePoints = 0;                                                         
let jades = [];
let jadeFrameId = "";
let evaderFrameId = "";

const gameHeight = 400;
const evaderHeight = 20;
const evaderWidth = 40;
const jadeHeight = 20;
const jadeWidth = 20;
const heightOfImpact = gameHeight - (evaderHeight + jadeHeight);
const acceleration = 2;

// Creates and initializes a jade
function createJade(x) {
    const jade = document.createElement('div');
    jade.classList.add("jade");
    jade.style.top = '0px';
    jade.style.left = `${x}px`;
    game.appendChild(jade);

    function moveJade() {
        const jadeTop = parseInt(jade.style.top);
        const newTop = jadeTop + acceleration;

        if(jadeTop === 360) {
            if (!checkImpact(jade)) { 
                jadePoints += 1; // increment points by 1
                points.textContent = `${jadePoints}`; // update the user
            }
            else { gameOver();}
        }
       
        if(newTop > 400) {
            jade.remove(jade);
            console.log("jade removed");
            return;
        } 

        jade.style.top = `${newTop}px`;
        jadeFrameId = window.requestAnimationFrame(moveJade);
        console.log(`jadePoints: ${jadePoints}\njadeTop: ${jadeTop}\nnewTop: ${newTop}`);
    }

    jadeFrameId = window.requestAnimationFrame(moveJade);
    jades.push(jade);
    return jade;
}

// Checks if a jade has impacted the evader
function checkImpact(jade) {
    const jadeTop = parseInt(jade.style.top);
    
    if(jadeTop === 360) {
        const evaderLeftEdge = parseInt(evader.style.left);
        const evaderRightEdge = evaderLeftEdge + 40;
        const jadeLeftEdge = parseInt(jade.style.left);
        const jadeRightEdge = jadeLeftEdge + 20;
        
        if(jadeRightEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's left side is hit
        jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
        jadeLeftEdge > evaderLeftEdge && jadeLeftEdge < evaderRightEdge) { // evader's right side is hit
            return true;
        }
    }
}

// Handles the game over logic
function gameOver() {
    clearInterval(gameInterval);
    alert(getFinalScore());
    resetGame();
    start.style.display = "block";
    window.removeEventListener("keydown", evaderDirectionHandler);
}

// Resets the game state
function resetGame() {
    jadePoints = 0;
    points.textContent = `${jadePoints}`;
    evaderPosX = 0;
    jades.forEach(jade => jade.remove(jade));
    jades = [];
}

function addPoint() {
    jadePoints += 1; // increment points by 1
    points.textContent = `${jadePoints}`; // update the user
}

const scoreKeeper = (() =>  {
    const keyCard = "testCase$cenari0!";

    // encode
    const encodeScore = (score) => {
        let encoded = btoa(score + keyCard);
        return encoded;
    }

    // decode
  const decodeScore = (encodedScore) => {
    try {
      let decoded = atob(encodedScore);
      return decoded.replace(keyCard, '');
    } catch (e) {
      return null;
    }
  };

  return {
    saveScore: (score) => {
      const encodedScore = encodeScore(score);
      localStorage.setItem('highScore', encodedScore);
    },
    
    getScore: () => {
      const encodedScore = localStorage.getItem('highScore');
      if (!encodedScore) return null;
      
      const decodedScore = decodeScore(encodedScore);
      return parseInt(decodedScore);
    },

    isScoreValid: (score) => {
      const encodedScore = localStorage.getItem('highScore');
      if (!encodedScore) return false;

      return encodeScore(score) === encodedScore;
    }
  };
})();


// Generates final and high scores
function getFinalScore() {
    
    // Save score
    scoreKeeper.saveScore(jadePoints);
    const isPlural = jadePoints === 1 ? "point" : "points";
    // Retrieve and validate the score
    let highScore = scoreKeeper.getScore();

    if (scoreKeeper.isScoreValid(highScore)) {
        if(jadePoints > highScore) {
            playerInfo.textContent = `New HighScore: ${jadePoints}`;
            scoreKeeper.saveScore(highscore);
        }
        console.log("Valid score:", highScore);
    } else {
        console.log("Tampered score. Game was over the minute it began.");
    }
    return `GAME OVER. You're now jaded!\nYou scored ${jadePoints} ${isPlural}\nTap or click to Try again!`;
}

// Handles the direction of the evader based on key pressed
function evaderDirectionHandler(e) {
    if (e.key === "ArrowRight") {
        direction = 1;
        moveEvader();
    } else if (e.key === "ArrowLeft") {
        direction = 2;
        moveEvader();
    }
    
}

// Moves the evader based on direction
function moveEvader() {
    const gameWidth = 400;
    if (direction === 2 && evaderPosX - acceleration > 0) {
        evaderPosX -= 4;
    } else if (direction === 1 && evaderPosX < gameWidth - (evaderWidth + acceleration)) {
        evaderPosX += 4;
    }
    evader.style.left = `${evaderPosX}px`;
    evaderFrameId = window.requestAnimationFrame(moveEvader);

}

// Stops the evader from moving
function stopEvader() {
    direction = 0;
    window.cancelAnimationFrame(evaderFrameId);
}



// Generates a random number within the game width
function randomNumber() {
    return Math.floor(Math.random() * (gameWidth - jadeWidth) + 1);
}

// Starts the game
function startGame(){
    resetGame();
    start.style.display = "none";
    evader.style.display = "block";
    scoreboard.style.display = "block"; 
    
    window.addEventListener('keydown', evaderDirectionHandler);
    window.addEventListener("keyup", stopEvader);
    window.removeEventListener("click", startGame);

    gameInterval = setInterval(() => createJade(randomNumber()), 5000);
}

start.addEventListener("click", startGame);