export default function setTile (puzzle, coords, value) {
  const { i, j } = coords
  const newPuzzle = puzzle.map(row => row.slice())
  newPuzzle[i][j] = value
  return newPuzzle
}
