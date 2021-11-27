import React, { Children } from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
  act,
} from '../../test-utils';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { shallow, mount, render } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { LoginForm } from '../../components';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  it('renders the login page with email input', () => {
    const wrapper = mount(<MockedProvider><Login /></MockedProvider>);
    let emailInput = wrapper.find('[data-testid="login-input"]').hostNodes();
    expect(emailInput.prop('placeholder')).toBe('Email');
  });

  it('renders the login page with log in button', async () => {
    const wrapper = mount(<MockedProvider><Login /></MockedProvider>);
    expect(wrapper.find('button')).toBeDefined();
    expect(wrapper.contains([<button type="submit" className="css-wwcn44">Log in</button>])).toBeTruthy();
  });
});
