import { fireEvent, render, screen } from '@testing-library/react';
import { UserCredential } from 'firebase/auth';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DesktopNavbar, {
  DesktopNavbarProps,
  pagesElements,
} from '../../../../components/navbar/desktop-navbar/desktop-navbar';
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

const RouterDesktopNavbar = (props: DesktopNavbarProps) => {
  const history = createMemoryHistory();

  return (
    <Router
      history={{
        ...history,
        length: 0,
        goBack: jest.fn(),
        goForward: jest.fn(),
        block: jest.fn(),
        listen: jest.fn(),
      }}
    >
      <DesktopNavbar {...props} />
    </Router>
  );
};

describe('<DesktopNavbar />', () => {
  it('Should use the profile section component', () => {
    render(
      <RouterDesktopNavbar
        onSignIn={() => null}
        onSignOut={() => null}
        pathname="/"
        searchValue="value"
        setSearchValue={() => null}
        tokens={{}}
      />
    );

    expect(screen.getByTestId(/profile-section/i)).toBeInTheDocument();
  });

  describe('No Session', () => {
    it('Should only render one of the pagesElement', () => {
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={() => null}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{}}
        />
      );

      expect(screen.getAllByTestId(/navbar-element/i)).toHaveLength(1);
    });

    it('Should show the sign in button and trigger a function when clicked', () => {
      const mockOnSignIn = jest.fn();
      render(
        <RouterDesktopNavbar
          onSignIn={mockOnSignIn}
          onSignOut={() => null}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{}}
        />
      );

      fireEvent.click(screen.getByTestId(/sign-in-btn/i));
      expect(mockOnSignIn).toHaveBeenCalled();
    });

    it('Should not render the sign out button', () => {
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={() => null}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{}}
        />
      );

      expect(screen.queryByTestId(/sign-out-btn/i)).not.toBeInTheDocument();
    });
  });
  describe('Valid Session', () => {
    it('Should render an element per item in pagesElement if the user is signed in', () => {
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={() => null}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
          user={mockUser}
        />
      );

      expect(screen.getAllByTestId(/navbar-element/i)).toHaveLength(
        pagesElements.length
      );
    });

    it('Should render a sign out button and trigger a function when clicked', () => {
      const mockOnSignOut = jest.fn();
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={mockOnSignOut}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
          user={mockUser}
        />
      );

      fireEvent.click(screen.getByTestId(/sign-out-btn/i));

      expect(mockOnSignOut).toHaveBeenCalled();
    });

    it('Should use the search bar component', () => {
      const mockOnSignOut = jest.fn();
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={mockOnSignOut}
          pathname="/"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
          user={mockUser}
        />
      );

      expect(screen.getByTestId(/search-bar/i)).toBeInTheDocument();
    });

    it('Should not render the search bar if the routename is from the library', () => {
      const mockOnSignOut = jest.fn();
      render(
        <RouterDesktopNavbar
          onSignIn={() => null}
          onSignOut={mockOnSignOut}
          pathname="/library"
          searchValue="value"
          setSearchValue={() => null}
          tokens={{ spotify: mockSpotifyToken, firebase: mockFirebaseToken }}
          user={mockUser}
        />
      );

      expect(screen.queryByTestId(/search-bar/i)).not.toBeInTheDocument();
    });
  });
});
