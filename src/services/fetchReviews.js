import axios from 'axios';

const fetchReviews = (idHotel) => axios.get(
  `http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${idHotel}`
);

export default fetchReviews;
