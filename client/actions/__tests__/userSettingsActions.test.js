import configureStore from 'redux-mock-store'
import { expect } from '@instructure/ui-test-utils'

import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE,
  SET_THEME
} from '../../constants/actionTypes'

import { MEDIUM } from '../../constants/difficultyTypes'

import {
  loadUserSettings,
  setDifficultyPreference,
  setTheme
} from '../userSettingsActions'

const mockStore = configureStore()
const store = mockStore()

describe('userSettingsActions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('LOAD_USER_SETTINGS and RECEIVED_USER_SETTINGS', () => {
    it('should dispatch LOAD_USER_SETTINGS and RECEIVED_USER_SETTINGS when loading user settings', () => {
      const loadAction = {
        type: LOAD_USER_SETTINGS
      }

      const receivedAction = {
        type: RECEIVED_USER_SETTINGS,
        payload: {
          difficultyPreference: MEDIUM,
          themeKey: 'inverse'
        },
        error: false
      }

      const onLoad = (load) => {
        load({
          difficultyPreference: MEDIUM,
          themeKey: 'inverse'
        }, null)
      }

      loadUserSettings(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(loadAction)
      expect(actions[1]).to.deep.equal(receivedAction)
    })

    it('should dispatch LOAD_USER_SETTINGS and RECEIVED_USER_SETTINGS with error when loading user settings', () => {
      const error = '[ERROR] Could not get get puzzle'

      const loadAction = {
        type: LOAD_USER_SETTINGS
      }

      const receivedAction = {
        type: RECEIVED_USER_SETTINGS,
        payload: error,
        error: true
      }

      const onLoad = (load) => {
        load({}, error)
      }

      loadUserSettings(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(loadAction)
      expect(actions[1]).to.deep.equal(receivedAction)
    })
  })

  it('should dispatch SET_DIFFICULTY_PREFERENCE', () => {
    const difficultyPreference = MEDIUM

    const expectedAction = {
      type: SET_DIFFICULTY_PREFERENCE,
      payload: {
        difficultyPreference
      }
    }

    setDifficultyPreference(MEDIUM)(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })

  it('should dispatch SET_THEME', () => {
    const themeKey = 'inverse'

    const expectedAction = {
      type: SET_THEME,
      payload: {
        themeKey
      }
    }

    setTheme(themeKey)(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })
})
