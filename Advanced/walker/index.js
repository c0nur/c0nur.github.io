/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
    var positionX = 0;
    var speedX = 0;
    var positionY = 0;
    var speedY = 0;
  //Initialization
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // WASD keys for inputing movement
  var KEY = {
  "ENTER": 13,
  "DOWN": 83,
  "UP": 87,
  "LEFT": 65,
  "RIGHT": 68
}
  
  // Game Item Objects
  // initial position for object


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
 //core logic
  function newFrame() {
    repositionGameItem();
    redrawGameItem();


  }
  
  /* 
  Called in response to events.
  */
 // consoles when movement keys are pressed
  function handleKeyDown(event) {
        if(event.which === KEY.LEFT){
            speedX = -5;
        }
        else if(event.which === KEY.RIGHT){
            speedX = 5;
        }
        else if(event.which === KEY.DOWN){
            speedY = 5;
        }
        else if(event.which === KEY.UP){
            speedY = -5;
        }
  }
    function handleKeyUp(event){
        if(event.which === KEY.LEFT){
            speedX = 0;
        }
        else if(event.which === KEY.RIGHT){
            speedX = 0;
        }
        else if(event.which === KEY.DOWN){
            speedY = 0;
        }
        else if(event.which === KEY.UP){
            speedY = 0;
        }
    

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }
  function redrawGameItem(){
     $("#gameItem").css("left", positionX);
     $("#gameItem").css("top", positionY); 
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
