import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import { Country, MusicAction, Tokens, Track } from '../../types';
import { generateRandomString } from '../../utils';
import { ActionTypes } from '../constants/action-types';
import { addNotificationAction } from './notifications.action';
import { SpotifyService } from '../../services/spotify.service';

const spotifyService = new SpotifyService(process.env['NX_API_ENDPOINT'] ?? '');

export const getNewReleasesAction = Object.assign(
  (tokens: Tokens, countryCode?: Country) =>
    async (
      dispatch: ThunkDispatch<RootState, Record<string, unknown>, MusicAction>
    ) => {
      dispatch(getNewReleasesAction.start());
      try {
        const albums = await spotifyService.getNewReleaseSingleAlbums(
          tokens,
          countryCode
        );
        const tracks = await spotifyService.getTracksForManyAlbums(
          tokens,
          albums
        );
        dispatch(getNewReleasesAction.success(tracks));
      } catch (error) {
        dispatch(getNewReleasesAction.fail(error as Error));
        dispatch(
          addNotificationAction({
            id: generateRandomString(),
            content:
              (error as Error).message ?? 'Could not get the new releases',
            title: 'Something went wrong!',
            type: 'warning',
          })
        );
      }
    },
  {
    start: (): MusicAction => ({ type: ActionTypes.GET_NEW_RELEASES_START }),
    success: (newReleases: Track[]): MusicAction => ({
      type: ActionTypes.GET_NEW_RELEASES_SUCCESS,
      newReleases,
    }),
    fail: (error: Error): MusicAction => ({
      type: ActionTypes.GET_NEW_RELEASES_FAIL,
      error,
    }),
  }
);

export const findTracksAction = Object.assign(
  (tokens: Tokens, query: string) =>
    async (
      dispatch: ThunkDispatch<RootState, Record<string, unknown>, MusicAction>
    ) => {
      dispatch(findTracksAction.start());
      try {
        const foundTracks = await spotifyService.queryTracks(tokens, query);
        dispatch(findTracksAction.success(foundTracks));
      } catch (error) {
        dispatch(findTracksAction.fail(error as Error));
        dispatch(
          addNotificationAction({
            id: generateRandomString(),
            content:
              (error as Error).message ?? 'Could not find the new tracks',
            title: 'Something went wrong!',
            type: 'warning',
          })
        );
      }
    },
  {
    start: (): MusicAction => ({ type: ActionTypes.FIND_TRACKS_START }),
    success: (foundTracks: Track[]): MusicAction => ({
      type: ActionTypes.FIND_TRACKS_SUCCESS,
      foundTracks,
    }),
    fail: (error: Error): MusicAction => ({
      type: ActionTypes.FIND_TRACKS_FAIL,
      error,
    }),
  }
);
