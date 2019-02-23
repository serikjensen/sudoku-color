import { expect } from '@instructure/ui-test-utils'

import validatePuzzle from '../validatePuzzle'
import {
  puzzle2,
  puzzle3,
  puzzle4,
  puzzle5,
  puzzle6,
  puzzle7
} from './testPuzzles'

describe('validPuzzle', () => {
  it('should pass with a correctly completed puzzle', () => {
    expect(validatePuzzle(puzzle3)).to.be.true
  })

  it('should fail with a correct puzzle that has an empty value', () => {
    expect(validatePuzzle(puzzle2)).to.be.false
  })

  it('should fail with puzzles that have row/column duplicates', () => {
    expect(validatePuzzle(puzzle4)).to.be.false
    expect(validatePuzzle(puzzle5)).to.be.false
    expect(validatePuzzle(puzzle6)).to.be.false
  })

  it('should fail with puzzles that do not have row/column duplicates but have sector duplicates', () => {
    expect(validatePuzzle(puzzle7)).to.be.false
  })
})
