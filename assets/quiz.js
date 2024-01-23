var timerDisplay = document.getElementById("timerDisplay");

// Variable to store the countdown time in seconds
let countdownTime = 300; // 5 minutes

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.textContent = formattedTime;
}

function startTimer() {
    countdownInterval = setInterval(function () {
      countdownTime--;
      updateTimerDisplay(); // Update the timer display
  
      if (countdownTime <= 0) { // Check if the countdown is finished
        clearInterval(countdownInterval);
        window.location.href = "./end.html";
      }
    }, 1000);
}
  
function stopTimer() {
    clearInterval(countdownInterval);
}

var currentScores = document.getElementById("currentScores");
let score = 0;

function scoresDisplay(){
    score += marks;
    currentScores.innerText = score;
}

var question = document.getElementById("question");
var choice = Array.from(document.getElementsByClassName("choiceContent"));
let currentQuestion = {};
let availableQuestion = [];
let hasAnswered = false;

//question set
let questions = [
    {
        question: "How do you write a comment in JavaScript?",
        choice1: "<!-- This is a comment -->",
        choice2: "# This is a comment",
        choice3: "// This is a comment",
        choice4: "/* This is a comment */",
        answer:3
    },
    {
        question: "What is the purpose of the querySelector method in JavaScript?",
        choice1: "To select the first element that matches a CSS selector",
        choice2: "To select elements by class name",
        choice3: "To select an element by its ID",
        choice4: "To select multiple elements",
        answer:1
    },
    {
        question: "What does the === operator do in JavaScript?",
        choice1: "Checks for equality without type conversion",
        choice2: "Checks for equality with type conversion",
        choice3: "Assigns a value to a variable",
        choice4: "Compares two values and ignores type",
        answer:1
    },
    {
        question: "Which of the following is used to execute a block of code repeatedly?",
        choice1: "switch statement",
        choice2: "while loop",
        choice3: "for loop",
        choice4: "if statement",
        answer:3
    },
    {
        question: "Which function is used to convert a string to a floating-point number in JavaScript?",
        choice1: "parseInt()",
        choice2: "parseFloat()",
        choice3: "toFixed()",
        choice4: "toNumber()",
        answer:2
    },
    {
        question: "What does the appendChild method do in JavaScript?",
        choice1: "Modifies the style of an element",
        choice2: "Appends a child element to a parent element",
        choice3: "Removes an element from the DOM",
        choice4: "Creates a new element",
        answer:2
    },
    {
        question: "Which event occurs when a user clicks on an HTML element in JavaScript?",
        choice1: "onChange",
        choice2: "onLoad",
        choice3: "onMouseOver",
        choice4: "onClick",
        answer:4
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        choice1: "procedure",
        choice2: "function",
        choice3: "define",
        choice4: "method",
        answer:2
    },
    {
        question: "What does the localStorage object in JavaScript do?",
        choice1: "Controls the visibility of elements on a web page",
        choice2: "Allows access to the browser's history",
        choice3: "Allows storage of key-value pairs in a web browser",
        choice4: "Provides methods for manipulating the browser's location",
        answer:3
    },
    {
        question: "Which of the following statements correctly declares an array in JavaScript?",
        choice1: "let array = [];",
        choice2: "let array = array();",
        choice3: "let array = new Array();",
        choice4: "let array = {};</code>",
        answer:1
    }
];

const marks = 5; // 5 mark for each correct answer
availableQuestion = [...questions];

// get the question from the dataset
function startQuiz(){
    getNewQuestion();
    updateTimerDisplay();
    startTimer();
    hasAnswered = false;  // flag to see if the question has been answered
};

// Function to check the answer and update classes
function checkAnswer(selectedChoice) {
    // Check if the user has already answered
    if (hasAnswered) {
        return;
    }
    stopTimer(); // Stop the timer when an answer is selected
    const selectedNumber = selectedChoice.dataset["number"];
    const isCorrect = selectedNumber == currentQuestion.answer;

    if (isCorrect) {
        selectedChoice.classList.add("correct");
        scoresDisplay();
    } else {
        countdownTime = Math.max(0, countdownTime - 60); // Subtract 60 seconds, but not below 0
        selectedChoice.classList.add("wrong");
        const correctChoiceNumber = currentQuestion.answer;
        const correctChoice = document.querySelector(`.choiceContent[data-number="${correctChoiceNumber}"]`);
        correctChoice.classList.add("correct");
    }

    // Set the flag to true, indicating that the user has answered
    hasAnswered = true;

}

// Function to reset choices and get a new question
function getNewQuestion() {
    if (availableQuestion.length === 0 || countdownTime <= 0) {
        window.location.href = "./end.html";
        localStorage.setItem("recentScore", score);
    }

    var questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    // Loop through choices and add event listeners
    choice.forEach(function (choiceElement) {
        const number = choiceElement.dataset["number"];
        choiceElement.innerText = currentQuestion["choice" + number];
        choiceElement.classList.remove("correct", "wrong"); // Remove previous classes
        choiceElement.addEventListener('click', function () {
            checkAnswer(choiceElement);
        });
    });

    // Splice out the used question
    availableQuestion.splice(questionIndex, 1);
}

// Event listener for the "Next" button
var nextButton = document.getElementById("next");
nextButton.addEventListener('click', function () {
 // Start a new quiz
    startQuiz();
});

startQuiz();