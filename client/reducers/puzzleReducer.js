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

export const defaultState = {
  puzzle: generateEmptyPuzzle(),
  filledPuzzle: false,
  requestingPuzzle: false,
  failedPuzzleRequest: null,
  validPuzzle: false,
  submittedPuzzle: false,
  moves: [],
  canUndo: false
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
      const { puzzle } = action.payload

      if (!action.error) {
        return {
          ...state,
          submittedPuzzle: false,
          requestingPuzzle: false,
          filledPuzzle: filledPuzzle(puzzle),
          puzzle
        }
      }

      return {
        ...state,
        requestingPuzzle: false,
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

      let moves = state.moves

      // Only add the move if it is different from the existing value
      if (prevValue !== puzzle[i][j]) {
        moves = [
          ...moves,
          {
            coords,
            prevValue
          }
        ]
      }

      return {
        ...state,
        filledPuzzle: filledPuzzle(puzzle),
        validPuzzle: false,
        puzzle,
        moves,
        canUndo: true
      }
    }
    case UNDO_SET_TILE: {
      const { puzzle } = state
      const moves = [...state.moves]
      const move = moves.pop()

      if (move) {
        const { coords, prevValue } = move
        const newPuzzle = puzzle.map(row => row.slice())
        newPuzzle[coords.i][coords.j] = prevValue

        return {
          ...state,
          puzzle: newPuzzle,
          moves,
          canUndo: moves.length > 0
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
