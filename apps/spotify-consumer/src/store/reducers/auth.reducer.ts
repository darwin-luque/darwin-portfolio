// Disabling this rule on reducer because is required to provide default
// value for state and its the first param redux is expecting
/* eslint-disable @typescript-eslint/default-param-last */
import { AuthAction, AuthState } from '../../types';
import { updateObject } from '../../utils';
import { ActionTypes } from '../constants/action-types';

const initialState: AuthState = {
  tokens: {},
  loading: false,
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_SPOTIFY_START:
      return updateObject(state, {
        loading: true,
      });

    case ActionTypes.SIGN_IN_SPOTIFY_SUCCESS:
      return updateObject(state, {
        loading: false,
        user: action.user!,
        tokens: updateObject(state.tokens, { spotify: action.spotifyToken! }),
        error: undefined,
      });

    case ActionTypes.SIGN_IN_SPOTIFY_FAIL:
      return updateObject(state, {
        loading: false,
        error: state.error!,
      });

    case ActionTypes.SIGN_IN_FIREBASE_START:
      return updateObject(state, {
        loading: true,
      });

    case ActionTypes.SIGN_IN_FIREBASE_SUCCESS:
      return updateObject(state, {
        loading: false,
        user: action.user!,
        tokens: updateObject(state.tokens, { firebase: action.firebaseToken! }),
        error: undefined,
      });

    case ActionTypes.SIGN_IN_FIREBASE_FAIL:
      return updateObject(state, {
        loading: false,
        error: state.error!,
      });

    case ActionTypes.SIGN_OUT:
      return updateObject(state, {
        user: undefined,
        tokens: undefined,
      })

    default:
      return state;
  }
};

export default authReducer;
