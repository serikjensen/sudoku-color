import deepEqual from 'deep-equal'
import reducer, { defaultState } from '../puzzleReducer'
import { REQUEST_PUZZLE, RECEIVED_PUZZLE, SET_TILE } from '../../constants/actionTypes'
import { generateEmptyPuzzle } from '../../util/generatePuzzle'

describe('puzzleReducer', () => {
  it('should initialize with the default state', () => {
    const state = reducer()
    expect(deepEqual(defaultState, state)).to.be.true
  })

  it('should handle REQUEST_PUZZLE', () => {
    const state = reducer(defaultState, {
      type: REQUEST_PUZZLE
    })
    expect(state.requestingPuzzle).to.be.true
  })

  describe('should handle RECEIVE_PUZZLE', () => {
    it('handles success', () => {
      const puzzle = generateEmptyPuzzle()

      // change a value to verify the reducer modifies the state
      puzzle[0][0] = 5

      const state = reducer(defaultState, {
        type: RECEIVED_PUZZLE,
        payload: {
          puzzle
        },
        error: false
      })

      expect(deepEqual(puzzle, state.puzzle)).to.be.true
      expect(state.failedPuzzleRequest).to.equal(null)
    })

    it('handles error', () => {
      const error = 'A test error'

      const state = reducer(defaultState, {
        type: RECEIVED_PUZZLE,
        payload: error,
        error: true
      })

      expect(state.failedPuzzleRequest).to.equal(error)
    })
  })

  it('should handle SET_TILE', () => {
    const puzzle = generateEmptyPuzzle()

    let result = true
    let state = defaultState

    puzzle.forEach((row, i, newRow) => {
      row.forEach((value, j, newCol) => {
        newCol[j] = 3
        newRow[i] = newCol

        state = reducer(state, {
          type: SET_TILE,
          payload: {
            coords: { i, j },
            value: 3
          }
        })

        if (!deepEqual(puzzle, state.puzzle)) {
          result = false
        }
      })
    })

    expect(result).to.be.true
  })
})
