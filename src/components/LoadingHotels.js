import React, { Component } from 'react';
import './LoadingHotels.scss';

class LoadingHotels extends Component {
  render() {
    return (
      <div className="LoadingHotels">
        <div className="LoadingHotelsImage">
          <div className="img-anim anim-loading"></div>
        </div>
        <div className="LoadingHotelsInfos">
          <div className="h1-anim anim-loading"></div>
          <div className="h3-anim anim-loading"></div>
          <div className="p-anim">
            <div className="anim-loading"></div>
            <div className="anim-loading"></div>
            <div className="anim-loading"></div>
          </div>
          <div className="btn-anim anim-loading"></div>
        </div>
      </div>
    );
  }
}

export default LoadingHotels;
