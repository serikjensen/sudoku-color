import { expect } from '@instructure/ui-test-utils'

import reducer, { defaultState } from '../userSettingsReducer'

import { MEDIUM, REALLY_EASY } from '../../constants/difficultyTypes'

import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE
} from '../../constants/actionTypes'

describe('userSettingsReducer', () => {
  it('should initialize with the default state', () => {
    const state = reducer()
    expect(defaultState).to.deep.equal(state)
  })

  it('should handle LOAD_USER_SETTINGS', () => {
    const state = reducer(defaultState, {
      type: LOAD_USER_SETTINGS
    })

    expect(state).to.deep.equal({
      ...defaultState,
      isLoadingUserSettings: true
    })
  })

  describe('should handle RECEIVED_USER_SETTINGS', () => {
    it('handles success', () => {
      const state = reducer(defaultState, {
        type: RECEIVED_USER_SETTINGS,
        payload: {
          difficultyPreference: MEDIUM
        },
        error: false
      })

      expect(state).to.deep.equal({
        ...defaultState,
        isLoadingUserSettings: false,
        difficultyPreference: MEDIUM
      })
    })

    it('handles error', () => {
      const error = 'A test error'

      const state = reducer(defaultState, {
        type: RECEIVED_USER_SETTINGS,
        payload: error,
        error: true
      })

      expect(state).to.deep.equal({
        ...defaultState,
        difficultyPreference: REALLY_EASY,
        isLoadingUserSettings: false
      })
    })
  })

  it('should handle SET_DIFFICULTY_PREFERENCE', () => {
    const state = reducer(defaultState, {
      type: SET_DIFFICULTY_PREFERENCE,
      payload: {
        difficultyPreference: MEDIUM
      }
    })

    expect(state).to.deep.equal({
      ...defaultState,
      difficultyPreference: MEDIUM
    })
  })
})
