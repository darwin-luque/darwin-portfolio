import { Link } from 'react-router-dom';

interface NavbarElementProps {
  to: string;
  name: string;
}

const NavbarElement = ({ to, name }: NavbarElementProps) => (
  <Link to={to}>
    <p>{name}</p>
  </Link>
);

export default NavbarElement;
