import { motion, useDeprecatedInvertedScale } from 'framer-motion';
import { TransformProperties } from 'framer-motion/types/motion/types';
import classes from './track-title.module.css';

export const springs = {
  open: { type: 'spring', stiffness: 200, damping: 30 },
  close: { type: 'spring', stiffness: 300, damping: 35 },
};

const scaleTranslate = ({ x, y, scaleX, scaleY }: TransformProperties) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

interface TrackTitleProps {
  title: string;
  artist: string;
}

const TrackTitle = ({ title, artist }: TrackTitleProps) => {
  const inverted = useDeprecatedInvertedScale();

  return (
    <motion.div
      className={classes['container']}
      initial={false}
      animate={{ x: 15, y: 15 }}
      transition={springs.close}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <span className={classes['artist']}>{artist}</span>
      <h2 className={classes['title']}>{title}</h2>
    </motion.div>
  );
};

export default TrackTitle;
