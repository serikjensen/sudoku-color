import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE
} from '../constants/actionTypes'

import handleLoadUserSettings from '../util/loadUserSettings'

export const loadUserSettings = (onLoad = handleLoadUserSettings) => (dispatch) => {
  dispatch({
    type: LOAD_USER_SETTINGS
  })

  onLoad(({ difficultyPreference }, error) => {
    dispatch({
      type: RECEIVED_USER_SETTINGS,
      payload: error || {
        difficultyPreference
      },
      error: !!error
    })
  })
}

export const setDifficultyPreference = (difficultyPreference) => (dispatch) => {
  dispatch({
    type: SET_DIFFICULTY_PREFERENCE,
    payload: {
      difficultyPreference
    }
  })
}
