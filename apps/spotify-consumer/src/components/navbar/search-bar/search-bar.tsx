import { motion } from 'framer-motion';
import SearchIcon from '../../../assets/icons/search-icon';

interface SearchBarProps {
  showBar: boolean;
  onInputChange: (value: string) => void;
  onToggleBar: (shouldShow: boolean) => void;
}

const SearchBar = ({ showBar, onToggleBar, onInputChange }: SearchBarProps) => {
  return showBar ? (
    <motion.button onClick={() => onToggleBar(!showBar)}>
      <SearchIcon />
    </motion.button>
  ) : (
    <div>
      <SearchIcon />
      <input onChange={(e) => onInputChange(e.target.value)} />
    </div>
  );
};

export default SearchBar;
