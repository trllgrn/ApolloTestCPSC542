import React from 'react';

import { render, cleanup } from '../../test-utils';
import Header from '../header';

import { MenuItem } from '..';
import { ReactWrapper } from 'enzyme';

MenuItem.displayName = "MenuItem"

describe('Header', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
        wrapper = renderApollo(<Header />)
    })
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

    it('Check Components are rendered as expected', () => {
    //render(<Header />);

        expect(wrapper.find("InnerContainer").length).toBe(1)
        expect(wrapper.find("MenuItem").length).toBe(3)
  });
});
