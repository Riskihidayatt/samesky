import { getSkyPhase } from "./sky";

describe("getSkyPhase", () => {
  it.each([
    [5, "morning"],
    [9, "morning"],
    [14, "morning"],
    [15, "dusk"],
    [18, "dusk"],
    [19, "night"],
    [23, "night"],
    [0, "night"],
    [4, "night"],
  ])("hour %i -> %s", (hour, phase) => {
    expect(getSkyPhase(hour)).toBe(phase);
  });

  it("normalises out-of-range hours", () => {
    expect(getSkyPhase(29)).toBe("morning"); // 29 % 24 = 5
    expect(getSkyPhase(-1)).toBe("night"); // 23
  });
});
