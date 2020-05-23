import configureStore from 'redux-mock-store'
import { expect } from '@instructure/ui-test-utils'

import {
  LOAD_USER_SETTINGS,
  RECEIVED_USER_SETTINGS,
  SET_DIFFICULTY_PREFERENCE
} from '../../constants/actionTypes'

import { MEDIUM } from '../../constants/difficultyTypes'

import {
  loadUserSettings,
  setDifficultyPreference
} from '../userSettingsActions'

const mockStore = configureStore()
const store = mockStore()

describe('puzzleActions', () => {
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
          difficultyPreference: MEDIUM
        },
        error: false
      }

      const onLoad = (load) => {
        load({
          difficultyPreference: MEDIUM
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

  //   it('should dispatch RECEIVED_PUZZLE when requesting new puzzle', () => {
  //     const receivedAction = {
  //       type: RECEIVED_PUZZLE,
  //       payload: {
  //         puzzle: [[4, 5], [5, 4]],
  //         history: [],
  //         difficulty: MEDIUM
  //       }
  //     }

  //     requestPuzzle(MEDIUM, () => [[4, 5], [5, 4]])(store.dispatch)
  //     const actions = store.getActions()
  //     expect(actions[0]).to.deep.equal(receivedAction)
  //   })
  // })

  // it('should dispatch RESET_PUZZLE', () => {
  //   const expectedAction = {
  //     type: RESET_PUZZLE
  //   }

  //   resetPuzzle()(store.dispatch)
  //   const actions = store.getActions()
  //   expect(actions[0]).to.deep.equal(expectedAction)
  // })

  // it('should dispatch SET_TILE', () => {
  //   const coords = { i: 5, j: 7 }
  //   const value = 3

  //   const expectedAction = {
  //     type: SET_TILE,
  //     payload: {
  //       coords,
  //       value
  //     }
  //   }

  //   setTile(coords, value)(store.dispatch)
  //   const actions = store.getActions()
  //   expect(actions[0]).to.deep.equal(expectedAction)
  // })

  // it('should dispatch SUBMIT_PUZZLE', () => {
  //   const expectedAction = {
  //     type: SUBMIT_PUZZLE
  //   }

  //   submitPuzzle()(store.dispatch)
  //   const actions = store.getActions()
  //   expect(actions[0]).to.deep.equal(expectedAction)
  // })

  // it('should dispatch CONTINUE_PUZZLE', () => {
  //   const expectedAction = {
  //     type: CONTINUE_PUZZLE
  //   }

  //   continuePuzzle()(store.dispatch)
  //   const actions = store.getActions()
  //   expect(actions[0]).to.deep.equal(expectedAction)
  // })

  // it('should dispatch UNDO_SET_TILE', () => {
  //   const expectedAction = {
  //     type: UNDO_SET_TILE
  //   }

  //   undoSetTile()(store.dispatch)
  //   const actions = store.getActions()
  //   expect(actions[0]).to.deep.equal(expectedAction)
  // })
})
