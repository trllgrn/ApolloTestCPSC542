import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing'

import {
  cleanup,
} from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const wrapper = mount(
      <MockedProvider  mocks={mocks} addTypename={false}>
          <Launch launchId={1} />
      </MockedProvider>
      )
    expect(wrapper.find("test mission")).toBeTruthy();
  });
});
