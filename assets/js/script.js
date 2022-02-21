// variables and questions array
var currentQuestionIndex = 0;
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "alerts", "booleans", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statment is enclosed within _____.",
    choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "What javascipt method can we use to select an html element?",
    choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
    answer: "Both 1 and 3"
  }
];
var time = questions.length * 25;
var timerId;

// variables to reference DOM elements....................................
var timeEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-btn");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#quiz-container");
var quizScreen = document.querySelector("#question-section");
var highscoreScreen = document.querySelector("#highscore-section");
var highscoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#answer-buttons");


//create a function to start the game
function startQuiz() {
  // hide start screen
  titleScreen.setAttribute("class", "hide");

  // un-hide questions section
  quizScreen.setAttribute("class", "show");

  // start timer
  timerId = setInterval(countdown, 1000);

  // show starting time
  timeEl.textContent = time;

  getQuestion();
}

//create a second taken off of a clock
function countdown() {
  // update time
  time--;
  timeEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("quiz-container");
  titleEl.textContent = currentQuestion.title;

  // clear out previous question answers
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var multiples = document.createElement("button");
    multiples.setAttribute("class", "choice");
    multiples.setAttribute("value", choice);

    multiples.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    multiples.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(multiples);
  });
}

// click on question answer either generate new question or end quiz if final question, and deduct time for answering wrong
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtract time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timeEl.textContent = time;


    feedbackEl.textContent = "Wrong!";
  } else {

    feedbackEl.textContent = "Correct!";
  }

  // show right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


// end the quiz function
function quizEnd() {
  // stop timer
  clearInterval(timerId);
  
  // hide questions section
  quizScreen.setAttribute("class", "hide");

  // show end screen
  var highscoreSectionEl = document.querySelector("#highscore-section");
  highscoreSectionEl.setAttribute("class", "show");

  // show final score
  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = time;

}

// save highscore
function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // verify value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // highscore page
    window.location.href = "highscore.html";
  }
}

function save(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}