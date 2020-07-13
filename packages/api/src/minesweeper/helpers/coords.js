const randomCoords = (maxX, maxY) => {
  const x = Math.floor(maxX * Math.random());
  const y = Math.floor(maxY * Math.random());
  return [x, y];
};

const uniqueCoords = coords => {
  const serialized = coords.map(c => c.join(","));
  const uniqueSet = [...new Set([...serialized]).values()];
  return uniqueSet.map(c => c.split(",").map(Number));
};

module.exports = {
  randomCoords,
  uniqueCoords
};
