import sudoku from 'sudoku'

const PUZZLE_LENGTH = 81
const PUZZLE_WIDTH = 9

export default function getSudokuPuzzle () {
  const rawPuzzle = getRawPuzzle(sudoku.makepuzzle())
  /* TODO: error handling for malformed puzzle */
  return formatRawPuzzle(rawPuzzle)
}

function getRawPuzzle (rawPuzzle) {
  // For initial puzzle values we convert them to negatives for identification
  // For null values we set them to zero
  return rawPuzzle.map(value => (value ? value * -1 : 0))
}

function formatRawPuzzle (puzzle) {
  const formattedPuzzle = []
  for (let i = 0; i < PUZZLE_LENGTH; i += PUZZLE_WIDTH) {
    formattedPuzzle.push(puzzle.slice(i, i + PUZZLE_WIDTH))
  }
  return formattedPuzzle
}

export function getZeroPuzzle () {
  const zeroPuzzle = []
  for (let i = 0; i < PUZZLE_LENGTH; i += PUZZLE_WIDTH) {
    zeroPuzzle.push(Array(PUZZLE_WIDTH).fill(null))
  }
  return zeroPuzzle
}
