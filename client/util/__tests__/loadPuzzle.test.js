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

    const { puzzle, history } = onLoad.lastCall.args[0]

    expect(puzzle).to.deep.equal([[4, 5], [5, 4]])
    expect(history).to.deep.equal([])
  })
  it('should load the saved puzzle if there is a saved puzzle', () => {
    const onLoad = spy()
    const storage = createStorage({
      [PUZZLE_KEY]: JSON.stringify({
        puzzle: [[4, 4], [4, 5]],
        history: [{
          coords: { i: 0, j: 0 },
          value: 4
        }]
      })
    })
    const generatePuzzle = () => [[4, 5], [5, 4]]

    loadPuzzle(onLoad, storage, generatePuzzle)

    expect(onLoad).to.have.been.calledOnce()

    const { puzzle, history } = onLoad.lastCall.args[0]

    expect(puzzle).to.deep.equal([[4, 4], [4, 5]])
    expect(history).to.deep.equal([{
      coords: { i: 0, j: 0 },
      value: 4
    }])
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

    const { puzzle, history } = onLoad.lastCall.args[0]
    expect(puzzle).to.deep.equal([[4, 5], [5, 4]])
    expect(history).to.deep.equal([])
  })
})
