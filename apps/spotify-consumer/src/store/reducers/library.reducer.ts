// Disabling this rule on reducer because is required to provide default
// value for state and its the first param redux is expecting
/* eslint-disable @typescript-eslint/default-param-last */
import { LibraryAction, LibraryState } from '../../types';
import { updateObject } from '../../utils';
import { ActionTypes } from '../constants/action-types';

const initialState: LibraryState = {
  loading: {
    update: false,
    get: false,
  },
  tracks: [],
};

const libraryReducer = (state = initialState, action: LibraryAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LIBRARY_START:
      return updateObject(state, {
        loading: updateObject(state.loading, {
          update: true,
        }),
      });
    case ActionTypes.UPDATE_LIBRARY_SUCCESS:
      return updateObject(state, {
        tracks: action.tracks!,
        loading: updateObject(state.loading, {
          update: false,
        }),
      });
    case ActionTypes.UPDATE_LIBRARY_FAIL:
      return updateObject(state, {
        error: action.error!,
        loading: updateObject(state.loading, {
          update: false,
        }),
      });
    case ActionTypes.GET_LIBRARY_START:
      return updateObject(state, {
        loading: updateObject(state.loading, {
          get: true,
        }),
      });
    case ActionTypes.GET_LIBRARY_SUCCESS:
      return updateObject(state, {
        tracks: action.library!,
        loading: updateObject(state.loading, {
          get: false,
        }),
      });
    case ActionTypes.GET_LIBRARY_FAIL:
      return updateObject(state, {
        error: action.error!,
        loading: updateObject(state.loading, {
          get: false,
        }),
      });
    case ActionTypes.SIGN_OUT:
      return updateObject(state, {
        tracks: [],
      })
    default:
      return state;
  }
};

export default libraryReducer;
