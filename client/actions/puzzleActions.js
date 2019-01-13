import {
  CONTINUE_PUZZLE,
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE,
  SUBMIT_PUZZLE
} from '../constants/actionTypes'

import loadPuzzle from '../util/loadPuzzle'

export const requestPuzzle = (onLoad = loadPuzzle) => (dispatch) => {
  dispatch({
    type: REQUEST_PUZZLE
  })

  onLoad((puzzle, error) => {
    dispatch({
      type: RECEIVED_PUZZLE,
      payload: error || {
        puzzle
      },
      error: !!error
    })
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
