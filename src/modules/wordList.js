const wordList = ["ALADOS", "MACETA", "AMORES", "CABAÑA", "CABEZA", "FABADA", "IBERIA", "MACACO", "NACION"];

export function getWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
