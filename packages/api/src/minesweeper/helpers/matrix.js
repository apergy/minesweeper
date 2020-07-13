const createMatrix = (rows, columns, value) => {
  return new Array(rows).fill(null).map(() => {
    return new Array(columns).fill(value);
  });
};

module.exports = {
  createMatrix
};
