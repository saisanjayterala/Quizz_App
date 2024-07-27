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
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choices: ["Gold", "Silver", "Oxygen", "Iron"],
        correctAnswer: 2
    },
    {
        question: "In what year did World War II end?",
        choices: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correctAnswer: 2
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        question: "What is the currency of Brazil?",
        choices: ["Peso", "Dollar", "Euro", "Real"],
        correctAnswer: 3
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let startTime;
let userAnswers = [];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const prevBtn = document.getElementById("prev");
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initQuiz() {
    currentQuestions = [...quizData];
    shuffleArray(currentQuestions);
    currentQuestions = currentQuestions.slice(0, 5); // Select 5 random questions
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    startTime = new Date();
    loadQuestion();
}

function loadQuestion() {
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

    // Add fade-in animation
    questionEl.classList.add("fade-in");
    choicesEl.classList.add("fade-in");
    setTimeout(() => {
        questionEl.classList.remove("fade-in");
        choicesEl.classList.remove("fade-in");
    }, 500);
}

function selectChoice(choiceIndex) {
    userAnswers[currentQuestion] = choiceIndex;
    const buttons = choicesEl.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    buttons[choiceIndex].classList.add("selected");
    updateNavigation();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
    questionCountEl.textContent = `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
}

function updateNavigation() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === currentQuestions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestion === currentQuestions.length - 1 ? "inline-block" : "none";
}

function goToPrevious() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function goToNext() {
    if (currentQuestion < currentQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function submitQuiz() {
    score = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] === currentQuestions[i].correctAnswer) {
            score++;
        }
    }
    showResults();
}

function showResults() {
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
        reviewItem.innerHTML = `
            <p><strong>Question ${i + 1}:</strong> ${question.question}</p>
            <p>Your answer: ${question.choices[userAnswer]}</p>
            <p>Correct answer: ${question.choices[question.correctAnswer]}</p>
            <p style="color: ${isCorrect ? 'green' : 'red'}">
                ${isCorrect ? 'Correct' : 'Incorrect'}
            </p>
        `;
        reviewEl.appendChild(reviewItem);
    }

    // Trigger confetti effect
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
    quizEl.style.display = "block";
    initQuiz();
}

prevBtn.addEventListener("click", goToPrevious);
nextBtn.addEventListener("click", goToNext);
submitBtn.addEventListener("click", submitQuiz);
restartBtn.addEventListener("click", restartQuiz);

initQuiz();