import { fireEvent, render, screen } from '@testing-library/react';
import { UserCredential } from 'firebase/auth';
import ProfileSection from '../../../components/navbar/profile-section/profile-section';
import { SpotifyCredentials, User } from '../../../types';

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

describe('<ProfileSection />', () => {
  describe('No Spotify session', () => {
    it('Should render the text refering to sign in with spotify', () => {
      render(
        <ProfileSection onSignIn={() => null} tokens={{}} user={mockUser} />
      );

      expect(screen.getByText('Sign in with Spotify first')).toBeInTheDocument();
    });

    it('Should execute a function when the sign in with spotify text is clicked', () => {
      const mockOnSignIn = jest.fn();
      render(<ProfileSection onSignIn={mockOnSignIn} tokens={{}} />);

      fireEvent.click(screen.getByTestId(/sign-in-btn/i));

      expect(mockOnSignIn).toHaveBeenCalled();
    });
  });

  describe('No Firebase Session', () => {
    it('Should render a text refering to confirm the sent email', () => {
      render(
        <ProfileSection
          onSignIn={() => null}
          tokens={{ spotify: mockSpotifyToken }}
          user={mockUser}
        />
      );

      expect(screen.getByText('Confirm email we sent')).toBeInTheDocument();
    });
  });

  it('Should render the users display name and avatars image', () => {
    render(
      <ProfileSection
        onSignIn={() => null}
        tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
        user={mockUser}
      />
    );

    expect(screen.getByText(mockUser.display_name)).toBeInTheDocument();
    expect(screen.getByTestId(/avatar/i).getAttribute('src')).toEqual(
      mockUser.images[0].url
    );
  });
});
