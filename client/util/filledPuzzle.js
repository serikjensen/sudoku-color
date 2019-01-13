export default function filledPuzzle (puzzle) {
  return puzzle.filter(row => row.filter(value => value && value !== 0).length === 9).length === 9
}
