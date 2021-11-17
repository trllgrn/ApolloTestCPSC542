import React from 'react';
import LogoutButton from '../logout-button';

import { shallow, render } from 'enzyme'
import { renderApollo, cleanup, fireEvent } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);
  
  it('renders logout button', async () => {
    shallow(<LogoutButton />);
  });
  
  
  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    //const { getByTestId } = render(<LogoutButton />, { cache });
    //fireEvent.click(getByTestId('logout-button'));

    const button = shallow((<LogoutButton />));
    button.find('button').simulate('click');

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
  
});
