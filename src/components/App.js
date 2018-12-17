import React, { Component } from 'react';
import './App.scss';
import Hotel from './Hotel';
import LoadingHotels from './LoadingHotels';
import fetchHotels from '../services/fetchHotels';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      hotels: [],
      error: false
    };
  }

  loadHotels = (event) => {
    const {isLoading} = this.state;

    // if in a loading process, cancel the action
    if (isLoading) return;
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    setTimeout(() => {
      fetchHotels()
        .then(result => this.setLoadedHotels(result.data))
        .catch(error => this.setErrorLoadedHotels(error.message || error));
    }, 2000); // To give a small time to the animation loading content to display correctly
  };

  displayHotels = (hotels) => (
    hotels.map(hotel => (
      <Hotel data={hotel} key={hotel.id} />
    ))
  );

  setLoadedHotels = (hotels) => {
    this.setState({
      isLoading: false,
      hotels: hotels.slice(0, 5),
      error: null
    });
  };

  setErrorLoadedHotels = (error) => {
    this.setState({
      isLoading: false,
      hotels: [],
      error
    });
  };

  displayError = () => (
    <div className="loading-error">An error occured while loading Hotels</div>
  );

  render() {
    const {isLoading, hotels, error} = this.state;
    return (
      <div className="App">
        <div className="container-btn-loader">
          <button onClick={this.loadHotels}
            className={isLoading ? 'disabled' : ''}>Load Hotels</button>
        </div>

        <div className="container-hotels">
          {isLoading && (<LoadingHotels />)}
          {!isLoading && !error && hotels && this.displayHotels(hotels)}
          {!isLoading && error && this.displayError()}
        </div>
      </div>
    );
  }
}

export default App;
