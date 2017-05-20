/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

const enhancers = compose(window.devToolsExtension ?
  window.devToolsExtension() :
  f => f);
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
  enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}
export default store;
