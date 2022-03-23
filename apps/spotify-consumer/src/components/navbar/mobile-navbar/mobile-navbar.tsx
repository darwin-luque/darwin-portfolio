import { useCycle } from 'framer-motion';
import { Tokens, User } from '../../../types';
import SearchBar from '../search-bar/search-bar';
import classes from './mobile-navbar.module.css';
import Sidebar from './sidebar/sidebar';

interface MobileNavbarInterface {
  user?: User;
  tokens: Tokens;
  pathname: string;
  searchValue: string;
  onSignIn: () => void;
  onSignOut: () => void;
  setSearchValue: (value: string) => void;
}

const MobileNavbar = ({
  user,
  tokens,
  onSignIn,
  onSignOut,
  searchValue,
  setSearchValue,
}: MobileNavbarInterface) => {
  const [showSearchBar, setShowSearchBar] = useCycle(false, true);

  return (
    <div className={classes['mobile-navbar']} data-testid="mobile-navbar">
      <Sidebar
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        user={user}
        tokens={tokens}
      />
      <SearchBar
        showBar={showSearchBar}
        onToggleBar={setShowSearchBar}
        inputValue={searchValue}
        onInputChange={setSearchValue}
      />
    </div>
  );
};

export default MobileNavbar;
