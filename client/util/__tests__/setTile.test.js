import { expect } from '@instructure/ui-test-utils'

import setTile from '../setTile'
import { generateEmptyPuzzle } from '../generatePuzzle'

describe('setTile', () => {
  it('should set coordinates', () => {
    const puzzle = generateEmptyPuzzle()
    puzzle.forEach((row, i) => {
      row.forEach((entry, j) => {
        const result = setTile(puzzle, { i, j }, 7)
        expect(result[i][j]).to.equal(7)
      })
    })
  })

  it('should throw an error when out of bounds', () => {
    const puzzle = generateEmptyPuzzle()
    let error = false
    try {
      setTile(puzzle, { i: -1, j: -1 }, 8)
    } catch (e) {
      error = true
    }
    expect(error).to.be.true
  })
})
