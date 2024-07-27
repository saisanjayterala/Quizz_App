const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let startTime;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");
const progressBarEl = document.getElementById("progress");
const questionCountEl = document.getElementById("question-count");
const timeTakenEl = document.getElementById("time-taken");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;

    choicesEl.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => selectChoice(i));
        choicesEl.appendChild(button);
    }

    updateProgress();
}

function selectChoice(choiceIndex) {
    const buttons = choicesEl.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    buttons[choiceIndex].classList.add("selected");
}

function submitAnswer() {
    const selectedButton = choicesEl.querySelector(".selected");
    if (!selectedButton) return;

    const selectedAnswer = Array.from(choicesEl.children).indexOf(selectedButton);
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
        choicesEl.children[correctAnswer].classList.add("correct");
    }

    submitBtn.disabled = true;
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
            submitBtn.disabled = false;
        } else {
            showResults();
        }
    }, 1500);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBarEl.style.width = `${progress}%`;
    questionCountEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function showResults() {
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = `${score} out of ${quizData.length}`;
    
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    timeTakenEl.textContent = `${minutes} minutes and ${seconds} seconds`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    startTime = new Date();
    quizEl.style.display = "block";
    resultsEl.style.display = "none";
    loadQuestion();
}

submitBtn.addEventListener("click", submitAnswer);
restartBtn.addEventListener("click", restartQuiz);

startTime = new Date();
loadQuestion();