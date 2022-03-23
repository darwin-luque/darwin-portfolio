import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import classes from './item.module.css';

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface ItemProps {
  direction: 1 | -1;
  minWidth?: number;
  children: ReactNode;
}

const Item = ({ direction, children, minWidth }: ItemProps) => (
  <motion.div
    data-testid="item"
    style={{ minWidth }}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.8,
      },
      opacity: { duration: 0.8 },
    }}
    className={classes['item']}
  >
    {children}
  </motion.div>
);

export default Item;
