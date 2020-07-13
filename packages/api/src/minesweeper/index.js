const uuid = require("uuid");
const { createMatrix } = require("./helpers/matrix");
const { MINE_VALUE, EMPTY_VALUE } = require("../config");
const { changeCellValue, countNearbyMines } = require("./helpers/cells");
const { getRandomNumMines, getRandomMineCoords } = require("./helpers/mines");

const createMinesweeper = (width, height) => {
  // 1. Generate the matrices
  const rawMatrix = createMatrix(width, height, EMPTY_VALUE);
  const visiblityMatrix = createMatrix(width, height, null);

  // 2. Add mines
  const numMines = getRandomNumMines(Math.max(width, height));
  const mineLocations = getRandomMineCoords(numMines, width, height);
  const rawMatrixWithMines = mineLocations.reduce((acc, [x, y]) => {
    return changeCellValue(acc, x, y, MINE_VALUE);
  }, rawMatrix);

  // 3. Apply numbers to empty cells
  const rawMatrixWithMinesAndCells = rawMatrixWithMines.map((row, i) => {
    return row.map((column, j) => {
      if (column === MINE_VALUE) return column;
      return countNearbyMines(rawMatrixWithMines, i, j);
    });
  });

  return {
    id: uuid.v4(),
    raw: rawMatrixWithMinesAndCells,
    moves: visiblityMatrix,
    status: "IN_PROGRESS",
  };
};

module.exports = {
  createMinesweeper,
};
