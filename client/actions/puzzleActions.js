import {
  CONTINUE_PUZZLE,
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE,
  UNDO_SET_TILE,
  SUBMIT_PUZZLE
} from '../constants/actionTypes'

import handleLoadPuzzle from '../util/loadPuzzle'
import generatePuzzle from '../util/generatePuzzle'

export const loadPuzzle = (onLoad = handleLoadPuzzle) => (dispatch) => {
  dispatch({
    type: REQUEST_PUZZLE
  })

  onLoad(({ puzzle, history, difficulty }, error) => {
    dispatch({
      type: RECEIVED_PUZZLE,
      payload: error || {
        puzzle,
        history,
        difficulty
      },
      error: !!error
    })
  })
}

export const requestPuzzle = (difficulty, executePuzzleGenerator = generatePuzzle) => (dispatch) => {
  dispatch({
    type: RECEIVED_PUZZLE,
    payload: {
      puzzle: executePuzzleGenerator(difficulty),
      history: [],
      difficulty
    }
  })
}

export const resetPuzzle = () => (dispatch) => {
  dispatch({
    type: RESET_PUZZLE
  })
}

export const setTile = (coords, value) => (dispatch) => {
  dispatch({
    type: SET_TILE,
    payload: {
      coords,
      value
    }
  })
}

export const undoSetTile = () => (dispatch) => {
  dispatch({
    type: UNDO_SET_TILE
  })
}

export const submitPuzzle = () => (dispatch) => {
  dispatch({
    type: SUBMIT_PUZZLE
  })
}

export const continuePuzzle = () => (dispatch) => {
  dispatch({
    type: CONTINUE_PUZZLE
  })
}
