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
// const highScoresList = document.getElementById("high-scores-list");
const acceleration = 2;

let gameInterval;
let direction = 0;
let jadePoints = 0;
let jades = [];
let jadeFrameId = "";
let evaderFrameId = "";
let scores = [];

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

		if (jadeTop === 360) {
			if (!checkImpact(jade)) {
				jadePoints += 1; // increment points by 1
				points.textContent = `${jadePoints}`; // update the user
			}
			else { 
				gameOver();
			}
		}

		if (newTop > 400) {
			jade.remove(jade);
			console.log("jade removed");
			return;
		}

		jade.style.top = `${newTop}px`;
		jadeFrameId = window.requestAnimationFrame(moveJade);
	}

	jadeFrameId = window.requestAnimationFrame(moveJade);
	jades.push(jade);
	return jade;
}

// Checks if a jade has impacted the evader
function checkImpact(jade) {
	const jadeTop = parseInt(jade.style.top);

	if (jadeTop === 360) {
		const evaderLeftEdge = parseInt(evader.style.left);
		const evaderRightEdge = evaderLeftEdge + 40;
		const jadeLeftEdge = parseInt(jade.style.left);
		const jadeRightEdge = jadeLeftEdge + 20;

		if (jadeRightEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's left side is hit
			jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
			jadeLeftEdge > evaderLeftEdge && jadeLeftEdge < evaderRightEdge) { // evader's right side is hit
			return true;
		}
	}
}

// Handles the game over logic
function gameOver() {
	saveHighScore(Number(jadePoints));
	displayHighScores();
	clearInterval(gameInterval);
	alert(getFinalScore());
	start.style.display = "block";
	window.removeEventListener("keydown", evaderDirectionHandler);
}

// Resets the game state
function resetGame() {
	jadePoints = 0;
	points.textContent = `${jadePoints}`;
	evader.style.left = "0px";
	jades.forEach(jade => jade.remove(jade));
	jades = [];
}



// Generates final and high scores
function getFinalScore() {
	// Save score
	const isPlural = jadePoints === 1 ? "point" : "points";
	// Retrieve and validate the score

	return `GAME OVER. You're now officially jaded!\nYou scored ${jadePoints} ${isPlural}\nTap or click to Try again!`;
}

// Handles the direction of the evader based on key pressed
function evaderDirectionHandler(e) {
	if (e.key === "ArrowRight") {
		direction = 1;
		moveEvader();
	} else 
	if (e.key === "ArrowLeft") {
		direction = 2;
		moveEvader();
	}

}

// Moves the evader based on direction
function moveEvader() {
	const gameWidth = 400;
	const evaderWidth = 40;
	const evaderSpeed = 3;
	let evaderPosX = parseInt(evader.style.left);

	if (direction === 2 && evaderPosX - evaderSpeed > 0) {
		evaderPosX -= Number(evaderSpeed);
	} else if (direction === 1 && evaderPosX < gameWidth - (evaderWidth + evaderSpeed)) {
		evaderPosX += Number(evaderSpeed);
	}
	evader.style.left = `${evaderPosX}px`;
	evaderFrameId = window.requestAnimationFrame(moveEvader);

}

// Stops the evader from moving
function stopEvader() {
	direction = 0;
	window.cancelAnimationFrame(evaderFrameId);
}

var scoreX;
function saveHighScore(score) {
	// Retrieve existing high scores or create an empty array if none exist
	let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
	let scoreX = JSON.parse(localStorage.getItem('highScores')) || [];
	// Add highscore if it is a greater score
	// if(score > )
	console.log(scoreX);
	highScores.push(score);

	// Sort the scores in descending order and limit to top 10
	highScores.sort((a, b) => b - a);
	highScores = highScores.slice(0, 10);

	// Save the updated list back to localStorage
	localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to retrieve and display high scores
function displayHighScores() {
	// Retrieve the high scores from localStorage
	let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

	// Get the HTML element where the scores will be displayed
	const highScoresList = document.getElementById("high-scores-list");

	// Clear any existing content in the list
	highScoresList.tetxtContent = '';

	// Add each high score as a list item
	highScores.forEach(score => {
		const listItem = document.createElement('li');
		listItem.classList.add("high-scores-list-item");
		listItem.textContent = score;
		highScoresList.appendChild(listItem);
	});
}



// Generates a random number within the game width
function randomNumber() {
	const gameWidth = 400;
	const jadeWidth = 20;
	return Math.floor(Math.random() * (gameWidth - jadeWidth) + 1);
}

// Starts the game
function startGame() {
	localStorage.clear();
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