import { useWindowSize } from '@darwin-portfolio/react/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { findTracksAction } from '../../store/actions/music.action';
import { generateRandomString } from '../../utils';
import { signOutAction } from '../../store/actions/auth.action';
import DesktopNavbar from './desktop-navbar/desktop-navbar';
import MobileNavbar from './mobile-navbar/mobile-navbar';
import classes from './navbar.module.css';

export interface NavbarProps {
  /**
   * For testing purpose only!
   */
  staticWidth?: number
}

const Navbar = ({ staticWidth }: NavbarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { user, tokens } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const isMobile = 768 >= (staticWidth ?? width ?? 0);

  const signInHandler = () => {
    const a = document.createElement('a');
    const state = generateRandomString(16);
    a.href = `${process.env['NX_AUTH_ENDPOINT']}/authorize?${queryString.stringify({
      response_type: 'code',
      client_id: process.env['NX_CLIENT_ID'],
      scope: 'user-read-private user-read-email',
      redirect_uri: process.env['NX_REDIRECT_URI'],
      state,
    })}`;

    a.click();
  };

  useEffect(() => {
    // Trigger a search everytime the user stops typing
    const timeoutId = setTimeout(() => {
      if (searchValue && tokens) {
        dispatch(findTracksAction(tokens, searchValue));
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue, dispatch, tokens]);

  const signOutHandler = () => {
    if (user) {
      dispatch(signOutAction());
    }
  };

  const ResponsiveNavbar = isMobile ? MobileNavbar : DesktopNavbar;

  return (
    <span className={classes['navbar']} data-testid="navbar">
      <ResponsiveNavbar
        setSearchValue={setSearchValue}
        pathname={location.pathname}
        onSignOut={signOutHandler}
        searchValue={searchValue}
        onSignIn={signInHandler}
        tokens={tokens}
        user={user}
      />
    </span>
  );
};

export default Navbar;
