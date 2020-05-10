import {
  getVeryEasySudoku,
  getEasySudoku,
  getMediumSudoku,
  getHardSudoku
} from 'fake-sudoku-puzzle-generator'

import {
  REALLY_EASY,
  EASY,
  MEDIUM,
  HARD
} from '../constants/difficultyTypes'

const PUZZLE_LENGTH = 81
const PUZZLE_WIDTH = 9

function getPuzzleGenerator (difficulty) {
  switch (difficulty) {
    case REALLY_EASY: {
      return getVeryEasySudoku
    }
    case EASY: {
      return getEasySudoku
    }
    case MEDIUM: {
      return getMediumSudoku
    }
    case HARD: {
      return getHardSudoku
    }
    default: {
      return getVeryEasySudoku
    }
  }
}

export default function generatePuzzle (difficulty) {
  const puzzleGenerator = getPuzzleGenerator(difficulty)
  const puzzle = puzzleGenerator().reduce((result, row) => result.concat(row), [])
  const rawPuzzle = generateRawPuzzle(puzzle)
  /* TODO: error handling for malformed puzzle */
  return formatRawPuzzle(rawPuzzle)
}

export function generateRawPuzzle (rawPuzzle) {
  // For initial puzzle values we convert them to negatives for identification
  // For null values we set them to zero
  return rawPuzzle.map(value => (value ? value * -1 : 0))
}

export function formatRawPuzzle (puzzle) {
  const formattedPuzzle = []
  for (let i = 0; i < PUZZLE_LENGTH; i += PUZZLE_WIDTH) {
    formattedPuzzle.push(puzzle.slice(i, i + PUZZLE_WIDTH))
  }
  return formattedPuzzle
}

export function generateEmptyPuzzle () {
  const zeroPuzzle = []
  for (let i = 0; i < PUZZLE_LENGTH; i += PUZZLE_WIDTH) {
    zeroPuzzle.push(Array(PUZZLE_WIDTH).fill(null))
  }
  return zeroPuzzle
}
