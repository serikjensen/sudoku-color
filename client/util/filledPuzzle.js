import getAvailableValues from './getAvailableValues'

export default function filledPuzzle (puzzle) {
  return getAvailableValues([0], puzzle).length === 0
}
