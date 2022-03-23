import { render, screen } from '@testing-library/react';
import NoSessionPlaceholder from '../../../components/no-session-placeholder/no-session-placeholder';

describe('<NoSessionPlaceholder />', () => {
  it("Should render a message to sign in with spotify if it doesn't have a spotify session", () => {
    render(<NoSessionPlaceholder />);

    expect(
      screen.getByText('Sign in with Spotify first, please!')
    ).toBeInTheDocument();
  });

  it("Should render a message to confirm their email if it doesn't have a firebase session", () => {
    render(<NoSessionPlaceholder hasSpotifySession />);

    expect(
      screen.getByText(
        "Sorry for the hassle, please confirm the email we've sent"
      )
    ).toBeInTheDocument();
  });

  it('Should not render any message if all of the sessions are present', () => {
    render(<NoSessionPlaceholder hasSpotifySession hasFirebaseSession />);

    expect(
      screen.queryByText('Sign in with Spotify first, please!')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Sorry for the hassle, please confirm the email we've sent"
      )
    ).not.toBeInTheDocument();
  });
});
