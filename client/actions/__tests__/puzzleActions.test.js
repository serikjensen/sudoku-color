import configureStore from 'redux-mock-store'
import { expect } from '@instructure/ui-test-utils'

import {
  CONTINUE_PUZZLE,
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE,
  UNDO_SET_TILE,
  SUBMIT_PUZZLE
} from '../../constants/actionTypes'

import { MEDIUM } from '../../constants/difficultyTypes'

import {
  continuePuzzle,
  loadPuzzle,
  requestPuzzle,
  resetPuzzle,
  setTile,
  undoSetTile,
  submitPuzzle
} from '../puzzleActions'

const mockStore = configureStore()
const store = mockStore()

describe('puzzleActions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('REQUEST_PUZZLE and RECEIVED_PUZZLE', () => {
    it('should dispatch REQUEST_PUZZLE and RECEIVED_PUZZLE when loading puzzle', () => {
      const requestAction = {
        type: REQUEST_PUZZLE
      }

      const receivedAction = {
        type: RECEIVED_PUZZLE,
        payload: {
          puzzle: [[4, 5], [5, 4]],
          history: {
            coords: { i: 0, j: 0 },
            value: 4
          },
          difficulty: MEDIUM
        },
        error: false
      }

      const onLoad = (load) => {
        load({
          puzzle: [[4, 5], [5, 4]],
          history: {
            coords: { i: 0, j: 0 },
            value: 4
          },
          difficulty: MEDIUM
        }, null)
      }

      loadPuzzle(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(requestAction)
      expect(actions[1]).to.deep.equal(receivedAction)
    })

    it('should dispatch REQUEST_PUZZLE and RECEIVED_PUZZLE with error when loading puzzle', () => {
      const error = '[ERROR] Could not get get puzzle'

      const requestAction = {
        type: REQUEST_PUZZLE
      }

      const receivedAction = {
        type: RECEIVED_PUZZLE,
        payload: error,
        error: true
      }

      const onLoad = (load) => {
        load({}, error)
      }

      loadPuzzle(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(requestAction)
      expect(actions[1]).to.deep.equal(receivedAction)
    })

    it('should dispatch RECEIVED_PUZZLE when requesting new puzzle', () => {
      const receivedAction = {
        type: RECEIVED_PUZZLE,
        payload: {
          puzzle: [[4, 5], [5, 4]],
          history: [],
          difficulty: MEDIUM
        }
      }

      requestPuzzle(MEDIUM, () => [[4, 5], [5, 4]])(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(receivedAction)
    })
  })

  it('should dispatch RESET_PUZZLE', () => {
    const expectedAction = {
      type: RESET_PUZZLE
    }

    resetPuzzle()(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })

  it('should dispatch SET_TILE', () => {
    const coords = { i: 5, j: 7 }
    const value = 3

    const expectedAction = {
      type: SET_TILE,
      payload: {
        coords,
        value
      }
    }

    setTile(coords, value)(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })

  it('should dispatch SUBMIT_PUZZLE', () => {
    const expectedAction = {
      type: SUBMIT_PUZZLE
    }

    submitPuzzle()(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })

  it('should dispatch CONTINUE_PUZZLE', () => {
    const expectedAction = {
      type: CONTINUE_PUZZLE
    }

    continuePuzzle()(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })

  it('should dispatch UNDO_SET_TILE', () => {
    const expectedAction = {
      type: UNDO_SET_TILE
    }

    undoSetTile()(store.dispatch)
    const actions = store.getActions()
    expect(actions[0]).to.deep.equal(expectedAction)
  })
})
