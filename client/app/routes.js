import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Question from './components/Question';
import PageNotFound from './components/PageNotFound';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="question" component={ Question } />
    <Route path="*" component={ PageNotFound } />
  </Route>
);

export default routes;
