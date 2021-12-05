import React from 'react';
import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';

import { MenuItem } from '..';
import { ReactWrapper } from 'enzyme';

MenuItem.displayName = "MenuItem"



describe("Footer", () => {
let wrapper: ReactWrapper
beforeEach(()=>{
wrapper = renderApollo(<Footer />)
})
// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Check Components are rendered as expected', () => {

expect(wrapper.find("InnerContainer").length).toBe(1)
expect(wrapper.find("MenuItem").length).toBe(3)

})
});