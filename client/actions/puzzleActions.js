import { SET_TILE } from '../constants/actionTypes'

export const setTile = (coords, value) => (dispatch) => {
  dispatch({
    type: SET_TILE,
    coords,
    value
  })
}