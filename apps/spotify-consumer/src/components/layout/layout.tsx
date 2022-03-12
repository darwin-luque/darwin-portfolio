import { ReactNode, useEffect } from 'react';
import queryString from 'query-string';
import Navbar from '../navbar/navbar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { signInFirebaseAction, signInSpotifyAction } from '../../store/actions/auth.action';
import { SpotifyAuthResponse } from '../../types';
import classes from './layout.module.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const spotifyQuery = queryString.parse(location.hash || location.search);

    console.log(tokens);

    if (!tokens?.spotify && spotifyQuery['access_token']) {
      dispatch(
        signInSpotifyAction(
          // The SpotifyAuthResponse is based on the query of the api
          spotifyQuery as unknown as SpotifyAuthResponse,
          !tokens?.firebase
        )
      );
    } else if (!tokens?.firebase && spotifyQuery['apiKey'] && user) {
      dispatch(signInFirebaseAction(user));
    }
  }, [location, tokens, user]);

  return (
    <div className={classes['layout']}>
      <div className={classes['navbar']}>
        <Navbar />
      </div>
      <div className={classes['app']}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
