import React from 'react';
<<<<<<< HEAD
import {
  renderApollo, cleanup, waitForElement,
=======
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing'

import {
  cleanup,
>>>>>>> f800897dda71a3573e4d206e2652fdb1a5a1b49d
} from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';
import { shallow, mount, render } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { act } from '@testing-library/react';
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