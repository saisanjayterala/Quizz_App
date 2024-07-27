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
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");

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
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = `${score} out of ${quizData.length}`;
}

submitBtn.addEventListener("click", submitAnswer);

loadQuestion();