import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Global, css } from '@emotion/core'

import SudokuColorApp from './components/SudokuColorApp'
import store from './store'

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
