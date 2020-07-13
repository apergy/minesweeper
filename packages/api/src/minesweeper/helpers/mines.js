const { uniqueCoords, randomCoords } = require("./coords");

const getRandomNumMines = size => {
  return Math.floor(size * 2 * Math.max(1 / 3, Math.random()));
};

const getRandomMineCoords = (num, maxX, maxY) => {
  const mines = uniqueCoords(
    new Array(num).fill(null).map(() => randomCoords(maxX, maxY))
  );

  if (mines.length === num) return mines;
  return getRandomMineCoords(num, maxX, maxY);
};

module.exports = {
  getRandomNumMines,
  getRandomMineCoords
};
