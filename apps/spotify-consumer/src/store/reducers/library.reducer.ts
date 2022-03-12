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
  switch (action.type) {
    case ActionTypes.UPDATE_LIBRARY_START:
      return updateObject(state, {
        loading: updateObject(state.loading, {
          add: true,
        }),
      });
    case ActionTypes.UPDATE_LIBRARY_SUCCESS:
      return updateObject(state, {
        tracks: action.tracks!,
        loading: updateObject(state.loading, {
          add: false,
        }),
      });
    case ActionTypes.UPDATE_LIBRARY_FAIL:
      return updateObject(state, {
        error: action.error!,
        loading: updateObject(state.loading, {
          add: false,
        }),
      });
    default:
      return state;
  }
};

export default libraryReducer;
