import { useEffect, useState } from 'react';
import queryString from 'query-string';
import ProfileSection from './profile-section/profile-section';
import NavbarElement from './navbar-element/navbar-element';
import SearchBar from './search-bar/search-bar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { findTracksAction } from '../../store/actions/music.action';
import { generateRandomString } from '../../../utils';
import classes from './navbar.module.css';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowIcon from '../../assets/icons/arrow.icon';
import { signOutAction } from '../../store/actions/auth.action';

const pagesElements = [
  {
    id: 0,
    name: 'Home',
    to: '/',
  },
  {
    id: 1,
    name: 'My Library',
    to: '/library',
  },
];

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
    <nav className={classes['navbar']}>
      <ProfileSection tokens={tokens} user={user} onSignIn={signInHandler} />
      <div className={classes['navbar-elements']}>
        {pagesElements.map((element) => (
          <NavbarElement
            {...element}
            show={element.to === '/library' ? !!user : true}
            selected={location.pathname === element.to}
            key={element.id}
          />
        ))}
        {location.pathname === '/' && !!user && (
          <SearchBar
            showBar={showSearchBar}
            onToggleBar={setShowSearchBar}
            onInputChange={setSearchValue}
          />
        )}
        {!!user && (
          <motion.button
            onClick={signOutHandler}
            whileHover={{ scale: 1.02, cursor: 'pointer' }}
            className={classes['sign-out']}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowIcon />
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
