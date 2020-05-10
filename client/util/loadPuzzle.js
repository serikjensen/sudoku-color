import { PUZZLE_KEY } from '../constants/storageTypes'
import { REALLY_EASY } from '../constants/difficultyTypes'
import generatePuzzle from './generatePuzzle'

export default function loadPuzzle (onLoad, storage = localStorage, executePuzzleGenerator = generatePuzzle) {
  let puzzle
  let history = []
  let difficulty = REALLY_EASY

  try {
    const savedPuzzleData = storage.getItem(PUZZLE_KEY)

    if (savedPuzzleData) {
      const savedPuzzle = JSON.parse(savedPuzzleData)

      puzzle = savedPuzzle.puzzle
      history = savedPuzzle.history
      difficulty = savedPuzzle.difficulty
    }
  } catch (err) {
    puzzle = executePuzzleGenerator(difficulty)
  }

  onLoad({
    puzzle: puzzle || executePuzzleGenerator(difficulty),
    history,
    difficulty
  })
}
