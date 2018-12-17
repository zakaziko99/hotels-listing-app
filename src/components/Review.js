import React, { Component } from 'react';
import './Review.scss';

class Review extends Component {
  render() {
    const {name, comment, positive} = this.props.data;
    return (
      <div className="Review">
        {positive ? (
          <span className="positive">&#9786;</span>
          ) : (
          <span>&#9785;</span>
        )}
        <h2>{name}</h2>
        <p>{comment}</p>
      </div>
    );
  }
}

export default Review;
