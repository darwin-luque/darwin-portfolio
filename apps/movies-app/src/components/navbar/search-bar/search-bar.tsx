import { Component } from 'solid-js';
import classes from './search-bar.module.css';
import searchBar from '../../../assets/icons/search.svg';
import cancel from '../../../assets/icons/cancel.svg';

export interface SearchBarProps {
  show: boolean;
  onToggle: (show: boolean) => void;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: Component<SearchBarProps> = (props) => {
  const handleClick = () => props.onToggle(!props.show);

  return props.show ? (
    <div className={classes['search-bar']}>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        type="text"
        placeholder="Search"
      />
      <img src={cancel} alt="Search Icon" onClick={handleClick} />
    </div>
  ) : (
    <img src={searchBar} alt="Search Icon" onClick={handleClick} />
  );
};

export default SearchBar;
