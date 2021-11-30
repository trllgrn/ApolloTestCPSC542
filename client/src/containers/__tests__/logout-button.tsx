import React from 'react';
import LogoutButton from '../logout-button';

import { renderApollo, cleanup, fireEvent } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import { shallow, render, mount } from 'enzyme'

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    const wrapper = render(
      <MockedProvider  addTypename={false}>
          <LogoutButton />
      </MockedProvider>
      );
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');

    //Use enzyme render for button
    const wrapper = shallow(<LogoutButton />);
    wrapper.find({ "data-testid": "logout-button" }).simulate("click");
    

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});