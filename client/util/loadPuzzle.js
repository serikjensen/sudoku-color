import generatePuzzle from './generatePuzzle'

export default function loadPuzzle (onLoad) {
  onLoad(generatePuzzle())
}
