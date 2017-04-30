import React, { Component } from 'react';
import { Link } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Image, Thumbnail } from 'react-bootstrap';
import { getImageURL, getImages } from '../utils';
import Gallery from './Gallery';

// <div className="background"><img src={"images/heart-1.png"} alt=""/></div>

export default class AlbumImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {images: null};
  }
  componentDidMount() {
    const { time } = this.props.params;
    getImages(time).then(res => {

      this.setState({images: res.images});
    });
  }

  renderAlbum() {
    const {images} = this.state;
    if (!images) {
      return;
    }
    return (
      <Gallery images={images.map(({ id }) => ({
        src: getImageURL(id),
        thumbnail: `${getImageURL(id)}?type=thumbnail`,
        srcset: [
        ],
        caption:'',
        orientation:'square',
        useForDemo:true,
      }))} />
    );
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
