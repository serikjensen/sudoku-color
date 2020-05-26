import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE,
  SET_THEME
} from '../constants/actionTypes'

import handleLoadUserSettings from '../util/loadUserSettings'

export const loadUserSettings = (onLoad = handleLoadUserSettings) => (dispatch) => {
  dispatch({
    type: LOAD_USER_SETTINGS
  })

  onLoad(({ difficultyPreference, themeKey }, error) => {
    dispatch({
      type: RECEIVED_USER_SETTINGS,
      payload: error || {
        difficultyPreference,
        themeKey
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

export const setTheme = (themeKey) => (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: {
      themeKey
    }
  })
}
