import { Component, createSignal } from 'solid-js';
import Element from './element/element';
import Logo from './logo/logo';
import classes from './navbar.module.css';
import SearchBar from './search-bar/search-bar';

const elements = [
  { path: '/', name: 'Home' },
  { path: '/favorites', name: 'Favorites' },
];

const Navbar: Component = () => {
  const [show, toggleShow] = createSignal(false);
  const [query, setQuery] = createSignal('');

  console.log(show(), query());

  return (
    <nav className={classes['navbar']}>
      <Logo />
      <ul className={classes['elements']}>
        <SearchBar
          onToggle={(val) => toggleShow(val)}
          show={show()}
          value={query()}
          onChange={setQuery}
        />
        {elements.map(({ path, name }) => (
          <Element path={path} name={name} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
