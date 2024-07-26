const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");

let score = 0;

function submitAnswer() {
    score++;
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = score;
}

submitBtn.addEventListener("click", submitAnswer);