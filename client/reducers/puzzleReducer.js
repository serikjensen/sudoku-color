import { generateEmptyPuzzle } from '../util/generatePuzzle'
import setTile from '../util/setTile'
import resetPuzzle from '../util/resetPuzzle'
import filledPuzzle from '../util/filledPuzzle'
import validatePuzzle from '../util/validatePuzzle'

import {
  CONTINUE_PUZZLE,
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE,
  UNDO_SET_TILE,
  SUBMIT_PUZZLE
} from '../constants/actionTypes'

import {
  REALLY_EASY
} from '../constants/difficultyTypes'

export const defaultState = {
  puzzle: generateEmptyPuzzle(),
  filledPuzzle: false,
  requestingPuzzle: false,
  failedPuzzleRequest: null,
  validPuzzle: false,
  submittedPuzzle: false,
  history: [],
  canUndo: false,
  difficulty: REALLY_EASY
}

export default function reducer (state = defaultState, action = { type: null }) {
  switch (action.type) {
    case REQUEST_PUZZLE: {
      return {
        ...defaultState,
        requestingPuzzle: true
      }
    }
    case RECEIVED_PUZZLE: {
      const { puzzle, history, difficulty } = action.payload

      if (!action.error) {
        return {
          ...state,
          submittedPuzzle: false,
          requestingPuzzle: false,
          filledPuzzle: filledPuzzle(puzzle),
          puzzle,
          history,
          canUndo: history.length > 0,
          difficulty: difficulty || state.difficulty
        }
      }

      return {
        ...state,
        requestingPuzzle: false,
        history: [],
        canUndo: false,
        failedPuzzleRequest: action.payload
      }
    }
    case RESET_PUZZLE: {
      const puzzle = resetPuzzle(state.puzzle)

      return {
        ...defaultState,
        filledPuzzle: filledPuzzle(puzzle),
        puzzle
      }
    }
    case SET_TILE: {
      const { coords, value } = action.payload

      const puzzle = setTile(state.puzzle, coords, value)

      const { i, j } = coords
      const prevValue = state.puzzle[i][j]

      let history = state.history

      // Only add the move to history if it is different from the existing value
      if (prevValue !== puzzle[i][j]) {
        history = [
          ...history,
          {
            coords,
            value: prevValue
          }
        ]
      }

      return {
        ...state,
        filledPuzzle: filledPuzzle(puzzle),
        validPuzzle: false,
        puzzle,
        history,
        canUndo: true
      }
    }
    case UNDO_SET_TILE: {
      const { puzzle } = state
      const history = [...state.history]
      const move = history.pop()

      if (move) {
        const { coords, value } = move
        const newPuzzle = puzzle.map(row => row.slice())
        newPuzzle[coords.i][coords.j] = value

        return {
          ...state,
          puzzle: newPuzzle,
          history,
          canUndo: history.length > 0
        }
      }

      return state
    }
    case SUBMIT_PUZZLE: {
      return {
        ...state,
        validPuzzle: validatePuzzle(state.puzzle),
        submittedPuzzle: true
      }
    }
    case CONTINUE_PUZZLE: {
      return {
        ...state,
        submittedPuzzle: false
      }
    }
    default: {
      return state
    }
  }
}
