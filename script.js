const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France."
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is often called the Red Planet due to its reddish appearance."
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "The sum of 2 and 2 is 4, a basic mathematical fact."
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1,
        explanation: "The Mona Lisa was painted by Italian Renaissance artist Leonardo da Vinci."
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."
    },
    {
        question: "Which programming language is known for its use in web development?",
        choices: ["Java", "Python", "JavaScript", "C++"],
        correctAnswer: 2,
        explanation: "JavaScript is widely used for client-side scripting in web development."
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "High-Level Text Management Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language, used for creating web pages."
    },
    {
        question: "What is the time complexity of binary search?",
        choices: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: 1,
        explanation: "Binary search has a time complexity of O(log n), where n is the number of elements."
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let startTime;
let userAnswers = [];
let timer;

const welcomeScreenEl = document.getElementById("welcome-screen");
const startQuizBtn = document.getElementById("start-quiz");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");
const progressBarEl = document.getElementById("progress");
const questionCountEl = document.getElementById("question-count");
const timeTakenEl = document.getElementById("time-taken");
const restartBtn = document.getElementById("restart");
const reviewEl = document.getElementById("review");
const timerEl = document.getElementById("timer");
const explanationEl = document.getElementById("explanation");
const loaderEl = document.getElementById("loader");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showLoader() {
    loaderEl.style.display = "flex";
}

function hideLoader() {
    loaderEl.style.display = "none";
}

function initQuiz() {
    showLoader();
    setTimeout(() => {
        welcomeScreenEl.style.display = "none";
        quizEl.style.display = "block";
        currentQuestions = [...quizData];
        shuffleArray(currentQuestions);
        currentQuestions = currentQuestions.slice(0, 5); // Select 5 random questions
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        startTime = new Date();
        loadQuestion();
        hideLoader();
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    timerEl.textContent = "15";
    startTimer();

    const question = currentQuestions[currentQuestion];
    questionEl.textContent = question.question;

    choicesEl.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => selectChoice(i));
        if (userAnswers[currentQuestion] === i) {
            button.classList.add("selected");
        }
        choicesEl.appendChild(button);
    }

    updateProgress();
    updateNavigation();

    questionEl.classList.add("fade-in");
    choicesEl.classList.add("fade-in");
    setTimeout(() => {
        questionEl.classList.remove("fade-in");
        choicesEl.classList.remove("fade-in");
    }, 500);

    explanationEl.style.display = "none";
}

function startTimer() {
    let timeLeft = 15;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            selectChoice(-1);
            showExplanation();
        }
    }, 1000);
}

function selectChoice(choiceIndex) {
    clearInterval(timer);
    userAnswers[currentQuestion] = choiceIndex;
    const buttons = choicesEl.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
        buttons[i].disabled = true;
    }
    if (choiceIndex !== -1) {
        buttons[choiceIndex].classList.add("selected");
    }
    showExplanation();
}

function showExplanation() {
    const question = currentQuestions[currentQuestion];
    const userAnswer = userAnswers[currentQuestion];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
        score++;
    }

    explanationEl.innerHTML = `
        <p><strong>${isCorrect ? "Correct!" : "Incorrect!"}</strong></p>
        <p>${question.explanation}</p>
    `;
    explanationEl.style.display = "block";

    const buttons = choicesEl.getElementsByTagName("button");
    buttons[question.correctAnswer].classList.add("correct");
    if (!isCorrect && userAnswer !== -1) {
        buttons[userAnswer].classList.add("incorrect");
    }

    nextBtn.disabled = false;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
    questionCountEl.textContent = `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
}

function updateNavigation() {
    nextBtn.disabled = true;
    nextBtn.style.display = currentQuestion === currentQuestions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestion === currentQuestions.length - 1 ? "inline-block" : "none";
}

function goToNext() {
    currentQuestion++;
    if (currentQuestion < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = `${score} out of ${currentQuestions.length}`;
    
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    timeTakenEl.textContent = `${minutes} minutes and ${seconds} seconds`;

    reviewEl.innerHTML = "";
    for (let i = 0; i < currentQuestions.length; i++) {
        const question = currentQuestions[i];
        const userAnswer = userAnswers[i];
      const isCorrect = userAnswer === question.correctAnswer;
        
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        reviewItem.innerHTML = `
            <h3>Question ${i + 1}</h3>
            <p>${question.question}</p>
            <p>Your answer: ${userAnswer === -1 ? "No answer" : question.choices[userAnswer]}</p>
            <p>Correct answer: ${question.choices[question.correctAnswer]}</p>
            <p class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</p>
        `;
        reviewEl.appendChild(reviewItem);
    }

    // Trigger confetti effect for perfect score
    if (score === currentQuestions.length) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function restartQuiz() {
    resultsEl.style.display = "none";
    welcomeScreenEl.style.display = "block";
}

startQuizBtn.addEventListener("click", initQuiz);
nextBtn.addEventListener("click", goToNext);
submitBtn.addEventListener("click", showResults);
restartBtn.addEventListener("click", restartQuiz);

// Initial setup
welcomeScreenEl.style.display = "block";
quizEl.style.display = "none";
resultsEl.style.display = "none";