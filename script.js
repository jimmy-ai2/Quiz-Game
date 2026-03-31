// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "What is not a part of a computer?",
    answers: [
      { text: "Keyboard", correct: false },
      { text: "Mouse", correct: false },
      { text: "Monitor", correct: false },
      { text: "Printer", correct: true },
    ],
  },
  {
    question: "What is the use of the caps lock key?",
    answers: [
      { text: "To make letters capital or small", correct: true },
      { text: "To make letters bold", correct: false },
      { text: "To delete letters", correct: false },
      { text: "To insert letters", correct: false },
    ],
  },
  {
    question: "What is the use of the backspace key?",
    answers: [
      { text: "To make letters capital or small", correct: false },
      { text: "To make letters bold", correct: false },
      { text: "To delete letters", correct: true },
      { text: "To insert letters", correct: false },
    ],
  },
  {
    question: "What is the use of the space key?",
    answers: [
      { text: "To make letters capital or small", correct: false },
      { text: "To put a space between letters", correct: true },
      { text: "To delete letters", correct: false },
      { text: "To insert letters", correct: false },
    ],
  },
  {
    question: "What is the use of the Enter key?",
    answers: [
      { text: "To make letters capital or small", correct: false },
      { text: "To put a space between letters", correct: false },
      { text: "To delete letters", correct: false },
      { text: "To go to the next line", correct: true },
    ],
  },
  {
    question: "What is the use of the Left-mouse button?",
    answers: [
      { text: "To select items", correct: true },
      { text: "To put a space between letters", correct: false },
      { text: "To delete letters", correct: false },
      { text: "To go to the next line", correct: false },
    ],
  },
  {
    question: "What is the use of the Right-mouse button?",
    answers: [
      { text: "To select items", correct: false },
      { text: "To put a space between letters", correct: false },
      { text: "To open the menu", correct: true },
      { text: "To go to the next line", correct: false },
    ],
  },
  {
    question: "Which mouse button is used to open the menu of extra options?",
    answers: [
      { text: "Left button", correct: false },
      { text: "Scroll wheel", correct: false },
      { text: "Right button", correct: true },
      { text: "Side button", correct: false },
    ],
  },
  {
    question:
      "What is the small arrow or blinking line on the screen that shows where you are pointing?",
    answers: [
      { text: "Target", correct: false },
      { text: "Pointer/Cursor", correct: true },
      { text: "Right button", correct: false },
      { text: "Icon", correct: false },
    ],
  },
  {
    question:
      "What key is used to put characters that are above the numbers on the keyboard?",
    answers: [
      { text: "Shift Key", correct: true },
      { text: "Caps Lock Key", correct: false },
      { text: "Backspace key", correct: false },
      { text: "SpaceBar", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDIsabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // Reset Vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // Reset state
  answersDIsabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = [(currentQuestionIndex / quizQuestions.length) * 100];
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // To determine the correct answer for each question
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDIsabled) return;

  answersDIsabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You know you're stuff";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good Effort! Keep learning";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
