import { render, screen } from '@testing-library/react';
import TrackImage from '../../../../components/track-card/track-image/track-image';

describe('<TrackImage />', () => {
  it('Should render the provided image', () => {
    const mockSrc = 'mock-src.jpg';
    render(<TrackImage src={mockSrc} backgroundColor="#eee" />);

    expect(screen.getByTestId(/track-image-img/i).getAttribute('src')).toEqual(mockSrc);
  });
});
