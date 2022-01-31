import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import reducer from './state/reducersRoot';
import sagas from './state/sagasRoot';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunkMiddleware, sagaMiddleware];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
)

store.runSagaTask = () => {
	store.sagaTask = sagaMiddleware.run(sagas);
};

store.runSagaTask();

export default store;