import { PUZZLE_KEY } from '../constants/storageTypes'
import isEmptyPuzzle from './isEmptyPuzzle'

export default function savePuzzle ({ puzzle, history, difficulty }, storage = localStorage) {
  try {
    if (!isEmptyPuzzle(puzzle)) {
      const puzzleData = JSON.stringify({
        puzzle,
        history,
        difficulty
      })
      storage.setItem(PUZZLE_KEY, puzzleData)
    }
  } catch (err) {
    // TODO: Handle save to local storage error
  }
}
