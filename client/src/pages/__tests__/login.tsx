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

  it('renders login page', async () => {
    const wrapper = mount(<MockedProvider><Login /></MockedProvider>);
    expect(wrapper.find('button')).toBeDefined();
    expect(wrapper.contains([<button type="submit" className="css-wwcn44">Log in</button>])).toBeTruthy();
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: {query: LOGIN_USER, variables: {email: 'a@a.a'}},
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];

    const wrapper = mount(<MockedProvider mocks= {mocks} cache = {cache}><Login /></MockedProvider>);
    //enter email address

    wrapper.find('[data-testid="login-input"]').hostNodes().getDOMNode().nodeValue = 'a@a.a';
    wrapper.find('[data-testid="login-input"]').hostNodes().simulate('change');
    await act( async () => {
      wrapper.find('button').simulate('click');
    });
    wrapper.update();
    // const {getByText, getByTestId} = await renderApollo(<Login />, {
    //   mocks,
    //   cache,
    // });

    // fireEvent.change(getByTestId('login-input'), {
    //   target: {value: 'a@a.a'},
    // });

    // fireEvent.click(getByText(/log in/i));

    // // login is done if loader is gone
    // await waitForElement(() => getByText(/log in/i));

    //expect(isLoggedInVar()).toBeTruthy();
  });
});
