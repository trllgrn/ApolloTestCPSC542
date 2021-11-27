import React from 'react';

import {
    cleanup
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import { shallow, mount, render } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';

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

describe('Cart Page Suite', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    const wrapper = mount(<MockedProvider cache={cache}><Cart /></MockedProvider>);
    expect(wrapper.find('[data-testid="empty-message"]')).toBeDefined();
    expect(wrapper.contains('No items in your cart')).toBeTruthy();
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    cartItemsVar(['1']);
    const wrapper = mount(<MockedProvider mocks={mocks} cache={cache}><Cart /></MockedProvider>);
    expect(wrapper.find('book-button')).toBeDefined();
    expect(wrapper.contains('Book All')).toBeTruthy();
  });
});
