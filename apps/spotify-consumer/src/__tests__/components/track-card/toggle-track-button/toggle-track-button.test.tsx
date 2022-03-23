import { fireEvent, render, screen } from '@testing-library/react';
import ToggleTrackButton from '../../../../components/track-card/toggle-track-button/toggle-track-button';

describe('<ToggleTrackButton />', () => {
  it('Should render a button and execute a function when clicked', () => {
    const mockOnToggleTrack = jest.fn();
    const mockInLibrary = true;
    render(
      <ToggleTrackButton
        onToggleTrack={mockOnToggleTrack}
        inLibrary={mockInLibrary}
      />
    );

    fireEvent.click(screen.getByTestId(/toggle-track-button/i));

    expect(mockOnToggleTrack).toHaveBeenCalledWith(
      mockInLibrary ? 'remove' : 'add'
    );
  });

  it('Should render a remove message if the track is in library', () => {
    const mockOnToggleTrack = jest.fn();
    const mockInLibrary = true;
    render(
      <ToggleTrackButton
        onToggleTrack={mockOnToggleTrack}
        inLibrary={mockInLibrary}
      />
    );
    expect(screen.getByText('- Remove from the Library')).toBeInTheDocument();
  });

  it('Should render an add message if the track is not in library', () => {
    const mockOnToggleTrack = jest.fn();
    const mockInLibrary = false;
    render(
      <ToggleTrackButton
        onToggleTrack={mockOnToggleTrack}
        inLibrary={mockInLibrary}
      />
    );
    expect(screen.getByText('+ Save to Library')).toBeInTheDocument();
  });
});
