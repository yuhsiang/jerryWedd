import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class Protagonist extends React.Component {

  render() {
    return (
      <div className="prot-container">
        <div className="groom">
          <div className="display">
          </div>
          <div className="intro">
          </div>
          <div className="icon">
            <span>Groom</span>
          </div>
        </div>
      </div>
    );
  }
}
