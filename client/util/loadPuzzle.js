import { PUZZLE_KEY } from '../constants/storageTypes'
import generatePuzzle from './generatePuzzle'

export default function loadPuzzle (onLoad, storage = localStorage, executePuzzleGenerator = generatePuzzle) {
  let puzzle

  try {
    const savedPuzzleData = storage.getItem(PUZZLE_KEY)

    if (savedPuzzleData) {
      const savedPuzzle = JSON.parse(savedPuzzleData)
      puzzle = savedPuzzle
    }
  } catch (err) {
    puzzle = executePuzzleGenerator()
  }

  onLoad(puzzle || executePuzzleGenerator())
}
