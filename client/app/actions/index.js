import { QUESTION, ANSWER } from '../constants';
import { getQuestion, getAnswer } from '../utils';

export {
  requestQuestion,
  requestAnswer,
};

function requestQuestion() {
  return (dispatch, getState) => {
    dispatch({
      type: QUESTION.REQUEST,
      isLoading: true,
    });

    getQuestion()
      .then(response => {
        console.info('get question success:', response);
        const { question } = response;
        dispatch({
          type: QUESTION.REQUEST_SUCCESS,
          isLoading: false,
          question,
        });
      })
      .catch(err => {
        console.error('get question failed:', err);
        dispatch({
          type: QUESTION.REQUEST_FAILED,
          isLoading: false,
          err,
        });
      });
  };
}

function requestAnswer({ qId }) {
  return (dispatch, getState) => {
    dispatch({
      type: ANSWER.REQUEST,
      isLoading: true,
    });

    getAnswer(qId)
      .then(response => {
        console.info('get answer success:', response);
        const { question } = response;
        dispatch({
          type: ANSWER.REQUEST_SUCCESS,
          isLoading: false,
          question,
        });
      })
      .catch(err => {
        console.error('get answer failed:', err);
        dispatch({
          type: ANSWER.REQUEST_FAILED,
          isLoading: false,
          err,
        });
      });
  };
}
