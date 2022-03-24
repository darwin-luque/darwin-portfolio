import { motion, Variants } from 'framer-motion';
import classes from './initial-options.module.css';

const variants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  close: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface InitialOptionsProps {
  onChoose: (option: 'create' | 'add') => void;
  show: boolean;
}

const InitialOptions = ({ onChoose, show }: InitialOptionsProps) => (
  <motion.div
    variants={variants}
    animate={show ? 'open' : 'close'}
    className={classes['container']}
  >
    <div className={classes['content']}>
      <h1 className={classes['title']}>Export to My Spotify</h1>
      <p className={classes['description']}>What do you want to do?</p>
    </div>
    <div className={classes['buttons']}>
      <motion.button
        className={classes['button']}
        onClick={() => onChoose('create')}
        whileHover={{ cursor: 'pointer', scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Create Playlist
      </motion.button>
      <motion.button
        className={classes['button']}
        onClick={() => onChoose('add')}
        whileHover={{ cursor: 'pointer', scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add to Playlist
      </motion.button>
    </div>
  </motion.div>
);

export default InitialOptions;
