import { useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import moment from 'moment';
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
import { useCycle } from 'framer-motion';
import ExportModal from '../export-modal/export-modal';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const [showExportModal, toggleShowExportModal] = useCycle(false, true);
  const { user, tokens } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const spotifyQuery = queryString.parse(location.hash || location.search);

    if (!tokens?.spotify && spotifyQuery['code']) {
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
  }, [location, tokens, user, dispatch]);

  useEffect(() => {
    const FIFTEEN_MINS = 15 * 60 * 1000;
    const refreshTokenCallback = () => {
      // Check if the token still has 15 mins
      if (moment(tokens.spotify?.expires_date).diff(moment()) <= FIFTEEN_MINS) {
        refreshTokenAction(tokens);
      }
    };
    let intervalId: NodeJS.Timer;
    if (tokens.firebase && tokens.spotify) {
      // Run every 15 mins once tokens are appended
      refreshTokenCallback();
      intervalId = setInterval(() => {
        refreshTokenCallback();
      }, FIFTEEN_MINS);
    }

    return () => clearTimeout(intervalId);
  }, [dispatch, tokens]);

  return (
    <div className={classes['layout']}>
      <ExportModal show={showExportModal} onClose={toggleShowExportModal} />
      <div className={classes['navbar']}>
        <Navbar onExportToLibrary={toggleShowExportModal} />
      </div>
      <div className={classes['app']}>{children}</div>
    </div>
  );
};

export default Layout;
