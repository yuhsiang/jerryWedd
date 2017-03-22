import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../styles/app.scss';
import '../styles/elegant-icons.css';
import '../styles/font-awesome.min.css';

import HeaderNav from './HeaderNav';
import Footer from './Footer';

const App = (props) => (
  <div>
    <HeaderNav></HeaderNav>
    <div className="content">
      { props.children }

    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
