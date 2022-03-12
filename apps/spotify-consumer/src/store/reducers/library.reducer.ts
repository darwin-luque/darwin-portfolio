// Disabling this rule on reducer because is required to provide default
// value for state and its the first param redux is expecting
/* eslint-disable @typescript-eslint/default-param-last */
import { LibraryAction, LibraryState } from '../../types';
import { updateObject } from '../../utils';
import { ActionTypes } from '../constants/action-types';

const initialState: LibraryState = {
  loading: {
    add: false,
    remove: false,
  },
  tracks: [],
};

const libraryReducer = (state = initialState, action: LibraryAction) => {
  const inLibrary = state.tracks
    .map(({ id }) => id)
    .includes(action.track?.id ?? '');
  switch (action.type) {
    case ActionTypes.ADD_TRACK_START:
      return updateObject(state, {
        loading: updateObject(state.loading, {
          add: true,
        }),
      });
    case ActionTypes.ADD_TRACK_SUCCESS:
      return updateObject(state, {
        tracks: inLibrary ? state.tracks : [...state.tracks, action.track!],
        loading: updateObject(state.loading, {
          add: false,
        }),
      });
    case ActionTypes.ADD_TRACK_FAIL:
      return updateObject(state, {
        error: action.error!,
        loading: updateObject(state.loading, {
          add: false,
        }),
      });
    case ActionTypes.REMOVE_TRACK_START:
      return updateObject(state, {
        loading: updateObject(state.loading, {
          remove: true,
        }),
      });
    case ActionTypes.REMOVE_TRACK_SUCCESS:
      return updateObject(state, {
        tracks: state.tracks.filter(({ id }) => id !== action.trackId),
        loading: updateObject(state.loading, {
          remove: false,
        }),
      });
    case ActionTypes.REMOVE_TRACK_FAIL:
      return updateObject(state, {
        error: action.error!,
        loading: updateObject(state.loading, {
          remove: false,
        }),
      });
    default:
      return state;
  }
};

export default libraryReducer;
