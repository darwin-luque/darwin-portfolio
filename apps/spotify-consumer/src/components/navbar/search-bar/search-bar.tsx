import { motion } from 'framer-motion';
import SearchIcon from '../../../assets/icons/search-icon';
import classes from './search-bar.module.css';

interface SearchBarProps {
  showBar: boolean;
  onInputChange: (value: string) => void;
  onToggleBar: (shouldShow: boolean) => void;
}

const SearchBar = ({ showBar, onToggleBar, onInputChange }: SearchBarProps) => {
  return showBar ? (
    <div className={classes['container']}>
      <SearchIcon />
      <input onChange={(e) => onInputChange(e.target.value)} className={classes['input']} />
    </div>
  ) : (
    <motion.button onClick={() => onToggleBar(!showBar)} className={classes['single-search-icon']}>
      <SearchIcon />
    </motion.button>
  );
};

export default SearchBar;
