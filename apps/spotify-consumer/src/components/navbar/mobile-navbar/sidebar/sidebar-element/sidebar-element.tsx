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
  onElementClick?: () => void;
  onToggleSidebar?: () => void;
  children?: ReactNode;
  name?: string;
}

const SidebarElement = ({
  onToggleSidebar,
  onElementClick,
  children,
  name,
  shouldAddEffectOnMouseActivity = false,
}: SidebarElementProps) => {
  const clickHandler = () => {
    onToggleSidebar && onToggleSidebar();
    onElementClick && onElementClick();
  };

  return (
    <motion.li
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
        <button className={classes['button']} onClick={clickHandler}>
          {name}
        </button>
      )}
    </motion.li>
  );
};

export default SidebarElement;
