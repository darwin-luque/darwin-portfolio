import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import FoundTracksList from '../../../components/found-tracks-list/found-tracks-list';
import { Album, Track } from '../../../types';
import * as libraryActions from '../../../store/actions/library.action';
import { ActionTypes } from '../../../store/constants/action-types';

const mockStore = createStore([thunk]);

const getMockTracks = (length: number): Track[] =>
  Array(length)
    .fill(null)
    .map((val, i) => {
      const mockImageUrl = 'mock-image.png';
      const mockMins = 3;
      const mockSecs = 9;

      const mockAlbum: Album = {
        album_type: 'album',
        artists: [],
        available_markets: ['HN'],
        external_urls: {
          spotify: '',
        },
        href: '',
        id: `${i}`,
        images: [{ height: 100, width: 100, url: mockImageUrl }],
        name: `Mock Album ${i}`,
        release_date: '2019-03-10',
        release_date_precision: '2019-03-10',
        total_tracks: 10,
        type: 'album',
        uri: '',
      };

      return {
        artists: [],
        available_markets: ['HN'],
        disc_number: 1,
        duration_ms: (mockMins * 60 + mockSecs) * 1000,
        explicit: 0,
        external_urls: { spotify: '' },
        href: '',
        id: `${i}`,
        is_local: true,
        name: `Mock Track ${i}`,
        preview_url: '',
        track_number: '2',
        type: 'track',
        uri: '',
        album: mockAlbum,
      };
    });

describe('<FoundTracksList />', () => {
  let ProvidedFoundTracksList: (props: { foundTracks: Track[] }) => JSX.Element;
  let store: MockStoreEnhanced<unknown, unknown>;
  const tracksInLibraryLength = 10;
  const libraryTracks = getMockTracks(tracksInLibraryLength);
  const tokens = { spotify: 'spotify-token', firebase: 'firebase-token' };

  beforeEach(() => {
    ProvidedFoundTracksList = ({ foundTracks }) => {
      store = mockStore({
        library: { tracks: libraryTracks },
        auth: { tokens },
        music: { foundTracks },
      });
      return (
        <Provider store={store}>
          <FoundTracksList />
        </Provider>
      );
    };
  });
  it('Should render a found tracks element by track sent by spotify', () => {
    const length = Math.floor(Math.random() * 10);
    const mockTracks = getMockTracks(length);
    render(<ProvidedFoundTracksList foundTracks={mockTracks} />);

    expect(screen.getAllByTestId(/found-tracks-element/i)).toHaveLength(length);
  });

  it('Should dispatch an action to update the library', () => {
    const mockTracks = getMockTracks(14);
    const updateLibrarySpy = jest.spyOn(libraryActions, 'updateLibraryAction');
    mockTracks.splice(0, 8);
    render(<ProvidedFoundTracksList foundTracks={mockTracks} />);

    const randomIndex = Math.floor(Math.random() * mockTracks.length);
    fireEvent.click(screen.getAllByTestId(/toggle-track-button/i)[randomIndex]);

    const action = store.getActions();

    expect(action).toEqual([{ type: ActionTypes.UPDATE_LIBRARY_START }]);
    expect(updateLibrarySpy).toHaveBeenCalledWith(
      mockTracks[randomIndex],
      libraryTracks,
      randomIndex > (tracksInLibraryLength - 1),
      tokens
    );
  });
});
