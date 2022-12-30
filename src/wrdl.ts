export const scoreGuess = (guess: string, answer: string) => {
  const score = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      score[i] = "C";
    } else if (answer.includes(guess[i])) {
      score[i] = "A";
    } else {
      score[i] = "I";
    }
  }

  return score;
};
