import { combineReducers } from 'redux'

import puzzle from './puzzleReducer'
import userSettings from './userSettingsReducer'

export default combineReducers({
  puzzle,
  userSettings
})
