import formatData from "./helper.js";

const loder = document.getElementById("loder");
const error = document.getElementById("error");
const container = document.getElementById("container");
const questionText = document.getElementById("qestion-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formatedData = formatData(json.results);
    start();
    console.log(formatedData);
  } catch {
    loder.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loder.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } = formatedData[questionIndex];
  questionText.innerText = question;
  answerList.forEach((button, index) => (button.innerText = answers[index]));
  correctAnswer = correctAnswerIndex;
};

const checkAnswer = (index, event) => {
  if (!isAccepted) return;
  isAccepted = false;
  if (correctAnswer === index) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(index, event));
});
