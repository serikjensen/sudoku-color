export default function isEmptyPuzzle (puzzle) {
  return !puzzle.some(row => row.some(value => value))
}
