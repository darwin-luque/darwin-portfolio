import { useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import queryString from 'query-string';
import Navbar from '../navbar/navbar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  refreshTokenAction,
  signInFirebaseAction,
  signInSpotifyAction,
} from '../../store/actions/auth.action';
import { SpotifyAuthResponse } from '../../types';
import classes from './layout.module.css';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const spotifyQuery = queryString.parse(location.hash || location.search);

    if (!tokens?.spotify && spotifyQuery['code']) {
      dispatch(
        signInSpotifyAction(
          // The SpotifyCredentials is based on the query of the api
          spotifyQuery as unknown as SpotifyAuthResponse,
          !tokens?.firebase
        )
      );
    } else if (!tokens?.firebase && spotifyQuery['apiKey'] && user) {
      dispatch(signInFirebaseAction(user));
    }
  }, [location, tokens, user, dispatch]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (tokens.firebase && tokens.spotify) {
      intervalId = setInterval(() => {
        dispatch(refreshTokenAction(tokens)); 
      }, tokens.spotify.expires_in * 999);
    }

    return () => clearTimeout(intervalId);
  }, [dispatch, tokens]);

  return (
    <div className={classes['layout']}>
      <div className={classes['navbar']}>
        <Navbar />
      </div>
      <div className={classes['app']}>{children}</div>
    </div>
  );
};

export default Layout;
