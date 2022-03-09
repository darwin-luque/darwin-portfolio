import { Card } from '@darwin-portfolio/react/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { toggleTrackAction } from '../../store/actions/library.action';
import { Track } from '../../types';
import TrackImage from './track-image/track-image';
import TrackTitle from './track-title/track-title';
import ToggleTrackButton from './toggle-track-button/toggle-track-button';

export interface TrackCardProps extends Track {
  useScrollEffect?: boolean;
}

const TrackCard = (props: TrackCardProps) => {
  const tracks = useAppSelector((state) => state.library.tracks);
  const {
    id,
    name,
    album,
    artists,
    external_urls: externalUrls,
    useScrollEffect,
  } = props;
  const dispatch = useAppDispatch();

  const applyScrollEffect =
    typeof useScrollEffect === 'undefined' ? true : useScrollEffect;
  const inLibrary = tracks.map((track) => track.id).includes(id);

  const toggleTrackHandler = (state: 'add' | 'remove') => {
    if ((state === 'add' && !inLibrary) || (state === 'remove' && inLibrary)) {
      dispatch(toggleTrackAction(props, state));
    }
  };

  return (
    <Card onToggle={toggleTrackHandler} useScrollEffect={applyScrollEffect}>
      <TrackImage
        src={album?.images[0].url ?? ''}
        backgroundColor="#000"
        pointOfInterest={0}
      />
      <a href={externalUrls.spotify} target="_blank" rel="noreferrer">
        <TrackTitle title={name} artist={artists[0].name} />
      </a>
      <ToggleTrackButton
        inLibrary={inLibrary}
        onToggleTrack={toggleTrackHandler}
      />
    </Card>
  );
};

export default TrackCard;
