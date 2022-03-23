import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Navbar, { NavbarProps } from '../../../components/navbar/navbar';
import { SpotifyCredentials, User } from '../../../types';
import { UserCredential } from 'firebase/auth';

const mockStore = configureStore([thunk]);

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

const ProvidedNavbar = (props: NavbarProps) => (
  <Provider
    store={mockStore({
      auth: {
        tokens: { spotify: mockSpotifyToken, firebase: mockFirebaseToken },
        user: mockUser,
      },
    })}
  >
    <Navbar {...props} />
  </Provider>
);

describe('<Navbar />', () => {
  it('Should render the Mobile navbar when the width is less than or equal to 768px', () => {
    render(<ProvidedNavbar staticWidth={300} />);

    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-navbar')).not.toBeInTheDocument();
  });

  it('Should render the Desktop navbar when the width is less than or equal to 768px', () => {
    render(<ProvidedNavbar staticWidth={1000} />);

    expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-navbar')).not.toBeInTheDocument();
  });
});
