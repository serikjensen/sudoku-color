import deepEqual from 'deep-equal'
import reducer, { defaultState } from '../puzzleReducer'

import {
  RESET_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVED_PUZZLE,
  SET_TILE
} from '../../constants/actionTypes'

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

  it('should handle RESET_PUZZLE', () => {
    const puzzle = generateEmptyPuzzle().map(row => row.map(value => value || 0))
    // assign some initial values
    puzzle[1][1] = -1
    puzzle[3][3] = -3
    puzzle[5][5] = -5
    puzzle[7][7] = -7

    // set some new values
    puzzle[2][2] = 2
    puzzle[4][4] = 4
    puzzle[6][6] = 6


    const state = reducer(state, {
      type: RESET_PUZZLE,
      payload: {
        puzzle
      }
    })

    expect(state.puzzle[1][1]).to.equal(-1)
    expect(state.puzzle[3][3]).to.equal(-3)
    expect(state.puzzle[5][5]).to.equal(-5)
    expect(state.puzzle[7][7]).to.equal(-7)

    expect(state.puzzle[2][2]).to.equal(0)
    expect(state.puzzle[4][4]).to.equal(0)
    expect(state.puzzle[6][6]).to.equal(0)
  })

  it('should handle SET_TILE', () => {
    const puzzle = generateEmptyPuzzle()

    let result = true
    let state = defaultState

    puzzle.forEach((row, i, newRow) => {
      row.forEach((value, j, newCol) => {
        /* eslint-disable no-param-reassign */
        newCol[j] = 3
        newRow[i] = newCol
        /* eslint-enable no-param-reassign */

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
