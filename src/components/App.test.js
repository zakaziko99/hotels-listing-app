import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

configure({ adapter: new Adapter() });

describe('Testing fetching API data', () => {
  it('renders hotels when it fetched data successfully', () => {
    const wrapper = shallow(<App />);

    //initial state of hotels
    expect(wrapper.state().hotels).toEqual([]);
    // click on the 'Load Hoels' button and expect a loading state
    wrapper.find('button').prop('onClick')({preventDefault: () => {}});
    wrapper.update();
    expect(wrapper.state().isLoading).toEqual(true);
  });
});
