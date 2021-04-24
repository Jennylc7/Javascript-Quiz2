// variables to keep track of quiz state

//variable to begin quiz at the first element in the Javascript array
var currentQuestionIndex = 0;

//variable to run through the entire length of the questions array,
var time = questions.length * 10;


//timer id, linked to the timer function.  HTML link-<div class="timer">Time: <span id="time">0</span></div>
var timerId;

// variables to reference DOM elements 
//Links to the Questions array.  HTML link-<div id="questions" class="hide">
var questionsEl = document.getElementById("questions");

//timer element displays time
var timerEl = document.getElementById("time");

//element to choose answer from list of possible answers
var selectionEl = document.getElementById("choices");

//button to submit answer choice.  linked to HTML-<button id="submit">Submit</button>
var submitBtn = document.getElementById("submit");

//button to start the Jasvascript questions from the Questions array.  Linked to HTML-<button id="start">Start Quiz</button>
var startBtn = document.getElementById("start");

//element to prompt the user for initials.  Linked to HTML-<input type="text" id="initials" max="3" />
var initialsEl = document.getElementById("initials");

//submits user feedback and enters in data
var feedbackEl = document.getElementById("feedback");



function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // reveal questions section
  questionsEl.removeAttribute("class");

  // starts quiz timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  //after time starts, get question function starts.
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  selectionEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");

    //selects answer choice
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    //index plus first choice 
    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    selectionEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // given time, 10 seconds to answer the question
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

   
    //feedback for the user after answering the question
    feedbackEl.textContent = "You'll get it next time!";
  } else {
  

    feedbackEl.textContent = "Correcto!";
  }

  // correct or incorrect feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // continues to the next question
  currentQuestionIndex++;

  // checks the entire length of the questions array 
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stops the timer
  clearInterval(timerId);

  // shows the end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // shows the final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hides the questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // updates the time
  time--;
  timerEl.textContent = time;

  // checks to see if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // saved highscores from localstorage, if there are no high scores, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Score resets for a new user
    var newScore = {
      score: time,
      initials: initials
    };

    // saves highscores to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirects to high scores page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit button to save initials
submitBtn.onclick = saveHighscore;

// start button to begin Javascript questions array
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
