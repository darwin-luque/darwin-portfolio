import AnimatedBurgerXIcon from '../assets/icons/animated-burger-x.icon';
import classes from './menu-toggle.module.css';

interface MenuToggleProps {
  size?: number;
  color?: string;
  iconSize?: number;
  onToggle: () => void;
  buttonClassName?: string;
}

export const MenuToggle = ({
  onToggle,
  size = 50,
  iconSize = 24,
  color = 'hsl(0, 0%, 18%)',
}: MenuToggleProps) => (
  <button
    data-testid="menu-toggle"
    style={{ width: size, height: size }}
    className={classes['toggler']}
    onClick={onToggle}
  >
    <AnimatedBurgerXIcon size={iconSize} color={color} />
  </button>
);

export default MenuToggle;
