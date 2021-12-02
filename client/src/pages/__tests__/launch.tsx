import React from 'react';
import {
  renderApollo, cleanup, waitForElement,
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
    const wrapper = mount(<MockedProvider mocks={mocks}><Launch /></MockedProvider>);
      await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
          wrapper.update();
      });
      let missionName = wrapper.find({ children: 'test mission' });
      expect(missionName.text()).toMatch('test mission');
      // const { getByText } = await renderApollo(<Launch launchId={1} />, {
    //  mocks,
   //   resolvers: {}
   // });
   // await waitForElement(() => getByText(/test mission/i));
  });
});
