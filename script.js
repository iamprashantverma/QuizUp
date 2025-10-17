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
const startButton = document.querySelector("#start-btn");
const result = document.querySelector("#result");

let isOptionSelected = false;  
let score = 0;                 
let currentQuestionIndex = 0;   
const totalQuestions = questions.length;


function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    isOptionSelected = false;
    startButton.style.display = 'none';
    result.style.display = 'none';
    displayQuestion();

}

function displayQuestion() {

    const currentQuestion = questions[currentQuestionIndex];

    questionText.style.display = 'block';
    questionText.innerText = currentQuestion.question;

    optionsContainer.style.display = "block";
    optionsContainer.innerHTML = ""; 

    currentQuestion.options.forEach(optionText => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = optionText;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            isOptionSelected = true;
            if (optionText === currentQuestion.answer) {
                score++;
            }
            if (currentQuestionIndex == totalQuestions - 1) {
                // user successfully attempted all questions show the result
                displayResult();
                return;
            }
                nextQuestion();
            // Optional: visually mark selection
        });

        li.appendChild(button);
        optionsContainer.appendChild(li);
    });

}

function nextQuestion() {
    isOptionSelected = false;
    currentQuestionIndex++;
    displayQuestion();
}

function displayResult() {
    result.style.display = "block";
    result.innerText = `Your Score is ${score} out of ${totalQuestions}`;
    questionText.style.display ='none';
    optionsContainer.style.display = 'none';
    startButton.style.display='block';
    startButton.innerText =" Restart quiz!"
}

startButton.addEventListener('click', startQuiz);


