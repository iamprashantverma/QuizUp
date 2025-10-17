const questions = [
  {
    question: "If you could have one superpower, what would it be?",
    options: ["Flying", "Invisibility", "Time Travel", "Mind Reading"],
    answer: "Flying" 
    },
  {
    question: "Which activity do you enjoy the most on weekends?",
    options: ["Watching movies", "Playing sports", "Coding", "Sleeping"],
    answer: "Coding"
  },
  {
    question: "What type of music do you vibe with the most?",
    options: ["Pop", "Lo-Fi", "Rock", "Classical"],
    answer: "Lo-Fi"
  },
  {
    question: "If you could visit one place in the world, where would it be?",
    options: ["Japan", "Switzerland", "USA", "Maldives"],
    answer: "Japan"
  },
  {
    question: "Which of these do you enjoy doing the most?",
    options: ["Reading books", "Gaming", "Traveling", "Cooking"],
    answer: "Traveling"
  },
  {
    question: "What’s your favorite way to relax after a long day?",
    options: ["Listening to music", "Going for a walk", "Watching shows", "Sleeping early"],
    answer: "Listening to music"
  },
  {
    question: "If you had to choose a pet, what would it be?",
    options: ["Dog", "Cat", "Bird", "Rabbit"],
    answer: "Dog"
  },
  {
    question: "Which genre of movies do you like the most?",
    options: ["Action", "Comedy", "Romance", "Sci-Fi"],
    answer: "Action"
  },
  {
    question: "What motivates you the most?",
    options: ["Success", "Passion", "Money", "Family"],
    answer: "Passion"
  },
  {
    question: "What’s your dream profession?",
    options: ["Entrepreneur", "Software Developer", "Artist", "Scientist"],
    answer: "Software Developer"
  }
];


const questionText = document.querySelector("#question");
const optionsContainer = document.querySelector(".option-container");
const startButton = document.querySelector("#start-btn");
const result = document.querySelector("#result");
const timerDisplay = document.querySelector("#timer");

const timePerQuestions = 15;
let currentTime;
let timer;
let isOptionSelected = false;  
let score = 0;                 
let currentQuestionIndex = 0;   
const totalQuestions = questions.length;

let audioContext;
let masterGain;

function initAudio() {
    if (audioContext) return;
    const Ctx = window.AudioContext;
    audioContext = new Ctx();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.4; 
    masterGain.connect(audioContext.destination);
}

function playBeep({ frequency = 800, durationMs = 120, type = 'sine', volume = 0.6 }) {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = 0;
    oscillator.connect(gain);
    gain.connect(masterGain);
    const now = audioContext.currentTime;
    // quick attack/decay envelope
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.0, now + durationMs / 1000);
    oscillator.start(now);
    oscillator.stop(now + durationMs / 1000 + 0.01);
}

function playTick() {
    // soft tick
    playBeep({ frequency: 900, durationMs: 60, type: 'square', volume: 0.15 });
}

function playCorrect() {
    // pleasant up-chirp
    playBeep({ frequency: 660, durationMs: 90, type: 'sine', volume: 0.35 });
    setTimeout(() => playBeep({ frequency: 880, durationMs: 120, type: 'sine', volume: 0.35 }), 80);
}

function playWrong() {
    // short buzzer
    playBeep({ frequency: 220, durationMs: 160, type: 'sawtooth', volume: 0.25 });
}

function playMissed() {
    // descending soft tone to indicate missed
    playBeep({ frequency: 500, durationMs: 120, type: 'triangle', volume: 0.22 });
    setTimeout(() => playBeep({ frequency: 380, durationMs: 160, type: 'triangle', volume: 0.22 }), 90);
}

function hideTimer() {
    timerDisplay.style.display = 'none';
}

function showTimer() {
    timerDisplay.style.display = 'grid';
}

function startTimer(){
    if (timer) clearInterval(timer);
    currentTime = timePerQuestions;
    showTimer();
    timerDisplay.innerText = `Time : ${currentTime}s`;
    timer = setInterval(()=>{
        currentTime--;
        timerDisplay.innerText = `Time : ${currentTime}s`;
        playTick();
        if (currentTime <= 0 ){
            clearInterval(timer);
            timer = null;
            if (!isOptionSelected) {
                playMissed();
            }
            nextQuestion();
        }
    },1000);
}

function startQuiz() {
    initAudio();
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    score = 0;
    currentQuestionIndex = 0;
    isOptionSelected = false;
    startButton.style.display = 'none';
    result.style.display = 'none';
    hideTimer();
    displayQuestion();
}

function displayQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    questionText.style.display = 'block';
    questionText.innerText = currentQuestion.question;

    optionsContainer.style.display = "grid";
    optionsContainer.innerHTML = ""; 

    currentQuestion.options.forEach(optionText => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = optionText;
        button.classList.add("option-btn");

        // Use separate function for click
        button.addEventListener("click", () => handleOptionClick(button, optionText, currentQuestion));

        li.appendChild(button);
        optionsContainer.appendChild(li);
    });

    startTimer();
}

function handleOptionClick(button, optionText, currentQuestion) {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    isOptionSelected = true;

    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('is-correct', 'is-wrong');
    });

    if (optionText === currentQuestion.answer) {
        score++;
        button.classList.add('is-correct');
        playCorrect();
    } else {
        button.classList.add('is-wrong');
        playWrong();
    }

    setTimeout(() => {
        if (currentQuestionIndex == totalQuestions - 1) {
            displayResult();
        } else {
            nextQuestion();
        }
    }, 500); 
}

function nextQuestion() {
    isOptionSelected = false;
    currentQuestionIndex++;
    if (currentQuestionIndex >= totalQuestions) {
        displayResult();
        return;
    }
    displayQuestion();
}

function displayResult() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    hideTimer();
    // end sound
    playBeep({ frequency: 740, durationMs: 120, type: 'sine', volume: 0.32 });
    setTimeout(() => playBeep({ frequency: 988, durationMs: 160, type: 'sine', volume: 0.32 }), 110);
    setTimeout(() => playBeep({ frequency: 1319, durationMs: 220, type: 'sine', volume: 0.28 }), 230);
    result.style.display = "block";
    result.innerText = `Your Score is ${score} out of ${totalQuestions}`;
    questionText.style.display ='none';
    optionsContainer.style.display = 'none';
    startButton.style.display='block';
    startButton.innerText =" Restart quiz!";
}

startButton.addEventListener('click', startQuiz);


