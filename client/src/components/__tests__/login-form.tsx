import React from 'react';
import { render, ReactWrapper } from 'enzyme';
import LoginForm from '../login-form';


describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);

  let wrapper: ReactWrapper;

  it('renders without error', () => {
    render(<LoginForm login={() => {}}/>);
    
  });

  it("loads css without error", () => {
    const element = wrapper.find("css")

    expect(element.exists()).toBe(true)
    console.log(wrapper.debug)
  })

  it("renders container style components without error", () => {
    const element = wrapper.find("div")
    const styles = getComputedStyle(element.getDOMNode())

    expect(styles.display).toBe("flex")
    expect(styles.color).toBe("white")
    expect(styles.alignItems).toBe("center")
  })

});
