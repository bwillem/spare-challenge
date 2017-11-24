import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mapSagasListener from '../map/state/mapSagas'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(mapSagasListener)

export default store