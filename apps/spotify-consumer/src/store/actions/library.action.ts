import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import { auth, database } from '../../configurations/firebase';
import { FirebaseService } from '../../services/firebase.service';
import { LibraryAction, Tokens, Track } from '../../types';
import { addOrRemoveTrackOnLibrary } from '../../utils';
import { ActionTypes } from '../constants/action-types';

const firebaseService = new FirebaseService(database, auth);

export const updateLibraryAction = Object.assign(
  (track: Track, library: Track[], isAdd: boolean, tokens: Tokens) =>
    async (dispatch: ThunkDispatch<RootState, {}, LibraryAction>) => {
      dispatch(updateLibraryAction.start());
      try {
        const updatedLibrary = addOrRemoveTrackOnLibrary(track, library, isAdd);
        if (updatedLibrary.length === library.length) {
          dispatch(updateLibraryAction.success(updatedLibrary));
          return;
        }
        const tracks = await firebaseService.uploadLibrary(
          tokens.firebase!,
          updatedLibrary
        );
        dispatch(updateLibraryAction.success(tracks));
      } catch (error) {
        dispatch(updateLibraryAction.fail(error as Error));
      }
    },
  {
    start: (): LibraryAction => ({
      type: ActionTypes.UPDATE_LIBRARY_START,
    }),
    success: (tracks: Track[]): LibraryAction => ({
      type: ActionTypes.UPDATE_LIBRARY_SUCCESS,
      tracks,
    }),
    fail: (error: Error): LibraryAction => ({
      type: ActionTypes.UPDATE_LIBRARY_FAIL,
      error,
    }),
  }
);

export const getLibraryAction = Object.assign(
  (tokens: Tokens) =>
    async (dispatch: ThunkDispatch<RootState, {}, LibraryAction>) => {
      dispatch(getLibraryAction.start());
      try {
        const library = await firebaseService.getLibrary(tokens.firebase!);
        dispatch(getLibraryAction.success(library));
      } catch (error) {
        dispatch(getLibraryAction.fail(error as Error));
      }
    },
  {
    start: (): LibraryAction => ({
      type: ActionTypes.GET_LIBRARY_START,
    }),
    success: (library: Track[]): LibraryAction => ({
      type: ActionTypes.GET_LIBRARY_SUCCESS,
      library,
    }),
    fail: (error: Error): LibraryAction => ({
      type: ActionTypes.GET_LIBRARY_FAIL,
      error,
    }),
  }
);
