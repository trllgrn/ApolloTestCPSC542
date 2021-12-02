import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';
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
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  trips: [mockLaunch],
};

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page', async () => {
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];
    const wrapper = mount(<MockedProvider mocks={mocks}><Profile /></MockedProvider>);
    await act( async () => {  
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
    let missionName = wrapper.find({children: 'test mission'});
    expect(missionName.text()).toMatch('test mission');
  });
});
