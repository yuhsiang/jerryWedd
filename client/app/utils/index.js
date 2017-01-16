import superAgent from 'superagent';

const API_PATH = 'http://139.162.49.146/api';

export function getQuestion() {
  return new Promise((resolve, reject) => {
    const requestUrl = `${API_PATH}/question/start`;
    superAgent
      .post(requestUrl)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.body);
      });
  });
}

export function getAnswer(qId) {
  return new Promise((resolve, reject) => {
    const requestUrl = `${API_PATH}/question/${qId}`;
    superAgent
      .get(requestUrl)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.body);
      });
  });
}
