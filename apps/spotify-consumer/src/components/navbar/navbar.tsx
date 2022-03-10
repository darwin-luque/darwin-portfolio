import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { findTracksAction } from '../../store/actions/music.action';
import { generateRandomString } from '../../../utils';
import { useLocation } from 'react-router-dom';
import { signOutAction } from '../../store/actions/auth.action';
import DesktopNavbar from './desktop-navbar/desktop-navbar';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { user, tokens } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const signInHandler = () => {
    const a = document.createElement('a');
    const state = generateRandomString(16);
    a.href = `${process.env['NX_AUTH_ENDPOINT']}?${queryString.stringify({
      response_type: 'token',
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
  }, []);

  const signOutHandler = () => {
    if (user) {
      dispatch(signOutAction());
    }
  };

  return (
    <DesktopNavbar
      onSignIn={signInHandler}
      onSignOut={signOutHandler}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      showSearchBar={showSearchBar}
      setShowSearchBar={setShowSearchBar}
      tokens={tokens}
      user={user}
    />
  );
};

export default Navbar;
