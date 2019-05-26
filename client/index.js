import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import SudokuColorApp from './components/SudokuColorApp'
import store from './store'
import { GlobalStyles } from './styles'

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <GlobalStyles />
      <SudokuColorApp />
    </React.Fragment>
  </Provider>,
  document.getElementById('app')
)
