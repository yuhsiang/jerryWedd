import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Question from './components/Question';
import PageNotFound from './components/PageNotFound';
import GoogleForm from './components/GoogleForm';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="form" component={ GoogleForm } />
    <Route path="*" component={ PageNotFound } />
  </Route>
);

export default routes;
