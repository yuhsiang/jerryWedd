import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Question from './components/Question';
import PageNotFound from './components/PageNotFound';
import GoogleForm from './components/GoogleForm';
import Album from './components/Album';
import AlbumImages from './components/AlbumImages';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="form" component={ GoogleForm } />
    <Route path="album" component={ Album } />
    <Route path="album/:time" component={ AlbumImages } />
    <Route path="*" component={ PageNotFound } />
  </Route>
);

export default routes;
