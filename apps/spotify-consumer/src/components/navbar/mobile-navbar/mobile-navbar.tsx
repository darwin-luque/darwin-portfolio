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
  onExportLibrary: () => void;
  setSearchValue: (value: string) => void;
}

const MobileNavbar = ({
  user,
  tokens,
  pathname,
  onSignIn,
  onSignOut,
  searchValue,
  setSearchValue,
  onExportLibrary,
}: MobileNavbarInterface) => {
  const [showSearchBar, setShowSearchBar] = useCycle(false, true);

  return (
    <div className={classes['mobile-navbar']} data-testid="mobile-navbar">
      <Sidebar
        onExportLibrary={onExportLibrary}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        user={user}
        tokens={tokens}
      />
      {pathname !== '/library' ? (
        <SearchBar
          showBar={showSearchBar}
          onToggleBar={setShowSearchBar}
          inputValue={searchValue}
          onInputChange={setSearchValue}
        />
      ) : (
        <h1> My Library</h1>
      )}
    </div>
  );
};

export default MobileNavbar;
