import * as Wrdl from "./wrdl";

describe("scoreGuess", () => {
  it("identifies correct letters", () => {
    expect(Wrdl.scoreGuess("a", "a")).toEqual(["C"]);
  });

  it("identifies incorrect letters", () => {
    expect(Wrdl.scoreGuess("b", "a")).toEqual(["I"]);
  });

  it("identifies almost letters", () => {
    expect(Wrdl.scoreGuess("bx", "ab")).toEqual(["A", "I"]);
  });

  it("matches letters only once", () => {
    expect(Wrdl.scoreGuess("cczy", "abcd")).toEqual(["A", "I", "I", "I"]);
  });

  it("matches correct letters first", () => {
    expect(Wrdl.scoreGuess("zdyd", "abcd")).toEqual(["I", "I", "I", "C"]);
  });

  // it each block
  it.each([
    // guess, answer, result
    // no dupe in answer, dupe in guess
    ["xyzz", "abcd", "IIII"],
    ["cczy", "abcd", "AIII"],
    ["aazy", "abcd", "CIII"],
    ["zdyd", "abcd", "IIIC"],

    //  dupe in answer, dupe in guess
    ["zzyz", "abcb", "IIII"],
    ["bzby", "abcb", "AIAI"],
    ["zbby", "abcb", "ICAI"],
    ["zybb", "abcb", "IIAC"],
    ["zbyb", "abcb", "ICIC"],

    // dupe in answer, no dupe in guess
    ["zbxy", "abcb", "ICII"],
    ["bzyx", "abcb", "AIII"],
  ])("guess: %s, answer: %s, result: %s", (guess, answer, result) => {
    expect(Wrdl.scoreGuess(guess, answer)).toEqual(result.split(""));
  });
});

/*
 answer, guess - result 
 no dupe in answer, dupe in guess
 abcd, xyzz - IIII
 abcd, cczy - AIII
 abcd, aazy - CIII
 abcd, zdyd - IIIC

 dupe in answer, dupe in guess
 abcb, zzyz - IIII
 abcb, bzby - AIAI
 abcb, zbby - ICAI
 abcb, zybb - IIAC
 abcb, zbyb - ICIC

 dupe in answer, no dupe in guess
 abcb, zbxb - ICII
 abcb, bzbx - AIII
 */

describe("validateGuess", () => {
  let game: Wrdl.Game;

  beforeEach(() => {
    const dictionary = ["aaaa", "aabb", "bbaa", "bbbb", "bbba", "aaab"];
    const answer = "aaab";
    game = Wrdl.createGame(dictionary, answer, false);
  });

  it("accepts words that ARE in the dictionary", () => {
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(true);
  });

  it("reject words that ARE NOT in the dictionary", () => {
    expect(Wrdl.validateGuess("cccc", game)).toEqual(false);
  });

  it("reject words that have already been guessed", () => {
    game = Wrdl.makeGuess("aaaa", game);
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(false);
  });

  it("accepts words that do not use CORRECT in EASY mode", () => {
    game = Wrdl.makeGuess("aabb", game);
    expect(Wrdl.validateGuess("bbaa", game)).toEqual(true);
  });

  it("reject words that donot use CORRECT leters in HARD mode", () => {
    game = Wrdl.makeGuess("aabb", game);
    game.hardMode = true;
    expect(Wrdl.validateGuess("bbaa", game)).toEqual(false);
  });

  it("reject words that donot use ALMOST leters in HARD mode", () => {
    game = Wrdl.makeGuess("bbba", game);
    game.hardMode = true;
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(false);
  });
});
