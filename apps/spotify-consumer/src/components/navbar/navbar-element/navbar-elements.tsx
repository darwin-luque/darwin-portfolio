import { Link } from 'react-router-dom';
import classes from './navbar-element.module.css';

interface NavbarElementProps {
  to: string;
  name: string;
  selected?: boolean;
}

const NavbarElement = ({ to, name, selected = false }: NavbarElementProps) => (
  <Link to={to} className={`${classes['element']} ${selected && classes['selected']}`}>
    <p className={classes['name']}>{name}</p>
  </Link>
);

export default NavbarElement;
