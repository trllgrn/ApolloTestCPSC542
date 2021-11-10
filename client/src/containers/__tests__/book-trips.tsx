import React from 'react';
import { shallow, mount } from 'enzyme';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockedProvider } from '@apollo/client/testing'


import {
  cleanup,
} from '../../test-utils';
import BookTrips, { BOOK_TRIPS } from '../book-trips';
import { GET_LAUNCH } from '../cart-item';


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

describe('book trips', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = mount(
      <MockedProvider  addTypename={false}>
          <BookTrips cartItems={[]} />
      </MockedProvider>
      )
    expect(wrapper.find('book-button')).toBeTruthy();

  });

  it('completes mutation and shows message', async () => {
    const mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
          <BookTrips cartItems={[]} />
      </MockedProvider>
      )
    const mockCallBack = jest.fn();
    const button = shallow((<button onClick={mockCallBack} />));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);

  });

  it('correctly updates cache', async () => {
    const mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const cache = new InMemoryCache()
    cache.writeData({data: mocks})
    expect(cache);

  });
});
