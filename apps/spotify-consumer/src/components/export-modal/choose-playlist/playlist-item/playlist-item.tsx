import { motion } from 'framer-motion';
import classes from './playlist-item.module.css';

interface PlaylistProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
}

const PlaylistItem = ({ imageSrc, name, onClick }: PlaylistProps) => (
  <motion.li
    className={classes['playlist']}
    onClick={onClick}
    whileHover={{ cursor: 'pointer', scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src={imageSrc} alt="Playlist" className={classes['image']} />
    <p className={classes['name']}>{name}</p>
  </motion.li>
);

export default PlaylistItem;
