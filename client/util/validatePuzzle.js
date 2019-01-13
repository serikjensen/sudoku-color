import generatePuzzleSets from './generatePuzzleSets'

export default function validatePuzzle (puzzle) {
  return generatePuzzleSets(puzzle).filter(set => set.size !== 9).length === 0
}
