import { render, screen } from '@testing-library/react';
import { UserCredential } from 'firebase/auth';
import MobileNavbar from '../../../../components/navbar/mobile-navbar/mobile-navbar';
import { SpotifyCredentials, User } from '../../../../types';

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

const mockUser: User = {
  id: 'mock-user-id',
  country: 'AD',
  display_name: 'mock-display-name',
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: '',
  },
  followers: {
    href: null,
    total: 0,
  },
  href: '',
  images: [{ height: 100, width: 100, url: 'mock-avatar.png' }],
  uri: '',
  email: 'mock@email.com',
};

describe('<MobileNavbar />', () => {
  it('Should render a sidebar', () => {
    render(
      <MobileNavbar
        tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
        user={mockUser}
        onSignIn={() => null}
        onSignOut={() => null}
        pathname="/"
        searchValue=""
        setSearchValue={() => null}
      />
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('Should render a search bar', () => {
    render(
      <MobileNavbar
        tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
        user={mockUser}
        onSignIn={() => null}
        onSignOut={() => null}
        pathname="/"
        searchValue=""
        setSearchValue={() => null}
      />
    );

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
