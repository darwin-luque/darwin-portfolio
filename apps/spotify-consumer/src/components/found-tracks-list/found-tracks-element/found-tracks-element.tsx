import moment from 'moment';
import { motion, Variants } from 'framer-motion';
import { Track } from '../../../types';
import classes from './found-tracks-element.module.css';

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface FoundTracksElementProps extends Track {
  inLibrary?: boolean;
  onToggleTrack: (state: 'add' | 'remove') => void;
}

const FoundTracksElement = ({
  name,
  album,
  duration_ms,
  inLibrary = false,
  onToggleTrack,
}: FoundTracksElementProps) => (
  <motion.li
    data-testid="found-tracks-element"
    variants={variants}
    whileHover={{ scale: 1.02, opacity: 1 }}
    className={classes['track']}
  >
    <div className={classes['content']}>
      <img
        data-testid="album-art"
        src={album?.images[0].url}
        alt="album"
        className={classes['art']}
      />
      <p data-testid="name" className={classes['name']}>
        {name}
      </p>
      {album && (
        <p data-testid="album-name" className={classes['album']}>
          {album.name}
        </p>
      )}
      <p data-testid="track-duration" className={classes['duration']}>{moment(duration_ms).format('m:ss')}</p>
    </div>
    <motion.button
      data-testid="toggle-track-button"
      whileHover={{ scale: 1.02, cursor: 'pointer' }}
      whileTap={{ scale: 0.95 }}
      className={classes['button']}
      type="button"
      onClick={() => onToggleTrack(inLibrary ? 'remove' : 'add')}
    >
      {inLibrary ? '-' : '+'}
    </motion.button>
  </motion.li>
);

export default FoundTracksElement;
