import { expect } from '@instructure/ui-test-utils'

import generatePuzzle, {
  generateRawPuzzle,
  formatRawPuzzle,
  generateEmptyPuzzle
} from '../generatePuzzle'

describe('generatePuzzle', () => {
  it('should generate a puzzle', () => {
    const puzzle = generatePuzzle()
    expect(puzzle.length).to.equal(9)
    puzzle.forEach(({ length }) => {
      expect(length).to.equal(9)
    })
  })

  it('generateRawPuzzle', () => {
    const puzzle = [
      null, 2, 5, 3, null, 3, 7, null, 5
    ]
    const result = generateRawPuzzle(puzzle)
    expect(result).to.deep.equal([
      0, -2, -5, -3, 0, -3, -7, 0, -5
    ])
  })

  it('formatRawPuzzle', () => {
    const puzzle = [
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ]
    const result = formatRawPuzzle(puzzle)

    expect(result.length).to.equal(9)
    result.forEach(({ length }) => {
      expect(length).to.equal(9)
    })
  })

  it('generateEmptyPuzzle', () => {
    const puzzle = generateEmptyPuzzle()
    puzzle.forEach((row) => {
      row.forEach((entry) => {
        expect(entry).to.equal(null)
      })
    })
  })
})
