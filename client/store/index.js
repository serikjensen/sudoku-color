import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import reducer from '../reducers'

const middleware = applyMiddleware(promiseMiddleware, thunk, createLogger())

export default createStore(reducer, middleware)
