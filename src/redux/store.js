import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/reducer';
import * as actionCreators from './actions/actions';

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
