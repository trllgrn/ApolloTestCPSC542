import React from 'react';
import LogoutButton from '../logout-button';

import { shallow, render, mount } from 'enzyme'
import { renderApollo, cleanup, fireEvent } from '../../test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);
  
  it('renders logout button', async () => {
    const wrapper = render(
      <MockedProvider  addTypename={false}>
          <LogoutButton />
      </MockedProvider>
      );
  });
  
  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');

    const mockCallBack = jest.fn();
    const button = shallow((<button onClick={mockCallBack} />));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);

    /*
    const { getByTestId } = render(<LogoutButton />, { cache });
    fireEvent.click(getByTestId('logout-button'));
    */

    /*
    const wrapper = render(
      <MockedProvider  addTypename={false}>
          <LogoutButton />
      </MockedProvider>
      );
    wrapper.find('StyledButton').prop('onClick')()
    */

    
    /*
    const mockCallBack = jest.fn();
    const button = shallow((<LogoutButton onClick={mockCallBack}></LogoutButton>))
    */
   
    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
  
});
