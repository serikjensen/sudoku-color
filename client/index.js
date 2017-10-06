import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import SudokuColorApp from './components/SudokuColorApp'
import store from './store'

ReactDOM.render(
  <Provider store={store}><SudokuColorApp /></Provider>,
  document.getElementById('app')
)
