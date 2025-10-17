const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<heading>"],
    answer: "<h1>"
  }
];

const questionText = document.querySelector("#question");
const optionsContainer = document.querySelector(".option-container");
const nextButton = document.querySelector("#next-btn");
const submitButton = document.querySelector("#submit-btn");
const startButton = document.querySelector("#start-btn");


let idx = 0, size = questions.length;

const startHandler = function(){

    // hide the StartButton
    startBtn.style.display='none';
    


}
startBtn.addEventListener('click',startHandler);




