import { expect } from '@instructure/ui-test-utils'

import filledPuzzle from '../filledPuzzle'
import { puzzle1, puzzle2, puzzle3, puzzle4, puzzle5 } from './testPuzzles'

describe('filledPuzzle', () => {
  it('should be false when puzzle is not finished', () => {
    expect(filledPuzzle(puzzle1)).to.be.false
    expect(filledPuzzle(puzzle2)).to.be.false
  })

  it('should be true when puzzle is finished and valid', () => {
    expect(filledPuzzle(puzzle3)).to.be.true
  })

  it('should be true when puzzle is finished and invalid', () => {
    expect(filledPuzzle(puzzle4)).to.be.true
    expect(filledPuzzle(puzzle5)).to.be.true
  })
})
