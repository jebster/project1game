//instance vars
var ball;
var paddle;
var score;

//initial speeds
var dx = 2;
var dy = 2;
var currentScore = 0;
var timer;

//set initial conditions for ball and paddle
var paddleLeft = 228;
var ballLeft = 200;
var ballTop = 4;


//Initialize the Game and starts it
var game = new Game();

function init() {

	game.init();
	game.start();

}

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a 
 * singleton.
 */
var imageRepository = new function() {
	// Define images
	this.empty = null;

	//this.background = new Image();

	// Set images src
	//this.background.src = "imgs/bg.png";
}


/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions. 
 */
function Drawable() {	

	this.init = function(x, y) {
		// Defualt variables
		this.x = x;
		this.y = y;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	// Define abstract function to be implemented in child objects
	this.draw = function() {
	};
}


function Game() {

	this.init = function() {
		
		ball = document.getElementById('ball');
		paddle = document.getElementById('paddle');
		score = document.getElementById('score');

		//as long as key is pressed, will activate this event listener
		document.onkeydown = keyListener;
	}

	this.start = function() {

		//game loop
		detectCollisions();
		render();
		difficulty();

		//end conditions
		if(ballTop < 470) {
			//ball is still inside canvas, keep playing
			timer = setTimeout('game.start()', 10);
		}
		else {
			gameOver();
		}
	}

}



//event listener for keypress
function keyListener(e) {

	// keyCode 38 is up arrow
    // keyCode 40 is down arrow
	if(!e) {
		//for IE
		e = window.event;
	}

	if(e.keyCode==37 && paddleLeft > 0){
        //keyCode 37 is left arrow
        paddleLeft -= 6;
        paddle.style.left = paddleLeft + 'px';
    }

    if(e.keyCode==39 && paddleLeft < 436){
		//keyCode 39 is right arrow
		paddleLeft += 6;
		paddle.style.left = paddleLeft + 'px';
   }		

}

function detectCollisions() {
	//just reflect the ball on a collision
	if(collisionX())
		dx = dx * -1;
	if(collisionY())
		dy = dy * -1;
}

	function collisionX() {
		//check left and right boundaries
		if(ballLeft < 4 || ballLeft > 480)
			return true;
		return false;
	}

	function collisionY() {
		//check if at top of playing area
		if(ballTop < 4)
			return true;

		//check to see if ball collided with paddle
		if(ballTop > 450) {
			if(ballLeft > paddleLeft && ballLeft < paddleLeft + 64)
				return true;
		}
		return false;
	}

function render() {
	moveBall();
	updateScore();
}

	function moveBall() {
		ballLeft += dx;
		ballTop += dy;
		ball.style.left = ballLeft + 'px';
		ball.style.top = ballTop + 'px';
	}

	function updateScore() {
		currentScore += 5;
		score.innerHTML = 'Score: ' + currentScore;
	}


function difficulty() {
	//as the game progresses, increase magnitude of the vertical speed
	if(currentScore % 1000 == 0) {
		if(dy > 0)
			dy += 1;
		else
			dy -= 1;
	}
}

function gameOver() {
	//end the game by clearing the timer and modifying the score label
	clearTimeout(timer);
	score.innerHTML += "         Game Over";
	score.style.backgroundColor = 'rgb(128, 0, 0)';


}

function restartGame() {
	//initial speeds
	dx = 6;
	dy = 6;
	currentScore = 0;

	//set initial conditions for ball and paddle
	paddleLeft = 228;
 	ballLeft = 200;
 	ballTop = 4;

	paddle.style.left = paddleLeft + 'px';
 	
	ball.style.left = ballLeft + 'px';
	ball.style.top = ballTop + 'px';

	//start game again
	start();


}

/*
//main loop
function start() {

	//game loop
	detectCollisions();
	render();
	difficulty();

	//end conditions
	if(ballTop < 470) {
		//ball is still inside canvas, keep playing
		timer = setTimeout('start()', 50);
	}
	else {
		gameOver();
	}
}
*/



