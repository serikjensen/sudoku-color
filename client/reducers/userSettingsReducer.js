import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE
} from '../constants/actionTypes'

import {
  REALLY_EASY
} from '../constants/difficultyTypes'

export const defaultState = {
  difficultyPreference: REALLY_EASY,
  isLoadingUserSettings: true
}

export default function reducer (state = defaultState, action = { type: null }) {
  switch (action.type) {
    case LOAD_USER_SETTINGS: {
      return {
        ...state,
        isLoadingUserSettings: true
      }
    }
    case RECEIVED_USER_SETTINGS: {
      if (!action.error) {
        const { difficultyPreference } = action.payload

        return {
          ...state,
          difficultyPreference,
          isLoadingUserSettings: false
        }
      }

      return {
        ...state,
        difficultyPreference: REALLY_EASY,
        isLoadingUserSettings: false
      }
    }
    case SET_DIFFICULTY_PREFERENCE: {
      const { difficultyPreference } = action.payload

      return {
        ...state,
        difficultyPreference
      }
    }
    default: {
      return state
    }
  }
}
