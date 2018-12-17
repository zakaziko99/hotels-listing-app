import axios from 'axios';

const fetchHotels = () => axios.get('http://fake-hotel-api.herokuapp.com/api/hotels');

export default fetchHotels;
