import { QUESTION } from '../constants';

const initialState = {
  title: '',
};

export default function question(state = initialState, action) {
  switch(action.type) {
    case QUESTION.REQUEST:
    case QUESTION.REQUEST_SUCCESS:
    case QUESTION.REQUEST_FAILED:
      return Object.assign({}, state, action.answer);
    default:
      return state;
  }
}
