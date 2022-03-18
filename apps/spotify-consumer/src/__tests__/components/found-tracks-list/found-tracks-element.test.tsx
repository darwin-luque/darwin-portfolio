import { fireEvent, render, screen } from '@testing-library/react';
import FoundTracksElement from '../../../components/found-tracks-list/found-tracks-element/found-tracks-element';
import { Album, Track } from '../../../types';

const mockImageUrl = 'mock-image.png';
const mockMins = 3;
const mockSecs = 9;

const mockAlbum: Album = {
  album_type: 'album',
  artists: [],
  available_markets: ['HN'],
  external_urls: {
    spotify: '',
  },
  href: '',
  id: '0',
  images: [{ height: 100, width: 100, url: mockImageUrl }],
  name: 'Mock Album',
  release_date: '2019-03-10',
  release_date_precision: '2019-03-10',
  total_tracks: 10,
  type: 'album',
  uri: '',
};

const mockTrack: Track = {
  artists: [],
  available_markets: ['HN'],
  disc_number: 1,
  duration_ms: (mockMins * 60 + mockSecs) * 1000,
  explicit: 0,
  external_urls: { spotify: '' },
  href: '',
  id: '0',
  is_local: true,
  name: 'Mock Track',
  preview_url: '',
  track_number: '2',
  type: 'track',
  uri: '',
  album: mockAlbum,
};

describe('<FoundTracksElements />', () => {
  it('Should render the album art', () => {
    render(<FoundTracksElement {...mockTrack} onToggleTrack={() => null} />);

    const element = screen.getByTestId(/album-art/i);
    expect(element.getAttribute('src')).toEqual(mockImageUrl);
  });

  it('Should display the track name', () => {
    render(<FoundTracksElement {...mockTrack} onToggleTrack={() => null} />);

    expect(screen.getByText(mockTrack.name)).toBeDefined();
  });

  it('Should display the duration time parsed as m:ss', () => {
    render(<FoundTracksElement {...mockTrack} onToggleTrack={() => null} />);

    expect(
      screen.getByText(`${mockMins}:${mockSecs < 10 ? '0' : ''}${mockSecs}`)
    );
  });

  it('Should display the album name', () => {
    render(<FoundTracksElement {...mockTrack} onToggleTrack={() => null} />);

    expect(screen.getByText(mockAlbum.name)).toBeDefined();
  });

  describe('Trigger Callback', () => {
    it('Should trigger a function, if the track is in library should provide the parameter of remove', () => {
      const mockToggleTrack = jest.fn();
      render(
        <FoundTracksElement
          {...mockTrack}
          inLibrary
          onToggleTrack={mockToggleTrack}
        />
      );

      fireEvent.click(screen.getByTestId(/toggle-track-button/i));

      expect(mockToggleTrack).toHaveBeenCalledWith('remove');
    });

    it('Should trigger a function, if the track is not in library should provide the parameter of add', () => {
      const mockToggleTrack = jest.fn();
      render(
        <FoundTracksElement
          {...mockTrack}
          inLibrary={false}
          onToggleTrack={mockToggleTrack}
        />
      );

      fireEvent.click(screen.getByTestId(/toggle-track-button/i));

      expect(mockToggleTrack).toHaveBeenCalledWith('add');
    });
  });

  describe('Symbol on button', () => {
    it('Should show a "-" if the track is in library', () => {
      const mockToggleTrack = jest.fn();
      render(
        <FoundTracksElement
          {...mockTrack}
          inLibrary
          onToggleTrack={mockToggleTrack}
        />
      );

      expect(screen.getByText('-')).toBeDefined();
    });

    it('Should show a "+" if the track is not in library', () => {
      const mockToggleTrack = jest.fn();
      render(
        <FoundTracksElement
          {...mockTrack}
          inLibrary={false}
          onToggleTrack={mockToggleTrack}
        />
      );

      expect(screen.getByText('+')).toBeDefined();
    });
  });
});
