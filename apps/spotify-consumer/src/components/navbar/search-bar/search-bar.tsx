import { motion, useAnimation, Variants } from 'framer-motion';
import SearchIcon from '../../../assets/icons/search.icon';
import XIcon from '../../../assets/icons/x.icon';
import classes from './search-bar.module.css';

const fadeInOutVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  center: {
    scale: 1,
    opacity: 1,
  },
  end: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const inputVariants: Variants = {
  initial: {
    width: 0,
    padding: 0,
  },
  center: {
    width: '300px',
    padding: '0 3.2em 0 1.5rem',
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface SearchBarProps {
  showBar: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onToggleBar: () => void;
}

const SearchBar = ({
  showBar,
  inputValue,
  onToggleBar,
  onInputChange,
}: SearchBarProps) => {
  return (
    <div className={classes['container']}>
      <motion.input
        layout
        variants={inputVariants}
        data-showbar={showBar}
        initial="initial"
        animate={showBar ? 'center' : 'exit'}
        onChange={(e) => onInputChange(e.target.value)}
        value={inputValue}
        className={classes['input']}
        placeholder="Search"
        autoFocus
      />
      <motion.button
        variants={fadeInOutVariants}
        initial="initial"
        animate="center"
        exit="end"
        whileHover={{ cursor: 'pointer' }}
        onClick={onToggleBar}
        className={classes['button']}
      >
        {showBar ? <XIcon /> : <SearchIcon />}
      </motion.button>
    </div>
  );
};

export default SearchBar;
