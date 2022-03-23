import { fireEvent, render, screen } from '@testing-library/react';
import { UserCredential } from 'firebase/auth';
import Sidebar from '../../../../../components/navbar/mobile-navbar/sidebar/sidebar';
import { SpotifyCredentials } from '../../../../../types';

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

describe('<Sidebar />', () => {
  it('Should use the profile section component', () => {
    render(<Sidebar onSignIn={() => null} onSignOut={() => null} />);
    expect(screen.getByTestId(/profile-section/i)).toBeInTheDocument();
  });

  it('Should only render the home element if there is no session', () => {
    render(<Sidebar onSignIn={() => null} onSignOut={() => null} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Lirbary')).not.toBeInTheDocument();
  });

  it('Should render all of the elements if there is a session', () => {
    render(
      <Sidebar
        tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
        onSignIn={() => null}
        onSignOut={() => null}
      />
    );

    expect(screen.getAllByTestId('sidebar-element')).toHaveLength(4);
  });

  it('Should render a sign out button and execute a function when pressed', () => {
    const mockOnSignOut = jest.fn();
    render(
      <Sidebar
        tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
        onSignIn={() => null}
        onSignOut={mockOnSignOut}
      />
    );
    fireEvent.click(screen.getByText('Sign Out'));

    expect(mockOnSignOut).toHaveBeenCalled()
  });
});
