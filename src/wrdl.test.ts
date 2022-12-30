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
