import { expect } from '@instructure/ui-test-utils'

import reducer, { defaultState } from '../puzzleReducer'

import {
  CONTINUE_PUZZLE,
  RESET_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVED_PUZZLE,
  SET_TILE,
  UNDO_SET_TILE,
  SUBMIT_PUZZLE
} from '../../constants/actionTypes'

import { puzzle3, puzzle4 } from '../../util/__tests__/testPuzzles'

import { generateEmptyPuzzle } from '../../util/generatePuzzle'

describe('puzzleReducer', () => {
  it('should initialize with the default state', () => {
    const state = reducer()
    expect(defaultState).to.deep.equal(state)
  })

  it('should handle REQUEST_PUZZLE', () => {
    const state = reducer(defaultState, {
      type: REQUEST_PUZZLE
    })

    expect(state).to.deep.equal({
      ...defaultState,
      requestingPuzzle: true
    })
  })

  describe('should handle RECEIVE_PUZZLE', () => {
    it('handles success', () => {
      const puzzle = generateEmptyPuzzle()

      // change a value to verify the reducer modifies the state
      puzzle[0][0] = 5

      const state = reducer(defaultState, {
        type: RECEIVED_PUZZLE,
        payload: {
          puzzle,
          history: []
        },
        error: false
      })

      expect(state).to.deep.equal({
        ...defaultState,
        puzzle
      })
    })

    it('handles error', () => {
      const error = 'A test error'

      const state = reducer(defaultState, {
        type: RECEIVED_PUZZLE,
        payload: error,
        error: true
      })

      expect(state).to.deep.equal({
        ...defaultState,
        failedPuzzleRequest: error
      })
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


    const state = reducer({
      ...defaultState,
      puzzle
    }, {
      type: RESET_PUZZLE
    })

    puzzle[2][2] = 0
    puzzle[4][4] = 0
    puzzle[6][6] = 0

    expect(state).to.deep.equal({
      ...defaultState,
      puzzle
    })
  })

  it('should handle SET_TILE', () => {
    const puzzle = generateEmptyPuzzle()

    let state = defaultState
    const history = []

    puzzle.forEach((row, i, newRow) => {
      row.forEach((value, j, newCol) => {
        history.push({
          coords: { i, j },
          value: newCol[j]
        })

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

        expect(state).to.deep.equal({
          ...defaultState,
          filledPuzzle: (i === puzzle.length - 1 && j === row.length - 1),
          puzzle,
          canUndo: true,
          history
        })
      })
    })
  })

  it('should handle UNDO_SET_TILE', () => {
    let state = reducer({
      ...defaultState,
      puzzle: generateEmptyPuzzle(),
      canUndo: true,
      history: [
        {
          coords: {
            i: 0,
            j: 0
          },
          value: 4
        },
        {
          coords: {
            i: 0,
            j: 0
          },
          value: 8
        }
      ]
    }, {
      type: UNDO_SET_TILE
    })

    const puzzleCompare1 = generateEmptyPuzzle()
    puzzleCompare1[0][0] = 8

    expect(state).to.deep.equal({
      ...defaultState,
      puzzle: puzzleCompare1,
      canUndo: true,
      history: [
        {
          coords: {
            i: 0,
            j: 0
          },
          value: 4
        }
      ]
    })

    state = reducer({
      ...defaultState,
      puzzle: generateEmptyPuzzle(),
      canUndo: true,
      history: [
        {
          coords: {
            i: 0,
            j: 0
          },
          value: 4
        }
      ]
    }, {
      type: UNDO_SET_TILE
    })

    const puzzleCompare2 = generateEmptyPuzzle()
    puzzleCompare2[0][0] = 4

    expect(state).to.deep.equal({
      ...defaultState,
      puzzle: puzzleCompare2,
      canUndo: false,
      history: []
    })
  })

  describe('should handle SUBMIT_PUZZLE', () => {
    it('submitting a valid puzzle', () => {
      const state = reducer({
        ...defaultState,
        puzzle: puzzle3
      }, {
        type: SUBMIT_PUZZLE
      })

      expect(state).to.deep.equal({
        ...defaultState,
        submittedPuzzle: true,
        validPuzzle: true,
        puzzle: puzzle3
      })
    })

    it('submitting an invalid puzzle', () => {
      const state = reducer({
        ...defaultState,
        puzzle: puzzle4
      }, {
        type: SUBMIT_PUZZLE
      })
      expect(state).to.deep.equal({
        ...defaultState,
        submittedPuzzle: true,
        validPuzzle: false,
        puzzle: puzzle4
      })
    })
  })

  describe('should handle SUBMIT_PUZZLE', () => {
    it('continuing a valid puzzle', () => {
      const state = reducer({
        ...defaultState,
        submittedPuzzle: true,
        validPuzzle: true
      }, {
        type: CONTINUE_PUZZLE
      })

      expect(state).to.deep.equal({
        ...defaultState,
        submittedPuzzle: false,
        validPuzzle: true
      })
    })

    it('continuing an invalid puzzle', () => {
      const state = reducer({
        ...defaultState,
        submittedPuzzle: true,
        validPuzzle: false
      }, {
        type: CONTINUE_PUZZLE
      })

      expect(state).to.deep.equal({
        ...defaultState,
        submittedPuzzle: false,
        validPuzzle: false
      })
    })
  })
})
