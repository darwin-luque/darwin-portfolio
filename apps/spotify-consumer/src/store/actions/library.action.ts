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
      type: ActionTypes.UPDATE_LIBRARY_START,
      tracks,
    }),
    fail: (error: Error): LibraryAction => ({
      type: ActionTypes.UPDATE_LIBRARY_FAIL,
      error,
    }),
  }
);
