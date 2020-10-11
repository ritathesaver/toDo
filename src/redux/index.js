import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { logger } from './middlewares/logger'
import { rootSaga } from './sagas'
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)
