import { expect } from '@instructure/ui-test-utils'
import { PUZZLE_KEY } from '../../constants/storageTypes'
import savePuzzle from '../savePuzzle'

describe('savePuzzle', () => {
  it('should save puzzle to storage when it has non null values', () => {
    const savedData = {}

    const storage = {
      setItem: (key, data) => {
        savedData[key] = data
      }
    }

    savePuzzle({ puzzle: [[4, 5], [5, 4]] }, storage)

    expect(savedData[PUZZLE_KEY]).to.equal(JSON.stringify([[4, 5], [5, 4]]))
  })

  it('should not save puzzle to storage when it has only null values', () => {
    const savedData = {}

    const storage = {
      setItem: (key, data) => {
        savedData[key] = data
      }
    }

    savePuzzle({ puzzle: [[null, null], [null, null]] }, storage)

    expect(savedData[PUZZLE_KEY]).to.not.exist()
  })
})
