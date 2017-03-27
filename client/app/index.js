import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducers from './reducers';
import App from './components/App';
import routes from './routes';

const logger = createLogger();
const store = createStore(rootReducers, applyMiddleware(logger, thunk));

renderApp(store);

function renderApp(store) {

  render(
    <Provider store= { store }>
      <Router history={ hashHistory } routes={ routes } />
    </Provider>,
    document.getElementById('root')
  );
}
