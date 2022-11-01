const livesBoxes = document.querySelectorAll(".lives");
const letterBoxes = document.querySelectorAll(".letters");
const letterButtons = document.querySelectorAll(".letter-button");
const wordToGuess = "ALADOS";
let lostLives = 0;

function fillLifeBox() {
  livesBoxes[lostLives].classList.add("bg-red-600");
  lostLives++;
}

function fillLetterButton(box) {
  box.classList.add("bg-cyan-600");
  box.classList.remove("hover:bg-cyan-50");
}

function getPositionsOfGuess(letter) {
  const array = wordToGuess.split("");
  const resultados = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === letter) resultados.push(i);
  }
  console.log(resultados);
  return resultados;
}

function applyGuess(letter, guessPositions) {
  if (guessPositions.length === 0) {
    fillLifeBox();
  }
  guessPositions.forEach(position => {
    letterBoxes[position].textContent = letter;
  });
}

letterButtons.forEach(box => {
  box.addEventListener("click", () => {
    fillLetterButton(box);
    applyGuess(box.textContent, getPositionsOfGuess(box.textContent));
  });
});
