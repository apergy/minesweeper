const { MINE_VALUE } = require("../../config");

const changeCellValue = (matrix, x, y, newValue) => {
  return matrix.map((row, i) => {
    return row.map((column, j) => {
      if (i === x && j === y) {
        return newValue;
      }
      return column;
    });
  });
};

const getCellValue = (matrix, x, y) => {
  if (matrix && matrix[x]) {
    const value = matrix[x][y];
    if (value !== void 0) return value;
  }
  return null;
};

const getCellNeighbours = (matrix, x, y) => {
  const topLeft = getCellValue(matrix, x - 1, y - 1);
  const top = getCellValue(matrix, x, y - 1);
  const topRight = getCellValue(matrix, x + 1, y - 1);
  const left = getCellValue(matrix, x - 1, y);
  const right = getCellValue(matrix, x + 1, y);
  const bottomLeft = getCellValue(matrix, x - 1, y + 1);
  const bottom = getCellValue(matrix, x, y + 1);
  const bottomRight = getCellValue(matrix, x + 1, y + 1);

  return [
    [topLeft, top, topRight],
    [left, null, right],
    [bottomLeft, bottom, bottomRight]
  ];
};

const countNearbyMines = (matrix, x, y) => {
  return getCellNeighbours(matrix, x, y).reduce((acc, values) => {
    return acc + values.filter(v => v === MINE_VALUE).length;
  }, 0);
};

module.exports = {
  changeCellValue,
  getCellValue,
  getCellNeighbours,
  countNearbyMines
};
