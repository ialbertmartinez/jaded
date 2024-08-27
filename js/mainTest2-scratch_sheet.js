/*
VARIABLES:
	.highScore:  last recorded high score

METHODS:
	.saveScore: 
		goal: save currentScore to localStorage.highScore 
		example: 
		if (localStorage.clickcount) {
  			localStorage.clickcount = Number(localStorage.clickcount) + 1;
		} else {
			localStorage.clickcount = 1;
		}

		if highscore exists
			if currentScore > localStorage.highScore
				set localStorage.highScore = currentScore
				display 
			if currentScore === localStorage.highScore
				no action necessary
			if currentScore < localStorage.highScore
				show currentScore & localStorage.highScore
		else
			localStorage.highScore = currentScore

	.getLastHighScore:
		grabs last recorded highscore. 
		If none,
			return null
		Else, 
			return highScore and convert string to Number parseInt()
	
	.showList:
		grabs prev highscores and displays them in a list'


*/

// function saveScore(score) {
// 	let highScore = localStorage.highScore;
// 	let message = '';
// 	let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
	
	

// 	if (!highScore) {
// 		localStorage.highScore = score; 
// 		playerInfo.textContent = `First Time Score: ${score}`;
//   	}
//   	if(score > highscore) {
// 		playerInfo.textContent = `New HighScore: ${score}\nLast High Score: ${highScore}`;
// 		playerInfo.style.display = "block";
// 		localStorage.highScore = score; 
// 		highScores.push(score); // add new score to list  	}
// 	}

// function showHighScores() {
// 	scoreKeeper.saveScore(jadePoints);
// 	let lastHighScore = scoreKeeper.highScore;
	
// 	if (scoreKeeper.isScoreValid(highScore)) {
// 		if (jadePoints > highScore) {
// 			playerInfo.textContent = `New HighScore: ${jadePoints}`;
// 			playerInfo.style.display = "block";
// 			scoreKeeper.highScore = highscore;
// 		}
// 	} else {
// 		console.log("Tampered score. Game was over the minute it began.");
// 	}
// }



  // Example of saving a new score
//   saveHighScore(200);
//   saveHighScore(150);
//   saveHighScore(300);

  // Display the high scores
