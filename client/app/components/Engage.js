import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import sectionBreak from '../images/section-title-after.png';
import GoogleMap from './google_map';
// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class Engage extends React.Component {

  render() {
    return (
      <div className="detail font-playball">
        <h2>訂婚宴</h2>
        <img src={sectionBreak} />

        <div className="section">
          <h4>- Time: <strong>5/ 6</strong> -</h4>
          <p>11:30 - 🍹雞尾酒🍹</p>
          <p>12:00 - 👰婚宴開始💐</p>
        </div>
        <div className="section">
          <h4>- Location -</h4>
          <h4>Grand Victoria Hotel</h4>
          <h4>維多麗亞酒店</h4>
        </div>
        <div style={{height: '400px', paddingBottom: '20px'}}>
          <GoogleMap lat={25.084208} lon={121.558756} name={'Victoria Hotel'}/>
        </div>
      </div>
    );
  }
}
