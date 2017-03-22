import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import Body from './Body';

/*
const Home1 = (props) => (
  <Card className="container">
    <h2 className="card-heading">Year Party Game</h2>
    <div className="button-line">
      <RaisedButton type="button" label="開始" primary
        containerElement={<Link to="/question" />} />
    </div>
  </Card>
);

Home.propTypes = {

};
*/

const Home = (props) => (
  <div className="content-bg">
    <Body></Body>
  </div>
);

export default Home;
