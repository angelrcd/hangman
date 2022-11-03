import { getWord } from "./modules/wordList.js";

const livesBoxes = document.querySelectorAll(".lives");
const letterBoxes = document.querySelectorAll(".letters");
const letterButtons = document.querySelectorAll(".letter-button");
const resetButton = document.querySelector("#reload");
const endMessage = document.querySelector("#endMessage");
let wordToGuess = getWord();

let lostLives = 0;

function fillLifeBox() {
  livesBoxes[lostLives].classList.add("bg-red-600");
  lostLives++;
}

function reset() {
  wordToGuess = getWord();
  lostLives = 0;
  endMessage.textContent = "";
  endMessage.classList.remove("text-red-500");
  endMessage.classList.remove("text-green-500");
  livesBoxes.forEach(box => {
    box.classList.remove("bg-red-600");
  });
  letterBoxes.forEach(box => {
    box.textContent = "";
  });
  letterButtons.forEach(box => {
    box.classList.remove("bg-cyan-600");
    box.classList.add("hover:bg-cyan-50");
  });
  letterButtons.forEach(button => {
    button.disabled = false;
  });
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

function fillWord() {
  const array = wordToGuess.split("");
  for (let i = 0; i < array.length; i++) {
    letterBoxes[i].textContent = array[i];
  }
}

function checkLose() {
  if (lostLives === 6) {
    letterButtons.forEach(button => {
      button.disabled = true;
    });
    endMessage.classList.add("text-red-500");
    endMessage.textContent = "HAS PERDIDO";
    fillWord();
  }
}

function checkWin() {
  let resultado = true;
  letterBoxes.forEach(box => {
    if (box.textContent === "") {
      resultado = false;
    };
  });
  return resultado;
}

function setWinMessage() {
  endMessage.classList.add("text-green-500");
  endMessage.textContent = "HAS GANADO";
  letterButtons.forEach(button => {
    button.disabled = true;
  });
}

letterButtons.forEach(box => {
  box.addEventListener("click", () => {
    box.disabled = true;
    fillLetterButton(box);
    applyGuess(box.textContent, getPositionsOfGuess(box.textContent));
    if (checkWin()) {
      setWinMessage();
    }
    checkLose();
  });
});

resetButton.addEventListener("click", () => {
  reset();
});
