import { render, screen } from '@testing-library/react';
import { UserCredential } from 'firebase/auth';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Layout, { LayoutProps } from '../../../components/layout/layout';
import { Album, Artist, SpotifyCredentials, Track } from '../../../types';

const mockStore = configureStore();
const mockSpotifyToken: SpotifyCredentials = {
  access_token: 'mock-access-token',
  expires_in: 0,
  state: 'mock-state',
  token_type: 'Bearer',
  scope: 'mock-scope',
  refresh_token: 'mock-refresh-token',
};

const mockFirebaseToken: UserCredential = {
  user: {
    emailVerified: true,
    displayName: 'mock-display-name',
    delete: jest.fn(),
    email: 'mock@email.com',
    getIdToken: jest.fn(),
    getIdTokenResult: jest.fn(),
    isAnonymous: false,
    metadata: {},
    phoneNumber: '+504 3325-1869',
    photoURL: 'mock-photo-url.png',
    providerData: [],
    providerId: 'mock-provider-id',
    refreshToken: 'mock-refresh-token',
    reload: jest.fn(),
    tenantId: '',
    toJSON: jest.fn(),
    uid: 'mock-uid',
  },
  providerId: 'mock-provider-id',
  operationType: 'link',
};

const getMockTracks = (length: number): Track[] =>
  Array(length)
    .fill(null)
    .map((val, i) => {
      const mockImageUrl = 'mock-image.png';
      const mockMins = 3;
      const mockSecs = 9;

      const artist: Artist = {
        name: 'Mock Artist',
        external_urls: { spotify: '' },
        href: '',
        id: '0',
        type: 'artist',
        uri: '',
      };

      const mockAlbum: Album = {
        album_type: 'album',
        artists: [artist],
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
        artists: [artist],
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

const ProvidedLayout = (props: LayoutProps) => (
  <Provider
    store={mockStore({
      auth: {
        tokens: { spotify: mockSpotifyToken, firebase: mockFirebaseToken },
      },
      music: { newReleases: getMockTracks(10) },
      library: { tracks: getMockTracks(10) },
    })}
  >
    <Layout {...props} />
  </Provider>
);

describe('<Layout />', () => {
  it('Should render the navbar', () => {
    render(<ProvidedLayout>Hello</ProvidedLayout>);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('Should render the provided children', () => {
    const mockChildren = 'Mock Children';
    render(<ProvidedLayout>{mockChildren}</ProvidedLayout>);

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });
});
