import React from 'react';

import { cleanup } from '../../test-utils';
import Header from '../header';

import { MenuItem } from '..';
import { shallow } from 'enzyme';

MenuItem.displayName = "MenuItem"

describe("Renders the Header", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("Renders user title and user email", () => {
    const wrapper = shallow(<Header />);
    let userTitle = wrapper.find({children: 'Space Explorer'});
    expect(userTitle).toBeDefined();
    let userEmail = wrapper.find('[id="profileEmail"]');
    expect(userEmail).toBeDefined();
  });
});