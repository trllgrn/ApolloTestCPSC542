import React from 'react';
import styled from 'react-emotion';

import MenuItem from './menu-item';
import LogoutButton from '../containers/logout-button';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cart.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import { colors, unit } from '../styles';

export default function Footer() {
  return (
    <Container> 
      <InnerContainer>
        <MenuItem to="/" id="footerHome">
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem to="/cart" id="footerCart">
          <CartIcon />
          Cart
        </MenuItem>
        <MenuItem to="/profile" id="footerProfile">
          <ProfileIcon />
          Profile
        </MenuItem>
        <LogoutButton />
      </InnerContainer>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('footer')({
  flexShrink: 0,
  marginTop: 'auto',
  backgroundColor: 'white',
  color: colors.textSecondary,
  position: 'sticky',
  bottom: 0,
});
Container.displayName = "Container"

const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  maxWidth: 460,
  padding: unit * 2.5,
  margin: '0 auto',
});


InnerContainer.displayName= "InnerContainer";