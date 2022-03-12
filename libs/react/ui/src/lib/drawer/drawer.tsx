import { ReactNode, useRef } from 'react';
import { motion, MotionStyle, Variants } from 'framer-motion';
import { useDimensions } from '@darwin-portfolio/react/hooks';
import classes from './drawer.module.css';

const sidebar: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const sidebarContainer: Variants = {
  open: {
    zIndex: 100,
    position: 'fixed',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    zIndex: 1,
    position: 'absolute',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

// Just for typing purpose
const typingStyle: MotionStyle = {};

interface SidebarProps {
  show: boolean;
  children: ReactNode;
  maxSize?: number;
  minSize?: number;
  backgroundColor?: typeof typingStyle.color;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const Drawer = ({
  show,
  children,
  side = 'right',
  maxSize = 500,
  minSize = 300,
  backgroundColor = '#eee',
}: SidebarProps) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const isVertical = side === 'right' || side === 'left';
  const isHorizontal = side === 'top' || side === 'bottom';

  const sizeStyles: MotionStyle = {
    maxWidth: isVertical ? maxSize : 'fit-content',
    maxHeight: isHorizontal ? maxSize : 'fit-content',
    minWidth: isVertical ? minSize : 'fit-content',
    minHeight: isHorizontal ? minSize : 'fit-content',
  };

  return (
    <motion.nav
      initial={false}
      variants={sidebarContainer}
      animate={show ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      style={sizeStyles}
      className={`${classes[side]} ${show && classes['show']}`}
    >
      <motion.div
        className={classes['background']}
        variants={sidebar}
        animate={show ? 'open' : 'closed'}
        style={{ ...sizeStyles, backgroundColor }}
      />
      {children}
    </motion.nav>
  );
};
