/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //paddle variables for position and speed
  var paddleLeft = Object(0, 0, 20, 150, "#paddleLeft");
  var paddleRight = Object(0, 0, 620, 150, "#paddleRight");
  var ball = Object(1, 1, 315, 205, "#ball");
  var board = Object(0, 0, 0, 0, "#board");
  var ballStartSpeed = Math.ceil(Math.random() * 4);
  var score1 = Object(0, 0, 445, 0, "#score1");
  score1.score = 0;
  var score2 = Object(0, 0, 445, 640, "#score2");
  score2.score = 0;

   // var leftPositionY = 0;
    //var rightPositionY = 0;
    //var leftSpeedY = 0;
    //var rightSpeedY = 0;

  //movement Keys
var KEY = {
  "ENTER": 13,
  "DOWN": 83,
  "UP": 87,
  "LEFT": 65,
  "RIGHT": 68,
  "arrowDown" : 40,
  "arrowUp" : 38
}
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
$(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
$(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    ballBoardCollide();
    ballPaddleLeftCollide();
    ballPaddleRightCollide();
    repositionPaddleRight();
    repositionPaddleLeft();
    redrawPaddleLeft();
    redrawPaddleRight();
    redrawBall();
    repositionBall();
    endGame();
  }
  
  /* 
  Called in response to events.
  */
 //When the keys are pressed down this is what happens
    function handleKeyDown(event) {
        if(event.which === KEY.arrowUp){
            paddleRight.speedY = -5;
        }
        else if(event.which === KEY.arrowDown){
            paddleRight.speedY = 5;
        }
        else if(event.which === KEY.DOWN){
            paddleLeft.speedY = 5;
        }
        else if(event.which === KEY.UP){
            paddleLeft.speedY = -5;
        }
  }
  //when the keys are lifted up this causes the paddles to stop
    function handleKeyUp(event){
        if(event.which === KEY.arrowUp){
            paddleRight.speedY = 0;
        }
        else if(event.which === KEY.arrowDown){
            paddleRight.speedY = 0;
        }
        else if(event.which === KEY.DOWN){
            paddleLeft.speedY = 0;
        }
        else if(event.which === KEY.UP){
            paddleLeft.speedY = 0;
        }
 
    
    /*function doCollide(paddleLeft, board){
        if(paddleLeft.y < board && square1.rightX > square2.leftX && square1.topY < square2.bottomY && square1.bottomY > square2.topY){
    }*/

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //reposition the coordinates of the paddles
  function repositionPaddleRight(){
      if(paddleRight.y < board.y){
          paddleRight.y -= paddleRight.speedY -1;
      }
      else if(paddleRight.y > (board.y + 340)){
        paddleRight.y -= paddleRight.speedY + 1;
      }
      else{
        paddleRight.y += paddleRight.speedY;
      }
    }
      
  
    function repositionPaddleLeft(){
    board.bottomY = board.y + 340;
    if(paddleLeft.y < board.y){
          paddleLeft.y -= paddleLeft.speedY -1;
      }
      else if(paddleLeft.y > board.bottomY){
        paddleLeft.y -= paddleLeft.speedY + 1;
      }
      else{
        paddleLeft.y += paddleLeft.speedY;
      }
    }
  function repositionBall(){
          ball.x += ball.speedX;
          ball.y += ball.speedY;
      }
    function ballStart(){
        ball.x = 210
        ball.y = 200
        ball.speedX = ballSpeedCalc(2); //Math.ceil(Math.random() * ballStartSpeed) - Math.ceil(Math.random() * 5);
        ball.speedY = ballSpeedCalc(2); //ballStartSpeed - Math.ceil(Math.random() * ballStartSpeed + 1);
    }

    
    function ballBoardCollide(){
        ball.bottomY = ball.y + 30;
        ball.rightX = ball.x + 30;
        board.bottomY = board.y + 440;
        board.rightX = board.x + 660;
        if(ball.bottomY > board.bottomY){
            ball.speedY = -ball.speedY;
        }
        else if(ball.y < board.y){
            ball.speedY = -ball.speedY;
        }
        else if (ball.rightX > board.rightX){
            ballStart();
            score1.score += 1;
        }
        else if (ball.x < board.x){
            ballStart();
            score2.score += 1;
        }
    }
    function ballPaddleRightCollide(){
        paddleRight.bottomY = paddleRight.y + 100;
        paddleRight.rightX = paddleRight.x + 20;
        ball.bottomY = ball.y + 30;
        ball.rightX = ball.x + 30;
        //square1.leftX < square2.rightX && square1.rightX > square2.leftX && square1.topY < square2.bottomY && square1.bottomY > square2.topY
        if(ball.bottomY > paddleRight.y && ball.y < paddleRight.bottomY && ball.rightX > paddleRight.x && ball.x < paddleRight.rightX){
            ball.speedY = ball.speedY * 1.2;
            ball.speedX = -ball.speedX * 1.1;
        }
    }
    function ballSpeedCalc(ballSpeed){
        var ballRandomSpeed = Math.ceil(Math.random() * ballSpeed);
        if(ballRandomSpeed > ballSpeed * 0.5){
            ballRandomSpeed = ballRandomSpeed;
        }else{
        ballRandomSpeed = -ballRandomSpeed;
        }
        return ballRandomSpeed;
    }
    function ballPaddleLeftCollide(){
        paddleLeft.bottomY = paddleLeft.y + 100;
        paddleLeft.rightX = paddleLeft.x + 20;
        ball.bottomY = ball.y + 30;
        ball.rightX = ball.x + 30;
        if(ball.bottomY > paddleLeft.y && ball.y < paddleLeft.bottomY && ball.rightX > paddleLeft.x && ball.x < paddleLeft.rightX){
            ball.speedY = ball.speedY * 1.2;
            ball.speedX = -ball.speedX * 1.1;
        }
    }
  //redraws the paddles onscreen
  function redrawPaddleRight(){
      $("#paddleRight").css("top", paddleRight.y);
  }
  function redrawPaddleLeft(){
     $("#paddleLeft").css("top", paddleLeft.y);
  }
  function redrawBall(){
     $("#ball").css("top", ball.y);
     $("#ball").css("left", ball.x);
  }
  //factory function for paddles
  function Object(speedY, speedX, x, y, id){
      var paddle = {};
      paddle.speedY = speedY
      paddle.speedX = speedX
      paddle.x = x
      paddle.y = y
      paddle.id = id
      return paddle;
  }
  function endGame() {
    if(score1.score > 7 || score2.score > 7){
    // stop the interval timer
    clearInterval(interval);
    if(score1.score > 7){
        alert("player 1 wins!");
    }
    else{
        alert("player 2 wins!");
    }

    // turn off event handlers
    $(document).off();
     }
    }   
}  
