import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const variants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  close: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface BaseStepProps {
  show: boolean;
  className?: string;
  children: ReactNode;
}

const BaseStep = ({ show, className, children }: BaseStepProps) => (
  <motion.div
    variants={variants}
    animate={show ? 'open' : 'close'}
    className={className}
  >
    {children}
  </motion.div>
);

export default BaseStep;
