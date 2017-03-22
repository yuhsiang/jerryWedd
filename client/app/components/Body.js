import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import heart from '../images/heart-1.png';
import Engage from './Engage';
import Wedding from './Wedding';
import Protagonist from './Protagonist';
// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class Body extends React.Component {

  isMobile() {
    const MOBILE = {
      Android: 'Android',
      iPhone: 'iPhone',
      iPad: 'iPad'
    };
    console.log(navigator.platform);
    return typeof MOBILE[navigator.platform] !== 'undefined';
  }

  render() {
    var background = 'background';
    if (this.isMobile()) {
      background = 'background-mb';
    }
    return (
      <div className="content-hd-bg">
        <div className={background}>
          <div className="snow"></div>
          <div className="wedding-main">
            <img className="responsive-heart" src={'images/heart-1.png'} alt=""/>
            <span className="heart-name text-theme-color">Jerry & Stacy</span>
            <span className="heart-subtitle">Are Getting Married at 20 May 2017</span>
          </div>
        </div>
        <div className="protagonist">
          <Protagonist />
        </div>
        <div className="info-container">
          <Engage />
          <Wedding />
        </div>
      </div>
    );
  }
}
