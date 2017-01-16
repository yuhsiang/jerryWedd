import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar } from 'material-ui';
import '../styles/app.scss';

const App = (props) => (
  <div>
    <AppBar
      title="Year Party" />
    { props.children }
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
