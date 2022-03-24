import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import classes from './backdrop.module.css';

export interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}

export const Backdrop = ({ children, onClick }: BackdropProps) => (
  <motion.div
    className={classes['backdrop']}
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export default Backdrop;
