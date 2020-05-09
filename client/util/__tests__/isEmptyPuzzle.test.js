import { expect } from '@instructure/ui-test-utils'
import isEmptyPuzzle from '../isEmptyPuzzle'
import { generateEmptyPuzzle } from '../generatePuzzle'

describe('isEmptyPuzzle', () => {
  it('should verify that a puzzle is empty', () => {
    const puzzle = generateEmptyPuzzle()
    expect(isEmptyPuzzle(puzzle)).to.be.true()
  })

  it('should verify when the puzzle is not empty', () => {
    const puzzle = generateEmptyPuzzle()
    puzzle[8][8] = 5

    expect(isEmptyPuzzle(puzzle)).to.be.false()
  })
})
