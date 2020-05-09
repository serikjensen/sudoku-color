import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Global, css } from '@emotion/core'
import { throttle } from 'throttle-debounce'

import SudokuColorApp from './components/SudokuColorApp'
import store from './store'
import savePuzzle from './util/savePuzzle'

store.subscribe(throttle(1000, () => {
  const { puzzle } = store.getState()
  savePuzzle(puzzle)
}))

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Global styles={css`
        body {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
        }
      `}
      />
      <SudokuColorApp />
    </React.Fragment>
  </Provider>,
  document.getElementById('app')
)
