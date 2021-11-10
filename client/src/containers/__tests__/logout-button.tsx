import React from 'react';
import LogoutButton from '../logout-button';

import { render } from 'enzyme'
//import { cleanup, fireEvent } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);

  it('renders logout button', async () => {
    render(<LogoutButton />);
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    //const { getByTestId } = render(<LogoutButton />, { cache });
    //fireEvent.click(getByTestId('logout-button'));
    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
