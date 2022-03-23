import { motion, SVGMotionProps } from 'framer-motion';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

export const AnimatedBurgerXIcon = ({ size = 24, color = 'hsl(0, 0%, 18%)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" data-testid="animated-burger-x-icon">
    <Path
      variants={{
        closed: { d: 'M 2 2.5 L 20 2.5' },
        open: { d: 'M 3 16.5 L 17 2.5' },
      }}
      stroke={color}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
      stroke={color}
    />
    <Path
      variants={{
        closed: { d: 'M 2 16.346 L 20 16.346' },
        open: { d: 'M 3 2.5 L 17 16.346' },
      }}
      stroke={color}
    />
  </svg>
);

export default AnimatedBurgerXIcon;
