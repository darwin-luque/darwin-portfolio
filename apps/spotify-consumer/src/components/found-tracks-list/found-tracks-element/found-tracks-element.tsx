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
    variants={variants}
    whileHover={{ scale: 1.02, opacity: 1 }}
    className={classes['track']}
  >
    <div className={classes['content']}>
      <img src={album?.images[0].url} alt="album" className={classes['art']} />
      <p className={classes['name']}>{name}</p>
      {album && <p className={classes['album']}>{album.name}</p>}
      <p className={classes['duration']}>{moment(duration_ms).format('m:s')}</p>
    </div>
    <motion.button
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
