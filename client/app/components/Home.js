import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, RaisedButton } from 'material-ui';

const Home = (props) => (
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

export default Home;
