import React from 'react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { expect, find, mount } from '@instructure/ui-test-utils'

import SudokuColorApp from '../index'
import { puzzle1 } from '../../../util/__tests__/testPuzzles'
import { RECEIVED_PUZZLE, REQUEST_PUZZLE } from '../../../constants/actionTypes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<SudokuColorApp />', async () => {
  it('should call requestPuzzle when mounted', async () => {
    const store = mockStore()

    await mount(
      <Provider store={store}>
        <SudokuColorApp />
      </Provider>
    )

    const actions = store.getActions()

    expect(actions[0].type).to.equal(REQUEST_PUZZLE)
    expect(actions[1].type).to.equal(RECEIVED_PUZZLE)
  })

  it('should display loading while loading puzzle', async () => {
    const store = mockStore()

    await mount(
      <Provider store={store}>
        <SudokuColorApp />
      </Provider>
    )

    expect(await find(':contains(Loading)')).to.exist()
  })

  it('should not display loading after puzzle is loaded', async () => {
    const store = mockStore({
      puzzle: {
        puzzle: puzzle1,
        requestingPuzzle: false
      }
    })

    await mount(
      <Provider store={store}>
        <SudokuColorApp requestingPuzzle={false} />
      </Provider>
    )

    expect(await find(':contains(Loading)', { expectEmpty: true })).to.not.exist()
  })
})
