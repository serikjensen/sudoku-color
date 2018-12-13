export default function resetPuzzle (puzzle) {
  return puzzle.map(row => row.map(value => (value < 0 ? value : 0)))
}
