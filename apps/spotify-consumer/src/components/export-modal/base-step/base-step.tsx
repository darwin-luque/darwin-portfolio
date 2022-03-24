import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import ArrowIcon from '../../../assets/icons/tsx/arrow.icon';
import classes from './base-step.module.css';

const variants: Variants = {
  open: {
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.5,
    },
  },
  close: {
    opacity: 0,
    zIndex: -1,
    transition: {
      duration: 0.5,
    },
  },
};

interface BaseStepProps {
  show: boolean;
  className?: string;
  children: ReactNode;
  onBackward?: () => void;
}

const BaseStep = ({ show, className, children, onBackward }: BaseStepProps) => (
  <motion.div
    variants={variants}
    animate={show ? 'open' : 'close'}
    className={className ?? classes['container']}
  >
    {onBackward && (
      <motion.div
        whileHover={{ cursor: 'pointer' }}
        onClick={onBackward}
        className={classes['arrow']}
      >
        <ArrowIcon />
      </motion.div>
    )}
    {children}
  </motion.div>
);

export default BaseStep;
