import React from 'react';

import { shallow } from 'enzyme';
import LaunchTile from '../launch-tile';

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);

  it('renders without error', () => {
    shallow(
      <LaunchTile
        launch={{
          __typename: 'Launch',
          isBooked: false,
          id: '1',
          mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
          rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
        }}
      />,
    );
  });
});