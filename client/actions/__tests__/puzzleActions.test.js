import configureStore from 'redux-mock-store'

import {
  CONTINUE_PUZZLE,
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE,
  SUBMIT_PUZZLE
} from '../../constants/actionTypes'

import {
  continuePuzzle,
  requestPuzzle,
  resetPuzzle,
  setTile,
  submitPuzzle
} from '../puzzleActions'

const mockStore = configureStore()
const store = mockStore()

describe('puzzleActions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('REQUEST_PUZZLE and RECEIVED_PUZZLE', () => {
    it('should dispatch REQUEST_PUZZLE and RECEIVED_PUZZLE', () => {
      const requestAction = {
        type: REQUEST_PUZZLE
      }

      const receivedAction = {
        type: RECEIVED_PUZZLE,
        payload: {
          puzzle: [[4, 5], [5, 4]]
        },
        error: false
      }

      const onLoad = (load) => {
        load([[4, 5], [5, 4]], null)
      }

      requestPuzzle(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(requestAction)
      expect(actions[1]).to.deep.equal(receivedAction)
    })

    it('should dispatch REQUEST_PUZZLE and RECEIVED_PUZZLE with error', () => {
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
        load(undefined, error)
      }

      requestPuzzle(onLoad)(store.dispatch)
      const actions = store.getActions()
      expect(actions[0]).to.deep.equal(requestAction)
      expect(actions[1]).to.deep.equal(receivedAction)
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
})
