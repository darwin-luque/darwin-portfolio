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
  onElementClick?: () => void;
  children?: ReactNode;
  name?: string;
}

const SidebarElement = ({
  children,
  name,
  onElementClick,
}: SidebarElementProps) => (
  <motion.li
    className={classes['element']}
    variants={variants}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {children ? (
      children
    ) : (
      <button className={classes['button']} onClick={onElementClick}>
        {name}
      </button>
    )}
  </motion.li>
);

export default SidebarElement;
