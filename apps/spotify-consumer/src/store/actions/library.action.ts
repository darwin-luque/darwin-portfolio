import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import { LibraryAction, Track } from '../../types';
import { generateRandomString } from '../../utils';
import { ActionTypes } from '../constants/action-types';
import { addNotificationAction } from './notifications.action';

export const addTrackAction = Object.assign(
  (track: Track) =>
    async (dispatch: ThunkDispatch<RootState, {}, LibraryAction>) => {
      dispatch(addTrackAction.start());
      try {
        dispatch(addTrackAction.success(track));
      } catch (error) {
        dispatch(addTrackAction.fail(error as Error));
        dispatch(addNotificationAction({
          id: generateRandomString(),
          content: (error as Error).message ?? 'Could not add the track',
          title: 'Something went wrong!',
          type: 'warning',
        }));
      }
    },
  {
    start: (): LibraryAction => ({ type: ActionTypes.ADD_TRACK_START }),
    success: (track: Track) => ({ type: ActionTypes.ADD_TRACK_SUCCESS, track }),
    fail: (error: Error) => ({ type: ActionTypes.ADD_TRACK_FAIL, error }),
  }
);

export const removeTrackAction = Object.assign(
  (track: Track) =>
    async (dispatch: ThunkDispatch<RootState, {}, LibraryAction>) => {
      dispatch(removeTrackAction.start());
      try {
        dispatch(removeTrackAction.success(track.id));
      } catch (error) {
        dispatch(removeTrackAction.fail(error as Error));
        dispatch(addNotificationAction({
          id: generateRandomString(),
          content: (error as Error).message ?? 'Could not remove the track',
          title: 'Something went wrong!',
          type: 'warning',
        }));
      }
    },
  {
    start: (): LibraryAction => ({ type: ActionTypes.REMOVE_TRACK_START }),
    success: (trackId: string) => ({
      type: ActionTypes.REMOVE_TRACK_SUCCESS,
      trackId,
    }),
    fail: (error: Error) => ({ type: ActionTypes.REMOVE_TRACK_FAIL, error }),
  }
);

export const toggleTrackAction =
  (track: Track, action: 'add' | 'remove') =>
    (dispatch: ThunkDispatch<RootState, {}, LibraryAction>) => {
      const actionsMapper = {
        add: addTrackAction,
        remove: removeTrackAction,
      };
    
      dispatch(actionsMapper[action](track));
    };
