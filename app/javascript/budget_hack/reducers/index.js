import { combineReducers } from 'redux';
import departments from './departments';

const rootReducer = combineReducers({
  departments,
});

export default rootReducer;
