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
});
