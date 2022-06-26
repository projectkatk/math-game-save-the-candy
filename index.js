// Minimum requirements:
// An input for the user to type the answer.
// An element displaying the current math equation question.
// Equations uses "+" operator only.
// A count down for the time left.
// The game starts when the user clicks a button or starts typing in the input.
// The game ends when the user runs out of time.
// When the user makes a correct guess, add 1 second to the available time left.
// The current score is shown.
// A way to restart the game if time runs out.
// Multiple question types (+, -, *, /).
// Make sure (-) questions always have positive whole number answers.
// Make sure (/) questions always have positive whole number answers.
// Number limit for the user to set.
// High score indicator for the high score in the current session.

// candy top position: start from -40vh to 45vh;
$(document).ready(function () {
  var myCandy;
  var randomPositionX = Math.floor(Math.random() * 70) + 10;

  $(".lost").hide();
  $(".answer").hide();

  //function to generate a random number for the question
  var generateRandomNumber = function () {
    var injectNumber = 30;
    var numOne = Math.floor(Math.random() * injectNumber);
    var numTwo = Math.floor(Math.random() * injectNumber);
    var questionAnswerObj = {};
    myCandy = "candy" + Math.ceil(Math.random() * 15) + ".svg";
    questionAnswerObj.answer = numOne + numTwo;
    questionAnswerObj.question = `${numOne} + ${numTwo}`;
    $(".candy-control").attr("data-calc", questionAnswerObj.question);
    return questionAnswerObj;
  };

  var currentNumbersObj = generateRandomNumber();

  var generateNewQuestion = function () {
    currentNumbersObj = generateRandomNumber();
    $(".candy-control").attr("data-calc", currentNumbersObj.question);
  };

  var timeCounter = 10;
  var myInterval;
  var score = 0;

  if (timeCounter === 10) {
    $(".start").addClass("startIndicator");
  }

  // start the game - candy animation & time counting activated.
  var startTimer = function () {
    $(".lost").fadeOut();
    if (!myInterval) {
      moveCandy();
      countTimer();
    }
  };
  //clear the existing interval and reset the timer to 10
  var clearMyInterval = function (myInterval) {
    clearInterval(myInterval);
    myInterval = undefined;
    setTimeout(function () {
      updateTimer(10);
    }, 3000);
  };

  // timer counting function. minus 1 per second until timeCounter reaches 0
  var countTimer = function () {
    myInterval = setInterval(function () {
      updateTimer(-1);
      $(".start").fadeOut();
      $(".countdown").text(`${timeCounter} Sec left`);
      if (timeCounter === 0) {
        clearMyInterval(myInterval);
        doomsday();
      }
    }, 1000);
  };

  // floating candy while alive
  var moveCandy = function () {
    $(".candy-control").css({
      background: `url(img/${myCandy})`,
      "background-repeat": "no-repeat",
      left: `${randomPositionX}px`,
      top: "50px",
      animationName: "float",
      opacity: 1,
    });
  };

  // update timer either 1 or -1.
  var updateTimer = function (second) {
    timeCounter += second;
    $(".countdown").text(`${timeCounter} Sec left`);
  };

  // Display score and update on the screen. score increases by 1 per correct answer.
  var displayScore = function () {
    score = score + 1;
    $(".score span").text(score);
  };

  //What happens if you lose
  var doomsday = function () {
    $(".candy-control").css("top", "30vh");
    $(".candy-control").css("opacity", 0);
    $(".ground").addClass("animation-ground");
    $(".doomsday").addClass("doomsdayAppear");
    $(".flag").fadeOut();
    $(".lost").fadeIn();
    setTimeout(function () {
      score = 0;
      $(".start").fadeIn();
      $(".flag").fadeIn();
      $(".lost").fadeOut();
      $(".score span").text(score);
      $(".doomsday").removeClass("doomsdayAppear");
      $(".ground").removeClass("animation-ground");
      $(".countdown").text(`${timeCounter} Sec left`);
      $(".answer").hide();
    }, 3000);
  };

  //Check the answer and add 1 if the answer is correct
  var checkAnswer = function () {
    var userInput = parseInt($(".answer").val());
    var correctAnswer = currentNumbersObj.answer;
    if (userInput === correctAnswer) {
      updateTimer(1);
      $(".answer").val("");
      generateNewQuestion();
      displayScore();
    }
  };

  // change myInterval to undefined
  var myIntervalSet = function () {
    myInterval = undefined;
  };

  // update the time left if the answer if correct
  $(document).on("keyup", "input", function (e) {
    if (timeCounter < 10 && timeCounter > 0) {
      checkAnswer();
    }
  });

  // Start the game on button click
  $(".start").click(function (e) {
    e.preventDefault();
    $(".flag").hide();
    myIntervalSet();
    startTimer();
    $(".answer").show();
    myCandy = "candy" + Math.ceil(Math.random() * 15) + ".svg";
    if (myInterval) $(this).hide();
    else {
      $(this).show();
    }
  });
});
