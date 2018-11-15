import { REQUEST_PUZZLE, RECEIVED_PUZZLE, SET_TILE } from '../constants/actionTypes'
import loadPuzzle from '../util/loadPuzzle'

export const requestPuzzle = () => (dispatch) => {
  dispatch({
    type: REQUEST_PUZZLE
  })

  loadPuzzle((puzzle, error) => {
    dispatch({
      type: RECEIVED_PUZZLE,
      payload: error || {
        puzzle
      },
      error: !!error
    })
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
