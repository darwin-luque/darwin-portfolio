import { render, screen } from '@testing-library/react';
import TrackTitle from '../../../../components/track-card/track-title/track-title';

describe('<TrackTitle />', () => {
  it('Should render the provided title', () => {
    const mockTitle = 'Mock Title';
    render(
      <TrackTitle artist="" title={mockTitle} shouldUseInverted={false} />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('Should render the provided artist', () => {
    const mockArtist = 'Mock Title';
    render(
      <TrackTitle artist={mockArtist} title="" shouldUseInverted={false} />
    );

    expect(screen.getByText(mockArtist)).toBeInTheDocument();
  });
});
