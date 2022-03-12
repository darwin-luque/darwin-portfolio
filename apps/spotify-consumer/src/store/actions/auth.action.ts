import { ThunkDispatch } from 'redux-thunk';
import { UserCredential } from 'firebase/auth';
import { RootState } from '../index';
import {
  AuthAction,
  Notification,
  SpotifyAuthResponse,
  SpotifyCredentials,
  Tokens,
  User,
} from '../../types';
import { ActionTypes } from '../constants/action-types';
import { auth, db } from '../../configurations/firebase';
import { addNotificationAction } from './notifications.action';
import { generateRandomString } from '../../utils';
import { SpotifyService } from '../../services/spotify.service';
import { FirebaseService } from '../../services/firebase.service';

const spotifyService = new SpotifyService(
  process.env['NX_API_ENDPOINT'] ?? '',
  process.env['NX_AUTH_ENDPOINT'] ?? ''
);
const firebaseService = new FirebaseService(db, auth);

export const signInSpotifyAction = Object.assign(
  (authResponse: SpotifyAuthResponse, shouldSendEmail: boolean = true) =>
    async (dispatch: ThunkDispatch<RootState, {}, AuthAction>) => {
      dispatch(signInSpotifyAction.start());
      try {
        console.log('Sign in with spotify')
        const token = await spotifyService.signIn(authResponse);
        const user = await spotifyService.userProfile(token);
        if (shouldSendEmail) {
          await firebaseService.sendSignInEmailLink(user.email);
        }

        dispatch(signInSpotifyAction.success(user, token));

        const notificationConfig: Notification = {
          id: generateRandomString(),
          content: 'Succesfully signed in!',
          title: `Welcome ${user.display_name}`,
          type: 'success',
        };
        if (shouldSendEmail) {
          Object.assign<Notification, Partial<Notification>>(
            notificationConfig,
            {
              content: `We succesfully sent an email to ${user.email}`,
              title: 'Please confirm your email!',
            }
          );
        }
        dispatch(addNotificationAction(notificationConfig));
      } catch (error) {
        console.log(error);
        dispatch(signInSpotifyAction.fail(error as Error));
        dispatch(
          addNotificationAction({
            id: generateRandomString(),
            content: (error as Error).message ?? 'Could not sign in the user',
            title: 'Something went wrong!',
            type: 'warning',
          })
        );
      }
    },
  {
    start: (): AuthAction => ({ type: ActionTypes.SIGN_IN_SPOTIFY_START }),
    success: (user: User, spotifyToken: SpotifyCredentials): AuthAction => ({
      type: ActionTypes.SIGN_IN_SPOTIFY_SUCCESS,
      user,
      spotifyToken,
    }),
    fail: (error: Error): AuthAction => ({
      type: ActionTypes.SIGN_IN_SPOTIFY_FAIL,
      error,
    }),
  }
);

export const signInFirebaseAction = Object.assign(
  (user: User) => async (dispatch: ThunkDispatch<RootState, {}, AuthAction>) => {
    dispatch(signInFirebaseAction.start());
    try {
      const firebaseToken = await firebaseService.confirmSignInEmailLink(
        user.email
      );
      console.log(firebaseToken);
      dispatch(signInFirebaseAction.success(user, firebaseToken));
    } catch (error) {
      console.log(error);
      dispatch(signInFirebaseAction.fail(error as Error));
    }
  },
  {
    start: (): AuthAction => ({ type: ActionTypes.SIGN_IN_FIREBASE_START }),
    success: (user: User, firebaseToken: UserCredential): AuthAction => ({
      type: ActionTypes.SIGN_IN_FIREBASE_SUCCESS,
      firebaseToken,
      user,
    }),
    fail: (error: Error): AuthAction => ({
      type: ActionTypes.SIGN_IN_FIREBASE_FAIL,
      error,
    }),
  }
);

export const refreshTokenAction = Object.assign(
  (tokens: Tokens) =>
    async (dispatch: ThunkDispatch<RootState, {}, AuthAction>) => {
      dispatch(refreshTokenAction.start());
      try {
        const spotifyToken = await spotifyService.refreshToken(tokens.spotify!);
        const firebaseToken = await firebaseService.refreshToken(
          tokens.firebase!
        );
        dispatch(
          refreshTokenAction.success({
            spotify: spotifyToken,
            firebase: firebaseToken,
          })
        );
      } catch (error) {
        dispatch(refreshTokenAction.fail(error as Error));
      }
    },
  {
    start: (): AuthAction => ({
      type: ActionTypes.REFRESH_TOKEN_START,
    }),
    success: (tokens: Tokens): AuthAction => ({
      type: ActionTypes.REFRESH_TOKEN_SUCCESS,
      tokens,
    }),
    fail: (error: Error): AuthAction => ({
      type: ActionTypes.REFRESH_TOKEN_FAIL,
      error,
    }),
  }
);

export const signOutAction = (): AuthAction => ({
  type: ActionTypes.SIGN_OUT,
});
