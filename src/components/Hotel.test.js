import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Hotel from './Hotel';

configure({ adapter: new Adapter() });

describe('Testing Hotel component display', () => {
  const hotel = {
    id: 'id1', name: 'Hotel 1', city: 'Berlin', country: 'Germany',
    description: 'Desc 1', stars: 4, price: 590,
    images: []
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Hotel data={hotel} />);
  });

  it('contains a name', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should have 4 stars rate', () => {
    expect(wrapper.find('span.HotelRatingValue')).toHaveLength(4);
  });

  it('should be located in Berlin, Germany', () => {
    expect(wrapper.find('h3').text()).toEqual('Berlin - Germany');
  });
});
