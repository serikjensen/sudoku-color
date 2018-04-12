import { SET_TILE } from '../constants/actionTypes'

export const setTile = (coords, value) => (dispatch) => { // eslint-disable-line import/prefer-default-export
  dispatch({
    type: SET_TILE,
    coords,
    value
  })
}
