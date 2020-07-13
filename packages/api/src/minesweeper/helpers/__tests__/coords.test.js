const { randomCoords } = require("../coords");

describe("src/minesweeper/helpers/coords", () => {
  describe("randomCoords", () => {
    const testCases = [
      { maxX: 16, maxY: 16 },
      { maxX: 32, maxY: 16 },
      { maxX: 16, maxY: 32 },
    ];

    testCases.forEach((testCase) => {
      it(`should return random coords within ${testCase.maxY} rows and ${testCase.maxX} columns`, () => {
        const [x, y] = randomCoords(testCase.maxX, testCase.maxY);
        expect(x <= testCase.maxX).toBeTruthy();
        expect(y <= testCase.maxY).toBeTruthy();
      });
    });
  });
});
