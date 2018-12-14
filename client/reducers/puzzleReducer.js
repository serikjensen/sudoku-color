import { generateEmptyPuzzle } from '../util/generatePuzzle'
import setTile from '../util/setTile'
import resetPuzzle from '../util/resetPuzzle'
import filledPuzzle from '../util/filledPuzzle'

import {
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE
} from '../constants/actionTypes'

export const defaultState = {
  puzzle: generateEmptyPuzzle(),
  filledPuzzle: false,
  requestingPuzzle: false,
  failedPuzzleRequest: null
}

export default function reducer (state = defaultState, action = { type: null }) {
  switch (action.type) {
    case REQUEST_PUZZLE: {
      return {
        ...state,
        requestingPuzzle: true
      }
    }
    case RECEIVED_PUZZLE: {
      const { puzzle } = action.payload

      if (!action.error) {
        return {
          ...state,
          requestingPuzzle: false,
          filledPuzzle: filledPuzzle(puzzle),
          puzzle
        }
      }

      return {
        ...state,
        requestingPuzzle: false,
        filledPuzzle: false,
        failedPuzzleRequest: action.payload
      }
    }
    case RESET_PUZZLE: {
      const { puzzle } = action.payload

      return {
        ...state,
        puzzle: resetPuzzle(puzzle)
      }
    }
    case SET_TILE: {
      const { coords, value } = action.payload

      const puzzle = setTile(state.puzzle, coords, value)

      return {
        ...state,
        filledPuzzle: filledPuzzle(puzzle),
        puzzle
      }
    }
    default: {
      return state
    }
  }
}
