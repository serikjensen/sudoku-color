import sudoku from 'sudoku'

export default function getSudokuPuzzle () {
  const puzzle = sudoku.makepuzzle()
  return formatRawPuzzle(puzzle)
}

function formatRawPuzzle (puzzle) {
  const formattedPuzzle = []
  let i = 0
  while (i < puzzle.length) {
    formattedPuzzle.push(puzzle.slice(i, i + 9))
    i = i + 9
  }
  return formattedPuzzle
}
