import { expect } from '@instructure/ui-test-utils'

import getAvailableValues from '../getAvailableValues'

describe('getAvailableValues', () => {
  it('should get the difference', () => {
    const result = getAvailableValues([2, 3, 7, 9])
    expect(result).to.deep.equal([1, 4, 5, 6, 8])
  })

  it('should return an empty array when all values are present', () => {
    const result = getAvailableValues([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(result).to.deep.equal([])
  })

  it('should omit values based on the entire puzzle', () => {
    const puzzle = [
      [0, -1, 0, 9, 2, 0, 5, 0, 3],
      [-9, 0, 0, 1, 3, 0, 2, 6, 1],
      [0, -2, 0, 0, 0, 7, 0, 0, 0],
      [5, -8, 0, 0, 0, 0, 7, 2, 8],
      [0, 0, -9, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, -2, 0, 8, 0, 1, 6],
      [0, 5, 1, 0, -7, 0, 0, 0, 2],
      [8, -9, 0, 3, 0, 0, 1, 0, 0],
      [2, -1, 0, 0, 0, 5, 0, 0, 0]
    ]

    const values = []

    const result = getAvailableValues(values, puzzle)
    expect(result).to.deep.equal([2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('should omit values based on the entire puzzle and provided values', () => {
    const puzzle = [
      [0, -1, 0, 9, 2, 0, 5, 0, 3],
      [-9, 0, 0, 1, 3, 0, 2, 6, 1],
      [0, -2, 0, 0, 9, 7, 0, 0, 9],
      [5, -8, 0, 0, 0, 0, 7, 2, 8],
      [0, 0, -9, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, -2, 9, 8, 0, 1, 6],
      [0, 5, 1, 0, -7, 0, -9, 0, 2],
      [8, -9, 0, 3, 0, 0, 1, 0, 0],
      [2, -1, 9, 0, 0, 5, 0, 0, 0]
    ]

    const values = [3, 4, 5, 6, 8]

    const result = getAvailableValues(values, puzzle)
    expect(result).to.deep.equal([2, 7])
  })
})
