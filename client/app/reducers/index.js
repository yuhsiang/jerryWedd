import { combineReducers } from 'redux';
import question from './question';
import answer from './answer';

const rootReducers = combineReducers({
  question,
  answer,
});

export default rootReducers;
