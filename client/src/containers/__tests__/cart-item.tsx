import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing'

import {
  cleanup,
} from '../../test-utils';

import CartItem, { GET_LAUNCH } from '../cart-item';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('cart item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('queries item and renders without error', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
          <CartItem launchId={'1'} />
      </MockedProvider>
      )
    wrapper.find('loading')
    expect(wrapper.find('test mission')).toBeTruthy();
  });

  it('renders with error state', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        error: new Error('errorerror'),
      },
    ];
    const wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
          <CartItem launchId={'1'} />
      </MockedProvider>
      )
    expect(wrapper.find('errorerror')).toBeTruthy();
  });
});