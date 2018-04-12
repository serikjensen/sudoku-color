export function setTile (puzzle, coords, value) { // eslint-disable-line import/prefer-default-export
  const { i, j } = coords
  const newPuzzle = puzzle.map(row => row.slice())
  newPuzzle[i][j] = value
  return newPuzzle
}
