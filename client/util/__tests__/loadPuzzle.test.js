import { expect, spy } from '@instructure/ui-test-utils'
import { PUZZLE_KEY } from '../../constants/storageTypes'
import loadPuzzle from '../loadPuzzle'

const createStorage = (data = {}) => ({
  getItem: key => data[key]
})

describe('loadPuzzle', () => {
  it('should generate a puzzle if there is nothing saved', () => {
    const onLoad = spy()
    const storage = createStorage()
    const generatePuzzle = () => [[4, 5], [5, 4]]

    loadPuzzle(onLoad, storage, generatePuzzle)

    expect(onLoad).to.have.been.calledOnce()
    expect(onLoad.lastCall.args[0]).to.deep.equal([[4, 5], [5, 4]])
  })
  it('should load the saved puzzle if there is a saved puzzle', () => {
    const onLoad = spy()
    const storage = createStorage({
      [PUZZLE_KEY]: JSON.stringify([[4, 4], [4, 5]])
    })
    const generatePuzzle = () => [[4, 5], [5, 4]]

    loadPuzzle(onLoad, storage, generatePuzzle)

    expect(onLoad).to.have.been.calledOnce()
    expect(onLoad.lastCall.args[0]).to.deep.equal([[4, 4], [4, 5]])
  })
  it('should generate a puzzle if there is an error loading from storage', () => {
    const onLoad = spy()
    const storage = {
      getItem: () => {
        throw new Error()
      }
    }
    const generatePuzzle = () => [[4, 5], [5, 4]]

    loadPuzzle(onLoad, storage, generatePuzzle)

    expect(onLoad).to.have.been.calledOnce()
    expect(onLoad.lastCall.args[0]).to.deep.equal([[4, 5], [5, 4]])
  })
})
