import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { postErrorsReducer } from './posts';

export default combineReducers({
  session: sessionErrorsReducer,
  posts: postErrorsReducer
});