import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';


import infographics from './data/infographics';

// create an object for the default data
const defaultState = {
  infographics,
};

const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(rootReducer, defaultState, applyMiddleware(thunkMiddleware), enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}
export default store;
