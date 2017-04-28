import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import sectionBreak from '../images/section-title-after.png';
import GoogleMap from './google_map';
// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class Wedding extends React.Component {

  render() {
    return (
      <div className="detail font-playball">
        <h2>婚宴</h2>
        <img src={sectionBreak} />
        <div className="section">
          <h4>- Date & Time -</h4>
          <p><strong>2017. 5. 20</strong></p>
          <p>10:00 - 佛化婚禮</p>
          <p>12:00 - 👰婚宴開始💐</p>
        </div>
        <div className="section">
          <h4>- Location -</h4>
          <h4>『典禮』佛光山大雄寶殿</h4>
        </div>
        <div style={{height: '300px', paddingBottom: '20px'}}>
        <GoogleMap lat={22.751720} lon={120.445359} name={'Victoria Hotel'}/>
        </div>
        <div className="section">
          <h4>『婚宴』佛陀紀念館禮敬大廳</h4>
        </div>
        <div style={{height: '300px', paddingBottom: '20px'}}>
          <GoogleMap lat={22.755542} lon={120.445631} name={'Victoria Hotel'}/>
        </div>
      </div>
    );
  }
}
