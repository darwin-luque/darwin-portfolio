import { generateRandomString } from '../../../utils';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import ProfileSection from './profile-section/profile-section';
import NavbarElement from './navbar-elements/navbar-elements';
import SearchBar from './search-bar/search-bar';
import { useEffect, useState } from 'react';
import { findTracksAction } from '../../store/actions/music.action';

const pagesElements = [
  {
    id: 0,
    name: 'Home',
    to: '/',
  },
  {
    id: 1,
    name: 'Library',
    to: '/library',
  },
];

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { user, tokens } = useAppSelector((state) => state.auth);
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
  }, []);

  return (
    <nav>
      <ProfileSection user={user} onSignIn={signInHandler} />
      <div>
        {pagesElements.map((element) => (
          <NavbarElement {...element} key={element.id} />
        ))}
        <SearchBar
          showBar={showSearchBar}
          onToggleBar={setShowSearchBar}
          onInputChange={setSearchValue}
        />
      </div>
    </nav>
  );
};

export default Navbar;
