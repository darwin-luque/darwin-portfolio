import { motion } from 'framer-motion';
import classes from './track-image.module.css';

interface TrackImageProps {
  src: string;
  pointOfInterest?: number;
  backgroundColor: string;
}

const TrackImage = ({
  src,
  pointOfInterest = 0,
  backgroundColor,
}: TrackImageProps) => (
  <motion.div
    data-testid="track-image"
    className={classes['container']}
    layout="size"
    style={{ backgroundColor, originX: 0, originY: 0 }}
  >
    <motion.img
      data-testid="track-image-img"
      src={src}
      className={classes['image']}
      alt="new release thumbnail"
      initial={false}
      animate={{ x: -pointOfInterest, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
    />
  </motion.div>
);

export default TrackImage;
