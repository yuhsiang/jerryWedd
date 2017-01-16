import injectTapEventPlugin from 'react-tap-event-plugin';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
  const muiTheme = getMuiTheme({
    appBar: {
      color: Colors.blueA400,
      textColor: Colors.white,
    },
    raisedButton: {
      primaryColor: Colors.blueA400,
      primaryTextColor: Colors.white,
    },
    textField: {
      focusColor: Colors.blueA400,
    }
  });

  injectTapEventPlugin();
  render(
    <Provider store= { store }>
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Router history={ hashHistory } routes={ routes } />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
}
