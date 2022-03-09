// Disabling this rule on reducer because is required to provide default
// value for state and its the first param redux is expecting
/* eslint-disable @typescript-eslint/default-param-last */
import { MusicAction, MusicState } from '../../types';
import { updateObject } from '../../../utils';
import { ActionTypes } from '../constants/action-types';

const initialState: MusicState = {
  loading: {
    findTracks: false,
    newRelease: false,
  },
  newReleases: [],
  foundTracks: [],
};

const musicReducer = (state = initialState, action: MusicAction) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_RELEASES_START:
      return updateObject(state, {
        loading: updateObject(state.loading, { newRelease: true }),
      });
    case ActionTypes.GET_NEW_RELEASES_SUCCESS:
      return updateObject(state, {
        loading: updateObject(state.loading, { newRelease: false }),
        newReleases: action.newReleases,
        error: undefined,
      });
    case ActionTypes.GET_NEW_RELEASES_FAIL:
      return updateObject(state, {
        loading: updateObject(state.loading, { newRelease: false }),
        error: action.error,
      });
    case ActionTypes.FIND_TRACKS_START:
      return updateObject(state, {
        loading: updateObject(state.loading, { findTracks: true }),
      });
    case ActionTypes.FIND_TRACKS_SUCCESS:
      return updateObject(state, {
        loading: updateObject(state.loading, { findTracks: false }),
        foundTracks: action.foundTracks,
        error: undefined,
      });
    case ActionTypes.FIND_TRACKS_FAIL:
      return updateObject(state, {
        loading: updateObject(state.loading, { findTracks: false }),
        error: state.error,
      });
    default:
      return state;
  }
};

export default musicReducer;
