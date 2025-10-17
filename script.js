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
    startButton.style.display='none';

    // display the first question on screen
    questionText.style.display = 'block';
    
    const qObj = questions[idx];
    questionText.innerText = qObj.question;

    // display the option container
    optionsContainer.style.display = "block";

    for (let i = 0; i < 4; i++) {
        let optionText = qObj.options[i];
        let li = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = optionText;

        // button.classList.add("option-btn");
        li.appendChild(button);
        optionsContainer.appendChild(li);
    }
    
    // enable the next button
    nextButton.style.display = 'block';

}

startButton.addEventListener('click',startHandler);




