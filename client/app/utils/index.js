import superAgent from 'superagent';

const API_PATH = '';

export function getImageURL(id) {
  return `${API_PATH}/files/display/${id}`;
}

export function getImages(range) {
  return new Promise((resolve, reject) => {
    const requestUrl = `${API_PATH}/files/album/${range}`;
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

export function getAlbums() {
  return new Promise((resolve, reject) => {
    const requestUrl = `${API_PATH}/files/album/`;
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
