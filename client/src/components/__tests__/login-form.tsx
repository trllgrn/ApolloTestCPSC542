import React from 'react';
import { shallow, ReactWrapper, mount } from 'enzyme';
import LoginForm from '../login-form';
import { debug } from 'console';


describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);

  let wrapper: ReactWrapper;
  
  it('renders without error', () => {
    const wrapper = shallow(<LoginForm login={() => {}}/>);
    //const element = wrapper.find("Space Explorer")
    expect(wrapper.exists()).toBeTruthy()
    //expect(element.exists()).toBe(true)
  });

});
