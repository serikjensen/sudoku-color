import { expect } from '@instructure/ui-test-utils'

import difference from '../difference'

describe('difference', () => {
  it('arrays of length 1', () => {
    const a = [1]
    const b = [2]
    const result = difference(a, b)
    expect(result).to.deep.equal([1])
  })

  it('arrays greater than length 1', () => {
    const a = [1, 2]
    const b = [3, 4]
    const result = difference(a, b)
    expect(result).to.deep.equal([1, 2])
  })

  it('should get the difference between subarray', () => {
    const a = [2, 4, 6, 8, 10, 12, 14]
    const b = [2, 6, 10, 14]
    const result = difference(a, b)
    expect(result).to.deep.equal([4, 8, 12])
  })

  it('should get the difference slightly diff subarray', () => {
    const a = [2, 4, 6, 8, 10, 12, 14]
    const b = [3, 7, 9, 10]
    const result = difference(a, b)
    expect(result).to.deep.equal([2, 4, 6, 8, 12, 14])
  })

  it('when arrays are identical', () => {
    const a = [2, 4, 6, 8]
    const b = [2, 4, 6, 8]
    const result = difference(a, b)
    expect(result).to.deep.equal([])
  })
})
