import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import departments from './departments';

const rootReducer = combineReducers({
  departments,
  routing: routerReducer,
});

export default rootReducer;
