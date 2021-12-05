import React from 'react';
import { cleanup } from '../../test-utils';
import { shallow } from 'enzyme'
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import { MockedProvider } from '@apollo/client/testing';
import { act } from '@testing-library/react';

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<ActionButton />);
    let actionButton = wrapper.find('[data-testid="action-button"]').hostNodes();
    expect(actionButton).toBeDefined();
  });

  it('renders with the correct label', () => {
    const addWrapper = shallow(<ActionButton />);
    let actionButton = addWrapper.find({children: 'Add to Cart'});
    expect(actionButton).toBeDefined();

    // render as Remove Button
    cartItemsVar(['1']);
    const removeWrapper = shallow(<MockedProvider><ActionButton id="1"/></MockedProvider>);
    let removeButton = removeWrapper.find({children: 'Remove from Cart'});
    expect(removeButton).toBeDefined();
    
    // render as Cancel Button
    cartItemsVar([]);
    const cancelWrapper = shallow(<MockedProvider><ActionButton isBooked={true}/></MockedProvider>);
    let cancelButton = cancelWrapper.find({children: 'cancel this trip'});
    expect(cancelButton).toBeDefined();
  });
});
