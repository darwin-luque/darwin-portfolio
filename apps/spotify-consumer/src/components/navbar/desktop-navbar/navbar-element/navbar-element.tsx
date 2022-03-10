import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import classes from './navbar-element.module.css';

interface NavbarElementProps {
  to: string;
  name: string;
  show?: boolean;
  selected?: boolean;
}

const NavbarElement = ({
  to,
  name,
  show = true,
  selected = false,
}: NavbarElementProps) => show ? (
  <motion.span
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`${classes['element']} ${selected && classes['selected']}`}
  >
    <Link to={to} className={`${classes['link']} ${selected && classes['selected']}`}>
      <p className={classes['name']}>{name}</p>
    </Link>
  </motion.span>
) : null;

export default NavbarElement;
