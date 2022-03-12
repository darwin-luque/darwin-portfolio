import TrackCard from '../../components/track-card/track-card';
import { useAppSelector } from '../../hooks/redux-hooks';
import classes from './library.module.css';

const Library = () => {
  const tracks = useAppSelector((state) => state.library.tracks);

  return (
    <div className={classes['tracks']}>
      {tracks.map((track) => (
        <div key={track.id} className={classes['track']}>
          <TrackCard useScrollEffect={false} {...track} />
        </div>
      ))}
    </div>
  );
};

export default Library;
