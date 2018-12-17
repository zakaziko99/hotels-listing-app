import React, { Component } from 'react';
import axios from 'axios';
import './Hotel.scss';
import Review from './Review';
import fetchReviews from '../services/fetchReviews';

class Hotel extends Component {
  constructor() {
    super();

    // loadedReviews is to check if the reviews are loaded, to prevent call the api one more time
    this.state = {
      loadedReviews: false,
      hidingReviews: true,
      isLoading: false,
      reviews: [],
      error: null
    };
  }

  displayGermanDate = (date) => {
    const oDate = new Date(date);
    let day = oDate.getDate();
    let month = oDate.getMonth() + 1;
    let year = oDate.getFullYear();
    day = (day < 10 ? '0' : '') + day;
    month = (month < 10 ? '0' : '') + month;
    return `${month}.${day}.${year}`;
  };

  displayStars = (stars) => {
    const {id} = this.props.data;
    let ratedStars = [];
    let blankStars = [];
    for (let index = 1; index < 6; index++) {
      if (index <= stars) {
        ratedStars.push(<span className="HotelRatingValue" key={id + 'star' + index}>&#9733;</span>);
      } else {
        blankStars.push(<span key={id + 'star' + index}>&#9733;</span>);
      }
    }
    return (
      <span>{ratedStars}{blankStars}</span>
    );
  };

  loadReviews = (event) => {
    const {isLoading, loadedReviews, hidingReviews} = this.state;

    // if in a loading process, cancel the action
    if (isLoading) return;
    event.preventDefault();

    if (!hidingReviews) {
      // reviews already loaded and displayed, just have to hide them
      this.setState({
        hidingReviews: true
      });
    } else {
      if (loadedReviews) {
        // reviews already loaded and hided, just have to show them
        this.setState({
          hidingReviews: false
        });
      } else {
        // reviews not loaded, must fetch and display them
        this.setState({
          isLoading: true
        });

        fetchReviews(this.props.data.id)
          .then(result => this.setLoadedReviews(result.data))
          .catch(error => this.setErrorLoadedReviews(error.message || error));
      }
    }
  };

  setLoadedReviews = (reviews) => {
    this.setState({
      loadedReviews: true,
      isLoading: false,
      reviews: reviews,
      error: null
    });
    this.slideDownReviews();
  };

  setErrorLoadedReviews = (error) => {
    this.setState({
      loadedReviews: false,
      isLoading: false,
      reviews: [],
      error
    });
    this.slideDownReviews();
  };

  slideDownReviews = () => {
    setTimeout(() => {
      // this allows to show the animation of slide down after 0.5s
      this.setState({
        hidingReviews: false
      });
    }, 500);
  };

  displayReviews = (reviews) => {
    const {id} = this.props.data;
    return reviews.map((review, index) => (
      <Review data={review} key={id + index} />
    ))
  };

  render() {
    const {isLoading, reviews, loadedReviews, hidingReviews, error} = this.state;
    const {name, city, country, images, stars, price, description} = this.props.data;
    const dateStart = this.props.data['date_start'];
    const dateEnd = this.props.data['date_end'];
    const btnShowReviewsClass = 'load-reviews-btn' + (isLoading ? ' disabled' : '');
    const containerReviewsClass = 'container-reviews' + (hidingReviews ? '' : ' open');
    return (
      <div className="Hotel">
        <div className="HotelImage">
          {images.length && (<img src={images[0]} alt={name} />)}
          {!images.length && (<span>Image</span>)}
        </div>
        <div className="HotelInfos">
          <div className="HotelRating">{this.displayStars(stars)}</div>
          <h1>{name}</h1>
          <h3>{city} - {country}</h3>
          <p>{description}</p>
          <div className="HotelPrice">
            <span>{price} &euro;</span>
            <small>{this.displayGermanDate(dateStart)} - {this.displayGermanDate(dateEnd)}</small>
          </div>
          <button className={btnShowReviewsClass} onClick={this.loadReviews}
            disabled={isLoading ? 'disabled' : ''}>{hidingReviews ? 'Show' : 'Hide'} Reviews</button>
        </div>
        <div className={containerReviewsClass}>
          {error && (
          <div className="loading-error">An error occured while loading reviews for this hotel</div>
          )}
          {!error && loadedReviews && this.displayReviews(reviews)}
        </div>
      </div>
    );
  }
}

export default Hotel;
