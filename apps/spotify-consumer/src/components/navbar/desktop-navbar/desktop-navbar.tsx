import { motion, useCycle } from 'framer-motion';
import ArrowIcon from '../../../assets/icons/tsx/arrow.icon';
import ProfileSection from '../profile-section/profile-section';
import NavbarElement from './navbar-element/navbar-element';
import SearchBar from '../search-bar/search-bar';
import classes from './desktop-navbar.module.css';
import { Tokens, User } from '../../../types';

export const pagesElements = [
  {
    id: 0,
    name: 'Home',
    to: '/',
  },
  {
    id: 1,
    name: 'My Library',
    to: '/library',
  },
];

export interface DesktopNavbarProps {
  user?: User;
  tokens: Tokens;
  pathname: string;
  searchValue: string;
  onSignIn: () => void;
  onSignOut: () => void;
  onExportLibrary: () => void;
  setSearchValue: (value: string) => void;
}

const DesktopNavbar = ({
  user,
  tokens,
  pathname,
  onSignIn,
  onSignOut,
  searchValue,
  setSearchValue,
  onExportLibrary,
}: DesktopNavbarProps) => {
  const [showSearchBar, setShowSearchBar] = useCycle(false, true);

  return (
    <nav className={classes['navbar']} data-testid="desktop-navbar">
      <ProfileSection tokens={tokens} user={user} onSignIn={onSignIn} />
      <div className={classes['navbar-elements']}>
        {pagesElements.map((element) => (
          <NavbarElement
            {...element}
            show={
              element.to === '/library'
                ? !!tokens.spotify && !!tokens.firebase
                : true
            }
            selected={pathname === element.to}
            key={element.id}
          />
        ))}
        {pathname === '/' && !!tokens.spotify && !!tokens.firebase && (
          <SearchBar
            inputValue={searchValue}
            showBar={showSearchBar}
            onToggleBar={setShowSearchBar}
            onInputChange={setSearchValue}
          />
        )}

        {pathname === '/library' && !!tokens.spotify && !!tokens.firebase && (
          <motion.button
            className={classes['export']}
            onClick={onExportLibrary}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Export to My Spotify
          </motion.button>
        )}
        {!!user && (
          <motion.button
            data-testid="sign-out-btn"
            onClick={onSignOut}
            whileHover={{ scale: 1.02, cursor: 'pointer' }}
            className={classes['sign-out']}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowIcon />
          </motion.button>
        )}
      </div>
    </nav>
  );
};
export default DesktopNavbar;
