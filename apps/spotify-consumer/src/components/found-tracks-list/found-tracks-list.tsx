import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { toggleTrackAction } from '../../store/actions/library.action';
import { Track } from '../../types';
import FoundTracksElement from './found-tracks-elements/found-tracks-elements';
import classes from './found-tracks-list.module.css';

const FoundTracksList = () => {
  const { foundTracks } = useAppSelector((state) => state.music);
  const { tracks } = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();

  const toggleTrackHandler = (
    track: Track,
    state: 'add' | 'remove',
    inLibrary: boolean
  ) => {
    if ((state === 'add' && !inLibrary) || (state === 'remove' && inLibrary)) {
      dispatch(toggleTrackAction(track, state));
    }
  };

  return (
    <motion.ul className={classes['tracks']}>
      {foundTracks.map((foundTrack) => {
        const inLibrary = tracks.map(({ id }) => id).includes(foundTrack.id);
        return (
          <FoundTracksElement
            onToggleTrack={(state) =>
              toggleTrackHandler(foundTrack, state, inLibrary)
            }
            {...foundTrack}
            key={foundTrack.id}
            inLibrary={inLibrary}
          />
        );
      })}
    </motion.ul>
  );
};

export default FoundTracksList;
