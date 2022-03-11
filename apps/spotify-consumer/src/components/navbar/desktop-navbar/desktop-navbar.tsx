import { motion, useCycle } from 'framer-motion';
import ArrowIcon from '../../../assets/icons/arrow.icon';
import ProfileSection from '../profile-section/profile-section';
import NavbarElement from './navbar-element/navbar-element';
import SearchBar from '../search-bar/search-bar';
import classes from './desktop-navbar.module.css';
import { Tokens, User } from '../../../types';

const pagesElements = [
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

interface DesktopNavbarInterface {
  user?: User;
  tokens: Tokens;
  pathname: string;
  searchValue: string;
  onSignIn: () => void;
  onSignOut: () => void;
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
}: DesktopNavbarInterface) => {
  const [showSearchBar, setShowSearchBar] = useCycle(false, true);

  return (
    <nav className={classes['navbar']}>
      <ProfileSection tokens={tokens} user={user} onSignIn={onSignIn} />
      <div className={classes['navbar-elements']}>
        {pagesElements.map((element) => (
          <NavbarElement
            {...element}
            show={element.to === '/library' ? !!user : true}
            selected={pathname === element.to}
            key={element.id}
          />
        ))}
        {pathname === '/' && !!user && (
          <SearchBar
            inputValue={searchValue}
            showBar={showSearchBar}
            onToggleBar={setShowSearchBar}
            onInputChange={setSearchValue}
          />
        )}
        {!!user && (
          <motion.button
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
