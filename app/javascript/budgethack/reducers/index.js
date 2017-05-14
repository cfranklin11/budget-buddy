import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import infographics from './infographics';
import departments from './departments';

const rootReducer = combineReducers({
  infographics,
  departments,
  routing: routerReducer
});

export default rootReducer;
