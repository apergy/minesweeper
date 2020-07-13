const { createMatrix } = require("../matrix");

describe("src/minesweeper/helpers/matrix", () => {
  describe("createMatrix", () => {
    const testCases = [
      { width: 16, height: 16 },
      { width: 32, height: 16 },
      { width: 16, height: 32 },
    ];

    testCases.forEach((testCase) => {
      it(`should return matrix with ${testCase.height} rows and ${testCase.width} columns`, () => {
        const matrix = createMatrix(testCase.height, testCase.width);
        expect(matrix).toHaveLength(testCase.height);
        expect(matrix[0]).toHaveLength(testCase.width);
      });
    });
  });
});
