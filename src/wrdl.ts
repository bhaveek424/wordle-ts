export const scoreGuess = (guess: string, answer: string) => {
  const answerLetters = answer.split("");
  const guessLetters = guess.split("");

  const score = [];

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      score[i] = "C";
      answerLetters[i] = "";
      guessLetters[i] = "";
    }
  }

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === "") continue;

    if (answerLetters.includes(guessLetters[i])) {
      score[i] = "A";
      const answerIdx = answerLetters.findIndex(
        (char) => char === guessLetters[i]
      );
      answerLetters[answerIdx] = "";
    } else {
      score[i] = "I";
    }
  }

  return score;
};
