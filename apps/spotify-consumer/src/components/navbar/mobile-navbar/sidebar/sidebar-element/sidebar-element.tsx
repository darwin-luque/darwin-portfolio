import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import classes from './sidebar-element.module.css';

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface SidebarElementProps {
  shouldAddEffectOnMouseActivity?: boolean;
  show?: boolean;
  onElementClick?: () => void;
  onToggleSidebar?: () => void;
  children?: ReactNode;
  name?: string;
}

const SidebarElement = ({
  onToggleSidebar,
  onElementClick,
  show = true,
  children,
  name,
  shouldAddEffectOnMouseActivity = false,
}: SidebarElementProps) => {
  const clickHandler = () => {
    onToggleSidebar && onToggleSidebar();
    onElementClick && onElementClick();
  };

  return show ? (
    <motion.li
      data-testid="sidebar-element"
      whileHover={
        shouldAddEffectOnMouseActivity ? { scale: 1.05, cursor: 'pointer' } : {}
      }
      whileTap={shouldAddEffectOnMouseActivity ? { scale: 0.95 } : {}}
      variants={variants}
      className={classes['element']}
    >
      {children ? (
        children
      ) : (
        <button
          data-testid="sidebar-element-btn"
          className={classes['button']}
          onClick={clickHandler}
        >
          {name}
        </button>
      )}
    </motion.li>
  ) : null;
};

export default SidebarElement;
