import { motion } from 'framer-motion';
import BaseStep from '../base-step/base-step';
import classes from './initial-options.module.css';

interface InitialOptionsProps {
  onChoose: (option: 'create' | 'add') => void;
  show: boolean;
}

const InitialOptions = ({ onChoose, show }: InitialOptionsProps) => (
  <BaseStep show={show} className={classes['container']}>
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
  </BaseStep>
);

export default InitialOptions;
