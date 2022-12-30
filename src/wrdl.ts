export const scoreGuess = (guess: string, answer: string) => {
  return guess === answer ? ["C"] : ["I"];
};
