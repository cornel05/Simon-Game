// Function to update the title based on screen size
function updateTitleForSmallScreens() {
  if (window.outerWidth <= 768) { // Tablets and phones
    $("h1").text("Tap anywhere to start");
  } else {
    $("h1").text("Press A Key to Start");
  }
}

// Call the function on load and resize
$(document).ready(updateTitleForSmallScreens);
$(window).on("resize", updateTitleForSmallScreens);

// Game variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game on touchstart or keypress
$(document).on("touchstart keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Button click or touch handler
$(".btn").on("touchend click", function(event) {
  event.preventDefault(); // Prevent default behavior
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Check user answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If user sequence matches game pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    // If user sequence is wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => $("body").removeClass("game-over"), 200);
    startOver();
  }
}

// Generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
