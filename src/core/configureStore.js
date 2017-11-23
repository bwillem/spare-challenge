import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mapSagasListener from '../map/state/mapSagas'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mapSagasListener)

export default store