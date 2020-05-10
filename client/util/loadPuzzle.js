import { PUZZLE_KEY } from '../constants/storageTypes'
import generatePuzzle from './generatePuzzle'

export default function loadPuzzle (onLoad, storage = localStorage, executePuzzleGenerator = generatePuzzle) {
  let puzzle
  let history = []

  try {
    const savedPuzzleData = storage.getItem(PUZZLE_KEY)

    if (savedPuzzleData) {
      const savedPuzzle = JSON.parse(savedPuzzleData)

      puzzle = savedPuzzle.puzzle
      history = savedPuzzle.history
    }
  } catch (err) {
    puzzle = executePuzzleGenerator()
  }

  onLoad({
    puzzle: puzzle || executePuzzleGenerator(),
    history
  })
}
