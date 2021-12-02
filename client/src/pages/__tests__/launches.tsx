import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { renderApollo, cleanup, waitForElement,
} from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';
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
describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];
    const wrapper = mount(<MockedProvider mocks={mocks}><Launches /></MockedProvider>);
      await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
          wrapper.update();
      });
      let missionName = wrapper.find({ children: 'test mission' });
      expect(missionName.text()).toMatch('test mission');
    //const { getByText } = await renderApollo(<Launches />, {
    //  mocks,
    //  cache,
    //});
    //await waitForElement(() => getByText(/test mission/i));
  });
});
