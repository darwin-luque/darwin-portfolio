import { motion } from 'framer-motion';
import { Loader } from '@darwin-portfolio/react/ui';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { updateLibraryAction } from '../../store/actions/library.action';
import { Track } from '../../types';
import FoundTracksElement from './found-tracks-element/found-tracks-element';
import classes from './found-tracks-list.module.css';

const FoundTracksList = () => {
  const { foundTracks, loading } = useAppSelector((state) => state.music);
  const { tracks } = useAppSelector((state) => state.library);
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleTrackHandler = (
    track: Track,
    state: 'add' | 'remove',
    inLibrary: boolean
  ) => {
    if ((state === 'add' && !inLibrary) || (state === 'remove' && inLibrary)) {
      dispatch(updateLibraryAction(track, tracks, state === 'add', tokens));
    }
  };

  return (
    <motion.ul className={classes['tracks']}>
      {loading.findTracks ? (
        <Loader type="radar" />
      ) : (
        foundTracks.map((foundTrack) => {
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
        })
      )}
    </motion.ul>
  );
};

export default FoundTracksList;
