import React, { Component } from 'react';
import { Link } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Image, Thumbnail } from 'react-bootstrap';
import { getAlbums, getImageURL } from '../utils';

// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {album: null};
  }
  componentDidMount() {
    getAlbums().then(res => {

      this.setState({album: res.album});
    });
  }

  isMobile() {
    const MOBILE = {
      Android: 'Android',
      iPhone: 'iPhone',
      iPad: 'iPad'
    };
    console.log(navigator.platform);
    return typeof MOBILE[navigator.platform] !== 'undefined';
  }

  renderAlbum() {
    const {album} = this.state;
    if (!album) {
      return;
    }

    return album.map(a => {
      return (
        <Col key={a.id} xs={6} md={3}>
          <Thumbnail href={`#/album/${a.date}`} alt="171x180" src={`${getImageURL(a.id)}?type=thumbnail`} >
            <h4>{a.albumName}</h4>
          </Thumbnail>
        </Col>
      );
    });
  }

  render() {

    return (
      <div className="content-hd-bg album-container">
        <Grid>
          <Row>
            {this.renderAlbum()}
          </Row>
          </Grid>
      </div>
    );
  }
}
