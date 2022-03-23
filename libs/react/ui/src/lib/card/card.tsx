import { motion, useMotionValue } from 'framer-motion';
import { memo, ReactNode, useRef } from 'react';
import {
  useInvertedBorderRadius,
  useScrollConstraints,
  useWheelScroll,
} from '@darwin-portfolio/react/hooks';
import classes from './card.module.css';

export const springs = {
  open: { type: 'spring', stiffness: 200, damping: 30 },
  close: { type: 'spring', stiffness: 300, damping: 35 },
};

const triggerDistance = 40;

interface CardProps {
  children: ReactNode;
  useScrollEffect?: boolean;
  onClick?: () => void;
  onToggle?: (state: 'add' | 'remove') => void;
}

export const Card = ({
  children,
  onClick,
  onToggle,
  useScrollEffect = false,
}: CardProps) => {
  const y = useMotionValue(0);
  const zIndex = useMotionValue(0);
  const inverted = useInvertedBorderRadius(20);
  const cardRef = useRef<HTMLDivElement>(null);
  const constraints = useScrollConstraints(cardRef, true);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkSwipe = () => {
    if (!onToggle) return;
    // use functionality to add or remove songs from library
    if (y.get() > triggerDistance) {
      onToggle('remove');
    } else if (y.get() < -triggerDistance) {
      onToggle('add');
    }
  };

  if (useScrollEffect) {
    useWheelScroll(containerRef, y, constraints, checkSwipe, true);
  }

  return (
    <motion.div
      data-testid="card"
      whileHover={{ scale: 1.02 }}
      className={classes['card']}
      ref={containerRef}
      onClick={onClick}
    >
      <div className={classes['card-content-container']}>
        <motion.div
          className={classes['card-content']}
          style={{ ...inverted, zIndex, y }}
          layout
          ref={cardRef}
          transition={springs.close}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(Card);
