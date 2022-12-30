export const CORRECT = "C";
export const ALMOST = "A";
export const INCORRECT = "I";

export type LetterScore = typeof CORRECT | typeof INCORRECT | typeof ALMOST;
export type GuessScore = LetterScore[];

const EMPTY = "";

export const scoreGuess = (guess: string, answer: string): GuessScore => {
  const answerLetters = answer.split("");
  const guessLetters = guess.split("");

  const score: GuessScore = [];

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      score[i] = CORRECT;
      answerLetters[i] = EMPTY;
      guessLetters[i] = EMPTY;
    }
  }

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === EMPTY) continue;

    const answerIdx = answerLetters.findIndex(
      (char) => char === guessLetters[i]
    );
    if (answerIdx > -1) {
      score[i] = ALMOST;
      answerLetters[answerIdx] = EMPTY;
    } else {
      score[i] = INCORRECT;
    }
  }

  return score;
};
