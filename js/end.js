const scorEle = document.querySelector("p");
const score = JSON.parse(localStorage.getItem("score"));
const buttonSave = document.querySelector("button");
const userInput = document.querySelector("input");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
scorEle.innerText = score;

const saveHandler = () => {
  if (userInput.value && score) {
    const finalScore = { name: userInput.value, score };
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("./scores.html");
  } else {
    alert("Invalid Username or score");
  }
};

buttonSave.addEventListener("click", saveHandler);
